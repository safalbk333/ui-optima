import categoryReducer from './slices/category/Category'
import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './slices/Item/Items'
import purchaseRequestReducer from './slices/PurchaseRequests/PurchaseRequestsSlice'
import purchaseRequestStepperReducer from './slices/PurchaseRequests/PRStepperFormSlice'
import vendorReducer from './slices/vendor/VendorSlice'

export const store = configureStore({
  reducer: {
    purchaseRequests: purchaseRequestReducer,
     categories: categoryReducer,
     purchaseRequest: purchaseRequestStepperReducer,
      items: itemReducer,
      vendors: vendorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;