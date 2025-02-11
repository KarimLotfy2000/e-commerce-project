import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const [_, ...slugParts] = params.id.split("-");

  const name = slugParts
    .slice(1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const brand = slugParts[0].toUpperCase();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://temp-url.vercel.app";

  return {
    title: `${brand} ${name} - Buy Now | FashionFusion`,
    openGraph: {
      title: `${brand} ${name} - Buy Now | FashionFusion`,
      url: `${siteUrl}/products/${params.id}`,
    },
  };
}

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mx-auto">{children}</div>
    </>
  );
};

export default ProductLayout;
