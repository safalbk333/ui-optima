// ----------------------------------------------------------------------

import { r } from 'node_modules/framer-motion/dist/types.d-CtuPurYT';

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  REQUEST: '/request',
  VENDOR: '/vendor',
  PRODUCTS: '/products',
  QUOTATIONS: '/quotations',
  PURCHASE_ORDERS: '/purchase_orders',
};

// ----------------------------------------------------------------------

export const paths = {
  components: '/components',
  faqs: '/faqs',
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
  },
  request: {
    root: ROOTS.REQUEST,
  },
  vendor: {
    root: ROOTS.VENDOR,
    management: `${ROOTS.VENDOR}/management`,
  },
  products: {
    root: ROOTS.PRODUCTS,
    products: `${ROOTS.PRODUCTS}/details`,
  },
  quotations: {
    root: ROOTS.QUOTATIONS,
    submit: `${ROOTS.QUOTATIONS}/submit_quotation`,
  },
  purchaseOrders: {
    root: ROOTS.PURCHASE_ORDERS,
    details: `${ROOTS.PURCHASE_ORDERS}/details`,
  },
};
