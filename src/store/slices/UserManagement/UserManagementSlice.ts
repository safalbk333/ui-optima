import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosOptima } from 'src/lib/axios';

// ----------------------------------------------------------------------

export interface Role {
  pk_role_id: string;
  role_name: string;
  role_code: string;
  description: string | null;
  is_active: boolean;
  created: string;
  modified: string;
  fk_created_id: string | null;
  fk_modified_id: string | null;
  is_delete: boolean;
}

export interface User {
  pk_user_id: string;
  keycloak_id: string;
  fk_role_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  is_active: boolean;
  created: string;
  modified: string;
  fk_created_id: string | null;
  fk_modified_id: string | null;
  fk_company_id: string;
  is_delete: boolean;
  roles: Role;
}

export interface CreateUserPayload {
  userName: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  password: string;
  userPhone: string;
  fkRoleId: string;
  fkCompanyId: string;
  schemaId: string;
}

// ----------------------------------------------------------------------

interface UserManagementState {
  data: User[];
  selectedUser: User | null;
  loading: boolean;
  selectedUserLoading: boolean;
  creating: boolean;
  error: string | null;
  selectedUserError: string | null;
  createError: string | null;
}

const initialState: UserManagementState = {
  data: [],
  selectedUser: null,
  loading: false,
  selectedUserLoading: false,
  creating: false,
  error: null,
  selectedUserError: null,
  createError: null,
};

// ----------------------------------------------------------------------
// GET ALL USERS
// ----------------------------------------------------------------------

export const fetchUsers = createAsyncThunk(
  'userManagement/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.get('/users');

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch users'
      );
    }
  }
);

// ----------------------------------------------------------------------
// GET USER BY ID
// ----------------------------------------------------------------------

export const fetchUserById = createAsyncThunk(
  'userManagement/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.get(`/users/${id}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch user'
      );
    }
  }
);

// ----------------------------------------------------------------------
// CREATE USER
// ----------------------------------------------------------------------

export const createUser = createAsyncThunk(
  'userManagement/create',
  async (payload: CreateUserPayload, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.post('/users', payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to create user'
      );
    }
  }
);

// ----------------------------------------------------------------------
// SLICE
// ----------------------------------------------------------------------

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.data = [];
      state.error = null;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
      state.selectedUserError = null;
    },
    clearCreateError: (state) => {
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserById.pending, (state) => {
        state.selectedUserLoading = true;
        state.selectedUserError = null;
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUser = action.payload;
      })

      .addCase(fetchUserById.rejected, (state, action: any) => {
        state.selectedUserLoading = false;
        state.selectedUserError = action.payload;
      })

      .addCase(createUser.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.creating = false;
        state.data.push(action.payload);
      })

      .addCase(createUser.rejected, (state, action: any) => {
        state.creating = false;
        state.createError = action.payload;
      });
  },
});

export const { clearUsers, clearSelectedUser, clearCreateError } =
  userManagementSlice.actions;

export default userManagementSlice.reducer;