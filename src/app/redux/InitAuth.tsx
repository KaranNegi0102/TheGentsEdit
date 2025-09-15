"use client";

import { useEffect } from "react";
import { useAppDispatch ,useAppSelector} from "@/app/hooks/hooks";
import { fetchUserData } from "@/app/redux/slices/authSlice";
import { fetchCart } from "@/app/redux/slices/cartSlice";
import {fetchWishlist} from "@/app/redux/slices/wishlistSlice";

export default function InitAuth({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserData()); // This runs once on app load
  }, [dispatch]);

  useEffect(()=>{
    if(userData?.id){
      dispatch(fetchCart(userData.id))
    }
  },[userData?.id,dispatch])


  useEffect(()=>{
    if(userData?.id){
      dispatch(fetchWishlist(userData.id))
    }
  },[userData?.id,dispatch])


  return <>{children}</>;
};