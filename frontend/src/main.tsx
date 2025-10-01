import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import './index.css'
import HomePage from './pages/HomePage.tsx'
import AuthPage from './pages/AuthPage.tsx'
import InterviewPractice from './pages/InterviewPractice.tsx'
import AccountPage from './pages/AccountPage.tsx'
import InterviewSessionPage from './pages/InterviewSessionsPage.tsx'
import NavBar from './components/NavBar.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/practice" element={<InterviewPractice/>}/>
          <Route path="/account" element={<AccountPage/>}/>
          <Route path="/account/practice-sessions" element={<InterviewSessionPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        <Toaster position="top-center" richColors closeButton/>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
)
