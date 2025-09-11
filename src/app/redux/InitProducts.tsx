"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks/hooks";
import { fetchProducts } from "@/app/redux/slices/productSlice";

export default function InitProducts({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); // fetch products once on app load
  }, [dispatch]);

  return <>{children}</>;
}
