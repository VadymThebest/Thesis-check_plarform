import os
import sys
import django
import pandas as pd
from tqdm import tqdm
from sentence_transformers import SentenceTransformer

# Ensure Django setup
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "thesis_check.settings")
django.setup()

from checking.models import Article

MODEL_NAME = "all-mpnet-base-v2"
CSV_PATH = "articles.csv"   # path to your dataset
NROWS = 20000               # limit (optional)

def train():
    print("📚 Loading dataset...")
    df = pd.read_csv(CSV_PATH, nrows=NROWS).fillna("")
    df["text"] = df["title"].astype(str) + ". " + df["content"].astype(str)

    model = SentenceTransformer(MODEL_NAME)

    print("🧠 Generating embeddings and saving to PostgreSQL (pgvector)...")
    for _, row in tqdm(df.iterrows(), total=len(df)):
        emb = model.encode(row["text"]).tolist()  # ✅ must be a Python list
        Article.objects.create(
            title=row["title"],
            content=row["content"],
            embedding=emb
        )

    print("✅ Done — embeddings stored successfully in PostgreSQL with pgvector.")

if __name__ == "__main__":
    train()
