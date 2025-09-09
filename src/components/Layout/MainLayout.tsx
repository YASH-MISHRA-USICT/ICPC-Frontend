import React from 'react';
import { useLocation } from 'react-router-dom';
import { Chatbot } from '../UI/Chatbot';
import { useAuth } from '../../hooks/useAuth';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const { user } = useAuth();
  const location = useLocation();
  
  // Pages where chatbot should not appear
  const excludedPaths = ['/login', '/auth', '/register', '/'];
  const shouldShowChatbot = user && !excludedPaths.includes(location.pathname);

  return (
    <>
      {children}
      {shouldShowChatbot && <Chatbot />}
    </>
  );
}