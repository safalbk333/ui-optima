'use client';

import React, { useState, useCallback } from 'react';
import {
  Box,
  Step,
  Grid,
  Chip,
  Alert,
  Stack,
  Paper,
  Button,
  Divider,
  Stepper,
  StepLabel,
  Snackbar,
  Checkbox,
  TextField,
  Autocomplete,
  Typography,
  IconButton,
  CardContent,
  FormControlLabel,
  InputAdornment,
  Switch,
  Tooltip,
  Avatar,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { useRouter } from 'next/navigation';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { paths } from 'src/routes/paths';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type UserStatus = 'Active' | 'Inactive' | 'Pending';
type UserRole =
  | 'Admin'
  | 'Approver'
  | 'Vendor'
  | 'Buyer'
  | 'Finance'
  | 'Viewer'
  | 'GRN Officer'
  | 'Invoice Processor'
  | 'Contract Manager'
  | 'RFQ Manager';

interface GroupRole {
  id: number;
  label: UserRole;
  description: string;
}

interface PermissionGroup {
  id: number;
  module: string;
  permissions: string[];
}

interface BasicInfoForm {
  fullName: string;
  email: string;
  phone: string;
  employeeCode: string;
  jobRole: string;
  department: string;
  status: UserStatus;
  adUser: boolean;
  isVendor: boolean;
  vendorId: string;
  vendorName: string;
  prazStatus: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS / MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const ALL_AVAILABLE_ROLES: GroupRole[] = [
  { id: 1, label: 'Admin', description: 'Full system access and configuration rights' },
  { id: 2, label: 'Approver', description: 'Can approve purchase orders and requisitions' },
  { id: 3, label: 'Vendor', description: 'Vendor portal access and submission rights' },
  { id: 4, label: 'Buyer', description: 'Can create and manage purchase requisitions' },
  { id: 5, label: 'Finance', description: 'Invoice processing and financial reporting access' },
  { id: 6, label: 'Viewer', description: 'Read-only access across all modules' },
  { id: 7, label: 'GRN Officer', description: 'Goods receipt and warehouse operations' },
  { id: 8, label: 'Invoice Processor', description: 'Process and verify supplier invoices' },
  { id: 9, label: 'Contract Manager', description: 'Manage contracts and legal documents' },
  { id: 10, label: 'RFQ Manager', description: 'Create and manage request for quotations' },
];

const ALL_AVAILABLE_PERMISSIONS: PermissionGroup[] = [
  {
    id: 1,
    module: 'Purchase Orders',
    permissions: ['PO Read', 'PO Create', 'PO Approve', 'PO Cancel', 'PO Export'],
  },
  {
    id: 2,
    module: 'Vendor Management',
    permissions: [
      'Vendor Read',
      'Vendor Create',
      'Vendor Update',
      'Vendor Delete',
      'Recruitment Vendor Read',
    ],
  },
  {
    id: 3,
    module: 'Contracts',
    permissions: [
      'Contract Read',
      'Contract Create',
      'Contract Update',
      'Contract Approve',
      'Contract Terminate',
    ],
  },
  {
    id: 4,
    module: 'RFQ',
    permissions: ['RFQ Read', 'RFQ Create', 'RFQ Update', 'RFQ Approve', 'RFQ Close'],
  },
  {
    id: 5,
    module: 'Invoices',
    permissions: ['Invoice Read', 'Invoice Submit', 'Invoice Approve', 'Invoice Reject'],
  },
  {
    id: 6,
    module: 'User Management',
    permissions: ['User Role Read', 'User Role Update', 'User User Create', 'System Jobrole Read'],
  },
  {
    id: 7,
    module: 'Goods Receipt',
    permissions: ['GRN Read', 'GRN Create', 'GRN Approve'],
  },
  {
    id: 8,
    module: 'System',
    permissions: ['System Dataupload Upload', 'Dashboard Read', 'Home Read', 'Exit Read'],
  },
  {
    id: 9,
    module: 'Recruitment',
    permissions: [
      'Recruitment Read',
      'Recruitment Vacancy Read',
      'Recruitment Vacancy Approval',
      'Recruitment Cvpool Read',
      'Recruitment Cvpool Upload',
    ],
  },
  {
    id: 10,
    module: 'Learning & Development',
    permissions: ['Ld Training Read', 'Ld Gurukul Course Read', 'Category Branch Update'],
  },
];

const DEPARTMENT_OPTIONS = [
  'Procurement & Supply',
  'Finance',
  'Warehouse & Logistics',
  'Information Technology',
  'Legal & Contracts',
  'Human Resources',
  'External',
  'Operations',
];

const JOB_ROLE_OPTIONS = [
  'Procurement Officer',
  'Finance Manager',
  'Procurement Manager',
  'Stores Keeper',
  'Accounts Payable Officer',
  'Procurement Assistant',
  'IT Administrator',
  'Contract Manager',
  'Vendor Contact',
  'RFQ Coordinator',
  'Chief Finance Officer',
];

const VENDOR_OPTIONS = [
  { id: 'VND-0007', name: 'TransZim Logistics', prazStatus: 'Verified' },
  { id: 'VND-0014', name: 'Zimbabwe Cooling Ltd', prazStatus: 'Verified' },
  { id: 'VND-0021', name: 'Safire Technologies', prazStatus: 'Verified' },
  { id: 'VND-0033', name: 'Zimbabwe Print Works', prazStatus: 'Pending' },
  { id: 'VND-0042', name: 'Afro Build Supplies', prazStatus: 'Expired' },
];

const PRAZ_STATUS_OPTIONS = ['Verified', 'Pending', 'Expired'];

const ROLE_COLOR: Record<
  string,
  'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'info'
> = {
  Admin: 'secondary',
  Approver: 'primary',
  Vendor: 'info',
  Buyer: 'success',
  Finance: 'warning',
  Viewer: 'default',
  'GRN Officer': 'success',
  'Invoice Processor': 'warning',
  'Contract Manager': 'info',
  'RFQ Manager': 'primary',
};

const STEPS = [
  { label: 'Basic Info', icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 16 }} /> },
  { label: 'Roles', icon: <ShieldOutlinedIcon sx={{ fontSize: 16 }} /> },
  { label: 'Permissions', icon: <KeyOutlinedIcon sx={{ fontSize: 16 }} /> },
  { label: 'Review', icon: <CheckCircleOutlinedIcon sx={{ fontSize: 16 }} /> },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = ['#1976d2', '#388e3c', '#f57c00', '#7b1fa2', '#c62828', '#00796b'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION CARD
// ─────────────────────────────────────────────────────────────────────────────

interface SectionCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  subtitle?: string;
}

function SectionCard({ title, icon, children, subtitle }: SectionCardProps) {
  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Stack direction="row" alignItems="flex-start" spacing={1} mb={0.5}>
          {icon && (
            <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', mt: '2px' }}>
              {icon}
            </Box>
          )}
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Stack>
        <Divider sx={{ mb: 2, mt: 1.5, borderStyle: 'dashed' }} />
        {children}
      </CardContent>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATUS CHIP
// ─────────────────────────────────────────────────────────────────────────────

function StatusChip({ value }: { value: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: '#E8F5E9', color: '#2E7D32' },
    Pending: { bg: '#FFF8E1', color: '#ED6C02' },
    Inactive: { bg: '#FEEBEE', color: '#D32F2F' },
  };
  const { bg, color } = map[value] ?? { bg: '#F5F5F5', color: '#616161' };
  return (
    <Chip
      label={value}
      size="small"
      sx={{
        height: 22,
        fontSize: 11,
        fontWeight: 600,
        borderRadius: 1,
        backgroundColor: bg,
        color,
        '& .MuiChip-label': { px: 1 },
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — BASIC INFO
// ─────────────────────────────────────────────────────────────────────────────

interface BasicInfoStepProps {
  form: BasicInfoForm;
  errors: Partial<Record<keyof BasicInfoForm, string>>;
  onChange: (key: keyof BasicInfoForm, value: string | boolean) => void;
}

function BasicInfoStep({ form, errors, onChange }: BasicInfoStepProps) {
  const selectedVendor = VENDOR_OPTIONS.find((v) => v.id === form.vendorId);

  return (
    <Stack spacing={0}>
      {/* Personal Details */}
      <SectionCard
        title="Personal Details"
        icon={<PersonOutlineOutlinedIcon fontSize="small" />}
        subtitle="Basic identity information for the user account"
      >
        <Grid container spacing={2}>
          <Grid>
            <TextField
              label="Full Name"
              size="small"
              fullWidth
              required
              value={form.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              placeholder="e.g. Tendai Moyo"
            />
          </Grid>
          <Grid >
            <TextField
              label="Email Address"
              size="small"
              fullWidth
              required
              type="email"
              value={form.email}
              onChange={(e) => onChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="user@optima.co.zw"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid >
            <TextField
              label="Phone Number"
              size="small"
              fullWidth
              value={form.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+263 77 000 0000"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid width='100%'>
            <Autocomplete
              size="small"
              options={['Active', 'Inactive', 'Pending'] as UserStatus[]}
              value={form.status}
              onChange={(_, val) => val && onChange('status', val)}
              disableClearable
              renderInput={(params) => (
                <TextField {...params} label="Account Status" required fullWidth/>
              )}
            />
          </Grid>
        </Grid>
      </SectionCard>

      {/* Employment Details */}
      <SectionCard
        title="Employment Details"
        icon={<BadgeOutlinedIcon fontSize="small" />}
        subtitle="Organisational position and department assignment"
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Grid width='100%'>
            <TextField
              label="Employee Code"
              size="small"
              fullWidth
              required
              value={form.employeeCode}
              onChange={(e) => onChange('employeeCode', e.target.value)}
              error={!!errors.employeeCode}
              helperText={errors.employeeCode || 'e.g. EMP011 or VND-EMP006'}
              placeholder="EMP011"
            />
          </Grid>
          <Grid width='100%'>
            <Autocomplete
              size="small"
              options={JOB_ROLE_OPTIONS}
              value={form.jobRole}
              onChange={(_, val) => onChange('jobRole', val ?? '')}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Job Role"
                  required
                  error={!!errors.jobRole}
                  helperText={errors.jobRole}
                />
              )}
            />
          </Grid>
          <Grid width='100%'>
            <Autocomplete
              size="small"
              options={DEPARTMENT_OPTIONS}
              value={form.department}
              onChange={(_, val) => onChange('department', val ?? '')}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department"
                  required
                  error={!!errors.department}
                  helperText={errors.department}
                />
              )}
            />
          </Grid>
          <Grid width='100%'>
            <Box
              sx={{
                border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.23)}`,
                borderRadius: 1,
                px: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '40px',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Active Directory User
              </Typography>
              <Switch
                size="small"
                checked={form.adUser}
                onChange={(e) => onChange('adUser', e.target.checked)}
                color="primary"
              />
            </Box>
          </Grid>
        </Box>
      </SectionCard>

      {/* Vendor Linkage */}
      <SectionCard
        title="Vendor Linkage"
        icon={<StorefrontOutlinedIcon fontSize="small" />}
        subtitle="Link this user to a vendor in the procurement portal — optional for internal staff"
      >
        <Box
          sx={{
            border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.23)}`,
            borderRadius: 1,
            px: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: form.isVendor ? 2 : 0,
            height: '40px',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <StorefrontOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2">This user is a vendor contact</Typography>
          </Stack>
          <Switch
            size="small"
            checked={form.isVendor}
            onChange={(e) => onChange('isVendor', e.target.checked)}
            color="primary"
          />
        </Box>

        {form.isVendor && (
          <Grid container spacing={2}>
            <Grid >
              <Autocomplete
                size="small"
                options={VENDOR_OPTIONS}
                getOptionLabel={(opt) => `${opt.id} — ${opt.name}`}
                value={VENDOR_OPTIONS.find((v) => v.id === form.vendorId) ?? null}
                onChange={(_, val) => {
                  onChange('vendorId', val?.id ?? '');
                  onChange('vendorName', val?.name ?? '');
                  onChange('prazStatus', val?.prazStatus ?? '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Linked Vendor"
                    required={form.isVendor}
                    error={!!errors.vendorId}
                    helperText={errors.vendorId}
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Stack>
                      <Typography variant="body2" fontWeight={600}>
                        {option.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.id}
                      </Typography>
                    </Stack>
                  </Box>
                )}
              />
            </Grid>
            <Grid >
              <Autocomplete
                size="small"
                options={PRAZ_STATUS_OPTIONS}
                value={form.prazStatus}
                onChange={(_, val) => onChange('prazStatus', val ?? '')}
                disableClearable
                renderInput={(params) => <TextField {...params} label="PRAZ Status" />}
              />
            </Grid>

            {selectedVendor && (
              <Grid >
                <Box
                  sx={{
                    bgcolor: (t) => alpha(t.palette.primary.main, 0.04),
                    border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.15)}`,
                    borderRadius: 1.5,
                    px: 2,
                    py: 1.25,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <StorefrontOutlinedIcon sx={{ fontSize: 15, color: 'primary.main' }} />
                    <Typography variant="caption" fontWeight={700} color="primary.main">
                      {selectedVendor.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      · {selectedVendor.id}
                    </Typography>
                    <Chip
                      label={`PRAZ: ${selectedVendor.prazStatus}`}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        fontWeight: 600,
                        borderRadius: 1,
                        ml: 'auto !important',
                        bgcolor:
                          selectedVendor.prazStatus === 'Verified'
                            ? '#E8F5E9'
                            : selectedVendor.prazStatus === 'Pending'
                              ? '#FFF8E1'
                              : '#FEEBEE',
                        color:
                          selectedVendor.prazStatus === 'Verified'
                            ? '#2E7D32'
                            : selectedVendor.prazStatus === 'Pending'
                              ? '#ED6C02'
                              : '#D32F2F',
                        '& .MuiChip-label': { px: 0.75 },
                      }}
                    />
                  </Stack>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </SectionCard>
    </Stack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — ROLES
// ─────────────────────────────────────────────────────────────────────────────

interface RolesStepProps {
  selectedRoles: GroupRole[];
  onChange: (roles: GroupRole[]) => void;
}

function RolesStep({ selectedRoles, onChange }: RolesStepProps) {
  const isSelected = (roleId: number) => selectedRoles.some((r) => r.id === roleId);

  const toggleRole = (role: GroupRole) => {
    if (isSelected(role.id)) {
      onChange(selectedRoles.filter((r) => r.id !== role.id));
    } else {
      onChange([...selectedRoles, role]);
    }
  };

  return (
    <SectionCard
      title="Group Roles"
      icon={<GroupOutlinedIcon fontSize="small" />}
      subtitle="Assign one or more group roles — inherited permissions are determined by these roles"
    >
      <Stack spacing={1.5}>
        {ALL_AVAILABLE_ROLES.map((role) => (
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
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <ShieldOutlinedIcon
                  sx={{
                    fontSize: 18,
                    color: isSelected(role.id) ? 'primary.main' : 'text.disabled',
                    transition: 'color 0.15s',
                  }}
                />
                <Box>
                  <Stack direction="row" alignItems="center" spacing={0.75} mb={0.25}>
                    <Chip
                      label={role.label}
                      size="small"
                      color={ROLE_COLOR[role.label] ?? 'default'}
                      variant="outlined"
                      sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {role.description}
                  </Typography>
                </Box>
              </Stack>
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

      {selectedRoles.length > 0 && (
        <Box
          mt={2}
          sx={{
            bgcolor: (t) => alpha(t.palette.primary.main, 0.04),
            border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.15)}`,
            borderRadius: 1.5,
            p: 1.5,
          }}
        >
          <Typography variant="caption" color="text.secondary" display="block" mb={0.75}>
            {selectedRoles.length} role{selectedRoles.length !== 1 ? 's' : ''} selected
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.75}>
            {selectedRoles.map((role) => (
              <Chip
                key={role.id}
                label={role.label}
                size="small"
                color={ROLE_COLOR[role.label] ?? 'default'}
                variant="outlined"
                onDelete={() => toggleRole(role)}
                deleteIcon={<CloseIcon sx={{ fontSize: '11px !important' }} />}
                sx={{ fontSize: 11, height: 22, fontWeight: 600 }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — PERMISSIONS
// ─────────────────────────────────────────────────────────────────────────────

interface PermissionsStepProps {
  selectedPermissions: string[];
  onChange: (perms: string[]) => void;
}

function PermissionsStep({ selectedPermissions, onChange }: PermissionsStepProps) {
  const [search, setSearch] = useState('');
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  const togglePermission = (perm: string) => {
    if (selectedPermissions.includes(perm)) {
      onChange(selectedPermissions.filter((p) => p !== perm));
    } else {
      onChange([...selectedPermissions, perm]);
    }
  };

  const toggleModule = (moduleId: number, permissions: string[]) => {
    const allSelected = permissions.every((p) => selectedPermissions.includes(p));
    if (allSelected) {
      onChange(selectedPermissions.filter((p) => !permissions.includes(p)));
    } else {
      onChange([...new Set([...selectedPermissions, ...permissions])]);
    }
  };

  const toggleExpand = (moduleId: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const filteredGroups = ALL_AVAILABLE_PERMISSIONS.map((g) => ({
    ...g,
    permissions: g.permissions.filter((p) =>
      p.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((g) => g.permissions.length > 0);

  return (
    <SectionCard
      title="Direct Permissions"
      icon={<KeyOutlinedIcon fontSize="small" />}
      subtitle="Grant specific permissions on top of what roles provide — optional and additive"
    >
      <Box
        sx={{
          bgcolor: (t) => alpha(t.palette.info.main, 0.05),
          border: (t) => `1px solid ${alpha(t.palette.info.main, 0.2)}`,
          borderRadius: 1.5,
          px: 1.5,
          py: 1,
          mb: 2,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 15, color: 'info.main', mt: '2px', flexShrink: 0 }} />
        <Typography variant="caption" color="text.secondary">
          Direct permissions are individual overrides granted specifically to this user. They apply{' '}
          <strong>in addition</strong> to any inherited permissions from assigned group roles. Leave
          all unchecked to rely solely on role-based permissions.
        </Typography>
      </Box>

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
          endAdornment: search ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setSearch('')}>
                <CloseIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />

      <Stack spacing={1}>
        {filteredGroups.map((group) => {
          const expanded = expandedModules.includes(group.id);
          const allSelected = group.permissions.every((p) => selectedPermissions.includes(p));
          const someSelected =
            !allSelected && group.permissions.some((p) => selectedPermissions.includes(p));
          const selectedCount = group.permissions.filter((p) =>
            selectedPermissions.includes(p)
          ).length;

          return (
            <Box
              key={group.id}
              sx={{
                border: (t) =>
                  `1px solid ${allSelected || someSelected
                    ? alpha(t.palette.primary.main, 0.25)
                    : alpha(t.palette.text.primary, 0.08)
                  }`,
                borderRadius: 1.5,
                overflow: 'hidden',
                transition: 'border-color 0.15s',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  px: 2,
                  py: 1.2,
                  cursor: 'pointer',
                  bgcolor: (t) =>
                    allSelected || someSelected
                      ? alpha(t.palette.primary.main, 0.04)
                      : alpha(t.palette.text.primary, 0.02),
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
                    onChange={() => { }}
                  />
                  <Typography variant="caption" fontWeight={700} color="text.primary">
                    {group.module}
                  </Typography>
                  {selectedCount > 0 ? (
                    <Chip
                      label={`${selectedCount}/${group.permissions.length}`}
                      size="small"
                      color="primary"
                      sx={{
                        height: 18,
                        fontSize: 10,
                        fontWeight: 700,
                        '& .MuiChip-label': { px: 0.75 },
                      }}
                    />
                  ) : (
                    <Typography variant="caption" color="text.disabled">
                      ({group.permissions.length})
                    </Typography>
                  )}
                </Stack>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(group.id);
                  }}
                >
                  {expanded ? (
                    <ExpandLessIcon fontSize="small" />
                  ) : (
                    <ExpandMoreIcon fontSize="small" />
                  )}
                </IconButton>
              </Stack>

              {expanded && (
                <Box sx={{ px: 2, pb: 1.5, pt: 1 }}>
                  <Grid container spacing={0.5}>
                    {group.permissions.map((perm) => (
                      <Grid key={perm} >
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={selectedPermissions.includes(perm)}
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

      {selectedPermissions.length > 0 && (
        <Box mt={2}>
          <Typography variant="caption" color="text.secondary" display="block" mb={0.75}>
            {selectedPermissions.length} permission
            {selectedPermissions.length !== 1 ? 's' : ''} selected
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
            {selectedPermissions.map((perm) => (
              <Chip
                key={perm}
                label={perm}
                size="small"
                variant="outlined"
                onDelete={() => togglePermission(perm)}
                deleteIcon={<CloseIcon sx={{ fontSize: '11px !important' }} />}
                sx={{
                  fontSize: 10,
                  height: 22,
                  fontWeight: 500,
                  borderColor: (t) => alpha(t.palette.text.primary, 0.15),
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4 — REVIEW
// ─────────────────────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={1} mb={1.2} width='100%'>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ minWidth: 160, flexShrink: 0, pt: '2px' }}
      >
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500} sx={{ wordBreak: 'break-word' }}>
        {value}
      </Typography>
    </Stack>
  );
}

interface ReviewStepProps {
  basicInfo: BasicInfoForm;
  roles: GroupRole[];
  permissions: string[];
}

function ReviewStep({ basicInfo, roles, permissions }: ReviewStepProps) {
  const selectedVendor = VENDOR_OPTIONS.find((v) => v.id === basicInfo.vendorId);

  return (
    <Stack spacing={0}>
      {/* User preview */}
      <Box
        sx={{
          border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.2)}`,
          bgcolor: (t) => alpha(t.palette.primary.main, 0.03),
          borderRadius: 2,
          p: 2.5,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            width: 52,
            height: 52,
            fontSize: 18,
            fontWeight: 700,
            bgcolor: basicInfo.fullName ? getAvatarColor(basicInfo.fullName) : 'primary.main',
            flexShrink: 0,
          }}
        >
          {basicInfo.fullName ? getInitials(basicInfo.fullName) : <PersonAddOutlinedIcon />}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={800} lineHeight={1.2}>
            {basicInfo.fullName || '—'}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {basicInfo.email || '—'}
          </Typography>
          <Stack direction="row" spacing={0.75} mt={0.5} flexWrap="wrap">
            <StatusChip value={basicInfo.status} />
            {basicInfo.adUser && (
              <Chip
                label="AD USER"
                size="small"
                variant="outlined"
                sx={{
                  height: 20,
                  fontSize: 10,
                  fontWeight: 600,
                  borderRadius: 1,
                  borderColor: 'divider',
                  color: 'text.secondary',
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
            )}
            {basicInfo.isVendor && (
              <Chip
                icon={<StorefrontOutlinedIcon sx={{ fontSize: '11px !important' }} />}
                label="VENDOR"
                size="small"
                variant="outlined"
                sx={{
                  height: 20,
                  fontSize: 10,
                  fontWeight: 600,
                  borderRadius: 1,
                  borderColor: (t) => alpha(t.palette.primary.main, 0.4),
                  color: 'primary.main',
                  '& .MuiChip-label': { px: 0.5 },
                }}
              />
            )}
          </Stack>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid  >
          <SectionCard
            title="Personal Details"
            icon={<PersonOutlineOutlinedIcon fontSize="small" />}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ReviewRow label="Full Name" value={basicInfo.fullName || '—'} />
              <ReviewRow label="Email" value={basicInfo.email || '—'} />
              <ReviewRow label="Phone" value={basicInfo.phone || '—'} />
              <ReviewRow label="Status" value={<StatusChip value={basicInfo.status} />} />
            </Box>
          </SectionCard>
        </Grid>

        <Grid  >
          <SectionCard
            title="Employment Details"
            icon={<BadgeOutlinedIcon fontSize="small" />}
          >
            <ReviewRow label="Employee Code" value={basicInfo.employeeCode || '—'} />
            <ReviewRow label="Job Role" value={basicInfo.jobRole || '—'} />
            <ReviewRow label="Department" value={basicInfo.department || '—'} />
            <ReviewRow
              label="Active Directory"
              value={
                <Chip
                  label={basicInfo.adUser ? 'AD User' : 'Non AD User'}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 20,
                    fontSize: 10,
                    fontWeight: 600,
                    borderColor: 'divider',
                    color: 'text.secondary',
                    '& .MuiChip-label': { px: 0.75 },
                  }}
                />
              }
            />
          </SectionCard>
        </Grid>

        {basicInfo.isVendor && selectedVendor && (
          <Grid  >
            <SectionCard
              title="Vendor Information"
              icon={<StorefrontOutlinedIcon fontSize="small" />}
            >
              <ReviewRow label="Vendor ID" value={basicInfo.vendorId || '—'} />
              <ReviewRow label="Vendor Name" value={basicInfo.vendorName || '—'} />
              <ReviewRow
                label="PRAZ Status"
                value={
                  <Chip
                    label={basicInfo.prazStatus}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: 10,
                      fontWeight: 600,
                      borderRadius: 1,
                      bgcolor:
                        basicInfo.prazStatus === 'Verified'
                          ? '#E8F5E9'
                          : basicInfo.prazStatus === 'Pending'
                            ? '#FFF8E1'
                            : '#FEEBEE',
                      color:
                        basicInfo.prazStatus === 'Verified'
                          ? '#2E7D32'
                          : basicInfo.prazStatus === 'Pending'
                            ? '#ED6C02'
                            : '#D32F2F',
                      '& .MuiChip-label': { px: 0.75 },
                    }}
                  />
                }
              />
            </SectionCard>
          </Grid>
        )}

        <Grid>
          <SectionCard title="Assigned Roles" icon={<ShieldOutlinedIcon fontSize="small" />}>
            {roles.length === 0 ? (
              <Typography variant="caption" color="text.disabled" fontStyle="italic">
                No roles assigned — user will have minimal access.
              </Typography>
            ) : (
              <Stack direction="row" flexWrap="wrap" gap={0.75}>
                {roles.map((role) => (
                  <Chip
                    key={role.id}
                    label={role.label}
                    size="small"
                    color={ROLE_COLOR[role.label] ?? 'default'}
                    variant="outlined"
                    sx={{ fontSize: 11, height: 22, fontWeight: 600 }}
                  />
                ))}
              </Stack>
            )}
          </SectionCard>
        </Grid>

        <Grid >
          <SectionCard
            title="Direct Permissions"
            icon={<KeyOutlinedIcon fontSize="small" />}
          >
            {permissions.length === 0 ? (
              <Typography variant="caption" color="text.disabled" fontStyle="italic">
                No direct permissions — access will be determined by roles only.
              </Typography>
            ) : (
              <>
                <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                  {permissions.length} permission{permissions.length !== 1 ? 's' : ''} granted
                  directly
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
                  {permissions.map((perm) => (
                    <Chip
                      key={perm}
                      label={perm}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: 10,
                        height: 22,
                        fontWeight: 500,
                        borderColor: (t) => alpha(t.palette.text.primary, 0.15),
                        color: 'text.primary',
                      }}
                    />
                  ))}
                </Box>
              </>
            )}
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_BASIC_INFO: BasicInfoForm = {
  fullName: '',
  email: '',
  phone: '',
  employeeCode: '',
  jobRole: '',
  department: '',
  status: 'Active',
  adUser: false,
  isVendor: false,
  vendorId: '',
  vendorName: '',
  prazStatus: 'Pending',
};

function AddUser() {
  const theme = useTheme();
  const router = useRouter();
  const PRIMARY = theme.palette.primary.main;

  const [activeStep, setActiveStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState<BasicInfoForm>(DEFAULT_BASIC_INFO);
  const [basicErrors, setBasicErrors] = useState<Partial<Record<keyof BasicInfoForm, string>>>({});
  const [selectedRoles, setSelectedRoles] = useState<GroupRole[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const handleBasicChange = useCallback(
    (key: keyof BasicInfoForm, value: string | boolean) => {
      setBasicInfo((prev) => ({ ...prev, [key]: value }));
      if (basicErrors[key]) {
        setBasicErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    },
    [basicErrors]
  );

  const validateBasicInfo = (): boolean => {
    const errs: Partial<Record<keyof BasicInfoForm, string>> = {};
    if (!basicInfo.fullName.trim()) errs.fullName = 'Full name is required';
    if (!basicInfo.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basicInfo.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!basicInfo.employeeCode.trim()) errs.employeeCode = 'Employee code is required';
    if (!basicInfo.jobRole.trim()) errs.jobRole = 'Job role is required';
    if (!basicInfo.department.trim()) errs.department = 'Department is required';
    if (basicInfo.isVendor && !basicInfo.vendorId) errs.vendorId = 'Select a linked vendor';
    setBasicErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateBasicInfo()) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setSubmitting(true);
    // TODO: replace with real API call
    await new Promise((res) => setTimeout(res, 1200));
    setSubmitting(false);
    setSnackbar({ open: true, message: 'User created successfully!', severity: 'success' });
    setTimeout(() => {
      router.push('/user-management');
    }, 1800);
  };

  const handleCancel = () => router.back();

  const isLastStep = activeStep === STEPS.length - 1;

  const NEXT_LABELS = ['Next: Roles', 'Next: Permissions', 'Review & Confirm'];

  return (
    <Box>
      {/* Breadcrumbs */}
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Add User"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'User Management', href: '/user-management' },
            { label: 'User', href: '/user-management/user' },
            { label: 'Add User', href: '#' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Box sx={{ width: 'full' }}>
        {/* ── Stepper sidebar ────────────────────────────────────────────────── */}
        <Box sx={{ display: 'flex', width: 'full' }}>
          <Box
            sx={{
              border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
              borderRadius: 2,
              p: 2.5,
              position: { md: 'sticky' },
              top: { md: 80 },
              width: '100%',
              mb: 2.5
            }}
          >
            {/* Header */}
            <Stack direction="row" spacing={1.5} alignItems="center" mb={2.5}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 1.5,
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PersonAddOutlinedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2}>
                  New User
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Step {activeStep + 1} of {STEPS.length}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 2.5, borderStyle: 'dashed' }} />

            {/* Vertical stepper */}
            <Stepper
              activeStep={activeStep}
              orientation="horizontal"
              sx={{ '& .MuiStepConnector-root': { ml: '11px' } }}
            >
              {STEPS.map((step, index) => {
                const isCompleted = index < activeStep;
                const isCurrent = index === activeStep;

                return (
                  <Step key={step.label} completed={isCompleted}>
                    <StepLabel
                      StepIconComponent={() => (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: '2px solid',
                            borderColor: isCompleted
                              ? 'success.main'
                              : isCurrent
                                ? 'primary.main'
                                : alpha(theme.palette.text.primary, 0.2),
                            bgcolor: isCompleted
                              ? 'success.main'
                              : isCurrent
                                ? alpha(PRIMARY, 0.1)
                                : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.2s',
                          }}
                        >
                          {isCompleted ? (
                            <CheckCircleOutlinedIcon sx={{ fontSize: 13, color: 'white' }} />
                          ) : (
                            <Box
                              sx={{
                                color: isCurrent ? 'primary.main' : 'text.disabled',
                                display: 'flex',
                                '& svg': { fontSize: '12px !important' },
                              }}
                            >
                              {step.icon}
                            </Box>
                          )}
                        </Box>
                      )}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={isCurrent ? 700 : isCompleted ? 600 : 400}
                        color={
                          isCurrent
                            ? 'primary.main'
                            : isCompleted
                              ? 'success.main'
                              : 'text.disabled'
                        }
                        sx={{ fontSize: 13 }}
                      >
                        {step.label}
                      </Typography>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {/* Progress bar */}
            <Box mt={3}>
              <Stack direction="row" justifyContent="space-between" mb={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="caption" color="primary.main" fontWeight={700}>
                  {Math.round((activeStep / STEPS.length) * 100)}%
                </Typography>
              </Stack>
              <Box
                sx={{
                  height: 4,
                  borderRadius: 2,
                  bgcolor: (t) => alpha(t.palette.text.primary, 0.08),
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${(activeStep / STEPS.length) * 100}%`,
                    bgcolor: 'primary.main',
                    borderRadius: 2,
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
            </Box>

            {/* Mini user card after step 1 */}
            {activeStep > 0 && basicInfo.fullName && (
              <Box
                mt={2.5}
                sx={{
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.04),
                  border: (t) => `1px dashed ${alpha(t.palette.primary.main, 0.2)}`,
                  borderRadius: 1.5,
                  p: 1.25,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: 10,
                      fontWeight: 700,
                      bgcolor: getAvatarColor(basicInfo.fullName),
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(basicInfo.fullName)}
                  </Avatar>
                  <Box overflow="hidden">
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      lineHeight={1.2}
                      display="block"
                      noWrap
                    >
                      {basicInfo.fullName}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      lineHeight={1.2}
                      display="block"
                      noWrap
                      sx={{ fontSize: 10 }}
                    >
                      {basicInfo.jobRole || 'No role set'}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>
        </Box>

        {/* ── Step content ───────────────────────────────────────────────────── */}
        <Box>
          {activeStep === 0 && (
            <BasicInfoStep form={basicInfo} errors={basicErrors} onChange={handleBasicChange} />
          )}
          {activeStep === 1 && (
            <RolesStep selectedRoles={selectedRoles} onChange={setSelectedRoles} />
          )}
          {activeStep === 2 && (
            <PermissionsStep
              selectedPermissions={selectedPermissions}
              onChange={setSelectedPermissions}
            />
          )}
          {activeStep === 3 && (
            <ReviewStep
              basicInfo={basicInfo}
              roles={selectedRoles}
              permissions={selectedPermissions}
            />
          )}

          {/* Navigation footer */}
          <Box
            sx={{
              border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
              borderRadius: 2,
              px: 2.5,
              py: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                borderColor: (t) => alpha(t.palette.text.primary, 0.2),
                color: 'text.secondary',
                fontSize: 13,
                textTransform: 'none',
              }}
            >
              Cancel
            </Button>

            <Stack direction="row" spacing={1.5}>
              {activeStep > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
                  onClick={handleBack}
                  sx={{ fontSize: 13, textTransform: 'none' }}
                >
                  Back
                </Button>
              )}

              {!isLastStep ? (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                  onClick={handleNext}
                  sx={{
                    background: PRIMARY,
                    color: 'white',
                    fontSize: 13,
                    textTransform: 'none',
                    px: 3,
                  }}
                >
                  {NEXT_LABELS[activeStep]}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={
                    !submitting ? (
                      <CheckCircleOutlinedIcon sx={{ fontSize: 16 }} />
                    ) : undefined
                  }
                  onClick={handleSubmit}
                  disabled={submitting}
                  sx={{
                    background: submitting ? undefined : '#2E7D32',
                    color: 'white',
                    fontSize: 13,
                    textTransform: 'none',
                    px: 3,
                    '&:hover': { background: '#1B5E20' },
                  }}
                >
                  {submitting ? 'Creating User…' : 'Create User'}
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{ borderRadius: 1.5 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddUser;