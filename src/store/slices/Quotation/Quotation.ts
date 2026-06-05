import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosOptima } from 'src/lib/axios';

// ----------------------------------------------------------------------

export interface QuotationItem {
  pk_chr_quotation_item_id: string;
  fk_chr_quotation_id: string;
  fk_chr_vendor_item_id: string;
  chr_item_description: string;
  int_quantity: number;
  chr_unit_of_measure: string;
  flt_unit_price: number;
  flt_tax_percentage: number;
  flt_tax_amount: number;
  flt_total_price: number;
  chr_currency: string;
  txt_notes: string;
  tim_created: string;
  tim_modified: string | null;
  fk_chr_created_id: string | null;
  fk_chr_modified_id: string | null;
  txt_rendered_html: string | null;
  chr_document_status: string;
}

export interface Quotation {
  pk_chr_quotation_id: string;
  fk_chr_vendor_id: string;
  fk_chr_rfq_id: string;
  fk_chr_category_id: string | null;
  fk_chr_buyer_id: string;
  chr_status: string;
  flt_total_amount: number;
  chr_currency: string;
  dt_issue_date: string;
  dt_due_date: string;
  txt_notes: string;
  tim_created: string;
  tim_modified: string | null;
  fk_chr_created_id: string | null;
  fk_chr_modified_id: string | null;
  chr_document_status: string;
  chr_buyer_details: string;
  chr_seller_details: string;
  txt_rendered_html: string;

  vendor: {
    pk_chr_vendor_id: string;
    chr_vendor_name: string;
    chr_vendor_email: string;
  };

  rfq: {
    pk_chr_rfq_id: string;
    chr_rfq_code: string;
    chr_rfq_title: string;
  };

  category: any;

  buyer: {
    pk_chr_user_id: string;
    chr_user_name: string;
    chr_user_email: string;
  };

  quotation_items: QuotationItem[];
}

interface QuotationState {
  data: Quotation[];
  selectedQuotation: Quotation | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuotationState = {
  data: [],
  selectedQuotation: null,
  loading: false,
  error: null,
};

// ----------------------------------------------------------------------
// FETCH ALL QUOTATIONS
// ----------------------------------------------------------------------

export const fetchQuotations = createAsyncThunk(
  'quotations/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.get('/quotation');

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          'Failed to fetch quotations'
      );
    }
  }
);

// ----------------------------------------------------------------------
// FETCH QUOTATION BY ID
// ----------------------------------------------------------------------

export const fetchQuotationById = createAsyncThunk(
  'quotations/fetchById',
  async (quotationId: string, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.get(
        `/quotation/${quotationId}`
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          'Failed to fetch quotation'
      );
    }
  }
);

// ----------------------------------------------------------------------

const quotationSlice = createSlice({
  name: 'quotations',
  initialState,

  reducers: {
    clearQuotations: (state) => {
      state.data = [];
      state.selectedQuotation = null;
      state.error = null;
    },

    clearSelectedQuotation: (state) => {
      state.selectedQuotation = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch All Quotations
      .addCase(fetchQuotations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchQuotations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchQuotations.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Quotation By ID
      .addCase(fetchQuotationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchQuotationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedQuotation = action.payload;
      })

      .addCase(fetchQuotationById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ----------------------------------------------------------------------

export const {
  clearQuotations,
  clearSelectedQuotation,
} = quotationSlice.actions;

export default quotationSlice.reducer;