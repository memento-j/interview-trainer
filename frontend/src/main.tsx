import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import './index.css'
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import InterviewPractice from './pages/InterviewPractice.tsx'
import AccountPage from './pages/AccountPage.tsx'
import InterviewSessionPage from './pages/InterviewSessionsPage.tsx'
import NavBar from './components/NavBar.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx'
import FAQPage from './pages/FAQPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx';
import UpdatePasswordPage from './pages/UpdatePasswordPage.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage/>}/>
            <Route path="/auth/signup" element={<SignUpPage/>}/>
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage/>}/>
            <Route path="/update-password" element={<UpdatePasswordPage/>}/>
            <Route path="/practice" element={<InterviewPractice/>}/>
            <Route path="/dashboard" element={<AccountPage/>}/>
            <Route path="/account/practice-sessions" element={<InterviewSessionPage/>}/>
            <Route path="/FAQ" element={<FAQPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
          <Toaster position="top-center" richColors closeButton/>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
)
