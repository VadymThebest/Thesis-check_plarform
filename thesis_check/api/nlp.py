import re
import pandas as pd
import language_tool_python
from PyPDF2 import PdfReader
import docx
from functools import lru_cache
from checking.semantic_search import check_plagiarism
from api.ai_detector import detect_ai_text
from api.language_tool_cached import LANGUAGE_TOOL


@lru_cache(maxsize=1)
def get_language_tool():
    print("Initializing LanguageTool (this will happen only once)...")
    return language_tool_python.LanguageTool('en-US', server_mode=True)


def extract_text(file_path: str) -> str:
    """Extract text from PDF, DOCX, TXT, CSV, or XLSX files."""
    try:
        file_path_lower = file_path.lower()

        # PDF
        if file_path_lower.endswith(".pdf"):
            text = ""
            with open(file_path, "rb") as f:
                reader = PdfReader(f)
                for page in reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + " "
            return text.strip()

        # DOCX
        elif file_path_lower.endswith(".docx"):
            document = docx.Document(file_path)
            return " ".join(p.text for p in document.paragraphs).strip()

        # TXT
        elif file_path_lower.endswith(".txt"):
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read().strip()

        # CSV
        elif file_path_lower.endswith(".csv"):
            df = pd.read_csv(file_path)
            return df.to_string(index=False)

        # XLSX
        elif file_path_lower.endswith(".xlsx"):
            df = pd.read_excel(file_path)
            return df.to_string(index=False)

        else:
            print(f"⚠️ Unsupported file type: {file_path}")
            return ""

    except Exception as e:
        print(f"⚠️ Error extracting text from {file_path}: {e}")
        return ""


def _preprocess_text(text: str, min_token_len=3) -> str:
    """Clean and normalize text before grammar or plagiarism check."""
    if not text:
        return ""
    t = re.sub(r'\s+', ' ', text).strip().lower()
    # remove everything after references section
    t = re.sub(r'references\b.*$', '', t, flags=re.IGNORECASE | re.DOTALL)
    tokens = [tok for tok in re.split(r'\W+', t) if len(tok) >= min_token_len]
    return " ".join(tokens)


def count_grammar_issues(text: str) -> int:
    if not text:
        return 0
    matches = LANGUAGE_TOOL.check(text)
    return len(matches)


def check_citations(text: str) -> int:
    """Return 0 if citations exist, 1 if missing."""
    if not text:
        return 1
    patterns = [
        r'\[\d+\]',                # [1], [2]
        r'\([A-Z][a-z]+, \d{4}\)', # (Smith, 2020)
        r'\bReferences\b', r'\bBibliography\b'
    ]
    return 0 if any(re.search(p, text, flags=re.IGNORECASE) for p in patterns) else 1


def run_plagiarism_and_grammar_check(file_path: str):
    """Main pipeline: extract, preprocess, and run checks."""
    text = extract_text(file_path)
    print(f"📝 Extracted text length: {len(text)}")
    print(f"🧩 Sample: {text[:200]}")

    if not text.strip():
        print("⚠️ No readable text found in file.")
        return {
            "plagiarism": 0.0,
            "grammar": 0,
            "citations": 1,
            "ai_score": 0,
        }

    # Run semantic plagiarism check
    result = check_plagiarism(text)
    plagiarism_score = result.get("plagiarism_score", 0.0)

    # Run grammar & citation checks
    grammar_issues = count_grammar_issues(text)
    citations_missing = check_citations(text)

    ai_score = detect_ai_text(text)

    return {
        "plagiarism": plagiarism_score,
        "grammar": grammar_issues,
        "citations": citations_missing,
        "ai_score": ai_score,
    }
