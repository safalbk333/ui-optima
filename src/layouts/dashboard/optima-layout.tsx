'use client';

import type { Breakpoint } from '@mui/material/styles';
import type { NavSectionProps } from 'src/components/nav-section';
import type { MainSectionProps, LayoutSectionProps, HeaderSectionProps } from '../core';

import { merge } from 'es-toolkit';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { _contacts, _notifications } from 'src/_mock';

import { Logo } from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';


import { _account } from '../nav-config-account';
import { Searchbar } from '../components/searchbar';
import { AccountDrawer } from '../components/account-drawer';
import { SettingsButton } from '../components/settings-button';
import { LanguagePopover } from '../components/language-popover';
import { ContactsPopover } from '../components/contacts-popover';
import { navData as dashboardNavData } from '../nav-config-dashboard';
import { dashboardLayoutVars, dashboardNavColorVars } from './css-vars';
import { NotificationsDrawer } from '../components/notifications-drawer';

import { MainSection, HeaderSection, LayoutSection } from '../core';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type TopNavLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavSectionProps['data'];
    };
    main?: MainSectionProps;
  };
};

export function TopNavLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: TopNavLayoutProps) {
  const theme = useTheme();
  const settings = useSettingsContext();

  const navVars = dashboardNavColorVars(theme, settings.state.navColor, 'horizontal');

  const navData = slotProps?.nav?.data ?? dashboardNavData;

  // ---------------- HEADER ----------------
  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false,
        sx: {
          bgcolor: 'var(--layout-nav-bg)',
        },
      },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          Info banner
        </Alert>
      ),

    //   bottomArea: (
    //     <NavHorizontal
    //       data={navData}
    //       layoutQuery={layoutQuery}
    //       cssVars={navVars.section}
    //       checkPermissions={canDisplayItemByRole}
    //     />
    //   ),

      leftArea: (
        <>
          {/* Mobile Menu */}
          {/* <MenuButton
            onClick={onOpen}
            sx={{ mr: 1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
          />

          <NavMobile
            data={navData}
            open={open}
            onClose={onClose}
            cssVars={navVars.section}
            checkPermissions={canDisplayItemByRole}
          /> */}

          {/* Logo */}
          <Logo sx={{ display: 'inline-flex' }} />
        </>
      ),

      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Searchbar data={navData} />

          <LanguagePopover
            data={[
              { value: 'en', label: 'English', countryCode: 'GB' },
              { value: 'fr', label: 'French', countryCode: 'FR' },
            ]}
          />

          <NotificationsDrawer data={_notifications} />
          <ContactsPopover data={_contacts} />

          <SettingsButton />
          <AccountDrawer data={_account} />
        </Box>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
      />
    );
  };

  // ---------------- MAIN ----------------
  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      headerSection={renderHeader()}
      sidebarSection={null} // ❌ NO SIDEBAR
      footerSection={null}
      cssVars={{ ...dashboardLayoutVars(theme), ...navVars.layout, ...cssVars }}
      sx={sx}
    >
      {renderMain()}
    </LayoutSection>
  );
}