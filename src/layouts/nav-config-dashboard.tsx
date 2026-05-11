import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
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
  FolderCopyIcon: <FolderCopyIcon fontSize="small" />,
  delivery: <LocalShippingIcon fontSize="small" />,
};
export const navData: NavSectionProps['data'] = [
  {
    items: [
      {
        title: 'Dashboard',
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
      },
      {
        title: 'RFQs',
        path: paths.quotations.root,
        icon: ICONS.rfq,
      },
      {
        title: 'Purchase Orders',
        path: paths.purchaseOrders.root,
        icon: ICONS.purchaseOrder,
      },
      {
        title: 'Delivery / Shipment',
        path: paths.delivery.root,
        icon: ICONS.delivery,
      },
      {
        title: 'Documents',
        path: paths.documents.root,
        icon: ICONS.FolderCopyIcon,
      },
    ],
  },
];
