import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/AuthContext.tsx'
import './index.css'
import HomePage from './pages/HomePage.tsx'
import AuthPage from './pages/AuthPage.tsx'
import InterviewPractice from './pages/InterviewPractice.tsx'
import AccountPage from './pages/AccountPage.tsx'
import NavBar from './components/NavBar.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/practice" element={<InterviewPractice/>}/>
        <Route path="/account" element={<AccountPage/>}/>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)
