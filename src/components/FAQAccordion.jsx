import React,{ useState } from "react";
import FAQItem from "./FaqItem";

export default function FAQAccordion({ items }) {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (itemId) => {
    setOpenAccordion(openAccordion === itemId ? null : itemId);
  };

  return (
    <div className="w-full md:w-1/4">
      <h2 className="text-xl font-bold mb-4">Top 10 Insurance FAQs</h2>
      <div className="w-full rounded-lg overflow-hidden">
        {items.map((item, index) => (
          <FAQItem
            key={index}
            index={index}
            item={item}
            isOpen={openAccordion === `item-${index}`}
            toggleAccordion={toggleAccordion}
          />
        ))}
      </div>
    </div>
  );
}
