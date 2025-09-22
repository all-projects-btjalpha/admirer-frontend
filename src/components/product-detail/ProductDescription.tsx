import React, { useState } from "react";

const ProductAccordion = ({ description }: { description: string }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // 🔥 Open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion w-full mt-6">
      {/* Product Description */}
      <div className="mb-4">
        <div
          className="flex justify-between bg-purple-100 rounded-lg items-center cursor-pointer p-4"
          onClick={() => toggleItem(0)}
        >
          <p className="text-lg font-medium">Product Description</p>
          <span className="text-xl font-bold">{openIndex === 0 ? "−" : "+"}</span>
        </div>
        <div
          className={`transition-[max-height] duration-200 ease-in-out overflow-hidden ${
            openIndex === 0 ? "max-h-[600px]" : "max-h-0"
          }`}
        >
          <div className="px-4 max-md:px-2 py-4 text-gray-700 text-sm">
            <div
              className="product__details-des"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </div>

      {/* Return Policy */}
      <div>
        <div
          className="flex justify-between bg-purple-100 rounded-lg items-center cursor-pointer p-4"
          onClick={() => toggleItem(1)}
        >
          <p className="text-lg font-medium">Return Policy</p>
          <span className="text-xl font-bold">{openIndex === 1 ? "−" : "+"}</span>
        </div>
        <div
          className={`transition-[max-height] duration-200 ease-in-out overflow-hidden ${
            openIndex === 1 ? "max-h-[999px]" : "max-h-0"
          }`}
        >
          <div className="px-4 py-4 text-gray-700 text-sm space-y-6">
            <Section
              title="General Return Information"
              items={[
                "Items must be returned within 7 days of delivery.",
                "The product should be unused and in its original packaging.",
                "Proof of purchase is required for all returns.",
                "Returns are subject to inspection before approval.",
              ]}
            />

            <Section
              title="Refund Policy"
              items={[
                "Refunds will be processed within 5-7 business days.",
                "The refund amount will be credited to the original payment method.",
                "Shipping charges are non-refundable.",
                "Partial refunds may be applicable for damaged or missing items.",
              ]}
            />

            <Section
              title="Exchange Policy"
              items={[
                "Exchanges are allowed only for defective or damaged items.",
                "Customers must request an exchange within 7 days of receiving the product.",
                "The exchanged product will be shipped once the returned item is received.",
              ]}
            />

            <Section
              title="Please Note"
              items={[
                "Items purchased on sale or discount may not be eligible for return.",
                "Customized or perishable products cannot be returned.",
                "The company reserves the right to reject returns that do not comply with the policy.",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <ul className="list-disc list-inside space-y-2">
      {items.map((item, i) => (
        <li className="list-none" key={i}>●&nbsp;  {item}</li>
      ))}
    </ul>
  </div>
);

export default ProductAccordion;
