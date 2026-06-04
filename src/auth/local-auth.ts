import type { AppRole } from './roles';

// ----------------------------------------------------------------------

export const USERS_STORAGE_KEY = 'optima_p2p_users';
export const SESSION_STORAGE_KEY = 'optima_p2p_session';

export type LocalUserRecord = {
  email: string;
  password: string;
  role: AppRole;
  displayName: string;
};

export type LocalSession = {
  email: string;
  role: AppRole;
  displayName: string;
};

/** Default POC accounts — each email has its own password. */
export const DEFAULT_LOCAL_USERS: LocalUserRecord[] = [
  {
    email: 'admin@optima.com',
    password: 'Admin@123',
    role: 'admin',
    displayName: 'System Admin',
  },
  {
    email: 'approver@optima.com',
    password: 'Approver@123',
    role: 'approver',
    displayName: 'Purchase Approver',
  },
  {
    email: 'enduser@optima.com',
    password: 'Enduser@123',
    role: 'enduser',
    displayName: 'Requestor User',
  },
];

// ----------------------------------------------------------------------

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function seedLocalUsersIfEmpty(): void {
  if (typeof window === 'undefined') return;

  const existing = localStorage.getItem(USERS_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_LOCAL_USERS));
  }
}

export function getLocalUsers(): LocalUserRecord[] {
  if (typeof window === 'undefined') return DEFAULT_LOCAL_USERS;

  seedLocalUsersIfEmpty();

  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as LocalUserRecord[]) : DEFAULT_LOCAL_USERS;
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_LOCAL_USERS;
  } catch {
    return DEFAULT_LOCAL_USERS;
  }
}

export function findLocalUser(email: string): LocalUserRecord | undefined {
  const normalized = normalizeEmail(email);
  return getLocalUsers().find((user) => normalizeEmail(user.email) === normalized);
}

export function authenticateLocalUser(email: string, password: string): LocalSession | null {
  const user = findLocalUser(email);

  if (!user || user.password !== password) {
    return null;
  }

  return {
    email: normalizeEmail(user.email),
    role: user.role,
    displayName: user.displayName,
  };
}

export function getLocalSession(): LocalSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw) as LocalSession;
    if (!session?.email || !session?.role) return null;

    return session;
  } catch {
    return null;
  }
}

export function setLocalSession(session: LocalSession | null): void {
  if (typeof window === 'undefined') return;

  if (session) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export function localSessionToAuthUser(session: LocalSession) {
  return {
    id: session.email,
    email: session.email,
    displayName: session.displayName,
    role: session.role,
    photoURL: null,
    accessToken: null,
  };
}
