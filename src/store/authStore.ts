import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(persist(set => ({
  isAuthenticated: false,
  user: null,
  login: user => set({
    isAuthenticated: true,
    user
  }),
  register: user => set({
    isAuthenticated: true,
    user
  }),
  logout: () => set({
    isAuthenticated: false,
    user: null
  })
}), {
  name: 'auth-storage'
}));