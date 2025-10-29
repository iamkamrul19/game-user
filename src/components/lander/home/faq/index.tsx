import SectionTitle from "@/components/common/SectionTitle";
import { IFaq } from "@/types";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  faqs: IFaq[];
}
const Faq = ({ faqs }: Props) => {
  return (
    <section className="section">
      <div className="main-container flex flex-col items-center">
        <SectionTitle
          className=""
          title="Frequently Asked Question"
          showIcon={false}
        />
        <div className="mt-[50px] flex flex-col gap-3">
          {faqs.length > 0 &&
            faqs.map((faq, index) => (
              <Accordion
                type="single"
                collapsible
                key={index}
                defaultValue="item-0"
                className="lg:w-[780px] border-[1px] border-white/25 bg-[#232323] px-[16px] rounded-[10px]"
              >
                <AccordionItem className="w-full" value={`item-${index}`}>
                  <AccordionTrigger className="text-[14px] font-inter font-medium leadiing-[21px] text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] font-inter leading0-[23px] text-white/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
