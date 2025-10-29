import BreadCrumbs from "@/components/common/breadcrumbs";
import React from "react";
import Title from "../Title";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const SupportFaq = () => {
  return (
    <div className="main-container py-[130px]">
      <BreadCrumbs links={["support", "faq"]} />
      <div className="mt-12 flex flex-col items-center">
        <Title>GG Subscriptions Support</Title>
        <Link
          href={"/support"}
          className="bg-white/10 py-[6px] px-[13px] rounded-[10px] flex items-center justify-center gap-2 w-fit text-white mt-9"
        >
          <ArrowLeft className="size-[14px]" />
          Back
        </Link>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SupportFaq;
