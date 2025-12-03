# Practimate – AI Interview Trainer

An AI-powered web app that helps users practice, refine, and build confidence for job interviews. 

## Live Demo

### You can try Practimate here:
👉 https://practimateai.com

## Tech Stack

**Frontend**
- React + TypeScript
- React Router
- Tailwind CSS
- Framer Motion
- TanStack React Query

**Backend / Auth**
- Express
- Express Rate Limit
- Supabase (Auth, Database, Storage)

**AI**
- OpenAI GPT-5-nano
- Assembly AI

## Getting Started
### 1. Clone the Repository
```bash
git clone https://github.com/memento-j/interview-trainer
cd interview-trainer
```

### 2. Install Dependencies

Frontend
```bash
cd frontend
npm install
```
Backend
```bash
cd backend
npm install
```

### 3. Environment Variables

You will need **two** .env files — one for the frontend and one for the backend.

**Frontend .env**

Create at:
```bash
/frontend/.env
```
```bash
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_KEY=your_key
VITE_ASSEMBLYAI_KEY=your_key
VITE_API_URL=your_api_url
```
! If your backend port is 5000, then your VITE_API_URL will be http://locahost:5000 !

**Backend .env**

Create at:
```bash
/backend/.env
```
```bash
OPENAI_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_SR_KEY=your_key
PORT=your_port
```

### 4. Run the App

**Frontend**
```bash
cd frontend
npm run dev
```

**Backend**
```bash
cd backend
npm run dev
```

**The app will be available at:**

```
Frontend → http://localhost:5173  
Backend  → http://localhost:PORT
```