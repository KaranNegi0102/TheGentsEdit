// src/app/redux/slices/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId: number) => {
    const response = await axios.get(`/api/cart/${userId}`); //user id merko init auth me jaha call kra h waha se arhi h ik u guys gonna ask
    console.log("this is my response in cart slice", response);
    // return response.data.cart as CartItem[];
    return response.data.cart.map((item: any) => ({
      id: item.id, // cart row id (can keep)
      productId: item.product_id, // map product_id here
      quantity: item.quantity,
      title: item.title,
      price: item.price,
      description: item.description,
      images: item.images,
    })) as CartItem[];
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId }: { userId: number; productId: number }) => {
    const response = await axios.post(`/api/cart/${userId}`, {
      productId,
      quantity: 1,
    });
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }: { userId: number; productId: number }) => {
    const response = await axios.delete(`/api/cart/${userId}`, {
      data: { productId },
    });
    return response.data.removed;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({
    userId,
    productId,
    quantity,
  }: {
    userId: number;
    productId: number;
    quantity: number;
  }) => {
    const response = await axios.post(`/api/cart/${userId}`, {
      productId,
      quantity,
    });
    return response.data.cartItem;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // // ✅ Optimistic update reducer
    // addToCartOptimistic: (
    //   state,
    //   action: PayloadAction<{
    //     productId: number;
    //     title: string;
    //     price: number;
    //     description?: string;
    //     images?: string[];
    //   }>
    // ) => {
    //   const existing = state.items.find(
    //     (item) => item.productId === action.payload.productId
    //   );

    //   if (existing) {
    //     existing.quantity += 1;
    //   } else {
    //     state.items.push({
    //       id: Date.now(), // temporary id until backend returns real one
    //       productId: action.payload.productId,
    //       quantity: 1,
    //       title: action.payload.title,
    //       price: action.payload.price,
    //       description: action.payload.description || "",
    //       images: action.payload.images || [],
    //     });
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload; // add to  cart
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex(
          (item) => item.productId === updated.productId
        );
        if (idx >= 0) state.items[idx] = updated;
      });
  },
});

export const { addToCartOptimistic } = cartSlice.actions;
export default cartSlice.reducer;
