"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { RootState, AppDispatch } from "@/store/store";
import { setFilters } from "@/store/slices/filtersSlice";

export const useSyncFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedFilters = useSelector(
    (state: RootState) => state.filters.selectedFilters
  );

  useEffect(() => {
    const newFilters = {
      brand: searchParams.get("brand") || undefined,
      color: searchParams.get("color") || undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      sortBy: searchParams.get("sortBy") || "createdAt",
      order: searchParams.get("order") || "asc",
    };
    dispatch(setFilters(newFilters));
  }, [searchParams, dispatch]);

  const updateFilters = (updates: Partial<typeof selectedFilters>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return { selectedFilters, updateFilters };
};
