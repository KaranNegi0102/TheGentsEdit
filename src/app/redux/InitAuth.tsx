"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks/hooks";
import { fetchUserData } from "@/app/redux/slices/authSlice";

export default function InitAuth({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData()); // This runs once on app load
  }, [dispatch]);

  return <>{children}</>;
};