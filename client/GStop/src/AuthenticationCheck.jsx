// useAuth.js
import { useUser } from './UserContext';

export const useAuth = () => {
  const { user } = useUser();

  const isAuthenticated = !!user;

  return { isAuthenticated };
};


