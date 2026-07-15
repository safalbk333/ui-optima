'use client';

import {
  Box,
  Tab,
  Chip,
  Grid,
  Tabs,
  Paper,
  Stack,
  Alert,
  Avatar,
  Button,
  Divider,
  Tooltip,
  Skeleton,
  Checkbox,
  TextField,
  IconButton,
  Typography,
  CardContent,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Dialog,
  InputAdornment,
} from '@mui/material';
import React, { useEffect, useReducer, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { alpha } from '@mui/material/styles';

import AddIcon from '@mui/icons-material/Add';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';

// import {
  // fetchUserById,
  // clearSelectedUser,
  // type User as ApiUser,
// } from 'src/redux/slices/userManagementSlice';
// import type { AppDispatch, RootState } from 'src/redux/store';

import { fetchUserById, clearSelectedUser, type User as ApiUser } from 'src/store/slices/UserManagement/UserManagementSlice';
import { RootState } from 'src/store/store';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type UserStatus = 'Active' | 'Inactive' | 'Suspended';
type UserRole = 'Admin' | 'Approver' | 'Vendor' | 'Buyer' | 'Finance' | 'Viewer';
type ActivityType =
  | 'Role Assigned'
  | 'Permission Updated'
  | 'Profile Updated'
  | 'Login'
  | 'Password Reset'
  | 'Status Changed';

interface EmployeeDetails {
  employeeCode: string;
  jobRole: string;
  department: string;
  phone: string;
  email: string;
  joinDate: string;
}

interface VendorDetails {
  vendorId: string;
  vendorName: string;
  category: string;
  country: string;
  prazStatus: string;
}

interface PermissionGroup {
  id: number;
  module: string;
  permissions: string[];
}

interface GroupRole {
  id: number;
  label: UserRole;
  description: string;
}

interface ActivityEntry {
  id: number;
  type: ActivityType;
  title: string;
  date: string;
  time: string;
  description: string;
  performedBy: string;
}

interface UserDetail {
  userId: string;
  initials: string;
  fullName: string;
  email: string;
  status: UserStatus;
  employee: EmployeeDetails;
  vendor: VendorDetails | null; // null if user is not a vendor
  groupRoles: GroupRole[];
  directPermissions: string[];
  inheritedPermissions: string[];
  allAvailablePermissions: PermissionGroup[];
  allAvailableRoles: GroupRole[];
  activityLog: ActivityEntry[];
}

// ─────────────────────────────────────────────────────────────────────────────
// REDUCER
// ─────────────────────────────────────────────────────────────────────────────

type UserDetailAction =
  | { type: 'userDetail/fetchPending' }
  | { type: 'userDetail/fetchFulfilled'; payload: UserDetail }
  | { type: 'userDetail/fetchRejected'; payload: string }
  | { type: 'userDetail/addRole'; payload: GroupRole }
  | { type: 'userDetail/removeRole'; payload: number }
  | { type: 'userDetail/updateDirectPermissions'; payload: string[] }
  | { type: 'userDetail/updateStatus'; payload: UserStatus }
  | { type: 'userDetail/updateEmployee'; payload: EmployeeDetails }
  | { type: 'userDetail/updateVendor'; payload: VendorDetails }
  | { type: 'userDetail/updateProfile'; payload: { fullName: string; email: string } };

interface UserDetailState {
  data: UserDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserDetailState = { data: null, loading: false, error: null };

function userDetailReducer(state: UserDetailState, action: UserDetailAction): UserDetailState {
  switch (action.type) {
    case 'userDetail/fetchPending':
      return { ...state, loading: true, error: null };
    case 'userDetail/fetchFulfilled':
      return { ...state, loading: false, data: action.payload };
    case 'userDetail/fetchRejected':
      return { ...state, loading: false, error: action.payload };
    case 'userDetail/addRole':
      if (!state.data) return state;
      return {
        ...state,
        data: {
          ...state.data,
          groupRoles: [...state.data.groupRoles, action.payload],
        },
      };
    case 'userDetail/removeRole':
      if (!state.data) return state;
      return {
        ...state,
        data: {
          ...state.data,
          groupRoles: state.data.groupRoles.filter((r) => r.id !== action.payload),
        },
      };
    case 'userDetail/updateDirectPermissions':
      if (!state.data) return state;
      return {
        ...state,
        data: { ...state.data, directPermissions: action.payload },
      };
    case 'userDetail/updateStatus':
      if (!state.data) return state;
      return {
        ...state,
        data: { ...state.data, status: action.payload },
      };
    case 'userDetail/updateEmployee':
      if (!state.data) return state;
      return {
        ...state,
        data: { ...state.data, employee: action.payload },
      };
    case 'userDetail/updateVendor':
      if (!state.data) return state;
      return {
        ...state,
        data: { ...state.data, vendor: action.payload },
      };
    case 'userDetail/updateProfile':
      if (!state.data) return state;
      return {
        ...state,
        data: {
          ...state.data,
          fullName: action.payload.fullName,
          email: action.payload.email,
        },
      };
    default:
      return state;
  }
}

// ── Reference data (permission groups / roles available to assign) ─────────
// TODO: API - these currently have no dedicated backend endpoint. Once
// GET /permissions and GET /roles (or equivalent) are available, fetch them
// here (e.g. via a thunk on mount) instead of defaulting to empty arrays.
const AVAILABLE_PERMISSION_GROUPS: PermissionGroup[] = [];
const AVAILABLE_ROLES: GroupRole[] = [];

// ── API → UI mapping ─────────────────────────────────────────────────────────
// Maps the Redux `User` shape (as returned by fetchUserById) onto the local
// `UserDetail` shape this component/UI was built around. Fields the API
// doesn't return (vendor, direct/inherited permissions, activity log) are
// defaulted until dedicated endpoints for them are wired up.

const KNOWN_USER_ROLES: UserRole[] = ['Admin', 'Approver', 'Vendor', 'Buyer', 'Finance', 'Viewer'];

function resolveUserRoleLabel(roleCodeOrName: string | undefined | null): UserRole {
  if (!roleCodeOrName) return 'Viewer';
  const match = KNOWN_USER_ROLES.find(
    (r) => r.toLowerCase() === roleCodeOrName.toLowerCase()
  );
  return match ?? 'Viewer';
}

function getInitials(name: string | undefined | null): string {
  if (!name) return 'NA';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return '—';
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return '—';
  return parsed.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function mapUserToDetail(user: ApiUser): UserDetail {
  const roleLabel = resolveUserRoleLabel(user.roles?.role_code ?? user.roles?.role_name);

  return {
    userId: user.pk_user_id,
    initials: getInitials(user.user_name),
    fullName: user.user_name,
    email: user.user_email,
    status: user.is_active ? 'Active' : 'Inactive',
    employee: {
      employeeCode: user.pk_user_id,
      jobRole: user.roles?.role_name || '—',
      department: '—', // not returned by this endpoint
      phone: user.user_phone,
      email: user.user_email,
      joinDate: formatDate(user.created),
    },
    vendor: null, // this endpoint doesn't return vendor details
    groupRoles: user.roles
      ? [
          {
            id: 1,
            label: roleLabel,
            description: user.roles.description || 'Role assigned to this user',
          },
        ]
      : [],
    directPermissions: [], // not returned by this endpoint
    inheritedPermissions: [], // not returned by this endpoint
    allAvailablePermissions: AVAILABLE_PERMISSION_GROUPS,
    allAvailableRoles: AVAILABLE_ROLES,
    activityLog: [], // not returned by this endpoint
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const USER_STATUS_COLOR: Record<UserStatus, 'success' | 'default' | 'warning'> = {
  Active: 'success',
  Inactive: 'default',
  Suspended: 'warning',
};

const ROLE_COLOR: Record<
  UserRole,
  'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'info'
> = {
  Admin: 'secondary',
  Approver: 'primary',
  Vendor: 'info',
  Buyer: 'success',
  Finance: 'warning',
  Viewer: 'default',
};

const ACTIVITY_COLOR: Record<ActivityType, string> = {
  'Role Assigned': '#8b5cf6',
  'Permission Updated': '#3b82f6',
  'Profile Updated': '#10b981',
  Login: '#6366f1',
  'Password Reset': '#f59e0b',
  'Status Changed': '#22c55e',
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

interface SectionCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
}

function SectionCard({ title, icon, children, action }: SectionCardProps) {
  return (
    <Box
      sx={{
        height: '100%',
        border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <CardContent sx={{ pb: '16px !important', height: '100%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {icon && (
              <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
                {icon}
              </Box>
            )}
            <Typography variant="subtitle2" fontWeight={700}>
              {title}
            </Typography>
          </Stack>
          {action}
        </Stack>
        <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />
        {children}
      </CardContent>
    </Box>
  );
}

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

function InfoRow({ label, value, icon }: InfoRowProps) {
  return (
    <Stack direction="row" spacing={1} mb={1.2}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ minWidth: 150, flexShrink: 0, pt: '2px' }}
      >
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        {icon && <Box sx={{ color: 'text.secondary', display: 'flex' }}>{icon}</Box>}
        <Typography variant="body2" fontWeight={500} sx={{ wordBreak: 'break-word' }}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
}

// ── Editable Info Row — renders a TextField when editing is active ──────────
interface EditableInfoRowProps {
  label: string;
  value: string;
  fieldKey: string;
  isEditing: boolean;
  editValues: Record<string, string>;
  onChange: (key: string, value: string) => void;
  icon?: React.ReactNode;
  readOnly?: boolean; // some fields (e.g. employeeCode, joinDate) should stay read-only even in edit mode
}

function EditableInfoRow({
  label,
  value,
  fieldKey,
  isEditing,
  editValues,
  onChange,
  icon,
  readOnly = false,
}: EditableInfoRowProps) {
  if (isEditing && !readOnly) {
    return (
      <Stack direction="row" spacing={1} mb={1.2} alignItems="center">
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ minWidth: 150, flexShrink: 0 }}
        >
          {label}
        </Typography>
        <TextField
          size="small"
          fullWidth
          value={editValues[fieldKey] ?? value}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position="start">
                <Box sx={{ color: 'text.secondary', display: 'flex', fontSize: 13 }}>{icon}</Box>
              </InputAdornment>
            ) : undefined,
            sx: { fontSize: 13 },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1.5,
              bgcolor: (t) => alpha(t.palette.primary.main, 0.02),
            },
          }}
        />
      </Stack>
    );
  }

  return <InfoRow label={label} value={value} icon={icon} />;
}

// ── Loading Skeleton ──────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <Box>
      <Skeleton variant="rounded" height={48} sx={{ mb: 2 }} />
      <Grid container spacing={2} mb={2}>
        {[200, 300, 220].map((h, i) => (
          <Grid key={i} size={{ xs: 12, md: 4 }}>
            <Skeleton variant="rounded" height={h} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>
      <Skeleton variant="rounded" height={120} sx={{ mb: 2, borderRadius: 2 }} />
      <Skeleton variant="rounded" height={120} sx={{ mb: 2, borderRadius: 2 }} />
    </Box>
  );
}

// ── Tab Panel ─────────────────────────────────────────────────────────────────
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, index, value }: TabPanelProps) {
  return (
    <Box role="tabpanel" hidden={value !== index} pt={2}>
      {value === index && children}
    </Box>
  );
}

// ── Manage Roles Dialog ───────────────────────────────────────────────────────
interface ManageRolesDialogProps {
  open: boolean;
  onClose: () => void;
  currentRoles: GroupRole[];
  allRoles: GroupRole[];
  onSave: (roles: GroupRole[]) => void;
}

function ManageRolesDialog({
  open,
  onClose,
  currentRoles,
  allRoles,
  onSave,
}: ManageRolesDialogProps) {
  const [selected, setSelected] = useState<GroupRole[]>(currentRoles);

  // Sync selection when dialog opens with fresh currentRoles
  useEffect(() => {
    if (open) setSelected(currentRoles);
  }, [open, currentRoles]);

  const isSelected = (roleId: number) => selected.some((r) => r.id === roleId);

  const toggleRole = (role: GroupRole) => {
    setSelected((prev) =>
      isSelected(role.id) ? prev.filter((r) => r.id !== role.id) : [...prev, role]
    );
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <GroupOutlinedIcon color="primary" fontSize="small" />
            <Typography variant="subtitle1" fontWeight={700}>
              Manage Group Roles
            </Typography>
          </Stack>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="caption" color="text.secondary" mb={2} display="block">
          Select the roles to assign to this user. Roles determine the base permissions inherited
          by the user.
        </Typography>
        <Stack spacing={1.5}>
          {allRoles.map((role) => (
            <Paper
              key={role.id}
              variant="outlined"
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 1.5,
                cursor: 'pointer',
                borderColor: isSelected(role.id) ? 'primary.main' : 'divider',
                bgcolor: isSelected(role.id)
                  ? (t) => alpha(t.palette.primary.main, 0.05)
                  : 'transparent',
                transition: 'all 0.15s ease',
                '&:hover': { borderColor: 'primary.main' },
              }}
              onClick={() => toggleRole(role)}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} mb={0.3}>
                    <Chip
                      label={role.label}
                      size="small"
                      color={ROLE_COLOR[role.label]}
                      variant="outlined"
                      sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {role.description}
                  </Typography>
                </Box>
                <Checkbox
                  checked={isSelected(role.id)}
                  size="small"
                  color="primary"
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => toggleRole(role)}
                />
              </Stack>
            </Paper>
          ))}
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} size="small" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} size="small" variant="contained">
          Save Roles
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Edit Permissions Dialog ───────────────────────────────────────────────────
interface EditPermissionsDialogProps {
  open: boolean;
  onClose: () => void;
  currentPermissions: string[];
  allPermissionGroups: PermissionGroup[];
  onSave: (permissions: string[]) => void;
}

function EditPermissionsDialog({
  open,
  onClose,
  currentPermissions,
  allPermissionGroups,
  onSave,
}: EditPermissionsDialogProps) {
  const [selected, setSelected] = useState<string[]>(currentPermissions);
  const [search, setSearch] = useState('');
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  // Sync state when dialog opens
  useEffect(() => {
    if (open) {
      setSelected(currentPermissions);
      setSearch('');
      setExpandedModules([]);
    }
  }, [open, currentPermissions]);

  const togglePermission = (perm: string) => {
    setSelected((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const toggleModule = (moduleId: number, permissions: string[]) => {
    const allSelected = permissions.every((p) => selected.includes(p));
    if (allSelected) {
      setSelected((prev) => prev.filter((p) => !permissions.includes(p)));
    } else {
      setSelected((prev) => [...new Set([...prev, ...permissions])]);
    }
  };

  const toggleExpand = (moduleId: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const filteredGroups = allPermissionGroups
    .map((g) => ({
      ...g,
      permissions: g.permissions.filter((p) =>
        p.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((g) => g.permissions.length > 0);

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <KeyOutlinedIcon color="primary" fontSize="small" />
            <Typography variant="subtitle1" fontWeight={700}>
              Edit Direct Permissions
            </Typography>
          </Stack>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="caption" color="text.secondary" mb={2} display="block">
          Direct permissions are granted specifically to this user and apply in addition to any
          permissions inherited from their assigned group roles.
        </Typography>

        <TextField
          size="small"
          fullWidth
          placeholder="Search permissions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />

        <Stack spacing={1}>
          {filteredGroups.map((group) => {
            const expanded = expandedModules.includes(group.id);
            const allSelected = group.permissions.every((p) => selected.includes(p));
            const someSelected =
              !allSelected && group.permissions.some((p) => selected.includes(p));

            return (
              <Box
                key={group.id}
                sx={{
                  border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                  borderRadius: 1.5,
                  overflow: 'hidden',
                }}
              >
                {/* Module header */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    px: 2,
                    py: 1.2,
                    cursor: 'pointer',
                    bgcolor: (t) => alpha(t.palette.text.primary, 0.02),
                    '&:hover': { bgcolor: (t) => alpha(t.palette.text.primary, 0.04) },
                  }}
                  onClick={() => toggleExpand(group.id)}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox
                      size="small"
                      checked={allSelected}
                      indeterminate={someSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleModule(group.id, group.permissions);
                      }}
                      onChange={() => {}}
                    />
                    <Typography variant="caption" fontWeight={700} color="text.primary">
                      {group.module}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({group.permissions.filter((p) => selected.includes(p)).length}/
                      {group.permissions.length})
                    </Typography>
                  </Stack>
                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); toggleExpand(group.id); }}>
                    {expanded ? (
                      <ExpandLessIcon fontSize="small" />
                    ) : (
                      <ExpandMoreIcon fontSize="small" />
                    )}
                  </IconButton>
                </Stack>

                {/* Permission list */}
                {expanded && (
                  <Box sx={{ px: 2, pb: 1.5, pt: 1 }}>
                    <Grid container spacing={0.5}>
                      {group.permissions.map((perm) => (
                        <Grid key={perm} size={{ xs: 12, sm: 6 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                checked={selected.includes(perm)}
                                onChange={() => togglePermission(perm)}
                              />
                            }
                            label={
                              <Typography variant="caption" fontWeight={500}>
                                {perm}
                              </Typography>
                            }
                            sx={{ m: 0 }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Box>
            );
          })}
        </Stack>

        <Typography variant="caption" color="text.secondary" mt={2} display="block">
          {selected.length} permission{selected.length !== 1 ? 's' : ''} selected
        </Typography>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} size="small" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} size="small" variant="contained">
          Save Permissions
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Collapsible Permissions Section ───────────────────────────────────────────
interface PermissionsSectionProps {
  title: string;
  permissions: string[];
  icon: React.ReactNode;
  onEdit?: () => void;
  maxVisible?: number;
}

function PermissionsSection({
  title,
  permissions,
  icon,
  onEdit,
  maxVisible = 8,
}: PermissionsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? permissions : permissions.slice(0, maxVisible);
  const hidden = permissions.length - maxVisible;

  return (
    <Box
      sx={{
        border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>{icon}</Box>
            <Typography variant="subtitle2" fontWeight={700}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({permissions.length})
            </Typography>
          </Stack>
          {onEdit && (
            <Button
              size="small"
              variant="outlined"
              startIcon={<EditOutlinedIcon sx={{ fontSize: 14 }} />}
              sx={{ fontSize: 12 }}
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
        </Stack>
        <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
          {visible.map((perm) => (
            <Chip
              key={perm}
              label={perm}
              size="small"
              variant="outlined"
              sx={{
                fontSize: 11,
                height: 24,
                fontWeight: 500,
                borderColor: (t) => alpha(t.palette.text.primary, 0.15),
                color: 'text.primary',
              }}
            />
          ))}

          {!expanded && hidden > 0 && (
            <Chip
              label={`+${hidden}`}
              size="small"
              color="primary"
              variant="outlined"
              onClick={() => setExpanded(true)}
              sx={{ fontSize: 11, height: 24, fontWeight: 700, cursor: 'pointer' }}
            />
          )}
        </Box>

        {expanded && hidden > 0 && (
          <Button
            size="small"
            sx={{ mt: 1.5, fontSize: 12 }}
            onClick={() => setExpanded(false)}
          >
            Show less
          </Button>
        )}
      </CardContent>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INLINE EDIT — Employee Profile Section (Tab 0)
// ─────────────────────────────────────────────────────────────────────────────

interface EditableEmployeeProfileProps {
  data: UserDetail;
  onSave: (updated: EmployeeDetails) => void;
  showSuccess: (msg: string) => void;
}

function EditableEmployeeProfile({ data, onSave, showSuccess }: EditableEmployeeProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  // Local draft — mirrors the employee fields that can be changed
  const [draft, setDraft] = useState<EmployeeDetails>(data.employee);

  // Keep draft in sync if parent data changes (e.g. after a reload)
  useEffect(() => {
    if (!isEditing) setDraft(data.employee);
  }, [data.employee, isEditing]);

  const handleChange = (key: string, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(draft);
    setIsEditing(false);
    showSuccess('Employee profile updated successfully.');
  };

  const handleCancel = () => {
    setDraft(data.employee); // revert to committed state
    setIsEditing(false);
  };

  const editAction = isEditing ? (
    <Stack direction="row" spacing={1}>
      <Button size="small" variant="outlined" onClick={handleCancel} sx={{ fontSize: 12 }}>
        Cancel
      </Button>
      <Button
        size="small"
        variant="contained"
        startIcon={<SaveOutlinedIcon sx={{ fontSize: 14 }} />}
        sx={{ fontSize: 12 }}
        onClick={handleSave}
      >
        Save
      </Button>
    </Stack>
  ) : (
    <Button
      size="small"
      variant="outlined"
      startIcon={<EditOutlinedIcon sx={{ fontSize: 14 }} />}
      sx={{ fontSize: 12 }}
      onClick={() => setIsEditing(true)}
    >
      Edit
    </Button>
  );

  // Helper so we don't pass the full editValues map — just the draft object cast
  const editValues = draft as unknown as Record<string, string>;

  return (
    <SectionCard
      title="Employee Profile"
      icon={<PersonOutlineOutlinedIcon fontSize="small" />}
      action={editAction}
    >
      {/* Employee Code is read-only (system-generated) */}
      <EditableInfoRow
        label="Employee Code"
        fieldKey="employeeCode"
        value={data.employee.employeeCode}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
        readOnly
      />
      {/* Full name lives on the top-level user object; editing here syncs via onSave */}
      <EditableInfoRow
        label="Full Name"
        fieldKey="fullName"
        value={data.fullName}
        isEditing={isEditing}
        editValues={{ fullName: draft.email !== data.employee.email ? draft.email : data.fullName, ...editValues }}
        onChange={handleChange}
      />
      <EditableInfoRow
        label="Job Role"
        fieldKey="jobRole"
        value={data.employee.jobRole}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
      />
      <EditableInfoRow
        label="Department"
        fieldKey="department"
        value={data.employee.department}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
      />
      <EditableInfoRow
        label="Email"
        fieldKey="email"
        value={data.employee.email}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
        icon={<EmailOutlinedIcon sx={{ fontSize: 13 }} />}
      />
      <EditableInfoRow
        label="Phone"
        fieldKey="phone"
        value={data.employee.phone}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
        icon={<PhoneOutlinedIcon sx={{ fontSize: 13 }} />}
      />
      {/* Member Since is read-only */}
      <EditableInfoRow
        label="Member Since"
        fieldKey="joinDate"
        value={data.employee.joinDate}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
        readOnly
      />
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INLINE EDIT — Vendor Information Section (Tab 0)
// ─────────────────────────────────────────────────────────────────────────────

interface EditableVendorInfoProps {
  vendor: VendorDetails;
  onSave: (updated: VendorDetails) => void;
  showSuccess: (msg: string) => void;
}

function EditableVendorInfo({ vendor, onSave, showSuccess }: EditableVendorInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<VendorDetails>(vendor);

  useEffect(() => {
    if (!isEditing) setDraft(vendor);
  }, [vendor, isEditing]);

  const handleChange = (key: string, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(draft);
    setIsEditing(false);
    showSuccess('Vendor information updated successfully.');
  };

  const handleCancel = () => {
    setDraft(vendor);
    setIsEditing(false);
  };

  const editValues = draft as unknown as Record<string, string>;

  const editAction = isEditing ? (
    <Stack direction="row" spacing={1}>
      <Button size="small" variant="outlined" onClick={handleCancel} sx={{ fontSize: 12 }}>
        Cancel
      </Button>
      <Button
        size="small"
        variant="contained"
        startIcon={<SaveOutlinedIcon sx={{ fontSize: 14 }} />}
        sx={{ fontSize: 12 }}
        onClick={handleSave}
      >
        Save
      </Button>
    </Stack>
  ) : (
    <Button size="small" sx={{ fontSize: 12 }} onClick={() => setIsEditing(true)}>
      Edit Vendor
    </Button>
  );

  return (
    <SectionCard
      title="Vendor Information"
      icon={<StorefrontOutlinedIcon fontSize="small" />}
      action={editAction}
    >
      {/* Vendor ID is system-assigned, read-only */}
      <EditableInfoRow
        label="Vendor ID"
        fieldKey="vendorId"
        value={vendor.vendorId}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
        readOnly
      />
      <EditableInfoRow
        label="Vendor Name"
        fieldKey="vendorName"
        value={vendor.vendorName}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
      />
      <EditableInfoRow
        label="Category"
        fieldKey="category"
        value={vendor.category}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
      />
      <EditableInfoRow
        label="Country"
        fieldKey="country"
        value={vendor.country}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
      />
      {/* PRAZ status is verified externally — read-only */}
      <InfoRow
        label="PRAZ Status"
        value={
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CheckCircleIcon sx={{ fontSize: 13, color: 'success.main' }} />
            <Typography variant="body2" fontWeight={600} color="success.main">
              {vendor.prazStatus}
            </Typography>
          </Stack>
        }
      />
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INLINE EDIT — Top panel: Avatar card (name + email editable)
// ─────────────────────────────────────────────────────────────────────────────

interface EditableAvatarPanelProps {
  data: UserDetail;
  onSave: (updated: { fullName: string; email: string }) => void;
  showSuccess: (msg: string) => void;
}

function EditableAvatarPanel({ data, onSave, showSuccess }: EditableAvatarPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(data.fullName);
  const [draftEmail, setDraftEmail] = useState(data.email);

  useEffect(() => {
    if (!isEditing) {
      setDraftName(data.fullName);
      setDraftEmail(data.email);
    }
  }, [data.fullName, data.email, isEditing]);

  const handleSave = () => {
    onSave({ fullName: draftName, email: draftEmail });
    setIsEditing(false);
    showSuccess('Profile updated successfully.');
  };

  const handleCancel = () => {
    setDraftName(data.fullName);
    setDraftEmail(data.email);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
        borderRadius: 2,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
      }}
    >
      <Avatar
        sx={{
          width: 88,
          height: 88,
          bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
          color: 'primary.main',
          fontWeight: 800,
          fontSize: 26,
          border: (t) => `2px solid ${alpha(t.palette.primary.main, 0.2)}`,
          mb: 2,
        }}
      >
        {data.initials}
      </Avatar>

      {isEditing ? (
        /* ── Edit mode: show TextFields for name + email ── */
        <Stack spacing={1.2} width="100%" mb={1.5}>
          <TextField
            size="small"
            label="Full Name"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            fullWidth
            inputProps={{ style: { textAlign: 'center', fontWeight: 700 } }}
          />
          <TextField
            size="small"
            label="Email"
            value={draftEmail}
            onChange={(e) => setDraftEmail(e.target.value)}
            fullWidth
            inputProps={{ style: { textAlign: 'center' } }}
          />
        </Stack>
      ) : (
        /* ── View mode ── */
        <>
          <Typography variant="subtitle1" fontWeight={800} mb={0.3}>
            {data.fullName}
          </Typography>
          <Typography variant="caption" color="text.secondary" mb={1.5} display="block">
            {data.email}
          </Typography>
        </>
      )}

      <Chip
        label={data.status}
        size="small"
        color={USER_STATUS_COLOR[data.status]}
        variant="outlined"
        sx={{ fontSize: 11, height: 24, fontWeight: 700 }}
      />

      <Divider sx={{ width: '100%', my: 2, borderStyle: 'dashed' }} />

      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
        {data.userId}
      </Typography>

      {/* ── Action buttons ── */}
      {isEditing ? (
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button size="small" variant="outlined" onClick={handleCancel} sx={{ fontSize: 11 }}>
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<SaveOutlinedIcon sx={{ fontSize: 13 }} />}
            onClick={handleSave}
            sx={{ fontSize: 11 }}
          >
            Save
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={0.8} justifyContent="center">
          <Tooltip title="Edit Profile">
            <IconButton size="small" onClick={() => setIsEditing(true)}>
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INLINE EDIT — Top panel: Employee Details (right side of top row)
// ─────────────────────────────────────────────────────────────────────────────

interface EditableEmployeePanelProps {
  data: UserDetail;
  onSave: (updated: EmployeeDetails) => void;
  showSuccess: (msg: string) => void;
}

function EditableEmployeePanel({ data, onSave, showSuccess }: EditableEmployeePanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EmployeeDetails>(data.employee);

  useEffect(() => {
    if (!isEditing) setDraft(data.employee);
  }, [data.employee, isEditing]);

  const handleChange = (key: string, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(draft);
    setIsEditing(false);
    showSuccess('Employee details updated successfully.');
  };

  const handleCancel = () => {
    setDraft(data.employee);
    setIsEditing(false);
  };

  const editValues = draft as unknown as Record<string, string>;

  return (
    <Box
      sx={{
        border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
        borderRadius: 2,
        p: 2.5,
        height: '100%',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <BadgeOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle2" fontWeight={700}>
            Employee Details
          </Typography>
        </Stack>
        {/* Toggle edit / save-cancel */}
        {isEditing ? (
          <Stack direction="row" spacing={0.8}>
            <Button size="small" variant="outlined" onClick={handleCancel} sx={{ fontSize: 11 }}>
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              startIcon={<SaveOutlinedIcon sx={{ fontSize: 12 }} />}
              onClick={handleSave}
              sx={{ fontSize: 11 }}
            >
              Save
            </Button>
          </Stack>
        ) : (
          <Tooltip title="Edit Employee Details">
            <IconButton size="small" onClick={() => setIsEditing(true)}>
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

      {/* Employee Code — read-only */}
      <EditableInfoRow
        label="Employee Code:"
        fieldKey="employeeCode"
        value={data.employee.employeeCode}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
        readOnly
      />
      <EditableInfoRow
        label="Job Role:"
        fieldKey="jobRole"
        value={data.employee.jobRole}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
      />
      <EditableInfoRow
        label="Department:"
        fieldKey="department"
        value={data.employee.department}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
      />
      <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />
      <EditableInfoRow
        label="Phone:"
        fieldKey="phone"
        value={data.employee.phone}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
        icon={<PhoneOutlinedIcon sx={{ fontSize: 13 }} />}
      />
      <EditableInfoRow
        label="Email:"
        fieldKey="email"
        value={data.employee.email}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
        icon={<EmailOutlinedIcon sx={{ fontSize: 13 }} />}
      />
      {/* Join date — read-only */}
      <EditableInfoRow
        label="Member Since:"
        fieldKey="joinDate"
        value={data.employee.joinDate}
        isEditing={isEditing}
        editValues={editValues}
        onChange={handleChange}
        readOnly
      />
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function UserDetailPage() {
  const [state, localDispatch] = useReducer(userDetailReducer, initialState);
  const { data, loading, error } = state;
  const [activeTab, setActiveTab] = useState(0);
  const [rolesDialogOpen, setRolesDialogOpen] = useState(false);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // ── Redux wiring for fetchUserById ──────────────────────────────────────────
  const dispatch = useAppDispatch();
  const { selectedUser, selectedUserLoading, selectedUserError } = useAppSelector(
    (rootState: RootState) => rootState.userManagement
  );

  // userId always comes from the URL's search params (e.g. ?userId=...) —
  // no hardcoded fallback, this page is only ever reached with an id in the URL.
  const searchParams = useSearchParams();
  const resolvedUserId = searchParams.get('userId');

  // ── Data fetch ─────────────────────────────────────────────────────────────
  const loadDetail = useCallback(() => {
    if (!resolvedUserId) {
      localDispatch({ type: 'userDetail/fetchRejected', payload: 'No user id was provided in the URL.' });
      return;
    }
    localDispatch({ type: 'userDetail/fetchPending' });
    dispatch(fetchUserById(resolvedUserId));
  }, [dispatch, resolvedUserId]);

  useEffect(() => {
    loadDetail();

    // Clear the selected user from the slice when leaving this page/changing user
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [loadDetail, dispatch]);

  // ── FIX: sync the Redux fetch lifecycle (loading/error/data) into the local
  // reducer, so every bit of edit/dialog logic further down keeps working
  // unchanged against `data` / `loading` / `error`.
  //
  // Why the skeleton could get stuck forever even though the API call
  // completes (visible in the network tab):
  //   `loadDetail()` sets local `loading = true` the moment the thunk is
  //   dispatched. That flag is only ever cleared by *this* effect below,
  //   which reacts to `selectedUser` / `selectedUserLoading` /
  //   `selectedUserError` coming from `rootState.userManagement`. If that
  //   selector path doesn't match how the slice is actually registered in
  //   the store (e.g. after the recent import path change to
  //   `src/store/slices/UserManagement/UserManagementSlice`), these three
  //   values are permanently `undefined` — none of the branches below ever
  //   fire, `fetchFulfilled`/`fetchRejected` never dispatch, and the page is
  //   stuck showing <DetailSkeleton /> forever, even though the thunk's
  //   actual network request completed successfully.
  //
  // Two things below harden this:
  //   1. Check `selectedUser` FIRST (a successful fetch should never stay
  //      masked behind a stale loading flag).
  //   2. A one-time dev-only warning if the fetch was started but the
  //      selector never produced any of the three expected values — this is
  //      the exact fingerprint of a store-key mismatch, so surface it loudly
  //      instead of silently hanging.
  const hasWarnedRef = useRef(false);

  useEffect(() => {
    if (selectedUser) {
      localDispatch({ type: 'userDetail/fetchFulfilled', payload: mapUserToDetail(selectedUser) });
      return;
    }

    if (selectedUserError) {
      localDispatch({ type: 'userDetail/fetchRejected', payload: selectedUserError });
      return;
    }

    if (selectedUserLoading) {
      localDispatch({ type: 'userDetail/fetchPending' });
      return;
    }

    // Diagnostic: if we've already kicked off a fetch (local loading is true)
    // but selectedUser / selectedUserLoading / selectedUserError are ALL
    // falsy/undefined, the selector almost certainly isn't reading from the
    // slice's real location in the store. Surface this once, in dev only.
    if (
      process.env.NODE_ENV !== 'production' &&
      loading &&
      resolvedUserId &&
      selectedUser === undefined &&
      selectedUserLoading === undefined &&
      selectedUserError === undefined &&
      !hasWarnedRef.current
    ) {
      hasWarnedRef.current = true;
      // eslint-disable-next-line no-console
      console.warn(
        '[UserDetailPage] fetchUserById was dispatched, but rootState.userManagement.selectedUser/' +
          'selectedUserLoading/selectedUserError are all undefined. This usually means the ' +
          '"userManagement" key in useAppSelector((rootState) => rootState.userManagement) does not ' +
          'match the key this slice is registered under in configureStore({ reducer: { ... } }). ' +
          'Fix the store key so the UI stops waiting on data that will never arrive.'
      );
    }
  }, [selectedUser, selectedUserLoading, selectedUserError, loading, resolvedUserId]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleSaveRoles = (newRoles: GroupRole[]) => {
    // Remove all current roles and re-add selected ones via individual actions
    if (!data) return;

    // Remove roles no longer in newRoles
    data.groupRoles.forEach((role) => {
      if (!newRoles.find((r) => r.id === role.id)) {
        localDispatch({ type: 'userDetail/removeRole', payload: role.id });
      }
    });

    // Add newly selected roles
    newRoles.forEach((role) => {
      if (!data.groupRoles.find((r) => r.id === role.id)) {
        localDispatch({ type: 'userDetail/addRole', payload: role });
      }
    });

    showSuccess('Group roles updated successfully.');
  };

  const handleSavePermissions = (newPermissions: string[]) => {
    localDispatch({ type: 'userDetail/updateDirectPermissions', payload: newPermissions });
    showSuccess('Direct permissions updated successfully.');
  };

  // ── Inline-edit commit handlers ────────────────────────────────────────────

  const handleSaveEmployee = (updated: EmployeeDetails) => {
    localDispatch({ type: 'userDetail/updateEmployee', payload: updated });
  };

  const handleSaveVendor = (updated: VendorDetails) => {
    localDispatch({ type: 'userDetail/updateVendor', payload: updated });
  };

  const handleSaveProfile = (updated: { fullName: string; email: string }) => {
    localDispatch({ type: 'userDetail/updateProfile', payload: updated });
  };

  const showSuccess = (message: string) => {
    setSaveSuccess(message);
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  // ── Tabs ───────────────────────────────────────────────────────────────────
  const TABS = [
    { label: 'Overview', icon: <InfoOutlinedIcon sx={{ fontSize: 15 }} /> },
    { label: 'Roles & Permissions', icon: <SecurityOutlinedIcon sx={{ fontSize: 15 }} /> },
    { label: 'Activity Log', icon: <HistoryOutlinedIcon sx={{ fontSize: 15 }} /> },
  ];

  // ── Loading / Error states ─────────────────────────────────────────────────
  if (loading) return <DetailSkeleton />;

  if (error) {
    return (
      <Box textAlign="center" py={6}>
        <Typography color="error" mb={2}>
          Failed to load user: {error}
        </Typography>
        <Button variant="outlined" onClick={loadDetail}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box textAlign="center" py={8}>
        <PersonOutlineOutlinedIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="text.secondary">User not found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* ── Breadcrumbs ─────────────────────────────────────────────────────── */}
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="User Details"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'User Management', href: '/user-management' },
            { label: 'User', href: '/user-management/user' },
            { label: 'User Details', href: '#' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* ── Success Alert ────────────────────────────────────────────────────── */}
      {saveSuccess && (
        <Alert
          severity="success"
          sx={{ mb: 2, borderRadius: 1.5 }}
          onClose={() => setSaveSuccess(null)}
        >
          {saveSuccess}
        </Alert>
      )}

      {/* ── Top three-panel row (mirrors screenshot layout) ──────────────────── */}
      <Grid container spacing={2} mb={2}>

        {/* Panel 1: Avatar + Name + Email + Status — now inline-editable */}
        <Grid size={{ xs: 12, md: 4 }}>
          <EditableAvatarPanel
            data={data}
            onSave={(updated) => {
              handleSaveProfile(updated);
              showSuccess('Profile updated successfully.');
            }}
            showSuccess={showSuccess}
          />
        </Grid>

        {/* Panel 2: Employee Details — now inline-editable */}
        <Grid size={{ xs: 12, md: 4 }}>
          <EditableEmployeePanel
            data={data}
            onSave={(updated) => {
              handleSaveEmployee(updated);
              showSuccess('Employee details updated successfully.');
            }}
            showSuccess={showSuccess}
          />
        </Grid>

        {/* Panel 3: Group Roles + optional Vendor badge */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2} height="100%">
            {/* Group Roles */}
            <Box
              sx={{
                border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                borderRadius: 2,
                p: 2.5,
                flex: data.vendor ? '0 0 auto' : 1,
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <ShieldOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
                  <Typography variant="subtitle2" fontWeight={700}>
                    Group Roles
                  </Typography>
                </Stack>
                <Tooltip title="Manage Roles">
                  <IconButton size="small" onClick={() => setRolesDialogOpen(true)}>
                    <EditOutlinedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {data.groupRoles.map((role) => (
                  <Chip
                    key={role.id}
                    label={role.label}
                    size="small"
                    color={ROLE_COLOR[role.label]}
                    variant="outlined"
                    onDelete={() => localDispatch({ type: 'userDetail/removeRole', payload: role.id })}
                    deleteIcon={<CloseIcon sx={{ fontSize: '12px !important' }} />}
                    sx={{ fontSize: 12, height: 26, fontWeight: 600 }}
                  />
                ))}
                {data.groupRoles.length === 0 && (
                  <Typography variant="caption" color="text.disabled" fontStyle="italic">
                    No roles assigned
                  </Typography>
                )}
              </Box>
              <Button
                size="small"
                variant="text"
                startIcon={<AddIcon sx={{ fontSize: 14 }} />}
                sx={{ mt: 1.5, fontSize: 12 }}
                onClick={() => setRolesDialogOpen(true)}
              >
                Add Role
              </Button>
            </Box>

            {/* Vendor Details (if user is a vendor) */}
            {data.vendor && (
              <Box
                sx={{
                  border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.2)}`,
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.03),
                  borderRadius: 2,
                  p: 2,
                  flex: 1,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
                  <StorefrontOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
                  <Typography variant="caption" fontWeight={700} color="primary.main">
                    Linked Vendor
                  </Typography>
                </Stack>
                <Typography variant="body2" fontWeight={700} mb={0.3}>
                  {data.vendor.vendorName}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={0.8}>
                  {data.vendor.vendorId} &bull; {data.vendor.category}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <CheckCircleIcon sx={{ fontSize: 12, color: 'success.main' }} />
                  <Typography variant="caption" fontWeight={600} color="success.main">
                    PRAZ {data.vendor.prazStatus}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>

      {/* ── Permissions sections (always visible, matching screenshot layout) ─ */}
      <PermissionsSection
        title="Direct Permissions"
        permissions={data.directPermissions}
        icon={<KeyOutlinedIcon fontSize="small" />}
        onEdit={() => setPermissionsDialogOpen(true)}
      />

      <PermissionsSection
        title="Inherited Permissions"
        permissions={data.inheritedPermissions}
        icon={<LockOutlinedIcon fontSize="small" />}
      />

      {/* ── Tabs ─────────────────────────────────────────────────────────────── */}
      <Box sx={{ borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.1)}`, mb: 0 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 38,
            '& .MuiTab-root': { minHeight: 38, fontSize: 12, fontWeight: 600, py: 0 },
            '& .MuiTab-root.Mui-selected': { color: 'primary.main' },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.label}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{ gap: 0.5 }}
            />
          ))}
        </Tabs>
      </Box>

      {/* ── Tab 0: Overview ──────────────────────────────────────────────────── */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={2}>

          {/* Employee Profile — inline-editable via EditableEmployeeProfile */}
          <Grid size={{ xs: 12, md: 6 }}>
            <EditableEmployeeProfile
              data={data}
              onSave={(updated) => {
                handleSaveEmployee(updated);
              }}
              showSuccess={showSuccess}
            />
          </Grid>

          {/* Vendor Information — inline-editable via EditableVendorInfo */}
          {data.vendor && (
            <Grid size={{ xs: 12, md: 6 }}>
              <EditableVendorInfo
                vendor={data.vendor}
                onSave={(updated) => {
                  handleSaveVendor(updated);
                }}
                showSuccess={showSuccess}
              />
            </Grid>
          )}

          {/* Account Summary — read-only derived view */}
          <Grid size={{ xs: 12, md: data.vendor ? 12 : 6 }}>
            <SectionCard
              title="Account Summary"
              icon={<WorkOutlineIcon fontSize="small" />}
            >
              <Grid container spacing={1.5}>
                {[
                  { label: 'User ID', value: data.userId },
                  { label: 'Status', value: data.status },
                  { label: 'Group Roles', value: data.groupRoles.map((r) => r.label).join(', ') || '—' },
                  { label: 'Direct Permissions', value: data.directPermissions.length },
                  { label: 'Inherited Permissions', value: data.inheritedPermissions.length },
                  { label: 'Member Since', value: data.employee.joinDate },
                ].map((item) => (
                  <Grid key={item.label} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                      sx={{
                        border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                        borderRadius: 1.5,
                        p: 1.5,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.4}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" fontWeight={700}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </SectionCard>
          </Grid>
        </Grid>
      </TabPanel>

      {/* ── Tab 1: Roles & Permissions ──────────────────────────────────────── */}
      <TabPanel value={activeTab} index={1}>
        <SectionCard
          title="Group Roles"
          icon={<GroupOutlinedIcon fontSize="small" />}
          action={
            <Button
              size="small"
              variant="contained"
              startIcon={<EditOutlinedIcon sx={{ fontSize: 14 }} />}
              sx={{ fontSize: 12 }}
              onClick={() => setRolesDialogOpen(true)}
            >
              Manage Roles
            </Button>
          }
        >
          <Stack spacing={1.5}>
            {data.groupRoles.map((role) => (
              <Paper
                key={role.id}
                variant="outlined"
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderColor: (t) => alpha(t.palette.text.primary, 0.1),
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <ShieldOutlinedIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Box>
                    <Chip
                      label={role.label}
                      size="small"
                      color={ROLE_COLOR[role.label]}
                      variant="outlined"
                      sx={{ fontSize: 11, height: 22, fontWeight: 700, mb: 0.3 }}
                    />
                    <Typography variant="caption" color="text.secondary" display="block">
                      {role.description}
                    </Typography>
                  </Box>
                </Stack>
                <Tooltip title="Remove Role">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      localDispatch({ type: 'userDetail/removeRole', payload: role.id })
                    }
                  >
                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Paper>
            ))}
            {data.groupRoles.length === 0 && (
              <Box textAlign="center" py={3}>
                <GroupOutlinedIcon sx={{ fontSize: 36, color: 'text.disabled', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  No roles assigned. Click &quot;Manage Roles&quot; to add roles.
                </Typography>
              </Box>
            )}
          </Stack>
        </SectionCard>

        {/* Direct Permissions full list */}
        <SectionCard
          title="Direct Permissions"
          icon={<KeyOutlinedIcon fontSize="small" />}
          action={
            <Button
              size="small"
              variant="contained"
              startIcon={<EditOutlinedIcon sx={{ fontSize: 14 }} />}
              sx={{ fontSize: 12 }}
              onClick={() => setPermissionsDialogOpen(true)}
            >
              Edit Permissions
            </Button>
          }
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
            {data.directPermissions.map((perm) => (
              <Chip
                key={perm}
                label={perm}
                size="small"
                variant="outlined"
                onDelete={() => {
                  localDispatch({
                    type: 'userDetail/updateDirectPermissions',
                    payload: data.directPermissions.filter((p) => p !== perm),
                  });
                }}
                deleteIcon={<CloseIcon sx={{ fontSize: '11px !important' }} />}
                sx={{
                  fontSize: 11,
                  height: 24,
                  fontWeight: 500,
                  borderColor: (t) => alpha(t.palette.text.primary, 0.15),
                }}
              />
            ))}
            {data.directPermissions.length === 0 && (
              <Typography variant="caption" color="text.disabled" fontStyle="italic">
                No direct permissions assigned.
              </Typography>
            )}
          </Box>
        </SectionCard>

        {/* Inherited Permissions (read-only) */}
        <SectionCard
          title="Inherited Permissions"
          icon={<LockOutlinedIcon fontSize="small" />}
          action={
            <Tooltip title="Inherited from assigned group roles — read only">
              <Chip
                label="Read Only"
                size="small"
                variant="outlined"
                icon={<InfoOutlinedIcon sx={{ fontSize: 12 }} />}
                sx={{ fontSize: 10, height: 20 }}
              />
            </Tooltip>
          }
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
            {data.inheritedPermissions.map((perm) => (
              <Chip
                key={perm}
                label={perm}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: 11,
                  height: 24,
                  fontWeight: 500,
                  borderColor: (t) => alpha(t.palette.text.primary, 0.12),
                  color: 'text.secondary',
                }}
              />
            ))}
          </Box>
        </SectionCard>
      </TabPanel>

      {/* ── Tab 2: Activity Log ──────────────────────────────────────────────── */}
      <TabPanel value={activeTab} index={2}>
        <SectionCard title="Activity Log" icon={<HistoryOutlinedIcon fontSize="small" />}>
          <Stack spacing={0}>
            {data.activityLog.map((entry, idx) => (
              <Stack key={entry.id} direction="row" spacing={2}>
                {/* Timeline dot + connector */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    width: 24,
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      mt: '4px',
                      bgcolor: ACTIVITY_COLOR[entry.type],
                      flexShrink: 0,
                    }}
                  />
                  {idx < data.activityLog.length - 1 && (
                    <Box
                      sx={{
                        width: '1px',
                        flex: 1,
                        bgcolor: (t) => alpha(t.palette.text.primary, 0.1),
                        minHeight: 32,
                        mt: '2px',
                      }}
                    />
                  )}
                </Box>

                {/* Entry content */}
                <Box pb={idx < data.activityLog.length - 1 ? 2 : 0} flex={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <Typography variant="body2" fontWeight={700}>
                      {entry.title}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {entry.date} &bull; {entry.time}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" mt={0.3} display="block">
                    {entry.description}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" mt={0.2} display="block">
                    By: {entry.performedBy}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      </TabPanel>

      {/* ── Dialogs ──────────────────────────────────────────────────────────── */}

      {/* Manage Roles Dialog */}
      <ManageRolesDialog
        open={rolesDialogOpen}
        onClose={() => setRolesDialogOpen(false)}
        currentRoles={data.groupRoles}
        allRoles={data.allAvailableRoles}
        onSave={handleSaveRoles}
      />

      {/* Edit Permissions Dialog */}
      <EditPermissionsDialog
        open={permissionsDialogOpen}
        onClose={() => setPermissionsDialogOpen(false)}
        currentPermissions={data.directPermissions}
        allPermissionGroups={data.allAvailablePermissions}
        onSave={handleSavePermissions}
      />
    </Box>
  );
}

export default UserDetailPage;