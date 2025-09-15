// src/app/redux/slices/wishlistSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WishlistItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  images: string[];
  created_at: string;
}

interface WishlistState {
  items: WishlistItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  status: "idle",
  error: null,
};

// --------- THUNKS ----------

// Fetch wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId: number) => {
    const res = await axios.get(`/api/wishlist/${userId}`);
    return res.data.wishlist.map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      title: item.title,
      price: parseFloat(item.price),
      images: item.images,
      created_at: item.created_at,
    })) as WishlistItem[];
  }
);

// Add to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, productId }: { userId: number; productId: number }) => {
    const res = await axios.post(`/api/wishlist/${userId}`, { productId });
    return res.data.added; // returns one row
  }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ userId, productId }: { userId: number; productId: number }) => {
    await axios.delete(`/api/wishlist/${userId}`, { data: { productId } });
    return productId;
  }
);

// --------- SLICE ----------

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch wishlist";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload);
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.productId !== action.payload
        );
      });
  },
});

export default wishlistSlice.reducer;
