import { CONFIG } from 'src/global-config';

import { KeycloakSignInView } from 'src/auth/view/keycloak';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Keycloak - ${CONFIG.appName}` };

export default function Page() {
  return <KeycloakSignInView />;
}
