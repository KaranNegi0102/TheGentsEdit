import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

interface Product{
  id:number,
  title: string;
  category: string;
  price: number;
  description: string;
  stock_quantity: number;
  images: string[];
  brand: string;
  best_seller: boolean;
  created_at: string;
  updated_at: string;
}

interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState : ProductState = {
  products:[],
  status:"idle",
  error:null,
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async()=>{
    const response = await axios.get("/api/getProduct");
    return response.data.product as Product[];
  }
)

const productSlice = createSlice({
  name:"products",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchProducts.pending,(state)=>{
      state.status="loading";
    })
    .addCase(fetchProducts.fulfilled,(state,action)=>{
      state.status="succeeded";
      state.products = action.payload;
    })
    .addCase(fetchProducts.rejected,(state,action)=>{
      state.status="failed";
      state.error = action.error.message || "Failed to fetch products";
    });
  }
})

export default productSlice.reducer;