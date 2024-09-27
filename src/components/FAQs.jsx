import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const faqs = [
  {
    question: "Do you deliver in my area?",
    answer:
      "You will be able to check this detail at the time of checkout when you enter the address. If we are unable to deliver in your area - we will inform you before checkout. However, the option to pickup your order will still be available.",
  },
  {
    question: "How do I change the delivery info (address to which I want products delivered)?",
    answer:
      'You can change your delivery address once you log into your account. Click on "Menu Bar" at the top left corner and go to "My Account" section and select the "Edit Address" option to change your delivery address.',
  },
  {
    question: "How are the Sellers Classified?",
    answer:
      "The sellers are classified based on the segments they cater. Example: Groceries, Fresh (fruits and vegetables), Jewellery, etc.",
  },
  {
    question: "What are the modes of payment?",
    answer:
      "You can pay for your order on LOCALBABA using the following modes of payment: a. Cash on delivery b. UPI Payments i.e PayTM/Phonepe/Bhim/GPay.",
  },
  {
    question: "I'd like to suggest some products which are not there on LOCALBABA. Who do I contact?",
    answer:
      "If you are unable to find a product or brand that you would like to market, please write to us at support@localbaba.app and we will try our best to make the product available to you.",
  },
  {
    question: "Are there any other charges or taxes in addition to the price shown? Is VAT added to the invoice?",
    answer: "There is no VAT. However, GST will be applicable as per Government Regulations.",
  },
  {
    question: "How do I raise a claim with customer service for any of the Guarantees - Delivery Guarantee, Quality Guarantee?",
    answer:
      "If you face any issues with price, quality or delivery of products we will take every measure to address the issue and make it up to you. Please contact our customer support team with details or your order as well as the issue you faced.",
  },
  {
    question: "What do I do if an item is defective (broken, leaking, expired)?",
    answer:
      'We have a "no questions asked return and refund policy" which entitles all our members to return the product at the time of delivery if due to some reason they are not satisfied with the quality or freshness of the product. We will take the returned product back with us and issue a credit note for the value of the return products which will be credited to your account on the Site. This can be used to pay your subsequent shopping bills.',
  },
  {
    question: "What is the meaning of cash on delivery?",
    answer:
      "Cash on delivery means that the buyer can pay for the order at the time of order delivery at your doorstep.",
  },
  {
    question: "How are the fruits and vegetables packaged?",
    answer:
      "Fresh fruits and vegetables are hand picked, hand cleaned and hand packed in reusable plastic covers. We ensure hygienic and careful handling of all our products.",
  },
  {
    question: "How will the delivery be done?",
    answer:
      "We have a dedicated team of delivery personnel and a fleet of vehicles operating across the town which ensures accurate delivery to our customers.",
  },
  {
    question: "Do I have to necessarily register to shop on LOCALBABA?",
    answer:
      "We have a dedicated team of delivery personnel and a fleet of vehicles operating across the town which ensures accurate delivery to our customers.",
  },
  {
    question: "Can I have multiple accounts for members in my family with different mobile numbers and email addresses but same or common delivery address?",
    answer:
      "Yes, we do understand the importance of time and the toil involved in shopping groceries.",
  },
  
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto lg:my-20 mt-4 mb-20 px-4">
      <div className="max-w-2xl mx-auto font-figtree">
        <div className="flex flex-col items-center gap-y-2 lg:gap-y-4">
          <h2 className="lg:text-[36px] text-2xl font-bold text-center text-[#0D4041] ">
            Frequently Asked Questions
          </h2>
          {/* <p className="text-center text-[#949494] lg:text-base text-xs lg:mb-10 mb-5 font-normal lg:px-0 px-4">
            Lorem ipsum dolor sit amet consectetur adipiscing elit aenean id
            volutpat imperdiet quis at pellentesque nunc commodo nunc purus
            pulvinar nisi fusce.
          </p> */}
        </div>
      </div>
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <div
            key={index}
            className={`border ${
              activeIndex === index ? "border-[#FE4101]" : "border-[#D4D2E3]"
            } rounded-[15px] lg:px-10 lg:py-12 p-6 cursor-pointer`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="lg:text-2xl text-base font-semibold text-[#0D4041]">
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
              <p className="text-[#949494] font-normal mt-4 ">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
