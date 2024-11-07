import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type AccordionItem = {
  trigger: string;
  content: string;
};

type ProductAccordionProps = {
  accordionData: AccordionItem[];
};

export const ProductAccordion = ({ accordionData }: ProductAccordionProps) => {
  return (
    <Accordion className="p-6 pt-0" type="single" collapsible>
      {accordionData.map((item) => (
        <AccordionItem key={item.trigger} value={item.trigger}>
          <AccordionTrigger className="text-xl p-6 pl-1">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent className="text-lg p-3 pl-1 pb-8">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
