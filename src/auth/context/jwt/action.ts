'use client';

import { JWT_STORAGE_KEY } from './constant';
import { axiosInstance, endpoints } from 'src/lib/axios';
import { setSession } from './utils';
import {
  authenticateLocalUser,
  localSessionToAuthUser,
  setLocalSession,
} from 'src/auth/local-auth';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  const localSession = authenticateLocalUser(email, password);

  if (localSession) {
    setLocalSession(localSession);
    sessionStorage.removeItem(JWT_STORAGE_KEY);
    delete axiosInstance.defaults.headers.common.Authorization;
    return;
  }

  try {
    const params = { email, password };

    const res = await axiosInstance.post(endpoints.auth.signIn, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setLocalSession(null);
    await setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw new Error('Invalid email or password');
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<void> => {
  const params = {
    email,
    password,
    firstName,
    lastName,
  };

  try {
    const res = await axiosInstance.post(endpoints.auth.signUp, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    setLocalSession(null);
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
