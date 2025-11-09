# 🎓 Thesis Check Platform

**Thesis Check Platform** is a Django-based web service that helps students uphold academic integrity by self-checking their thesis drafts before final submission.

The platform allows **uploading**, **plagiarism checking**, **grammar & citation validation**, and **generates feedback reports** securely stored on AWS S3.

---

## 🚀 Tech Stack

| Component | Technology |
|------------|-------------|
| **Backend** | Django (Python 3.12) |
| **Database** | PostgreSQL |
| **File Storage** | AWS S3 |
| **Plagiarism Check** | Local repository comparison + optional external API |
| **NLP Libraries** | spaCy, NLTK |
| **Documentation** | Swagger / OpenAPI 3.0 |

---

## 🧠 Project Overview

Students can upload their thesis drafts in **PDF or Word** format.  
The system performs automated checks for:
- **Plagiarism** (local + external source comparison)
- **Grammar errors**
- **Incorrect or missing citations**

Once the checks are complete, students can **download a detailed feedback report** as a PDF.

---

## 🧩 API Documentation (Swagger)

The API is documented using **OpenAPI 3.0**.  
You can view the live Swagger UI at:


```
# Clone the repository
git clone https://github.com/<your-username>/Thesis-check-platform.git
cd Thesis-check-platform

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
pip install -U spacy==3.7.1
pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.7.1/en_core_web_sm-3.7.1-py3-none-any.whl

# Create database
sudo -u postgres psql
CREATE DATABASE mydatabase;
CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE EXTENSION IF NOT EXISTS vector;
\q

# Apply database migrations
python manage.py migrate

#Train your model
cd thesis_check/checking
python train_embeddings.py

# Run the development server
python manage.py runserver
```
