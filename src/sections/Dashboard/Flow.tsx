'use client';

import React, { Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  List,
  Chip,
  alpha,
  Stack,
  Paper,
  Table,
  Badge,
  Avatar,
 Button, Divider, Tooltip ,
  ListItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  ListItemText,
  LinearProgress, TableContainer, ListItemAvatar } from '@mui/material';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
} from '@mui/lab';

import { Event, Receipt, Payment, Refresh , Visibility, CheckCircle, LocalShipping } from '@mui/icons-material';

// -------------------- DATA --------------------
const topSuppliers = [
  { name: 'TechVision Solutions', spend: 4580000, percentage: 28 },
  { name: 'Global Office Mart', spend: 3210000, percentage: 19 },
  { name: 'SecureIT Systems', spend: 2890000, percentage: 17 },
  { name: 'Prime Logistics', spend: 1740000, percentage: 11 },
  { name: 'Metro Supplies', spend: 1320000, percentage: 8 },
];

const activities = [
  {
    time: '2 hours ago',
    action: 'PO-4782 Approved',
    user: 'Anjali Nair',
    details: 'Purchase Order for Dell Laptops',
    icon: <CheckCircle color="success" />,
    type: 'approval',
  },
  {
    time: 'Yesterday',
    action: 'Goods Received',
    user: 'Ramesh Kumar',
    details: 'GRN-3921 against PO-4781',
    icon: <LocalShipping color="primary" />,
    type: 'receipt',
  },
  {
    time: '2 days ago',
    action: 'Invoice Received',
    user: 'System',
    details: 'INV-8834 from TechVision Solutions',
    icon: <Receipt />,
    type: 'invoice',
  },
  {
    time: '3 days ago',
    action: 'Payment Processed',
    user: 'Finance Team',
    details: '₹8,45,000 paid to Global Office Mart',
    icon: <Payment color="success" />,
    type: 'payment',
  },
];
// -------------------- TOP SUPPLIERS --------------------
export const TopSuppliersBySpend = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        bgcolor: 'transparent',
        borderRadius: 0.5,
        border: `0.5px solid ${alpha(theme.palette.primary.main, 0.5)}`,
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.4,
          mb: 1,
          textTransform: 'uppercase',
          color: theme.palette.text.secondary,
        }}
      >
        Top Suppliers by Spend
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {topSuppliers.map((supplier, index) => (
          <Box
            key={index}
            sx={{
              transition: 'all 0.2s ease',
              borderRadius: 1,
              p: 0.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.04),
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              {/* Rank */}
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  fontSize: 12,
                  fontWeight: 600,
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  color: theme.palette.primary.main,
                }}
              >
                {index + 1}
              </Avatar>

              {/* Info */}
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontSize={12} fontWeight={500}>
                    {supplier.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    ₹{supplier.spend.toLocaleString('en-IN')}
                  </Typography>
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={supplier.percentage}
                  sx={{
                    mt: 0.7,
                    height: 5,
                    borderRadius: 5,
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

// -------------------- PENDING APPROVALS --------------------
export const PendingApprovals = () => {
  const theme = useTheme();

  const approvals = [
    {
      id: 'REQ-8921',
      title: 'Laptops for IT Department',
      amount: 1240000,
      requester: 'Rahul Sharma',
    },
    {
      id: 'PO-4456',
      title: 'Office Furniture - HQ',
      amount: 675000,
      requester: 'Priya Menon',
    },
    {
      id: 'PO-2456',
      title: 'HR - HQ',
      amount: 65000,
      requester: 'Akhilesh',
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        bgcolor: 'transparent',
        p: 2.5,
        borderRadius: 0.5,
        border: `0.5px solid ${alpha(theme.palette.primary.main, 0.5)}`,
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.4,
          mb: 1,
          textTransform: 'uppercase',
          color: theme.palette.text.secondary,
        }}
      >
        Pending Approvals
      </Typography>

      <Divider sx={{ mb: 1 }} />

      <List disablePadding>
        {approvals.map((item, index) => (
          <Fragment key={item.id}>
            <ListItem
              sx={{
                px: 0,
                py: 1.2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography fontSize={12} fontWeight={500}>
                    {item.id} — {item.title}
                  </Typography>
                }
                secondary={
                  <Typography fontSize={11} color="text.secondary">
                    {item.requester} • ₹{item.amount.toLocaleString('en-IN')}
                  </Typography>
                }
              />

              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  sx={{ textTransform: 'none', fontSize: 11 }}
                >
                  Approve
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  sx={{ textTransform: 'none', fontSize: 11 }}
                >
                  Reject
                </Button>
              </Stack>
            </ListItem>

            {index < approvals.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>

      <Button
        variant="text"
        size="small"
        sx={{
          mt: 1.5,
          textTransform: 'none',
          fontSize: 12,
        }}
      >
        View All Pending Requests →
      </Button>
    </Paper>
  );
};
export const ActivityTimeline = () => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6" gutterBottom>
      Recent Activity
    </Typography>

    <Timeline position="alternate">
      {activities.map((activity, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="text.secondary" sx={{ fontSize: '0.85rem' }}>
            {activity.time}
          </TimelineOppositeContent>

          <TimelineSeparator>
            <TimelineDot sx={{ bgcolor: 'background.paper' }}>{activity.icon}</TimelineDot>
            {index !== activities.length - 1 && <TimelineConnector />}
          </TimelineSeparator>

          <TimelineContent>
            <Typography variant="subtitle2">{activity.action}</Typography>
            <Typography variant="body2" color="text.secondary">
              {activity.details}
            </Typography>
            <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
              by {activity.user}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>

    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
        View Full Audit Log →
      </Typography>
    </Box>
  </Paper>
);

const departmentSpend = [
  { dept: 'Information Technology', spend: 12450000, percentage: 42, color: '#1976d2' },
  { dept: 'Operations', spend: 8750000, percentage: 29, color: '#388e3c' },
  { dept: 'Human Resources', spend: 4320000, percentage: 15, color: '#f57c00' },
  { dept: 'Marketing', spend: 2890000, percentage: 10, color: '#d32f2f' },
  { dept: 'Finance & Accounts', spend: 1200000, percentage: 4, color: '#7b1fa2' },
];

export const DepartmentWiseSpend = () => {
  const theme = useTheme();

  const totalSpend = departmentSpend.reduce((sum, item) => sum + item.spend, 0);

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: 'transparent',
        borderRadius: 0.5,
        border: `0.5px solid ${alpha(theme.palette.primary.main, 0.5)}`,
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.4,
          mb: 1,
          textTransform: 'uppercase',
          color: theme.palette.text.secondary,
        }}
      >
        {' '}
        Department-wise Spend (FY 2025-26)
      </Typography>
      <Typography fontSize={12} color="text.primary" sx={{ mb: 3 }}>
        Total Spend: ₹{totalSpend.toLocaleString('en-IN')}
      </Typography>

      <Stack spacing={2}>
        {departmentSpend.map((dept) => (
          <Box key={dept.dept}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
              <Typography fontSize={12} fontWeight={500}>
                {dept.dept}
              </Typography>
              <Typography fontSize={12} fontWeight={600}>
                ₹{dept.spend.toLocaleString('en-IN')}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={dept.percentage}
              sx={{
                height: 5,
                borderRadius: 5,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': { backgroundColor: dept.color },
              }}
            />
            <Typography fontSize={12} color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              {dept.percentage}% of total spend
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};





interface Contract {
  id: string;
  vendor: string;
  contractType: string;
  expiryDate: string;
  value: number;
  daysLeft: number;
  status: 'active' | 'expiring' | 'critical';
}

const contracts: Contract[] = [
  {
    id: 'CON-001',
    vendor: 'TechVision Solutions Pvt Ltd',
    contractType: 'Annual Software License',
    expiryDate: '2026-06-15',
    value: 2450000,
    daysLeft: 47,
    status: 'expiring',
  },
  {
    id: 'CON-002',
    vendor: 'Global Office Mart',
    contractType: 'Office Supplies Framework',
    expiryDate: '2026-05-10',
    value: 890000,
    daysLeft: 11,
    status: 'critical',
  },
  {
    id: 'CON-003',
    vendor: 'SecureIT Systems',
    contractType: 'Server AMC',
    expiryDate: '2026-08-20',
    value: 1850000,
    daysLeft: 113,
    status: 'active',
  },

];

export const ContractExpiryTracker: React.FC = () => {
  const theme = useTheme();

  const getStatusChip = (daysLeft: number) => {
    if (daysLeft <= 15) {
      return <Chip label="Critical" color="error" size="small" sx={{ height: 20, fontSize: 10 }} />;
    }
    if (daysLeft <= 45) {
      return (
        <Chip label="Expiring" color="warning" size="small" sx={{ height: 20, fontSize: 10 }} />
      );
    }
    return <Chip label="Active" color="success" size="small" sx={{ height: 20, fontSize: 10 }} />;
  };

  const getDaysColor = (days: number): string => {
    if (days <= 15) return '#d32f2f';
    if (days <= 45) return '#f57c00';
    return '#388e3c';
  };

  return (
    <Paper
      sx={{
        p: 1.5,
        mb: 3,
        borderRadius: 0.5,
        border: `0.5px solid ${alpha(theme.palette.primary.main, 0.4)}`,
        bgcolor: 'transparent',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography fontSize={13} fontWeight={600}>
            Contract Expiry Tracker
          </Typography>
          <Typography fontSize={11} color="text.secondary">
            3 contracts in next 120 days
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Refresh">
            <IconButton size="small">
              <Refresh fontSize="small" />
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Visibility sx={{ fontSize: 14 }} />}
            sx={{ fontSize: 11, textTransform: 'none' }}
          >
            View All
          </Button>
        </Stack>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {['Contract', 'Vendor', 'Days', 'Status', ''].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    py: 1,
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {contracts.map((contract) => (
              <TableRow
                key={contract.id}
                hover
                sx={{
                  '& td': { py: 0.9, fontSize: 11 },
                }}
              >
                {/* Contract ID */}
                <TableCell sx={{ fontWeight: 600 }}>{contract.id}</TableCell>

                {/* Vendor */}
                <TableCell sx={{ color: 'text.secondary' }}>{contract.vendor}</TableCell>

                {/* Days Left (highlighted) */}
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      px: 1,
                      py: 0.2,
                      borderRadius: 1,
                      bgcolor: alpha(getDaysColor(contract.daysLeft), 0.1),
                      color: getDaysColor(contract.daysLeft),
                      fontWeight: 600,
                      fontSize: 11,
                    }}
                  >
                    <Event sx={{ fontSize: 14 }} />
                    {contract.daysLeft}
                  </Box>
                </TableCell>

                {/* Status */}
                <TableCell align="center">{getStatusChip(contract.daysLeft)}</TableCell>

                {/* Action */}
                <TableCell align="right">
                  <Button
                    size="small"
                    sx={{
                      fontSize: 11,
                      textTransform: 'none',
                      minWidth: 50,
                    }}
                  >
                    Renew
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box
        sx={{
          mt: 2,
          pt: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          gap: 3,
        }}
      >
        <Box>
          <Typography fontSize={10} color="text.secondary">
            Critical
          </Typography>
          <Typography fontSize={14} fontWeight={600} color="error">
            1
          </Typography>
        </Box>

        <Box>
          <Typography fontSize={10} color="text.secondary">
            Expiring
          </Typography>
          <Typography fontSize={14} fontWeight={600} color="warning.main">
            2
          </Typography>
        </Box>

        <Box>
          <Typography fontSize={10} color="text.secondary">
            Total
          </Typography>
          <Typography fontSize={14} fontWeight={600}>
            3
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};



import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const notifications = [
  {
    id: 1,
    title: 'Invoice Approved',
    description: 'Invoice #INV-2024 approved',
    time: '2 min ago',
    icon: <CheckCircleIcon fontSize="small" />,
    color: 'success.main',
    unread: true,
  },
  {
    id: 2,
    title: 'New Purchase Order',
    description: 'PO #45678 created',
    time: '10 min ago',
    icon: <ShoppingCartIcon fontSize="small" />,
    color: 'primary.main',
    unread: true,
  },
  {
    id: 3,
    title: 'Pending Approval',
    description: '3 invoices awaiting approval',
    time: '1 hr ago',
    icon: <ReceiptLongIcon fontSize="small" />,
    color: 'warning.main',
    unread: false,
  },
];

export default function RecentNotifications() {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        bgcolor: 'transparent',
        borderRadius: 0.5,
        border: `0.5px solid ${alpha(theme.palette.primary.main, 0.4)}`,
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="caption" fontWeight={600}>
          Recent Notifications
        </Typography>
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>

      <List disablePadding>
        {notifications.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem
              disableGutters
              sx={{
                px: 0.5,
                py: 0.75,
                alignItems: 'flex-start',
                transition: '0.2s',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 1,
                },
              }}
            >
              {/* Avatar */}
              <ListItemAvatar sx={{ minWidth: 36 }}>
                <Badge color="error" variant="dot" invisible={!item.unread}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: 14,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                </Badge>
              </ListItemAvatar>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                  <Typography variant="caption" fontWeight={500} noWrap sx={{ maxWidth: '70%' }}>
                    {item.title}
                  </Typography>

                  {/* Time on right */}
                  <Typography variant="caption" color="text.disabled">
                    {item.time}
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{ display: 'block' }}
                >
                  {item.description}
                </Typography>
              </Box>
            </ListItem>

            {index !== notifications.length - 1 && <Divider sx={{ my: 0.5 }} />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
