import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const RefundCancellationPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto p-6 pt-20 font-figtree">
        {/* Main Heading */}
        <h1 className="text-2xl font-bold mb-10">
          LOCALBABA REFUND & CANCELLATION
        </h1>

        {/* Cancellation & Refund Policy Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-red-600">
            Cancellation & Refund Policy
          </h2>
          <p className="text-base text-gray-700 mt-2">
            Any Capitalized terms used but not defined herein shall have the
            meaning assigned to them under the Terms of Use which govern your
            use of our website{" "}
            <a
              href="http://www.localbaba.app"
              className="text-blue-500 underline"
            >
              www.localbaba.app
            </a>{" "}
            (the "Website") and our 'Localbaba' application for mobile and
            handheld devices (the "App"). The Website and the App are jointly
            referred to as the "Platform".
          </p>
        </div>

        {/* Customer Cancellation */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-red-600">
            Customer Cancellation
          </h3>
          <p className="text-base text-gray-700 mt-2">
            As a general rule Buyer shall not be entitled to cancel Order once
            placed. <br /> <br /> If Buyer cancels his/her Order after placing
            it, Localbaba shall have a right to charge 100% of the Order amount
            for breach of contract terms as a compensation for the damages
            suffered by Localbaba, with a right to either not to refund the
            Order value in case Buyer's Order is prepaid or recover from the
            Buyer's subsequent Order in case his/her Order is postpaid, to
            compensate the Merchants and PDPs.
          </p>
        </div>

        {/* Non-Customer Cancellation */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-red-600">
            Non-Customer Cancellation
          </h3>
          <p className="text-base text-gray-700 mt-2">
            Localbaba reserves the right to collect a penalty for Orders
            constrained to be cancelled by Localbaba for reasons not
            attributable to Localbaba, including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>
              In the event if the address provided by Buyer is either wrong or
              falls outside the delivery zone.
            </li>
            <li>
              Failure to contact Buyer by phone or email at the time of
              delivering the Order booking.
            </li>
            <li>
              Failure to deliver Buyer Order due to lack of information,
              direction, or authorization from Buyer at the time of delivery.
            </li>
            <li>
              Unavailability of all the items ordered by Buyer at the time of
              booking the Order.
            </li>
          </ul>
          <p className="text-base text-gray-700 mt-2">
            However, in the unlikely event of an item in an Order being
            unavailable, Localbaba will contact the Buyer on the phone number
            provided at the time of placing the Order and inform the Buyer of
            such unavailability. In such an event, the Buyer will be entitled to
            cancel the entire Order and shall be entitled to a refund of up to
            100% of the Order value.
          </p>
          <p className="text-base text-gray-700 mt-2">
            In case of cancellations for reasons attributable to Localbaba, the
            Merchant, or PDP, Localbaba shall not collect any penalty from the
            Buyer.
          </p>

          {/* Cancellation policy for specific categories */}
          <h4 className="text-base text-gray-700 mt-6">
            Cancellation Policy for Instamart, Meat Stores, Supermarkets, Pet
            Stores, etc.
          </h4>
          <p className="text-base text-gray-700 mt-2">
            Orders placed by Buyers using the Platform are non-cancellable and
            non-refundable except if a refund is requested under the following
            conditions:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>
              If the Order could not be delivered within the estimated time.
            </li>
            <li>If the Order has not been picked by the PDP.</li>
            <li>
              If the Merchant doesn’t accept or cancels the Order due to reasons
              not attributable to the Buyer, including but not limited to store
              being closed, non-availability of items, store cannot service
              online orders at that moment, or store is overcrowded.
            </li>
            <li>
              If Localbaba cancels the Order due to reasons not attributable to
              the Buyer, including but not limited to non-availability of PDP,
              etc.
            </li>
          </ul>
          <p className="text-base text-gray-700 mt-2">
            Localbaba reserves the right to review the cancellation request from
            the Buyer and determine if such cancellation request falls under the
            conditions mentioned above. If Localbaba is satisfied that the
            request fulfills any of the aforesaid conditions, Localbaba shall
            process the cancellation request and refund the amounts to the
            Buyer.
          </p>
        </div>

        {/* Refund Policy */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-red-600">Refund Policy</h3>
          <div className="space-y-2">
            <p className="text-base text-gray-700 mt-2">
              Buyer may be entitled to a refund for prepaid Orders. Localbaba
              retains the right to retain the penalty payable by the Buyer in
              Section 1(2) from the amount refundable to him/her. The Buyer
              shall also be entitled to a refund of proportionate value in the
              event packaging of an item in an Order or the complete Order, is
              either tampered or damaged and the Buyer refuses to accept at the
              time of delivery for the said reason;
            </p>
            <p className="text-base text-gray-700 mt-2 ">
              Buyer may be entitled to a refund upto 100% of the Order value if
              PDP fails to deliver the Order due to a cause attributable to
              either PDP or Localbaba, however such refunds will be assessed on
              a case to case basis by Localbaba. Our decision on refunds shall
              be final and binding.
            </p>
            <p className="text-base text-gray-700 mt-2 ">
              All refund amounts shall be credited to Buyer's account as may be
              stipulated as per the payment mechanism of Buyer's choice, the
              estimated timelines are detailed as below, in case Buyer don't
              choose to credit it to Buyer's wallet with his/her Localbaba
              Account;
            </p>
          </div>
        </div>

        <div className="mb-8">
          {/* Payment at the time of delivery */}
          <h3 className="text-xl font-bold text-red-600">
            Payment at the Time of Delivery
          </h3>
          <p className="text-base text-gray-700 mt-2">
            In case of payment at the time of delivery, Buyer will not be
            required to pay for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>
              Orders where packaging is either tampered or damaged at the time
              of delivery.
            </li>
            <li>Wrong Order being delivered.</li>
            <li>Items missing from Buyer's Order at the time of delivery.</li>
          </ul>
          <p className="text-base text-gray-700 mt-2">
            Provided the same is communicated to Localbaba Customer Care through
            the Platform before the Order is marked delivered.
          </p>

          {/* Specific Terms for Alcoholic Beverages */}
          <h4 className="text-lg font-bold text-red-600 mt-6">
            Specific Terms for Alcoholic Beverages
          </h4>
          <p className="text-base text-gray-700 mt-2">
            As a general rule, the Buyer shall not be entitled to cancel his/her
            Order once placed. If the Buyer cancels his/her Order, Localbaba
            shall have a right to collect 100% of the Order amount as the
            cancellation fee, with a right to either not refund the Order value
            in case the Buyer's Order is prepaid or recover from the Buyer's
            subsequent Order(s) in case the Buyer's Order is postpaid, to
            compensate the Merchants and PDPs.
          </p>

          {/* Non-Customer Cancellation for Alcoholic Beverages */}
          <h4 className="text-lg font-bold text-red-600 mt-6">
            Non-Customer Cancellation for Alcoholic Beverages
          </h4>
          <p className="text-base text-gray-700 mt-2">
            Localbaba reserves the right to collect a cancellation fee for
            Orders constrained to be cancelled by Localbaba for reasons not
            attributable to Localbaba or the Merchant, including but not limited
            to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>
              Wrong address provided by the Buyer or address falling outside the
              Localbaba's delivery zone.
            </li>
            <li>
              Failure to contact the Buyer by phone or email at the time of
              delivering the Order.
            </li>
            <li>
              Failure to deliver the Buyer's Order due to lack of information,
              direction, or authorization from the Buyer at the time of
              delivery.
            </li>
            <li>
              Buyer's failure to provide a valid OTP to the PDP for receiving
              delivery.
            </li>
          </ul>

          {/* Refunds */}
          <h4 className="text-lg font-bold text-red-600 mt-6">Refunds</h4>
          <p className="text-base text-gray-700 mt-2">
            The Buyer may be entitled to a refund for prepaid Orders, post
            deduction of cancellation fee, if any, for reasons mentioned above
            or in a manner as deemed fit by Localbaba in its sole discretion, if
            refund has been requested due to the following reasons:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>If the Order could not be delivered within 2 hours.</li>
            <li>
              If the Merchant cancels the Order due to reasons not attributable
              to the Buyer, including but not limited to store being closed,
              non-availability of items, store not servicing online Orders,
              overcrowding at store, etc.
            </li>
            <li>
              If Localbaba cancels the Order due to reasons not attributable to
              the Buyer, including but not limited to non-availability of PDPs.
            </li>
          </ul>
          <p className="text-base text-gray-700 mt-2">
            The Buyer may be entitled to a refund of up to 100% of the Order
            value depending on the nature of the issue. Localbaba reserves the
            right to consider the cancellation and refund request and determine
            if the request satisfies the conditions mentioned above. If so,
            Localbaba shall process the cancellation request and refund the
            Buyer.
          </p>

          {/* Important Notes */}
          <h4 className="text-lg font-bold text-red-600 mt-6">
            Important Notes
          </h4>
          <p className="text-base text-gray-700 mt-2">
            <strong>Note 1:</strong> The Buyer shall verify his/her Order and
            the products before providing the OTP to the PDP. Any issues with
            the product or Order must be notified immediately, and a
            cancellation request must be placed before providing the OTP to the
            PDP. Once the OTP is provided, it will be deemed that the Buyer has
            accepted delivery of the Order, and the Buyer cannot claim a refund
            or cancel the Order.
          </p>
          <p className="text-base text-gray-700 mt-2">
            <strong>Note 2:</strong> In case of a complaint regarding a spurious
            product, the liability lies solely with the Merchant selling the
            product. Localbaba only facilitates transactions between the
            Merchant and the Buyer and assumes no liability with respect to the
            products sold by the Merchant. Localbaba strictly discourages the
            dealing of spurious products on its Platform and reserves the right
            to report such incidents to the relevant authorities for appropriate
            legal action.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RefundCancellationPolicy;
