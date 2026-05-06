import type { NavMainProps } from './main/nav/types';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData: NavMainProps['data'] = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" /> },
  {
    title: 'Components',
    path: paths.components,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'About us', path: paths.about },
          { title: 'Contact us', path: paths.contact },
          { title: 'FAQs', path: paths.faqs },
          { title: 'Pricing', path: paths.pricing },
          { title: 'Payment', path: paths.payment },
          { title: 'Maintenance', path: paths.maintenance },
          { title: 'Coming soon', path: paths.comingSoon },
        ],
      },

      { subheader: 'Dashboard', items: [{ title: 'Dashboard', path: CONFIG.auth.redirectPath }] },
    ],
  },
  {
    title: 'Docs',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: paths.minimalStore,
  },
];
