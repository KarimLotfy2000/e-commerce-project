import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type ProductAccordionProps = {
  brand: string;
  category: string;
  gender: "MEN" | "WOMEN" | "UNISEX";
  material: string;
};

export const ProductAccordion = ({
  brand,
  category,
  gender,
  material,
}: ProductAccordionProps) => {
  const formattedGender =
    gender === "MEN"
      ? "for Men"
      : gender === "WOMEN"
      ? "for Women"
      : "as Unisex, suitable for both men and women";

  return (
    <Accordion className="p-4 pt-0" type="single" collapsible>
      <AccordionItem value="material">
        <AccordionTrigger className="text-sm font-medium p-4 pl-1">
          Material
        </AccordionTrigger>
        <AccordionContent className="text-sm p-3 pl-1 pb-6">
          This product is made of{" "}
          <span className="font-semibold">{material}</span>, ensuring comfort
          and durability.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="info">
        <AccordionTrigger className="text-sm font-medium p-4 pl-1">
          Info
        </AccordionTrigger>
        <AccordionContent className="text-sm p-3 pl-1 pb-6">
          Designed <span className="font-semibold">{formattedGender}</span>,
          this product belongs to the{" "}
          <span className="font-semibold">{category.toLowerCase()}</span>{" "}
          category, perfect for your wardrobe essentials.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="brand">
        <AccordionTrigger className="text-sm font-medium p-4 pl-1">
          {brand[0].toUpperCase() + brand.slice(1)}
        </AccordionTrigger>
        <AccordionContent className="text-sm p-3 pl-1 pb-6">
          Is known for its commitment to quality and innovation. This product
          continues the legacy of excellence and craftsmanship.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
