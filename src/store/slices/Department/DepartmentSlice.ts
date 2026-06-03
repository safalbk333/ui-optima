import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosOptima } from 'src/lib/axios';

// ----------------------------------------------------------------------

export interface Department {
  pk_chr_department_id: string;
  chr_department_name: string;
  chr_department_code: string;
  txt_description: string;
  bln_is_active: boolean;
  tim_created: string;
  tim_modified: string | null;
  fk_chr_created_id: string | null;
  fk_chr_modified_id: string | null;
  chr_document_status: string;
}

// ----------------------------------------------------------------------

interface DepartmentState {
  data: Department[];
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  data: [],
  loading: false,
  error: null,
};

// ----------------------------------------------------------------------
// GET ALL DEPARTMENTS
// ----------------------------------------------------------------------

export const fetchDepartments = createAsyncThunk(
  'departments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.get('/department');

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch departments'
      );
    }
  }
);

// ----------------------------------------------------------------------
// SLICE
// ----------------------------------------------------------------------

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    clearDepartments: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchDepartments.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDepartments } = departmentSlice.actions;

export default departmentSlice.reducer;