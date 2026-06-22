'use client';

import { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../../hooks';
import { handleKeycloakCallback } from '../../context/keycloak';

// ----------------------------------------------------------------------

export function KeycloakCallbackView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkUserSession } = useAuthContext();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const oauthError = searchParams.get('error');
    const oauthErrorDescription = searchParams.get('error_description');

    if (oauthError) {
      setErrorMessage(oauthErrorDescription ?? oauthError);
      return;
    }

    if (!code || !state) {
      setErrorMessage('Missing authorization response from Keycloak.');
      return;
    }

    handleKeycloakCallback(code, state)
      .then(async (returnTo) => {
        await checkUserSession?.();
        router.replace(returnTo);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error instanceof Error ? error.message : 'Authentication failed.');
      });
  }, [checkUserSession, router, searchParams]);

  if (errorMessage) {
    return (
      <Box sx={{ maxWidth: 480, mx: 'auto', textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          You can try signing in again.
        </Typography>
        <Button component={RouterLink} href={paths.auth.keycloak.signIn} variant="contained">
          Back to sign in
        </Button>
      </Box>
    );
  }

  return <SplashScreen />;
}
