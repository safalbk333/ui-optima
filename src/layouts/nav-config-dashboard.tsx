import AddTaskIcon from '@mui/icons-material/AddTask';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { CONFIG } from 'src/global-config';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InterestsIcon from '@mui/icons-material/Interests';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import type { NavSectionProps } from 'src/components/nav-section';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import NotesIcon from '@mui/icons-material/Notes';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SvgColor } from 'src/components/svg-color';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

// const ICONS = {
//   job: icon('ic-job'),
//   blog: icon('ic-blog'),
//   chat: icon('ic-chat'),
//   mail: icon('ic-mail'),
//   user: icon('ic-user'),
//   file: icon('ic-file'),
//   lock: icon('ic-lock'),
//   tour: icon('ic-tour'),
//   order: icon('ic-order'),
//   label: icon('ic-label'),
//   blank: icon('ic-blank'),
//   kanban: icon('ic-kanban'),
//   folder: icon('ic-folder'),
//   course: icon('ic-course'),
//   params: icon('ic-params'),
//   banking: icon('ic-banking'),
//   booking: icon('ic-booking'),
//   invoice: icon('ic-invoice'),
//   product: icon('ic-product'),
//   calendar: icon('ic-calendar'),
//   disabled: icon('ic-disabled'),
//   external: icon('ic-external'),
//   subpaths: icon('ic-subpaths'),
//   menuItem: icon('ic-menu-item'),
//   ecommerce: icon('ic-ecommerce'),
//   analytics: icon('ic-analytics'),
//   dashboard: icon('ic-dashboard'),
// };

// ----------------------------------------------------------------------

const ICONS = {
  dashboard: <DashboardIcon fontSize="small" />,
  rfq: <RequestQuoteIcon fontSize="small" />,
  purchaseOrder: <ShoppingCartIcon fontSize="small" />,
  vendorDirectory: <SettingsAccessibilityIcon fontSize="small" />,
  contract: <NotesIcon fontSize="small" />,
  onboarding: <Diversity3Icon fontSize="small" />,
  rfqs: <AttachEmailIcon fontSize="small" />,
  approve:<AddTaskIcon  fontSize='small'/>,
  eoi:<InterestsIcon fontSize='small'/>,
  grn:<EditNoteIcon fontSize='small' />,
  rfp:<NoteAltIcon fontSize='small'/>,
  quotation:<MarkEmailReadIcon fontSize='small'/>
};
const ALL_ROLES = ['admin', 'approver', 'enduser'] as const;

export const navData: NavSectionProps['data'] = [
  {
    items: [
      {
        title: 'Dashboard',
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
        allowedRoles: [...ALL_ROLES],
      },
      {
        title: 'Vendor Onboarding',
        path: paths.vendorOnboarding.roots,
        icon: ICONS.onboarding,
        allowedRoles: ['admin'],

      },
      // {
      //   title: 'Vendors List',
      //   path: paths.vendor.root,
      //   icon: ICONS.onboarding,
      //   allowedRoles: ['admin'],

      // },
      {
        title: 'Purchase Requests',
        path: paths.purchaseRequests.root,
        icon: ICONS.rfq,
        allowedRoles: ['admin', 'enduser'],
      },
                  {
        title: 'EOI',
        path: paths.eoi.roots,
        icon: ICONS.eoi,
        allowedRoles: ['admin'],
      },
      {
        title: 'RFP / RFQ',
        path: paths.rfq.roots,
        icon: ICONS.rfp,
        allowedRoles: ['admin'],
      },
            {
        title: 'Quotations',
        path: paths.quotation.roots,
        icon: ICONS.quotation,
        allowedRoles: ['admin'],
      },


      {
        title: 'Purchase Orders',
        path: paths.purchaseOrders.root,
        icon: ICONS.purchaseOrder,
        allowedRoles: ['admin'],
      },
      {
        title: 'Contract Generator',
        path: paths.contractGenerator.root,
        icon: ICONS.contract,
        allowedRoles: ['admin'],
      },


      {
        title: 'GRN',
        path: paths.grn.roots,
        icon: ICONS.grn,
        allowedRoles: ['admin'],
      },

      {
        title: 'Approval',
        path: paths.approval.roots,
        icon: ICONS.approve,
        allowedRoles: ['approver'],
      },
    ],
  },
];
