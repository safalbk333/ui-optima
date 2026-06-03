import { NavSectionMini, NavSectionVertical } from 'src/components/nav-section';
import { mergeClasses, varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import { Logo } from 'src/components/logo';
import type { NavSectionProps } from 'src/components/nav-section';
import { NavToggleButton } from '../components/nav-toggle-button';
import { NavUpgrade } from '../components/nav-upgrade';
import { Scrollbar } from 'src/components/scrollbar';
import Typography from '@mui/material/Typography';
import { layoutClasses } from '../core';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type NavVerticalProps = React.ComponentProps<'div'> &
  NavSectionProps & {
    isNavMini: boolean;
    layoutQuery?: Breakpoint;
    onToggleNav: () => void;
    slots?: {
      topArea?: React.ReactNode;
      bottomArea?: React.ReactNode;
    };
  };

function Wordmark({ text }: { text: string }) {
  const firstA = text.toUpperCase().indexOf('A');

  return (
    <Typography
      component="span"
      sx={{
        fontWeight: 800,
        fontSize: { xs: '1.05rem', md: '1.35rem' },
        letterSpacing: '0.04em',
        color: '#fff',
        lineHeight: 1,
      }}
    >
      {text.split('').map((ch, i) => {
        const isFirstA = firstA >= 0 && i === firstA && ch.toUpperCase() === 'A';

        if (isFirstA) {
          return (
            <Box
              key={`${i}-${ch}`}
              component="span"
              sx={{
                position: 'relative',
                display: 'inline-block',
                px: '0.02em',
                color: 'primary.main',
              }}
            >
              {ch}

              <Box
                component="span"
                sx={{
                  position: 'absolute',
                  left: '50%',
                  bottom: -4,
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderBottom: '6px solid #fff',
                }}
              />
            </Box>
          );
        }

        return (
          <Box key={`${i}-${ch}`} component="span" sx={{ color: 'primary.main' }}>
            {ch}
          </Box>
        );
      })}
    </Typography>
  );
}
export function NavVertical({
  sx,
  data,
  slots,
  cssVars,
  className,
  isNavMini,
  onToggleNav,
  checkPermissions,
  layoutQuery = 'md',
  ...other
}: NavVerticalProps) {
  const renderNavVertical = () => (
    <>
      {slots?.topArea ?? (
        <Box sx={{ pl: 3.5, pt: 3.5, pb: 2.5 }}>
          {/* <Logo /> */}
          <Wordmark text="OPTIMA" />
        </Box>
      )}

      <Scrollbar fillContent>
        <NavSectionVertical
          data={data}
          cssVars={cssVars}
          checkPermissions={checkPermissions}
          sx={{ px: 2, flex: '1 1 auto' }}
        />

        {slots?.bottomArea ?? <NavUpgrade />}
      </Scrollbar>
    </>
  );

  const renderNavMini = () => (
    <>
      {slots?.topArea ?? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2.5 }}>
          <Logo />
        </Box>
      )}

      <NavSectionMini
        data={data}
        cssVars={cssVars}
        checkPermissions={checkPermissions}
        sx={[
          (theme) => ({
            ...theme.mixins.hideScrollY,
            pb: 2,
            px: 0.5,
            flex: '1 1 auto',
            overflowY: 'auto',
          }),
        ]}
      />

      {slots?.bottomArea}
    </>
  );

  return (
    <NavRoot
      isNavMini={isNavMini}
      layoutQuery={layoutQuery}
      className={mergeClasses([layoutClasses.nav.root, layoutClasses.nav.vertical, className])}
      sx={sx}
      {...other}
    >
      <NavToggleButton
        isNavMini={isNavMini}
        onClick={onToggleNav}
        sx={[
          (theme) => ({
            display: 'none',
            [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
          }),
        ]}
      />
      {isNavMini ? renderNavMini() : renderNavVertical()}
    </NavRoot>
  );
}

// ----------------------------------------------------------------------

const NavRoot = styled('div', {
  shouldForwardProp: (prop: string) => !['isNavMini', 'layoutQuery', 'sx'].includes(prop),
})<Pick<NavVerticalProps, 'isNavMini' | 'layoutQuery'>>(
  ({ isNavMini, layoutQuery = 'md', theme }) => ({
    top: 0,
    left: 0,
    height: '100%',
    display: 'none',
    position: 'fixed',
    flexDirection: 'column',
    zIndex: 'var(--layout-nav-zIndex)',
    backgroundColor: 'transparent',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      // background: varAlpha(theme.vars.palette.common.blackChannel, 0.01), // light shade
      pointerEvents: 'none',
    },

    // 👉 Ensure content is above overlay
    '& > *': {
      zIndex: 1,
    },
    width: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
    borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
    transition: theme.transitions.create(['width'], {
      easing: 'var(--layout-transition-easing)',
      duration: 'var(--layout-transition-duration)',
    }),
    [theme.breakpoints.up(layoutQuery)]: { display: 'flex' },
  })
);
