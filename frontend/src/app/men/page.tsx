import React from "react";
import Banner from "@/components/ui/banner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CollectionCard from "@/components/CollectionCard/CollectionCard";
import { collectionCardsData } from "@/consts";

const MenPage = () => {
  return (
    <div className="container">
      <Banner
        imageSrc="/images/modelPeach3.jpg"
        text="Premium Athleisure"
        buttonLink="/men/products"
        buttonText="Shop Now"
        bannerObjectPosition="top"
      />
      <div className="mx-auto">
        <section className="py-12 text-center">
          <h2 className="text-4xl font-bold">Explore Our Men's Collection</h2>
          <p className="text-lg text-gray-600 mt-4">
            Discover the latest trends in men's fashion, from casual wear to
            premium athleisure.
          </p>
        </section>

        <section className="grid grid-cols-1  md:grid-cols-2 gap-14 my-12">
          {collectionCardsData.map((card, index) => (
            <CollectionCard
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              link={card.link}
              buttonText={card.buttonText}
            />
          ))}
        </section>

        <div className="text-center my-16">
          <Link href="/men/products">
            <Button variant="secondary">Explore All Men's Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenPage;
