"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/slices/categoriesSlice";
import { RootState, AppDispatch } from "@/store/store";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (!categories || !categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  return <div>{children}</div>;
};

export default Layout;
