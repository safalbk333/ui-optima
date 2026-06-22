import type { ButtonProps } from '@mui/material/Button';

import { useCallback } from 'react';

import Button from '@mui/material/Button';

import { CONFIG } from 'src/global-config';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { signOut as jwtSignOut } from 'src/auth/context/jwt/action';
import { signOut as keycloakSignOut } from 'src/auth/context/keycloak/action';

// ----------------------------------------------------------------------

type Props = ButtonProps & {
  onClose?: () => void;
};

export function SignOutButton({ onClose, sx, ...other }: Props) {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      if (CONFIG.auth.method === 'keycloak') {
        await keycloakSignOut();
        return;
      }

      await jwtSignOut();
      await checkUserSession?.();

      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }, [checkUserSession, onClose, router]);

  return (
    <Button
      fullWidth
      variant="soft"
      size="large"
      color="error"
      onClick={handleLogout}
      sx={sx}
      {...other}
    >
      Logout
    </Button>
  );
}
