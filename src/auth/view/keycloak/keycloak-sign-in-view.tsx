'use client';

import { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';

import { CONFIG } from 'src/global-config';
import { useSearchParams } from 'src/routes/hooks';
import { SplashScreen } from 'src/components/loading-screen';

import { signInWithKeycloak } from '../../context/keycloak';
import { useAuthContext } from '../../hooks';

// ----------------------------------------------------------------------

export function KeycloakSignInView() {
  const searchParams = useSearchParams();
  const { authenticated, loading } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const returnTo = searchParams.get('returnTo') || CONFIG.auth.redirectPath;

  useEffect(() => {
    if (loading || authenticated) {
      return;
    }

    signInWithKeycloak(returnTo).catch((error) => {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Unable to start Keycloak sign-in.');
    });
  }, [authenticated, loading, returnTo]);

  if (errorMessage) {
    return (
      <Alert severity="error" sx={{ maxWidth: 480, mx: 'auto' }}>
        {errorMessage}
      </Alert>
    );
  }

  return <SplashScreen />;
}
