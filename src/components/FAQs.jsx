import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const faqs = [
  {
    question: "How does our food delivery service work?",
    answer:
      "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor.",
  },
  {
    question: "What Payment Methods Are Accepted?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "How Long Does Delivery Take?",
    answer:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "What Happens If There’s an Issue with My Order?",
    answer:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-20 px-4">
      <div className="max-w-2xl mx-auto font-figtree">
        <div className="flex flex-col items-center gap-y-4">
          <h2 className="text-[36px] font-bold text-center text-[#0D4041] ">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-[#949494] mb-10 font-normal ">
            Lorem ipsum dolor sit amet consectetur adipiscing elit aenean id
            volutpat imperdiet quis at pellentesque nunc commodo nunc purus
            pulvinar nisi fusce.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border ${
              activeIndex === index ? "border-[#FE4101]" : "border-[#D4D2E3]"
            } rounded-[15px] px-10 py-12 cursor-pointer`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-[#0D4041]">
                {faq.question}
              </h3>
              <span>
                {activeIndex === index ? (
                  <FaChevronDown className="text-[#FE4101]" />
                ) : (
                  <FaChevronRight className="text-[#D4D2E3]" />
                )}
              </span>
            </div>
            {activeIndex === index && (
              <p className="text-[#949494] font-normal mt-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
