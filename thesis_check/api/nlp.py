import os
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from PyPDF2 import PdfReader
import docx

# Load SpaCy English model
nlp = spacy.load("en_core_web_sm")

def extract_text(file_path):
    if file_path.endswith(".pdf"):
        reader = PdfReader(file_path)
        return " ".join(page.extract_text() or "" for page in reader.pages)
    elif file_path.endswith(".docx"):
        document = docx.Document(file_path)
        return " ".join(p.text for p in document.paragraphs)
    else:
        return ""

def run_plagiarism_and_grammar_check(file_path):
    text = extract_text(file_path)

    # ---- 1️⃣ Local plagiarism comparison ----
    repo_dir = "repository"
    os.makedirs(repo_dir, exist_ok=True)

    repo_texts = []
    for filename in os.listdir(repo_dir):
        if filename.endswith((".pdf", ".docx")):
            repo_texts.append(extract_text(os.path.join(repo_dir, filename)))

    if repo_texts:
        tfidf = TfidfVectorizer().fit_transform([text] + repo_texts)
        cosine_sim = cosine_similarity(tfidf[0:1], tfidf[1:])
        plagiarism_score = round(float(max(cosine_sim[0])) * 100, 2)
    else:
        plagiarism_score = 0.0

    # ---- 2️⃣ Grammar check ----
    doc = nlp(text)
    grammar_issues = sum(1 for token in doc if token.is_stop == False and token.pos_ == "X")

    # ---- 3️⃣ Citations check (simple heuristic) ----
    citations_missing = 0 if ("References" in text or "Bibliography" in text) else 1

    return {
        "plagiarism": plagiarism_score,
        "grammar": grammar_issues,
        "citations": citations_missing
    }
