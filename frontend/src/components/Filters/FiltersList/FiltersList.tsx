"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  resetFilters,
  fetchFilters,
} from "@/store/slices/filtersSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/use-media-query";
import DesktopFilters from "@/components/Filters/DesktopFilters/DesktopFilters";
import MobileFilters from "@/components/Filters/MobileFilters/MobileFilters";
import { useEffect } from "react";

const FiltersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 500px)");

  const { minPrice, maxPrice, selectedFilters, brands, colors } = useSelector(
    (state: RootState) => state.filters
  );

  const updateFilters = (updates: Partial<typeof selectedFilters>) => {
    dispatch(setFilters(updates));
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) params.set(key, value.toString());
      else params.delete(key);
    });
    params.delete("page");

    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    dispatch(resetFilters());
    router.push(`${pathName}`);
  };

  useEffect(() => {
    if (!brands.length || !colors.length) {
      dispatch(fetchFilters());
    }
  }, [dispatch, brands, colors]);
  return (
    <div className="flex flex-col items-center w-full my-8 mx-auto p-4">
      {isMobile ? <MobileFilters /> : <DesktopFilters />}

      <div className="mt-4 w-full max-w-xl p-6 pb-12">
        <label className="block text-sm mb-4 text-gray-600 text-center">
          Price Range (€{selectedFilters.minPrice ?? minPrice} - €
          {selectedFilters.maxPrice ?? maxPrice})
        </label>
        <Slider
          className="mt-2 w-full"
          min={minPrice}
          max={maxPrice}
          step={5}
          value={[
            selectedFilters.minPrice ?? minPrice,
            selectedFilters.maxPrice ?? maxPrice,
          ]}
          onValueChange={(values: number[]) =>
            updateFilters({ minPrice: values[0], maxPrice: values[1] })
          }
        />
      </div>

      <Button variant="secondary" className="my-6" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
};

export default FiltersList;
