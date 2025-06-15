import {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import type { User } from '../core/interfaces';

interface AuthContextState {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialState: AuthContextState = {
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextState>(initialState);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useLayoutEffect(() => {
    const storageUser = sessionStorage.getItem('user');
    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
