import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import { useState } from 'react'
import './App.css'
import { LoginForm } from './components/LoginForm'
import { PlayerDashboard } from './components/PlayerDashboard'
import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<'admin' | 'user'>('user')
  const [loginUserId, setLoginUserId] = useState<string>('')

  const handleLogin = (type: 'admin' | 'user', userId: string) => {
    // PlayerDashboard hanya untuk player
    if (type === 'user') {
      setUserType(type)
      setLoginUserId(userId)
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType('user')
    setLoginUserId('')
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <PlayerDashboard onLogout={handleLogout} userType={userType} loginUserId={loginUserId} />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
