'use client';

import * as React from 'react';

import { Autocomplete, Box, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import type { RootState } from 'src/store/store';
import { fetchCategories } from 'src/store/slices/category/Category';
import { fetchDepartments } from 'src/store/slices/Department/DepartmentSlice';
import { setBasicInfo } from 'src/store/slices/PurchaseRequests/PRStepperFormSlice';

const commonTextFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#fff',
    fontSize: 13, // outer root
  },

  // input text
  '& .MuiInputBase-input': {
    fontSize: 13,
  },

  // select text
  '& .MuiSelect-select': {
    fontSize: 13,
  },

  // multiline textarea
  '& textarea': {
    fontSize: 13,
  },

  '& .MuiInputLabel-root': {
    fontSize: 12,
    fontWeight: 600,
  },
};

const commonTextFieldProps = {
  fullWidth: true,
  size: 'small' as const,
  InputLabelProps: {
    shrink: true,
  },
  sx: commonTextFieldSx,
};

export default function PurchaseRequestForm() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    priorityId: 'HIGH',
    estimatedValue: 0,
    currency: 'USD',
    departmentId: '',
    strCategoryId: '',
  });
  React.useEffect(() => {
    dispatch(setBasicInfo(formData));
  }, [formData, dispatch]);
  const { data: categories, loading } = useAppSelector((state: RootState) => state.categories);
  console.log(categories, 'categories');
  const { data: departments, loading: deptLoading } = useAppSelector(
    (state: RootState) => state.departments
  );
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={3}>
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: 13,
            }}
          >
            Basic Information
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              mt: 0.5,
              fontSize: 13,

              maxWidth: 700,
              lineHeight: 1.7,
            }}
          >
            Enter the core procurement request details including request title, department, required
            date, vendor preference, and purchase justification to initiate the P2P approval
            workflow.
          </Typography>
        </Box>
        {/* PR Title */}
        <Grid size={{ xs: 12 }}>
          <TextField
            label="PR TITLE"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            {...commonTextFieldProps}
          />
        </Grid>

        {/* Department */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Autocomplete
            fullWidth
            options={departments || []}
            loading={deptLoading}
            size="small"
            value={
              departments?.find((d) => d.pk_chr_department_id === formData.departmentId) || null
            }
            getOptionLabel={(option) => option?.chr_department_name || ''}
            isOptionEqualToValue={(option, value) =>
              option.pk_chr_department_id === value.pk_chr_department_id
            }
            onChange={(_, value) =>
              setFormData({
                ...formData,
                departmentId: value?.pk_chr_department_id || '',
              })
            }
            renderInput={(params) => (
              <TextField {...params} label="DEPARTMENT *" {...commonTextFieldProps} />
            )}
          />
        </Grid>
        {/* Currency */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            label="Priority"
            value={formData.priorityId}
            onChange={(e) =>
              setFormData({
                ...formData,
                priorityId: e.target.value,
              })
            }
            {...commonTextFieldProps}
          >
            <MenuItem value="fb316a20-946b-44b8-bb54-d113e2fc3de9">Low</MenuItem>
            <MenuItem value="8f8e7d6c-5b4a-4321-9876-abcdef123455">Medium</MenuItem>
            <MenuItem value="ca5a78c8-6d50-445d-ab78-1628426c0a3f">High</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Autocomplete
            options={categories || []}
            loading={loading}
            size="small"
            value={categories?.find((c) => c.pk_chr_category_id === formData.strCategoryId) || null}
            getOptionLabel={(option) => option?.chr_category_name || ''}
            isOptionEqualToValue={(option, value) =>
              option.pk_chr_category_id === value.pk_chr_category_id
            }
            onChange={(_, value) => {
              setFormData((prev) => ({
                ...prev,
                strCategoryId: value?.pk_chr_category_id || '',
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="CATEGORY" {...commonTextFieldProps} />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="CURRENCY" value="USD" disabled {...commonTextFieldProps} />
        </Grid>

        {/* Estimated Value */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="ESTIMATED VALUE"
            type="number"
            value={formData.estimatedValue}
            onChange={(e) =>
              setFormData({
                ...formData,
                estimatedValue: Number(e.target.value),
              })
            }
            placeholder="0.00"
            {...commonTextFieldProps}
          />
        </Grid>

        {/* Required By */}
        {/* <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="REQUIRED BY *"
            type="date"
            {...commonTextFieldProps}
          />
        </Grid> */}

        {/* Cost Centre */}

        <Grid size={{ xs: 12 }}>
          <TextField
            label="DESCRIPTION"
            multiline
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            rows={3}
            {...commonTextFieldProps}
            sx={{
              ...commonTextFieldSx,
              '& .MuiOutlinedInput-root': {
                ...commonTextFieldSx['& .MuiOutlinedInput-root'],
                alignItems: 'flex-start',
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
