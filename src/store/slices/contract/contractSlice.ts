import { ContractState, CreateContractPayload, CreateContractResponse } from 'src/types/contracts';
import { GetTemplateByCodePayload, GetTemplateByCodeResponse } from 'src/types/contractTemplate';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { contractAxiosLib } from 'src/lib/contractAxiosLib';

const initialState: ContractState = {
  templateByCodeLoading: false,
  templateByCodeData: null,
  templateByCodeError: false,
  templateByCodeErrorMessage: '',
  templateHtmlContentData: '',

  // create contract
  createContractLoading: false,
  createContractData: null,
  createContractError: false,
  createContractErrorMessage: '',
};

export const fetchTemplateByCode = createAsyncThunk<
  GetTemplateByCodeResponse,
  GetTemplateByCodePayload,
  { rejectValue: string }
>('template/fetchTemplateByCode', async (payload, { rejectWithValue }) => {
  try {
    const response = await contractAxiosLib.post<GetTemplateByCodeResponse>(
      '/template/get-by-code',
      payload
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to fetch template');
  }
});

export const createContract = createAsyncThunk<
  CreateContractResponse,
  CreateContractPayload,
  { rejectValue: string }
>('contract/createContract', async (payload, { rejectWithValue }) => {
  try {
    const response = await contractAxiosLib.post('/contract', payload);

    if (!response.data?.success) {
      return rejectWithValue(
        response.data?.errors || response.data?.message || 'Failed to create contract'
      );
    }

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to create contract');
  }
});

const contractSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    resetTemplateByCodeState: (state) => {
      state.templateByCodeLoading = false;
      state.templateByCodeData = null;
      state.templateByCodeError = false;
      state.templateByCodeErrorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplateByCode.pending, (state) => {
        state.templateByCodeLoading = true;
        state.templateByCodeError = false;
        state.templateByCodeErrorMessage = '';
      })
      .addCase(fetchTemplateByCode.fulfilled, (state, action) => {
        state.templateByCodeLoading = false;
        state.templateByCodeData = action.payload;

        // template html
        state.templateHtmlContentData = action.payload?.data?.txt_html_content || '';
      })
      .addCase(fetchTemplateByCode.rejected, (state, action) => {
        state.templateByCodeLoading = false;
        state.templateByCodeError = true;
        state.templateByCodeErrorMessage = action.payload || 'Failed to fetch template';
      })

      // create contract
      .addCase(createContract.pending, (state) => {
        state.createContractLoading = true;
        state.createContractError = false;
        state.createContractErrorMessage = '';
      })

      .addCase(createContract.fulfilled, (state, action) => {
        state.createContractLoading = false;
        state.createContractData = action.payload;
        state.createContractError = false;
        state.createContractErrorMessage = '';
      })

      .addCase(createContract.rejected, (state, action) => {
        state.createContractLoading = false;
        state.createContractError = true;
        state.createContractErrorMessage = action.payload || 'Failed to create contract';
      });
  },
});

export const { resetTemplateByCodeState } = contractSlice.actions;

export default contractSlice.reducer;
