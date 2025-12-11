import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo (replace with actual backend)
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@grampanchayat.gov',
    phone: '9876543210',
    address: 'Panchayat Office, Village Center',
    role: 'admin',
    password: 'admin123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Staff Member',
    email: 'staff@grampanchayat.gov',
    phone: '9876543211',
    address: 'Panchayat Office, Village Center',
    role: 'staff',
    password: 'staff123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Ramesh Kumar',
    email: 'ramesh@example.com',
    phone: '9876543212',
    address: '123 Village Road, Ward 5',
    role: 'user',
    password: 'user123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('egram_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('egram_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existingUser = MOCK_USERS.find(u => u.email === data.email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: String(Date.now()),
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem('egram_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('egram_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
