import { GetProductResponse } from "@/config/types";
import {
  ProductDescription,
  ProductDescriptionProps,
} from "@/components/ProductDescription/ProductDescription";
import { SliderWithImagesBar } from "@/components/SliderWithImagesBar/SliderWithImagesBar";
import { fetchProductById } from "@/lib/backend";
import React from "react";
import { ProductAccordion } from "@/components/ProductAccordion/ProductAccordion";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const data = (await fetchProductById(id)) as GetProductResponse;

  const { images, ...productDescription } = data;
  const accordionData = [
    {
      trigger: "MATERIAL",
      content: "lorem impsulum conteger amarco",
    },
    {
      trigger: "DETAILS",
      content: "lorem impsulum conteger amarco",
    },
    {
      trigger: "ADIDAS",
      content: "lorem impsulum conteger amarco",
    },
  ];

  return (
    <div className="flex justify-center items-start min-h-screen">
      <SliderWithImagesBar images={images} />

      <div className="flex flex-col gap-y-2">
        <ProductDescription
          discount={50}
          {...(productDescription as ProductDescriptionProps)}
        />
        <ProductAccordion accordionData={accordionData} />
      </div>
    </div>
  );
};

export default ProductPage;
