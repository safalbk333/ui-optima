import type { AppRole } from './roles';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const ADMIN_PREFIXES = [
  paths.dashboard.root,
  paths.purchaseRequests.root,
  paths.purchaseOrders.root,
  paths.contractGenerator.root,
  paths.rfq.roots,
  paths.grn.roots,
  paths.eoi.roots,
];

const APPROVER_PREFIXES = [paths.dashboard.root, paths.approval.roots];

const ENDUSER_PREFIXES = [paths.dashboard.root, paths.purchaseRequests.root];

const ROLE_ROUTE_PREFIXES: Record<AppRole, string[]> = {
  admin: ADMIN_PREFIXES,
  approver: APPROVER_PREFIXES,
  enduser: ENDUSER_PREFIXES,
};

export function isPathAllowedForRole(pathname: string, role: AppRole): boolean {
  const prefixes = ROLE_ROUTE_PREFIXES[role] ?? [];
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
