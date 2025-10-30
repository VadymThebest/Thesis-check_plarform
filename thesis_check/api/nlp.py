import os
import re
import spacy
import language_tool_python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from PyPDF2 import PdfReader
import docx
from functools import lru_cache

# Load SpaCy model once (this is lightweight)
nlp = spacy.load("en_core_web_sm")


@lru_cache(maxsize=1)
def get_language_tool():
    """
    Lazily loads LanguageTool the first time it’s needed,
    then reuses the same instance for all future calls.
    """
    print("Initializing LanguageTool (this will happen only once)...")
    return language_tool_python.LanguageTool('en-US')


def extract_text(file_path):
    try:
        if file_path.endswith(".pdf"):
            reader = PdfReader(file_path)
            return " ".join(page.extract_text() or "" for page in reader.pages)
        elif file_path.endswith(".docx"):
            document = docx.Document(file_path)
            return " ".join(p.text for p in document.paragraphs)
        else:
            return ""
    except Exception as e:
        print(f"Error extracting text: {e}")
        return ""


def count_grammar_issues(text):
    tool = get_language_tool()
    matches = tool.check(text)
    return len(matches)


def check_citations(text):
    patterns = [
        r'\[\d+\]',                # [1], [2]
        r'\([A-Z][a-z]+, \d{4}\)', # (Smith, 2020)
        r'References', r'Bibliography'
    ]
    return 0 if any(re.search(p, text) for p in patterns) else 1


def run_plagiarism_and_grammar_check(file_path):
    text = extract_text(file_path)

    repo_dir = "media/uploads"
    os.makedirs(repo_dir, exist_ok=True)

    file_path = os.path.abspath(file_path)

    repo_texts = []
    for filename in os.listdir(repo_dir):
        file_path_in_repo = os.path.abspath(os.path.join(repo_dir, filename))
        if filename.endswith((".pdf", ".docx")) and file_path_in_repo != file_path:
            repo_texts.append(extract_text(file_path_in_repo))

    if repo_texts:
        tfidf = TfidfVectorizer().fit_transform([text] + repo_texts)
        cosine_sim = cosine_similarity(tfidf[0:1], tfidf[1:])
        plagiarism_score = round(float(max(cosine_sim[0])) * 100, 2)
    else:
        plagiarism_score = 0.0

    grammar_issues = count_grammar_issues(text)
    citations_missing = check_citations(text)

    return {
        "plagiarism": plagiarism_score,
        "grammar": grammar_issues,
        "citations": citations_missing
    }
