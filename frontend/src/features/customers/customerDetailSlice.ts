import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCustomerById } from '../../api/customer';
import type { CustomerDetail } from '../../types/customer';

interface CustomerDetailState {
  customerById: { [id: number]: CustomerDetail };
  loading: boolean;
}

const initialState: CustomerDetailState = {
  customerById: {},
  loading: false,
};

export const getCustomerById = createAsyncThunk(
  'customerDetail/getCustomerById',
  async (id: number, { getState }) => {
    const state = getState() as { customerDetail: CustomerDetailState };
    const cached = state.customerDetail.customerById[id];
    if (cached) return { customer: cached, fromCache: true };

    const res = await fetchCustomerById(id);
    return { customer: res, id };
  }
);

const customerDetailSlice = createSlice({
  name: 'customerDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        const { customer, id, fromCache } = action.payload;
        state.loading = false;
        if (!fromCache && id) {
          state.customerById[id] = customer;
        }
      })
      .addCase(getCustomerById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default customerDetailSlice.reducer;
