"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/store/slices/filtersSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const SORT_OPTIONS = [
  { value: "createdAt_asc", label: "Oldest Arrivals" },
  { value: "createdAt_desc", label: "Newest Arrivals" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Alphabetical (A-Z)" },
  { value: "name_desc", label: "Alphabetical (Z-A)" },
  { value: "brand_asc", label: "Brand Name (A-Z)" },
  { value: "brand_desc", label: "Brand Name (Z-A)" },
];

const MobileFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { brands, colors, selectedFilters } = useSelector(
    (state: RootState) => state.filters
  );

  const [openSheet, setOpenSheet] = useState<"brand" | "color" | "sort" | null>(
    null
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

  const handleSelect = (
    key: "brand" | "color" | "sortBy" | "order",
    value: string
  ) => {
    updateFilters({ [key]: value });
    setOpenSheet(null);
  };

  return (
    <div className="flex gap-2 w-full items-center">
      {/* ✅ Brand Filter */}
      <Sheet
        open={openSheet === "brand"}
        onOpenChange={(isOpen) => setOpenSheet(isOpen ? "brand" : null)}
      >
        <SheetTrigger asChild>
          <Button variant="outline" className="w-1/3">
            {selectedFilters.brand || "Brand: All"}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] p-6">
          <h2 className="text-xl font-bold mb-4">Select a Brand</h2>
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[75vh]">
            {brands.map((brand) => (
              <Button
                key={brand}
                variant="ghost"
                className="text-lg"
                onClick={() => handleSelect("brand", brand)}
              >
                {brand}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* ✅ Color Filter */}
      <Sheet
        open={openSheet === "color"}
        onOpenChange={(isOpen) => setOpenSheet(isOpen ? "color" : null)}
      >
        <SheetTrigger asChild>
          <Button variant="outline" className="w-1/3">
            {selectedFilters.color || "Color: All"}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] p-6">
          <h2 className="text-xl font-bold mb-4">Select a Color</h2>
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[75vh]">
            {colors.map((color) => (
              <Button
                key={color}
                variant="ghost"
                className="text-lg"
                onClick={() => handleSelect("color", color)}
              >
                {color}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* ✅ Sort Filter */}
      <Sheet
        open={openSheet === "sort"}
        onOpenChange={(isOpen) => setOpenSheet(isOpen ? "sort" : null)}
      >
        <SheetTrigger asChild>
          <Button variant="outline" className="w-1/3">
            {SORT_OPTIONS.find(
              (opt) =>
                opt.value ===
                `${selectedFilters.sortBy}_${selectedFilters.order}`
            )?.label || "Sort: Select"}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] p-6">
          <h2 className="text-xl font-bold mb-4">Sort By</h2>
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[75vh]">
            {SORT_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant="ghost"
                className="text-lg"
                onClick={() => {
                  const [field, direction] = option.value.split("_");
                  updateFilters({
                    sortBy: field as "price" | "name" | "brand",
                    order: direction as "asc" | "desc",
                  });
                  setOpenSheet(null);
                }}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileFilters;
