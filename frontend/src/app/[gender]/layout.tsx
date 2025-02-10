import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { gender: string };
}) {
  const genderLabel = params.gender === "men" ? "Men's" : "Women's";

  return {
    title: `${genderLabel} Fashion - Latest Trends`,
    description: `Explore the latest ${genderLabel.toLowerCase()} clothing, shoes, and accessories at FashionFusion.`,
    openGraph: {
      title: `${genderLabel} Fashion - Latest Trends`,
      description: `Find the best ${genderLabel.toLowerCase()} fashion items at unbeatable prices.`,
      // url: `https://fashionfusion.com/${params.gender}/products`,
    },
  };
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="pt-16">{children}</div>
    </>
  );
};

export default Layout;
