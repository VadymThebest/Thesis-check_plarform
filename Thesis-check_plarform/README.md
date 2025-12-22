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
## 🔐 Authentication & JWT Barrier
This platform uses JWT (JSON Web Tokens) for secure API access.
- Registration/Login: Users register with email, username, password, and role (student, advisor, admin).
- Token Issuance:
- POST /api/v1/token/ → returns access and refresh tokens
- POST /api/v1/token/refresh/ → refreshes expired access token
- Authorization Barrier:
- All protected endpoints require header:
  Authorization: Bearer <access_token>
- Without a valid token, API returns 401 Unauthorized.

## 🧩 User Registration API
To allow new users to register directly via API:
• POST/api/v1/register
•   Example request:
{
  "email": "student@example.com",
  "username": "stud123",
  "password": "mypassword",
  "role": "student"
}
• 	Example response:
{
  "id": 1,
  "email": "student@example.com",
  "role": "student",
  "username": "stud123"
}
After registration, the user can immediately log in via  to obtain JWT tokens.


🧪 Postman Workspace
We use a shared Postman workspace named Thesis Check for testing all endpoints.
🔹 Collections
• 	Thesis:
• 	 → list of submissions
• 	 → single result
• 	 → upload thesis
• 	User:
• 	 → create user
• 	 → login
• 	 → refresh token
Authorization: Bearer <access_token>
Content-Type: application/json

## 📡 API Endpoints🔹 User & Auth API- POST /api/v1/token/ → Obtain JWT tokens (login)
🔹 User & Auth API
• 	POST → /api/v1/register → Register a new user
• 	POST → /api/v1/token → Obtain JWT tokens (login)
• 	POST → /api/v1/token/refresh → Refresh access token
🔹 Thesis Submission API
• 	POST → /api/v1/upload → Upload a thesis file (requires JWT)
• 	GET → /api/v1/check/ → List all submissions for the logged-in user
• 	GET → /api/v1/check/<id>/ → Retrieve a specific submission by ID
## 🧩 API Documentation (Swagger)The API is documented using OpenAPI 3.0.
You can view the live Swagger UI at:http://127.0.0.1:8000/swagger/
⚙️ Setup Instructions# Clone the repository
git clone https://github.com/<your-username>/Thesis-check-platform.git
cd Thesis-check-platform

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

## 📌 Summary
• 	Users can register via .
• 	After registration, they log in via  to obtain JWT tokens.
• 	 token is short-lived (default 5 min),  token lasts longer (default 24h).
• 	Use  token to renew  without re-login.
• 	All thesis endpoints (, ) require .
• 	Postman workspace can be used to test the full cycle: registration → login → upload → results.
