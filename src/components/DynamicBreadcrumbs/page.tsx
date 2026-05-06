'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Breadcrumbs } from '@mui/material';
import { styled } from '@mui/system';

// Main container
const BreadcrumbContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

// Top row
const TopRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  height: 40,
  position: 'relative',
});

// Title group
const TitleWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
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
  color: '#555',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#000000',
    textDecoration: 'none',
  },
});

// Separator
const Separator = styled(Typography)({
  color: '#aaa',
  fontSize: 14,
  marginLeft: 4,
  marginRight: 4,
});

interface PremiumBreadcrumbsProps {
  title: string;
  paths?: { label: string; href: string }[];
  action?: React.ReactNode;
}

const PremiumBreadcrumbs: React.FC<PremiumBreadcrumbsProps> = ({ title, paths = [], action }) => {
  const router = useRouter();

  return (
    <BreadcrumbContainer>
      {/* Top row */}
      <TopRow>
        <TitleWrapper>
          <Typography variant="h6" fontWeight={600} color="primary">
            {title}
          </Typography>
        </TitleWrapper>

        {action && <ActionWrapper>{action}</ActionWrapper>}
      </TopRow>

      {/* Breadcrumbs */}
      <Box mt={0.5}>
        <Breadcrumbs separator={<Separator>/</Separator>} aria-label="breadcrumb">
          {paths.map((path, idx) => (
            <BreadcrumbLink key={idx} variant="body2" onClick={() => router.push(path.href)}>
              {path.label}
            </BreadcrumbLink>
          ))}
        </Breadcrumbs>
      </Box>
    </BreadcrumbContainer>
  );
};

export default PremiumBreadcrumbs;
