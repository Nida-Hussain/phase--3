'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getAuthToken, removeAuthToken } from '@/lib/auth';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuthStatus = () => {
    if (isAuthenticated()) {
      const token = getAuthToken();
      if (token) {
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = parts[1];
            const decodedPayload = JSON.parse(atob(payload));
            setUser({
              id: decodedPayload.sub,
              provider: decodedPayload.provider || 'email'
            });
          }
        } catch (error) {
          console.error('Token decode error:', error);
        }
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    checkAuthStatus();
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    router.push('/login');
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
