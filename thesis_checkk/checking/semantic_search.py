from sentence_transformers import SentenceTransformer
from pgvector.django import CosineDistance
from checking.models import Article

# Load model once globally
model = SentenceTransformer("all-mpnet-base-v2")

def check_plagiarism(text):
    """Compare the input text against stored embeddings using pgvector and return plagiarism score."""
    print("📝 Text length:", len(text))
    print("🔍 Sample:", text[:500])
    query_vec = model.encode(text).tolist()  # convert to list for pgvector

    results = (
        Article.objects
        .annotate(distance=CosineDistance("embedding", query_vec))
        .order_by("distance")[:5]  # closest = most similar
    )

    matches = []
    for r in results:
        similarity = round((1 - r.distance) * 100, 2)
        matches.append({
            "title": r.title,
            "similarity": similarity,
            "excerpt": r.content[:300],
        })

    plagiarism_score = max([m["similarity"] for m in matches]) if matches else 0.0

    return {
        "plagiarism_score": plagiarism_score,
        "matches": matches
    }
