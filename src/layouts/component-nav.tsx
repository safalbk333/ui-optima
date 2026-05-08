import type { NavItemData } from '../layouts/nav-config-components';

import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { NavItem } from './component-nav-item';
import { componentLayoutClasses } from '../layouts/classes';
// import { NavSearch } from './component-search';

// ----------------------------------------------------------------------

type NavRootProps = React.ComponentProps<typeof NavRoot>;

const NavRoot = styled('div')(({ theme }) => ({
  maxHeight: 800,
  display: 'none',
  position: 'sticky',
  alignSelf: 'start',
  flexDirection: 'column',
  padding: theme.spacing(0, 'var(--nav-gutters)'),
  top: 'calc(var(--layout-header-desktop-height) + 24px)',
}));

const NavSection = styled('nav')({
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
});

const NavUl = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
});

const NavLi = styled('li')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

// ----------------------------------------------------------------------

type PrimaryNavProps = NavRootProps & {
  navData?: {
    title: string;
    items: NavItemData[];
  }[];
};

export function PrimaryNav({ sx, navData, className, ...other }: PrimaryNavProps) {
  return (

    <NavRoot
      className={mergeClasses([componentLayoutClasses.primaryNav, className])}
      sx={sx}
      {...other}
    >
      {/* <NavSearch navData={navData} sx={{ mb: 4 }} /> */}


    </NavRoot>
  );
}

// ----------------------------------------------------------------------

type SecondaryNavProps = NavRootProps & {
  activeItem: number | null;
  onClickItem: (index: number) => void;
  navData?: {
    name: string;
    description?: React.ReactNode;
    component: React.ReactNode;
  }[];
};

export function SecondaryNav({
  sx,
  navData,
  className,
  onClickItem,
  activeItem,
  ...other
}: SecondaryNavProps) {
  return (
    <NavRoot
      className={mergeClasses([componentLayoutClasses.secondaryNav, className])}
      sx={sx}
      {...other}
    >
      <NavSection>
        <NavUl sx={{ gap: 'var(--secondary-nav-item-gap)' }}>
          <NavLi sx={{ mb: 1, typography: 'overline' }}>On this page</NavLi>

          {navData?.map((item, index) => (
            <NavLi key={item.name}>
              <NavItem isActive={activeItem === index} onClick={() => onClickItem(index)}>
                {index + 1} - {item.name}
              </NavItem>
            </NavLi>
          ))}
        </NavUl>
      </NavSection>
    </NavRoot>
  );
}
