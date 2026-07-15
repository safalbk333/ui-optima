import categoryReducer from './slices/category/Category';
import { configureStore } from '@reduxjs/toolkit';
import contractReducer from './slices/contract/contractSlice'
import departmentsReducer from './slices/Department/DepartmentSlice'
import eoiReducer from './slices/Eoi/EoiSlice'
import goodsReceiptReducer from './slices/Grn/GrnSlice'
import itemReducer from './slices/Item/Items'
import purchaseOrderReducer from './slices/PurchaseOrder/PRSlice'
import purchaseRequestReducer from './slices/PurchaseRequests/PurchaseRequestsSlice'
import purchaseRequestStepperReducer from './slices/PurchaseRequests/PRStepperFormSlice'
import quotationsReducer from './slices/Quotation/Quotation'
import rfqReducer from './slices/Rfq/RfqSlice'
import vendorReducer from './slices/vendor/VendorSlice'
import userManagementReducer from './slices/UserManagement/UserManagementSlice'

export const store = configureStore({
  reducer: {
    purchaseRequests: purchaseRequestReducer,
    categories: categoryReducer,
    purchaseRequest: purchaseRequestStepperReducer,
    items: itemReducer,
    vendors: vendorReducer,
    departments: departmentsReducer,
    rfq: rfqReducer,
    eoi: eoiReducer,
         purchaseOrder:purchaseOrderReducer,
         quotations:quotationsReducer,
         goodsReceipt:goodsReceiptReducer,
    contract: contractReducer,
    userManagement: userManagementReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
