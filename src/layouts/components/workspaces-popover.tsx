'use client';

import type { ButtonBaseProps } from '@mui/material/ButtonBase';



// ----------------------------------------------------------------------

export type WorkspacesPopoverProps = ButtonBaseProps & {
  data?: {
    id: string;
    name: string;
    logo: string;
    plan: string;
  }[];
};


