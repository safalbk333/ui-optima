import type { AppRole } from 'src/auth/roles';

import { CONFIG } from 'src/global-config';
import { paths } from 'src/routes/paths';
import { axiosInstance } from 'src/lib/axios';

import {
  JWT_STORAGE_KEY,
  KEYCLOAK_ID_TOKEN_KEY,
  KEYCLOAK_REFRESH_TOKEN_KEY,
} from './constant';

// ----------------------------------------------------------------------

type KeycloakTokenPayload = {
  sub?: string;
  exp?: number;
  email?: string;
  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  realm_access?: { roles?: string[] };
  resource_access?: Record<string, { roles?: string[] }>;
};

export function jwtDecode(token: string): KeycloakTokenPayload | null {
  try {
    if (!token) return null;

    const parts = token.split('.');

    if (parts.length < 2) {
      throw new Error('Invalid token!');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken: string) {
  if (!accessToken) {
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded?.exp) {
      return false;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error during token validation:', error);
    return false;
  }
}

// ----------------------------------------------------------------------

const ROLE_PRIORITY: AppRole[] = ['admin', 'approver', 'enduser'];

export function mapKeycloakRole(roles: string[] = []): AppRole {
  const normalizedRoles = roles.map((role) => role.toLowerCase());

  const matchedRole = ROLE_PRIORITY.find((role) => normalizedRoles.includes(role));

  return matchedRole ?? 'admin';
}

export function tokenToAuthUser(accessToken: string) {
  const decoded = jwtDecode(accessToken);

  if (!decoded?.sub) {
    throw new Error('Invalid access token!');
  }

  const { clientId } = CONFIG.keycloak;

  const clientRoles = decoded.resource_access?.[clientId]?.roles ?? [];

  const roles = [...(decoded.realm_access?.roles ?? []), ...clientRoles];

  return {
    id: decoded.sub,
    email: decoded.email ?? decoded.preferred_username ?? '',
    displayName:
      decoded.name ??
      [decoded.given_name, decoded.family_name].filter(Boolean).join(' ') ??
      decoded.preferred_username ??
      decoded.email ??
      'User',
    role: mapKeycloakRole(roles),
    accessToken,
  };
}

// ----------------------------------------------------------------------

function tokenExpired(exp: number) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  setTimeout(() => {
    sessionStorage.removeItem(JWT_STORAGE_KEY);
    sessionStorage.removeItem(KEYCLOAK_REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(KEYCLOAK_ID_TOKEN_KEY);
    window.location.href = paths.auth.keycloak.signIn;
  }, timeLeft);
}

// ----------------------------------------------------------------------

export type KeycloakSession = {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
};

export async function setKeycloakSession(session: KeycloakSession | null) {
  try {
    if (session?.accessToken) {
      sessionStorage.setItem(JWT_STORAGE_KEY, session.accessToken);
      localStorage.setItem(JWT_STORAGE_KEY, session.accessToken);

      if (session.refreshToken) {
        sessionStorage.setItem(KEYCLOAK_REFRESH_TOKEN_KEY, session.refreshToken);
      } else {
        sessionStorage.removeItem(KEYCLOAK_REFRESH_TOKEN_KEY);
      }

      if (session.idToken) {
        sessionStorage.setItem(KEYCLOAK_ID_TOKEN_KEY, session.idToken);
      } else {
        sessionStorage.removeItem(KEYCLOAK_ID_TOKEN_KEY);
      }

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${session.accessToken}`;

      const decodedToken = jwtDecode(session.accessToken);

      if (decodedToken?.exp) {
        tokenExpired(decodedToken.exp);
      } else {
        throw new Error('Invalid access token!');
      }

      return;
    }

    sessionStorage.removeItem(JWT_STORAGE_KEY);
    sessionStorage.removeItem(KEYCLOAK_REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(KEYCLOAK_ID_TOKEN_KEY);
    localStorage.removeItem(JWT_STORAGE_KEY);
    delete axiosInstance.defaults.headers.common.Authorization;
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}

export function getStoredKeycloakSession(): KeycloakSession | null {
  const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);

  if (!accessToken) {
    return null;
  }

  return {
    accessToken,
    refreshToken: sessionStorage.getItem(KEYCLOAK_REFRESH_TOKEN_KEY) ?? undefined,
    idToken: sessionStorage.getItem(KEYCLOAK_ID_TOKEN_KEY) ?? undefined,
  };
}
