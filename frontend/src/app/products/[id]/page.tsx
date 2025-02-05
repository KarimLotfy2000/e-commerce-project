import { ProductDescription } from "@/components/ProductDescription/ProductDescription";
import { SliderWithImagesBar } from "@/components/SliderWithImagesBar/SliderWithImagesBar";
import React from "react";
import { ProductAccordion } from "@/components/ProductAccordion/ProductAccordion";
import { RecommendedItemsSlider } from "@/components/RecommendedItemsSlider/RecommendedItemsSlider";
import { getProductById } from "@/lib/api/productService";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const product = await getProductById(parseInt(id));

  const PLACEHOLDER_IMAGES = [
    "https://picsum.photos/seed/1/300/300",
    "https://picsum.photos/seed/2/300/300",
    "https://picsum.photos/seed/3/300/300",
    "https://picsum.photos/seed/4/300/300",
    "https://picsum.photos/seed/5/300/300",
    "https://picsum.photos/seed/6/300/300",
  ];

  return (
    <div className="flex flex-col">
      <div className="flex md:flex-row flex-col 2xl:gap-x-40 lg:items-center gap-x-5 mx-auto md:items-start">
        <SliderWithImagesBar images={PLACEHOLDER_IMAGES} />
        <div className="flex flex-col xl:mr-32 xl:ml-32 md:w-1/3 xl:w-1/4 gap-y-2">
          <ProductDescription discount={30} product={product} />
          <ProductAccordion
            brand={product.brand}
            category={product.categoryName}
            material={product.material}
            gender={product.gender}
          />
        </div>
      </div>
      <div className="p-10 flex flex-col">
        <h1 className="text-4xl p-10 font-bold">Recommended Items</h1>
        <RecommendedItemsSlider />
      </div>
    </div>
  );
};

export default ProductPage;
