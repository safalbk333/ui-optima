export type AppRole = 'admin' | 'approver' | 'enduser';

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: 'Admin',
  approver: 'Approver',
  enduser: 'End User',
};
