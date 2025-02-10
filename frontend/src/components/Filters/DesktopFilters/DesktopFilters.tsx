"use client";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/store/slices/filtersSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
const DesktopFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { brands, colors, selectedFilters } = useSelector(
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

  return (
    <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
      {/* ✅ Brand Filter */}
      <Select
        value={selectedFilters.brand || ""}
        onValueChange={(value) => updateFilters({ brand: value })}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Select Brand" />
        </SelectTrigger>
        <SelectContent>
          {brands.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* ✅ Color Filter */}
      <Select
        value={selectedFilters.color || ""}
        onValueChange={(value) => updateFilters({ color: value })}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Select Color" />
        </SelectTrigger>
        <SelectContent>
          {colors.map((color) => (
            <SelectItem key={color} value={color}>
              {color}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* ✅ Sort Filter */}
      <Select
        value={`${selectedFilters.sortBy}_${selectedFilters.order}`}
        onValueChange={(value) => {
          const [field, direction] = value.split("_");
          updateFilters({
            sortBy: field as "price" | "name" | "brand",
            order: direction as "asc" | "desc",
          });
        }}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DesktopFilters;
