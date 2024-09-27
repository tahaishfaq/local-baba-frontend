import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const helpSections = [
  {
    question: "I want to partner my restaurant with Localbaba",
    answer: (
      <>
        <p>Partner with us</p>
        <p className="text-blue-500 underline cursor-pointer">
          SEND AN EMAIL
        </p>
        <p className="text-gray-600">We will revert within 24-48 hrs</p>
      </>
    ),
  },
  {
    question: "What are the mandatory documents needed to list my restaurant on Localbaba?",
    answer: (
      <>
        <p>Copies of the below documents are mandatory:</p>
        <ul className="list-disc pl-6">
          <li>FSSAI Licence OR FSSAI Acknowledgement</li>
          <li>Pan Card</li>
          <li>GSTIN Certificate</li>
          <li>Cancelled Cheque OR bank Passbook</li>
          <li>Menu</li>
        </ul>
      </>
    ),
  },
  {
    question: "I want to opt-out from Google reserve",
    answer: (
      <p className="text-blue-500 underline cursor-pointer">
        Send an email
      </p>
    ),
  },
  {
    question: "How long will it take for my restaurant to go live on Localbaba?",
    answer: (
      <p>
        After all mandatory documents have been received and verified, it takes up to 3 working days for the onboarding to be completed and make your restaurant live on the platform.
      </p>
    ),
  },
  {
    question: "What is the one-time onboarding fee? Do I have to pay it while registering?",
    answer: (
      <p>
        This is a one-time fee charged towards the system & admin costs incurred during the onboarding process. It is deducted from the weekly payouts after you start receiving orders from Localbaba.
      </p>
    ),
  },
  {
    question: "Who should I contact if I need help & support in getting onboarded?",
    answer: (
      <p>
        You can connect with Partner Support on{" "}
        <a href="tel:+8904602939" className="text-blue-500 underline">
          89046 02939
        </a>{" "}
        /{" "}
        <a href="tel:+8088433123" className="text-blue-500 underline">
          80884 33123
        </a>{" "}
        or write to{" "}
        <a href="mailto:info@Localbaba.app" className="text-blue-500 underline">
          info@Localbaba.app
        </a>
        <p className="text-blue-500 underline cursor-pointer">
          SEND AN EMAIL
        </p>
        <p className="text-gray-600">We will revert within 24-48 hrs</p>
      </p>
    ),
  },
  {
    question: "How much commission will I be charged by Localbaba?",
    answer: (
      <p>
        The commission charges vary for different cities. You will be able to see the commission applicable for you once the preliminary onboarding details have been filled.
      </p>
    ),
  },
  {
    question: "I don’t have an FSSAI licence for my restaurant. Can it still be onboarded?",
    answer: (
      <p>
        FSSAI licence is a mandatory requirement according to the government’s policies. However, if you are yet to receive the licence at the time of onboarding, you can proceed with the acknowledgement number which you will have received from FSSAI for your registration.
      </p>
    ),
  },
];

const HelpAndSupport = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto p-6 pt-20 font-figtree">
        <h1 className="text-2xl font-bold mb-6">Help & Support</h1>

        <div className="space-y-4">
          {helpSections.map((section, index) => (
            <div
              key={index}
              className={`border ${
                activeIndex === index ? "border-[#FE4101]" : "border-[#D4D2E3]"
              } rounded-[15px] lg:px-10 lg:py-12 p-6 cursor-pointer`}
              onClick={() => toggleSection(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="lg:text-2xl text-base font-semibold text-[#0D4041]">
                  {index + 1}) {section.question}
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
                <div className="mt-4 text-[#949494]">
                  {section.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpAndSupport;
