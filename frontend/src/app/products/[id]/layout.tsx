import React from "react";

const Product = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mx-auto">{children}</div>
    </>
  );
};

export default Product;
