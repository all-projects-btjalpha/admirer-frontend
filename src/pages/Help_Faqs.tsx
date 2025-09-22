import { MessageSquare, PhoneCall, Mail } from "lucide-react";
import React, { useState, useEffect, ReactNode } from "react";

// Types
type FAQItem = {
  question: string;
  answer: string | ReactNode;
};

type FAQSection = {
  section: number;
  items: FAQItem[];
};

// FAQ Data
const faqData: FAQSection[] = [
  {
    section: 1,
    items: [
      {
        question: "What is BTJ Admirer?",
        answer:
          "BTJ Admirer is an online shopping platform offering a wide range of products including electronics, home goods, fashion, and more. We provide a seamless shopping experience with fast delivery, secure payments, and a user-friendly interface.",
      },
      {
        question: "What payment methods are accepted?",
        answer: (
          <>
            <p>BTJ Admirer accepts a variety of payment methods, including:</p>
            <ul className="list-disc list-inside">
              <li>UPI</li>
              <li>Net Banking</li>
              <li>EMI</li>
              <li>Cards (Credit/Debit)</li>
              <li>Wallet</li>
            </ul>
          </>
        ),
      },
      {
        question: "How can I track my order?",
        answer:
          'Once your order has been shipped, you will receive an order confirmation email. Now you can track your order on the dashboard page by logging into your account and checking the "Orders" section.',
      },
      {
        question: "Can I cancel my order?",
        answer:
          "Orders can be cancelled before shipping. After shipping, it may not be possible to cancel. Contact customer service as soon as possible if you need assistance.",
      },
      {
        question: "What should I do if I received a damaged or incorrect item?",
        answer: (
          <p>
            If you receive a damaged or incorrect item, please contact our
            customer service team immediately through our mail{" "}
            <a
              href="mailto:support@admirer.in"
              className="text-red-500 underline"
            >
              support@admirer.in
            </a>
            . We will arrange for a return or exchange as per our return policy.
          </p>
        ),
      },
      {
        question: "How do I return an item?",
        answer:
          "Items can be returned within a certain period (usually 7 days) if they are unused, in original packaging, and with a receipt.",
      },
      {
        question: "Can I change my shipping address after placing an order?",
        answer:
          "If your order has not been shipped yet, we may be able to update your shipping address. Please contact customer support as soon as possible for assistance.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Yes, we take your privacy and security very seriously. All personal information is encrypted using industry-standard SSL technology to ensure your data is protected.",
      },
      {
        question: "Are there any discounts or promotions?",
        answer:
          "Yes! BTJ Admirer offers seasonal sales, promotional codes, and exclusive discounts to our members.",
      },
    ],
  },
];

const HelpContact: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<Record<string, boolean>>({});

  // Open the first item by default on mount
  useEffect(() => {
    setOpenIndexes({ "0-0": true });
  }, []);

  const toggleAccordion = (section: number, index: number) => {
    const key = `${section}-${index}`;
    setOpenIndexes((prev) => {
      const isAlreadyOpen = prev[key];
      return { [key]: !isAlreadyOpen }; // Close others, only toggle current
    });
  };

  return (
    <>
      <div className="text-center px-4 py-10 bg-white">
        <h2 className="text-4xl max-md:text-2xl mt-5 mb-5 font-bold">
          Help & Contact
        </h2>

        <div className="bg-[#fcfcfc] mt-8 max-md:mt-3 py-10  rounded-lg shadow-sm max-w-5xl mx-auto">
          <h3 className="text-xl max-md:text-lg font-semibold mb-12 max-md:mb-8">
            Have A Question
          </h3>

          <div className="flex gap-8 max-md:gap-3 w-[75%] max-md:w-[100%] m-auto justify-around px-4 max-md:px-2">
            {/* Chat with Us */}
            <a
              // href="https://wa.me/919717072701"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 self-center mt-[-27px] hover:opacity-90 transition"
            >
              <MessageSquare
                className="w-16 max-md:w-10 h-16 max-md:h-10 text-purple-700 mb-5 max-md:mb-2"
                strokeWidth={0.8}
              />
              <p className="text-purple-700 text-xl max-md:text-sm font-semibold">
                Chat with Us
              </p>
            </a>

            {/* Divider */}
            <div className="block w-px bg-gray-300 h-36 max-md:h-28 self-center" />

            {/* Call Us At */}
            <a
              href="tel:01204525483"
              className="flex flex-col items-center gap-2 self-center  hover:opacity-90 transition"
            >
              <PhoneCall
                className="w-16 max-md:w-10 h-16 max-md:h-10 text-purple-700 mb-5 max-md:mb-2"
                strokeWidth={0.8}
              />
              <p className="text-purple-700 text-xl max-md:text-sm font-semibold">
                Call Us At
              </p>
              <p className="text-sm text-gray-700">0120-4525483</p>
            </a>

            {/* Divider */}
            <div className="block w-px bg-gray-300 h-36 max-md:h-28 self-center" />

            {/* Write to Us */}
            <a
              href="mailto:support@admirer.in"
              className="flex flex-col items-center gap-2 self-center mt-[-27px] hover:opacity-90 transition"
            >
              <Mail
                className="w-16 max-md:w-10 h-16 max-md:h-10 text-purple-700 mb-5 max-md:mb-2"
                strokeWidth={0.8}
              />
              <p className="text-purple-700 text-xl max-md:text-sm font-semibold">
                Write to Us
              </p>
            </a>
          </div>

          <p className="text-md tracking-wide leading-normal text-gray-600 mt-8 w-[78%] max-md:w-full m-auto px-6 max-md:px-1">
            We're available Monday to Friday, from 9:30 AM to 6:30 PM.
          </p>
        </div>
      </div>

      <section className="bg-white py-10 max-md:pt-4">
        <div className="w-[65%] max-md:w-full mx-auto px-4 grid grid-cols-1">
          <h1 className="text-2xl max-md:text-xl font-semibold mb-8">
            Top Customer Questions
          </h1>
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.items.map((item, index) => {
                const key = `${sectionIndex}-${index}`;
                const isOpen = openIndexes[key];
                return (
                  <div
                    key={index}
                    className={`bg-white mb-4 rounded-md border ${
                      isOpen ? "border-purple-700" : "border-gray-200"
                    }`}
                  >
                    <button
                      className="w-full flex justify-between items-center px-10 max-md:px-6 pt-4 pb-3 font-medium text-left"
                      onClick={() => toggleAccordion(sectionIndex, index)}
                    >
                      {item.question}
                      <span className="text-2xl ">{isOpen ? "-" : "+"}</span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-in-out px-10 text-gray-700 leading-relaxed space-y-2 ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 py-4 pt-0"
                          : "grid-rows-[0fr] opacity-0 py-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        {typeof item.answer === "string" ? (
                          <p>{item.answer}</p>
                        ) : (
                          item.answer
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HelpContact;
