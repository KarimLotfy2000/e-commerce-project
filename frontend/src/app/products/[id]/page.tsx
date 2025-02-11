import { ProductDescription } from "@/components/ProductDescription/ProductDescription";
import { SliderWithImagesBar } from "@/components/SliderWithImagesBar/SliderWithImagesBar";
import React, { Suspense } from "react";
import { ProductAccordion } from "@/components/ProductAccordion/ProductAccordion";
import { getProductById } from "@/lib/api/productService";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const [productId] = params.id.split("-");
  const product = await getProductById(parseInt(productId));

  return (
    <div className="flex flex-col">
      <div className="flex md:flex-row flex-col 2xl:gap-x-40  gap-x-5 mx-auto xl:justify-center md:items-start">
        <Suspense fallback={<LoadingSpinner />}>
          <SliderWithImagesBar images={product.images} />
        </Suspense>
        <div className="flex flex-col xl:mr-32 xl:ml-32 2xl:ml-14 md:max-w-[400px] md:w-1/3 gap-y-2">
          <ProductDescription discount={30} product={product} />
          <ProductAccordion
            brand={product.brand}
            category={product.categoryName}
            material={product.material}
            gender={product.gender}
          />
        </div>
      </div>
      <div className="p-10 flex flex-col"></div>
    </div>
  );
};

export default ProductPage;
