import {
  createContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import type { User } from '../core/interfaces';
import { Loader } from '../ui/loader';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storageUser = sessionStorage.getItem('user');
    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
