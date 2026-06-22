import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export function getKeycloakRealmUrl() {
  const { url, realm } = CONFIG.keycloak;

  return `${url.replace(/\/$/, '')}/realms/${realm}`;
}

export function getKeycloakEndpoints() {
  const realmUrl = getKeycloakRealmUrl();

  return {
    authorization: `${realmUrl}/protocol/openid-connect/auth`,
    token: `${realmUrl}/protocol/openid-connect/token`,
    logout: `${realmUrl}/protocol/openid-connect/logout`,
    userinfo: `${realmUrl}/protocol/openid-connect/userinfo`,
  };
}

export function getKeycloakCallbackUrl() {
  return CONFIG.keycloak.callbackUrl;
}
