# **OG To-Do App**

A secure and production-ready fullstack web application that allows users to **register, log in, and manage personal to-do tasks** with full CRUD functionality.  
Built with **Node.js, Express, MongoDB**, this project merges real-world authentication with a practical task management interface.

---

## 🚀 Features

### 🔐 Authentication
- User registration with email and hashed password (bcrypt)
- Secure JWT-based login and session handling
- Protected routes accessible only to authenticated users

### 📝 Task Management
- Create, Read, Update, Delete (CRUD) tasks
- Each task is tied to a specific authenticated user
- Responsive frontend with live task updates

### ⚙️ System Highlights
- Clean MVC architecture
- Centralized error handling middleware
- Environment-based configuration with `.env`
- MongoDB Atlas cloud database integration
- Deployed backend and frontend on live servers

---

## 🧱 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Backend** | Node.js, Express.js, TypeScript, MongoDB (Mongoose), bcryptjs, jsonwebtoken, dotenv, cors |
| **Frontend** | (Yet to be decided. Most likely React) |
| **Deployment** | Render (backend), Netlify/Vercel (frontend) |
| **Version Control** | Git & GitHub |
| **Optional CI/CD** | GitHub Actions for automated deployment |

---

## 🧩 Project Architecture

```
/backend
 ├── controllers/
 │    ├── authController.js
 │    └── taskController.js
 ├── models/
 │    ├── User.js
 │    └── Task.js
 ├── routes/
 │    ├── authRoutes.js
 │    └── taskRoutes.js
 ├── middleware/
 │    ├── authMiddleware.js
 │    └── errorMiddleware.js
 ├── config/
 │    └── db.js
 ├── server.js
 └── .env

/frontend
 ├── Yet to be concluded

```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Gaius-Okoase/OG_To-Do_Project.git
cd OG_To-Do_Project
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-secret-key>
```

Run the development server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open `frontend/index.html` directly in your browser  
or serve it using a simple static server (e.g. Live Server VS Code extension).

---

## 🔗 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|-----------|--------------|----------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user and return JWT | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| POST | `/api/tasks` | Create new task | ✅ |
| GET | `/api/tasks` | Get all user tasks | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |

✅ = Requires Authorization header: `Bearer <token>`

---

## 🔐 Authentication Flow

1. User registers → password hashed with bcrypt  
2. JWT token created and returned  
3. Token stored in browser localStorage  
4. Protected requests attach token in `Authorization` header  
5. Middleware verifies token → attaches user → grants access  

---

## 🧠 Key Learnings

- End-to-end understanding of authentication and CRUD operations  
- Structuring scalable Node.js backend with Express and MVC principles  
- Integrating frontend and backend using Fetch API and JWT  
- Environment configuration and secure secret management  
- Realistic deployment using Render and Netlify  
- Optional CI/CD pipeline with GitHub Actions

---

## ⚙️ Deployment

| Service | Link |
|----------|------|
| **Backend (Render)** | [_Comming Soon_]() |
| **Frontend (Netlify)** | [_Coming Soon_]() |

---

## 🧪 Optional: GitHub Actions (CI/CD)

To automate deployment when pushing to `main`, create:

`.github/workflows/deploy.yml`
```yaml
name: Deploy to Render

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      - name: Deploy to Render
        run: curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

Set `RENDER_DEPLOY_HOOK` as a secret in your GitHub repo.

---

## 💡 Future Improvements
- Add password reset flow via email  
- Add categories and task priorities  
- Add due dates and completion progress  
- Implement React or Next.js frontend  
- Add Redis caching for performance optimization  

---

## 👨‍💻 Author
**Gaius Onosetale**  
Backend Developer | Node.js | Express | MongoDB | AWS | Serverless  
🔗 [LinkedIn](https://linkedin.com/in/gaius-okoase) • [GitHub](https://github.com/Gaius-Okoase) • [X](https://x.com/Gaius-Oreoluwa)

---

## 📜 License
This project is open-source under the **MIT License**.
