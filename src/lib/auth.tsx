'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/types';
import { useRouter } from 'next/navigation';

// A mock user database
const mockUsers: { [email: string]: Omit<User, 'id'> & { password_hash: string } } = {
  'user@example.com': {
    name: 'Test User',
    email: 'user@example.com',
    password_hash: 'password123',
    role: 'USER',
  },
  'admin@example.com': {
    name: 'Admin User',
    email: 'admin@example.com',
    password_hash: 'adminpassword',
    role: 'ADMIN',
  },
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('ipl-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('ipl-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers[email];
        if (foundUser && foundUser.password_hash === password) {
          const userToSave: User = {
            id: `user-${Date.now()}`,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
          };
          localStorage.setItem('ipl-user', JSON.stringify(userToSave));
          setUser(userToSave);
          setLoading(false);
          resolve(userToSave);
        } else {
          setLoading(false);
          resolve(null);
        }
      }, 500);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<User | null> => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (mockUsers[email]) {
          setLoading(false);
          resolve(null); // User already exists
        } else {
          const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            role: 'USER',
          };
          mockUsers[email] = { ...newUser, password_hash: password };
          localStorage.setItem('ipl-user', JSON.stringify(newUser));
          setUser(newUser);
          setLoading(false);
          resolve(newUser);
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('ipl-user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
