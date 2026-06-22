'use client';

import { useMemo, useEffect, useCallback } from 'react';

import { useSetState } from 'minimal-shared/hooks';

import { AuthContext } from '../auth-context';
import type { AuthState } from '../../types';

import { refreshKeycloakSession } from './action';
import { getStoredKeycloakSession, isValidToken, setKeycloakSession, tokenToAuthUser } from './utils';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({ user: null, loading: true });

  const checkUserSession = useCallback(async () => {
    try {
      let session = getStoredKeycloakSession();

      if (session?.accessToken && !isValidToken(session.accessToken)) {
        const refreshed = await refreshKeycloakSession();

        if (refreshed) {
          session = getStoredKeycloakSession();
        } else {
          await setKeycloakSession(null);
          session = null;
        }
      }

      if (session?.accessToken && isValidToken(session.accessToken)) {
        await setKeycloakSession(session);
        setState({ user: tokenToAuthUser(session.accessToken), loading: false });
        return;
      }

      setState({ user: null, loading: false });
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? { ...state.user, role: state.user?.role ?? 'admin' } : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext value={memoizedValue}>{children}</AuthContext>;
}
