# 🎓 Thesis Check – Academic Integrity Platform

Thesis Check is a web-based platform built to help **students**, **supervisors**, and **institutions** analyze academic theses for **plagiarism** and **AI-generated content**.  
The platform provides dashboards, similarity scores, AI detection insights, and revision tracking — helping universities maintain high academic ethics.

---

## 🚀 Features (Frontend)

### 🌗 Dark & Light Mode
- Full UI theme switching
- Applies across **all pages**
- Saves theme in browser (`localStorage`)

### 🏠 Home Page
- Hero section
- High-quality academic banner image
- About Us + Contact section integrated
- Clean gold/navy design

### 🔐 Authentication
- Login & Signup pages
- LocalStorage token session
- Protected routes using PrivateRoute
- Navbar changes dynamically when logged in
- Shows user email + Logout button

### 📊 Dashboard
- Total checks count
- Average plagiarism score
- Last report performance
- Recent checks table
- Theme-aware UI

### 📁 Upload Thesis
- Drag & Drop upload zone
- Backend-ready implementation

### 📑 User Tools
- **My Reports**
- **Checks History**
- Accessible only after login

### 🧑‍🏫 Admin Tools
- Admin Dashboard
- Admin Stats

---

## 🧩 Tech Stack

**Frontend:**  
- React.js (Create React App)  
- React Router  
- Context API (theme)  
- LocalStorage (auth & theme)  
- Custom CSS + inline styles  

**Backend (to integrate):**  
- Node.js / Express  
- AI Detection API  
- Plagiarism Detection API  
- Database (PostgreSQL/MongoDB)

---

## 📁 Project Structure

```
src/
 ├── components/
 │    ├── Navbar.jsx
 │    ├── Layout.jsx
 │    ├── LogoAnalytics.jsx
 │    ├── PrivateRoute.jsx
 │    └── UploadDropzone.jsx
 │
 ├── context/
 │    └── ThemeContext.js
 │
 ├── pages/
 │    ├── Home.jsx
 │    ├── About.jsx
 │    ├── Contact.jsx
 │    ├── Login.jsx
 │    ├── Signup.jsx
 │    ├── Dashboard.jsx
 │    ├── UploadThesis.jsx
 │    ├── CheckPlagiarism.jsx
 │    ├── CheckAI.jsx
 │    ├── MyReports.jsx
 │    ├── Report.jsx
 │    ├── ChecksHistory.jsx
 │    ├── Workspace.jsx
 │    ├── AdminDashboard.jsx
 │    └── AdminStats.jsx
 │
 ├── App.js
 └── index.js
```

---

## 🧠 How It Works

1. User logs in  
2. Navbar updates → My Reports / History appear  
3. User uploads thesis  
4. Backend processes plagiarism + AI score  
5. Report displayed  
6. History saved in user profile  

---

## 🛠️ Installation

### 1️⃣ Install dependencies
```
npm install
```

### 2️⃣ Start development server
```
npm start
```

Runs on → http://localhost:3000/

### 3️⃣ Build for production
```
npm run build
```

---

## 🔗 Backend Integration

Frontend is fully ready for API integration:

- Login API  
- Signup API  
- Upload endpoint  
- Plagiarism detection API  
- AI detection API  
- Reports & History storage  

---

## 📘 Documentation

All documentation is maintained on **Google Drive**, including:

- UI/UX design  
- Technical documentation  
- Sprint reports  
- API diagrams  
- Presentation slides  

---

## 👥 Team Roles

| Member | Role | Responsibilities |
|--------|------|------------------|
| Dev 1 | Frontend Lead | UI, theme, pages, components |
| Dev 2 | Backend Lead | API, database, processing |
| Dev 3 | Integration | Link backend ↔ frontend |
| Dev 4 | QA Tester | Tests & bug fixing |
| Dev 5 | Documentation Lead | Reports & presentation |

---

## 📄 License
Academic use only — © 2025 Thesis Check

