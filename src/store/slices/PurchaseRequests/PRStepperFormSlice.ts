import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface BasicInfo {
  title: string;
  description: string;
  priorityId: string;
  estimatedValue: number;
  currency: string;
  departmentId: string;
}

interface LineItem {
  itemId: string;
  categoryId: string;
  quantity: number;
  uom: string;
}

interface PurchaseRequestState {
  basicInfo: BasicInfo;
  lineItems: LineItem[];
  attachments: any[];
}

const initialState: PurchaseRequestState = {
  basicInfo: {
    title: '',
    description: '',
    priorityId: '',
    estimatedValue: 0,
    currency: 'USD',
    departmentId: '',
  },
  lineItems: [],
  attachments: [],
};

const purchaseRequestSlice = createSlice({
  name: 'purchaseRequest',
  initialState,
  reducers: {
    setBasicInfo(state, action: PayloadAction<BasicInfo>) {
      state.basicInfo = action.payload;
    },

    setLineItems(state, action: PayloadAction<LineItem[]>) {
      state.lineItems = action.payload;
    },

    setAttachments(state, action: PayloadAction<any[]>) {
      state.attachments = action.payload;
    },

    resetPurchaseRequest() {
      return initialState;
    },
  },
});

export const {
  setBasicInfo,
  setLineItems,
  setAttachments,
  resetPurchaseRequest,
} = purchaseRequestSlice.actions;

export default purchaseRequestSlice.reducer;