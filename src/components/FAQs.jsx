import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "How does our food delivery service work?",
    answer:
      "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
  },
  {
    question: "How Long Does Delivery Take?",
    answer:
      "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
  },
  {
    question: "What Payment Methods Are Accepted?",
    answer:
      "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
  },
  {
    question: "Can I Track My Order?",
    answer:
      "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
  },
  {
    question: "What Happens If There’s an Issue with My Order?",
    answer:
      "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
  },
  {
    question: "Do You Offer Options for Special Dietary Restrictions?",
    answer:
      "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
  },
];

export default function FAQs() {
  return (
    <div className="mt-24  p-6">
      <h2 className="text-4xl font-bold leading-10 tracking-tight text-[#0D4041] mb-7">
        Frequently asked questions
      </h2>
      <div className="bg-[#F5F5F5]  rounded-xl">
        <div className="mx-auto max-w-7xl  sm:py-32 lg:px-2 lg:py-10">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {faqs.map((faq) => (
                <Disclosure
                  key={faq.question}
                  as="div"
                  className="bg-white rounded-lg shadow-md"
                >
                  <dt>
                    <DisclosureButton className="group flex w-full items-start justify-between p-4 text-left text-[#FE4101]">
                      <span className="text-base font-semibold leading-7 text-black">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <PlusSmallIcon
                          aria-hidden="true"
                          className="h-6 w-6 group-data-[open]:hidden"
                        />
                        <MinusSmallIcon
                          aria-hidden="true"
                          className="h-6 w-6 bg-[#FE4101] text-white rounded-md [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel
                    as="dd"
                    className="mt-2 p-4 text-base leading-7 text-black"
                  >
                    {faq.answer}
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
