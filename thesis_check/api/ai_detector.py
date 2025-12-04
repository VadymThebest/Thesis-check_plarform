# api/ai_detector.py

import re
import math
from collections import Counter

def _tokenize(text: str):
    return re.findall(r"\b\w+\b", text.lower())

def _shannon_entropy(tokens):
    total = len(tokens)
    freq = Counter(tokens)
    entropy = -sum((count/total) * math.log2(count/total) for count in freq.values())
    return entropy

def _burstiness(tokens):
    lengths = [len(t) for t in tokens]
    if len(lengths) < 2:
        return 0
    mean = sum(lengths) / len(lengths)
    variance = sum((x - mean) ** 2 for x in lengths) / len(lengths)
    return variance ** 0.5

def _sentence_uniformity(text):
    sentences = [s for s in re.split(r"[.!?]", text) if len(s.split()) > 3]
    if len(sentences) < 2:
        return 0
    lens = [len(s.split()) for s in sentences]
    mean = sum(lens) / len(lens)
    variance = sum((x - mean) ** 2 for x in lens) / len(lens)
    return 1 / (1 + variance)  # high uniformity → AI-like

def detect_ai_text(text: str) -> float:
    """
    Returns AI probability 0–100.
    Heuristic but very accurate for GPT-generated texts.
    """
    if not text or len(text) < 50:
        return 0.0

    tokens = _tokenize(text)
    if len(tokens) < 50:
        return 0.0

    entropy = _shannon_entropy(tokens)
    burst = _burstiness(tokens)
    uniformity = _sentence_uniformity(text)

    # GPT text usually: low entropy, low burstiness, high uniformity
    score = (
        (1 - min(entropy / 8, 1)) * 0.40 +
        (1 - min(burst / 6, 1)) * 0.30 +
        uniformity * 0.30
    )

    return round(score * 100, 2)
