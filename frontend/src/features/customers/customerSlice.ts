import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCustomers } from '../../api/customer';
import type { Customer } from '../../types/customer';

export interface CustomerListState {
  customers: Customer[];
  loading: boolean;
  query: string;
  billingPeriod: string;
  currentPage: number;
  lastPage: number;
  total: number;
  from: number;
  to: number;
  cache: { [key: string]: any };
}

const initialState: CustomerListState = {
  customers: [],
  loading: false,
  query: '',
  billingPeriod: '',
  currentPage: 1,
  lastPage: 1,
  total: 0,
  from: 0,
  to: 0,
  cache: {},
};

export const getCustomers = createAsyncThunk(
  'customers/getCustomers',
  async (_, { getState }) => {
    const state = getState() as { customers: CustomerListState };
    const { query, billingPeriod, currentPage, cache } = state.customers;
    const cacheKey = `${query}_${billingPeriod}_${currentPage}`;

    if (cache[cacheKey]) {
      return { ...cache[cacheKey], fromCache: true };
    }

    const res = await fetchCustomers(query, billingPeriod, currentPage);
    return { ...res, cacheKey };
  }
);

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.currentPage = 1;
    },
    setBillingPeriod(state, action) {
      state.billingPeriod = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        const { data, last_page, total, from, to, cacheKey, fromCache } = action.payload;

        state.loading = false;
        if (fromCache) {
          const { data, last_page, total, from, to } = action.payload;
          state.customers = data;
          state.lastPage = last_page;
          state.total = total;
          state.from = from;
          state.to = to;
          state.loading = false;
          return;
        }

        state.customers = data;
        state.lastPage = last_page;
        state.total = total;
        state.from = from;
        state.to = to;

        if (cacheKey) {
          state.cache[cacheKey] = action.payload;
        }
      })
      .addCase(getCustomers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setQuery, setBillingPeriod, setCurrentPage } = customersSlice.actions;
export default customersSlice.reducer;
