import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------

export interface Category {
  pk_chr_category_id: string;
  chr_category_name: string;
  bln_is_active: boolean;
  chr_document_status: string;
  dt_deleted_at: string | null;
  tim_created: string;
  tim_modified: string | null;
  fk_chr_created_id: string | null;
  fk_chr_modified_id: string | null;
}

interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: null,
};

// ----------------------------------------------------------------------
// GET ALL CATEGORIES
// ----------------------------------------------------------------------

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category`
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch categories'
      );
    }
  }
);

// ----------------------------------------------------------------------
// SLICE
// ----------------------------------------------------------------------

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategories } = categorySlice.actions;

export default categorySlice.reducer;