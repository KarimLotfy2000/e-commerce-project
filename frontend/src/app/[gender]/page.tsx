import { notFound } from "next/navigation";
import CollectionCard from "@/components/CollectionCard/CollectionCard";
import Banner from "@/components/ui/banner";
import { collectionData } from "@/consts";

export default function GenderPage({ params }: { params: { gender: string } }) {
  const genderData =
    collectionData[params.gender.toLowerCase() as keyof typeof collectionData];

  if (!genderData) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <Banner
        imageSrc={genderData.bannerImage}
        text={genderData.bannerText}
        buttonLink={genderData.buttonLink}
        buttonText={genderData.buttonText}
        bannerObjectPosition="top"
      />

      <div className="mx-auto">
        <section className="py-10 mt-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            {genderData.exploreTitle}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-4">
            {genderData.exploreText}
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-12">
          {genderData.collectionCards.map((card: any, index: number) => (
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
      </div>
    </div>
  );
}
