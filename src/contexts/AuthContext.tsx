import {
  createContext,
  useCallback,
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
  const [user, setUserContext] = useState<User | null>(null);

  useLayoutEffect(() => {
    const storageUser = sessionStorage.getItem('user');
    if (storageUser) {
      setUserContext(JSON.parse(storageUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  const setUser = useCallback((user: User | null) => {
    setUserContext(user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
