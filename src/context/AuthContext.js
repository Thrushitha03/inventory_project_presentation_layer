import { createContext, useContext, useState } from 'react';
import { StorageUtils } from '../utilities/StorageUtils';

const AuthContext = createContext(null);

const MOCK_USERS = [
  { id: 1, username: 'admin',   password: 'admin123',   role: 'ADMIN' },
  { id: 2, username: 'manager', password: 'manager123', role: 'MANAGER' },
  { id: 3, username: 'staff',   password: 'staff123',   role: 'STAFF' },
];

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(() => StorageUtils.getUser());
  const [token,   setToken]   = useState(() => StorageUtils.getToken());
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const found = MOCK_USERS.find(u => u.username === username && u.password === password);
    setLoading(false);
    if (found) {
      const userData  = { id: found.id, username: found.username, role: found.role };
      const fakeToken = 'mock-token-' + found.username;
      StorageUtils.setToken(fakeToken);
      StorageUtils.setUser(userData);
      setToken(fakeToken);
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    StorageUtils.clearAll();
    setUser(null);
    setToken(null);
  };

  const hasRole = (required) => {
    if (!user) return false;
    const hierarchy = { ADMIN: 3, MANAGER: 2, STAFF: 1 };
    return (hierarchy[user.role] || 0) >= (hierarchy[required] || 0);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, hasRole, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
