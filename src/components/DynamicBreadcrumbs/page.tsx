'use client';

import { Box, Typography, Breadcrumbs } from '@mui/material';

import React from 'react';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';

// Main container
const BreadcrumbContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

// Top action row
const TopRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

// Content block
const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
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

const PremiumBreadcrumbs: React.FC<PremiumBreadcrumbsProps> = ({ title, paths = [], action }) => {
  const router = useRouter();

  return (
    <BreadcrumbContainer>
      <TopRow>
        {/* Left Content */}
        <ContentWrapper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1, // increase/decrease spacing here
          }}
        >
          {' '}
          {/* Breadcrumbs */}
          {paths.length > 0 && (
            <Breadcrumbs
              separator={<Separator>/</Separator>}
              aria-label="breadcrumb"
              sx={{ mb: 0.2 }}
            >
              {paths.map((path, idx) => (
                <BreadcrumbLink key={idx} onClick={() => router.push(path.href)}>
                  {path.label}
                </BreadcrumbLink>
              ))}
            </Breadcrumbs>
          )}
          {/* Title */}
          <Typography fontSize={17} fontWeight={600} color="primary.main" lineHeight={1.2}>
            {title}
          </Typography>
        </ContentWrapper>

        {/* Always Top Right */}
        {action && (
          <Box ml={2} flexShrink={0}>
            {action}
          </Box>
        )}
      </TopRow>
    </BreadcrumbContainer>
  );
};

export default PremiumBreadcrumbs;
