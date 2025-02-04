"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export default function Pagination({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
}: {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center mt-6 ">
      <p className="text-sm text-gray-500">
        Showing {(currentPage - 1) * pageSize + 1} -{" "}
        {Math.min(currentPage * pageSize, totalElements)} of {totalElements}{" "}
        products
      </p>
      <div className="flex justify-center mt-5 my-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={index + 1 === currentPage ? "primary" : "secondary"}
            className="mx-1"
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
