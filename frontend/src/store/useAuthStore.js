import { create } from 'zustand';
import { authService } from '../services/auth';

export const useAuthStore = create((set) => ({
  user: authService.getCurrentUser(),
  isAuthenticated: authService.isAuthenticated(),
  
  setUser: (user) => {
    authService.saveUser(user);
    set({ user, isAuthenticated: true });
  },
  
  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },
  
  updateUser: (userData) => {
    set((state) => {
      const updatedUser = { ...state.user, ...userData };
      authService.saveUser(updatedUser);
      return { user: updatedUser };
    });
  }
}));
