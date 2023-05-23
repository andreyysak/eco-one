import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ProductState {
  products: Product[];
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // state.error = action.error.message;
        state.error = action.error?.message || 'An error occurred.';
      });
  },
});

export default productSlice.reducer;
