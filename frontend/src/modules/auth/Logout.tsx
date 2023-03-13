import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogoutQuery } from './core/auth-api';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from './core/auth-slice';

export function Logout() {
  const token = useAppSelector(selectAuth).token;
  const { isSuccess } = useLogoutQuery(token ? token : '');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isSuccess && <Navigate to="/" />}
    </Suspense>
  );
}
