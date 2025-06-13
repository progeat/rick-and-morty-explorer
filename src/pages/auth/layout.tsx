import type { FC, ReactNode } from 'react';
import styled from './layout.module.css';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className={styled.layout}>{children}</div>;
};
