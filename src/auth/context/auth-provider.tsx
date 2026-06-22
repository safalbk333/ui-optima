'use client';

import type { ReactNode } from 'react';

import { CONFIG } from 'src/global-config';
import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';
import { AuthProvider as KeycloakAuthProvider } from 'src/auth/context/keycloak';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  if (CONFIG.auth.method === 'keycloak') {
    return <KeycloakAuthProvider>{children}</KeycloakAuthProvider>;
  }

  return <JwtAuthProvider>{children}</JwtAuthProvider>;
}
