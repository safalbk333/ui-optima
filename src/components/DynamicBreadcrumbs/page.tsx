'use client';

import { Box, Breadcrumbs, Typography } from '@mui/material';

import React from 'react';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';

// Main container
const BreadcrumbContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

// Top row
const TopRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  height: 34,
  position: 'relative',
});

// Title group
const TitleWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

// Action container
const ActionWrapper = styled(Box)({
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
});

// Breadcrumb link
const BreadcrumbLink = styled(Typography)({
  fontWeight: 500,
  color: '#6b7280',
  cursor: 'pointer',
  fontSize: 11,
  transition: 'all 0.2s ease',

  '&:hover': {
    color: '#111827',
  },
});

// Separator
const Separator = styled(Typography)({
  color: '#9ca3af',
  fontSize: 10,
  marginLeft: 2,
  marginRight: 2,
});

interface PremiumBreadcrumbsProps {
  title: string;
  paths?: { label: string; href: string }[];
  action?: React.ReactNode;
}

const PremiumBreadcrumbs: React.FC<PremiumBreadcrumbsProps> = ({
  title,
  paths = [],
  action,
}) => {
  const router = useRouter();

  return (
    <BreadcrumbContainer>
      {/* Top row */}
      <TopRow>
        <TitleWrapper>
          <Typography
            fontSize={15}
            fontWeight={600}
            color="primary.main"
          >
            {title}
          </Typography>
        </TitleWrapper>

        {action && <ActionWrapper>{action}</ActionWrapper>}
      </TopRow>

      {/* Breadcrumbs */}
      <Box mt={0.2}>
        <Breadcrumbs
          separator={<Separator>/</Separator>}
          aria-label="breadcrumb"
        >
          {paths.map((path, idx) => (
            <BreadcrumbLink
              key={idx}
              onClick={() => router.push(path.href)}
            >
              {path.label}
            </BreadcrumbLink>
          ))}
        </Breadcrumbs>
      </Box>
    </BreadcrumbContainer>
  );
};

export default PremiumBreadcrumbs;