'use client';

import { CONFIG } from 'src/global-config';
import { paths } from 'src/routes/paths';

import { getKeycloakCallbackUrl, getKeycloakEndpoints } from './config';
import { createPkcePair, generateRandomString } from './pkce';
import { setKeycloakSession } from './utils';
import {
  KEYCLOAK_ID_TOKEN_KEY,
  KEYCLOAK_OAUTH_STATE_KEY,
  KEYCLOAK_PKCE_VERIFIER_KEY,
  KEYCLOAK_REFRESH_TOKEN_KEY,
  KEYCLOAK_RETURN_TO_KEY,
} from './constant';

// ----------------------------------------------------------------------

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in?: number;
  token_type?: string;
};

/** Redirect to Keycloak login (uses your custom theme login.ftl). */
export async function signInWithKeycloak(returnTo?: string) {
  const { codeVerifier, codeChallenge } = await createPkcePair();
  const state = generateRandomString(32);
  const redirectUri = getKeycloakCallbackUrl();

  sessionStorage.setItem(KEYCLOAK_PKCE_VERIFIER_KEY, codeVerifier);
  sessionStorage.setItem(KEYCLOAK_OAUTH_STATE_KEY, state);
  sessionStorage.setItem(KEYCLOAK_RETURN_TO_KEY, returnTo ?? CONFIG.auth.redirectPath);

  const params = new URLSearchParams({
    client_id: CONFIG.keycloak.clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: CONFIG.keycloak.scope,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  const { authorization } = getKeycloakEndpoints();

  window.location.assign(`${authorization}?${params.toString()}`);
}

/** Exchange authorization code for tokens after Keycloak redirect. */
export async function handleKeycloakCallback(code: string, state: string) {
  const storedState = sessionStorage.getItem(KEYCLOAK_OAUTH_STATE_KEY);
  const codeVerifier = sessionStorage.getItem(KEYCLOAK_PKCE_VERIFIER_KEY);

  if (!storedState || storedState !== state) {
    throw new Error('Invalid OAuth state. Please sign in again.');
  }

  if (!codeVerifier) {
    throw new Error('Missing PKCE verifier. Please sign in again.');
  }

  const redirectUri = getKeycloakCallbackUrl();

  const response = await fetch('/api/auth/keycloak/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      codeVerifier,
      redirectUri,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message ?? 'Failed to exchange authorization code.');
  }

  const tokens = (await response.json()) as TokenResponse;

  if (!tokens.access_token) {
    throw new Error('Access token not found in response.');
  }

  await setKeycloakSession({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    idToken: tokens.id_token,
  });

  const returnTo = sessionStorage.getItem(KEYCLOAK_RETURN_TO_KEY) ?? CONFIG.auth.redirectPath;

  sessionStorage.removeItem(KEYCLOAK_OAUTH_STATE_KEY);
  sessionStorage.removeItem(KEYCLOAK_PKCE_VERIFIER_KEY);
  sessionStorage.removeItem(KEYCLOAK_RETURN_TO_KEY);

  return returnTo;
}

/** Refresh access token using stored refresh token. */
export async function refreshKeycloakSession(): Promise<boolean> {
  const refreshToken = sessionStorage.getItem(KEYCLOAK_REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    return false;
  }

  const response = await fetch('/api/auth/keycloak/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    return false;
  }

  const tokens = (await response.json()) as TokenResponse;

  if (!tokens.access_token) {
    return false;
  }

  await setKeycloakSession({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token ?? refreshToken,
    idToken: tokens.id_token,
  });

  return true;
}

/** Clear local session and redirect to Keycloak logout. */
export async function signOut() {
  const idToken = sessionStorage.getItem(KEYCLOAK_ID_TOKEN_KEY);

  await setKeycloakSession(null);

  const postLogoutRedirectUri =
    typeof window !== 'undefined'
      ? `${window.location.origin}${paths.auth.keycloak.signIn}`
      : CONFIG.keycloak.callbackUrl;

  const params = new URLSearchParams({
    post_logout_redirect_uri: postLogoutRedirectUri,
  });

  if (idToken) {
    params.set('id_token_hint', idToken);
  }

  const { logout } = getKeycloakEndpoints();

  window.location.assign(`${logout}?${params.toString()}`);
}
