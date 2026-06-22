import { CONFIG } from 'src/global-config';

import { KeycloakCallbackView } from 'src/auth/view/keycloak';

// ----------------------------------------------------------------------

export const metadata = { title: `Signing in | Keycloak - ${CONFIG.appName}` };

export default function Page() {
  return <KeycloakCallbackView />;
}
