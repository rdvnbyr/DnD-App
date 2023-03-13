import { useAppSelector } from '../../app/hooks';

export const useAuth = (): boolean => {
  const { isAuthenticated, user, token } = useAppSelector((state) => state.auth);
  // check user
  const hasUser = user != null && user?.id;
  const isAuth = isAuthenticated && hasUser && token;
  return isAuth;
};
