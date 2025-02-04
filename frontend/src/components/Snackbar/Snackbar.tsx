"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { clearError } from "@/store/slices/errorSlice";
import { useToast } from "@/hooks/use-toast";

const Snackbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { message, type } = useSelector((state: RootState) => state.error);
  const { toast } = useToast();

  useEffect(() => {
    if (message) {
      toast({
        description: message,
        variant:
          type === "error"
            ? "destructive"
            : type === "success"
            ? "success"
            : "default",
      });

      setTimeout(() => dispatch(clearError()), 2000);
    }
  }, [message, dispatch, toast]);

  return null;
};

export default Snackbar;
