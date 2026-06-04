'use client';

import { usePathname, useRouter } from 'src/routes/hooks';

import type { AppRole } from '../roles';
import { isPathAllowedForRole } from '../role-route-access';
import { paths } from 'src/routes/paths';
import { useAuthContext } from '../hooks';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const ROLE_HOME: Record<AppRole, string> = {
  admin: paths.dashboard.root,
  approver: paths.dashboard.root,
  enduser: paths.dashboard.root,
};

type RoleRouteGuardProps = {
  children: React.ReactNode;
};

export function RoleRouteGuard({ children }: RoleRouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (loading || !user?.role) return;

    const role = user.role as AppRole;

    if (!isPathAllowedForRole(pathname, role)) {
      router.replace(ROLE_HOME[role] ?? paths.dashboard.root);
    }
    
  }, [loading, pathname, router, user?.role]);

  return <>{children}</>;
}
