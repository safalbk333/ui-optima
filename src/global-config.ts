import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  apiUrl: string;
  assetsDir: string;
  isStaticExport: boolean;
  auth: {
    method: 'jwt' | 'amplify' | 'firebase' | 'supabase' | 'auth0' | 'keycloak';
    skip: boolean;
    redirectPath: string;
  };
  mapboxApiKey: string;
  firebase: {
    appId: string;
    apiKey: string;
    projectId: string;
    authDomain: string;
    storageBucket: string;
    measurementId: string;
    messagingSenderId: string;
  };
  amplify: { userPoolId: string; userPoolWebClientId: string; region: string };
  auth0: { clientId: string; domain: string; callbackUrl: string };
  keycloak: {
    url: string;
    realm: string;
    clientId: string;
    clientSecret: string;
    scope: string;
    callbackPath: string;
    callbackUrl: string;
  };
  supabase: { url: string; key: string };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Minimal UI',
  appVersion: packageJson.version,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://api-dev-minimal-v700.pages.dev',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'https://semantic-pox-fox.ngrok-free.dev',
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  isStaticExport: JSON.parse(process.env.BUILD_STATIC_EXPORT ?? 'false'),
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0 | keycloak
   */
  auth: {
    method: (process.env.NEXT_PUBLIC_AUTH_METHOD ??
      (process.env.NEXT_PUBLIC_KEYCLOAK_URL || process.env.NEXT_KEYCLOAK_URL
        ? 'keycloak'
        : 'jwt')) as ConfigValue['auth']['method'],
    skip: false,
    redirectPath: paths.dashboard.root,
  },
  /**
   * Mapbox
   */
  mapboxApiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? '',
  /**
   * Firebase
   */
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID ?? '',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? '',
  },
  /**
   * Amplify
   */
  amplify: {
    userPoolId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_ID ?? '',
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID ?? '',
    region: process.env.NEXT_PUBLIC_AWS_AMPLIFY_REGION ?? '',
  },
  /**
   * Auth0
   */
  auth0: {
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? '',
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? '',
    callbackUrl: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL ?? '',
  },
  /**
   * Keycloak (OIDC Authorization Code + PKCE)
   */
  keycloak: {
    url:
      process.env.NEXT_PUBLIC_KEYCLOAK_URL ??
      process.env.NEXT_KEYCLOAK_URL ??
      'http://localhost:8080',
    realm:
      process.env.NEXT_PUBLIC_KEYCLOAK_REALM ?? process.env.NEXT_REALM ?? 'optima',
    clientId:
      process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ??
      process.env.NEXT_CLIENT_ID ??
      'react-web-client',
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? '',
    scope: process.env.NEXT_PUBLIC_KEYCLOAK_SCOPE ?? 'openid profile email',
    callbackPath: paths.auth.keycloak.loginRedirect,
    callbackUrl:
      process.env.NEXT_PUBLIC_KEYCLOAK_CALLBACK_URL ??
      process.env.NEXT_REDIRECT_URL ??
      `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:4000'}${paths.auth.keycloak.loginRedirect}`,
  },
  /**
   * Supabase
   */
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
};
