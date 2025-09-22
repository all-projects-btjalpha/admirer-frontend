import React from 'react'
import { Link } from 'react-router-dom';

const TermsConditions = () => {
  return (
    <div className="bg-white pb-12">
      <h1 className="text-[38px] max-md:text-[28px] max-md:mb-0 pb-4 pt-12 font-bold text-center">
        Terms & Conditions
      </h1>
      <div className="w-[85%] max-md:w-[100%] bg-[#fcfcfc] mx-auto my-auto  pt-10 pb-12 px-8 max-md:px-5 max-md:pt-6 text-gray-800 space-y-10">
        <p className="font-semibold leading-snug">
          Effective Date: 01 Feb 2025
        </p>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">1. Introduction</h3>
          <p className="leading-snug">
            Welcome to BTJ Admirer! By placing an order with us, you agree to abide by our terms and conditions. These guidelines ensure a smooth and hassle-free experience for our customers. If you have any questions, please contact our customer care team before proceeding with your purchase.
          </p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">2. Orders & Payments</h3>
          <ul className="list-disc  list-outside pl-6 space-y-2">
            <li>All orders must be placed through our official website.</li>
            <li>Payments must be made in full at the time of ordering via our secure payment gateways.</li>
            <li>We reserve the right to cancel or reject an order due to unavailability, pricing errors, or unforeseen circumstances. In such cases, a full refund will be processed.</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">3. Product Quality & Availability</h3>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li>We strive to deal in products which are Artificial Jewelry and Imitation Jewelry as displayed on our website. However, minor variations in color, design, or packaging may occur due to manufacturing differences.</li>
            <li>If a product is unavailable, we may replace it with a similar item of equal or greater value after notifying you.</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">4. Delivery & Shipping</h3>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li>We offer standard and express delivery options as per the selected location.</li>
            <li>Delivery timelines are estimates and may be affected by unforeseen factors such as weather conditions, holidays, or logistical delays.</li>
            <li>Incorrect or incomplete address details may result in delivery failures. Customers must ensure accurate information is provided at checkout.</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">5. Exchange & Cancellations</h3>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li><strong>Cancellations:</strong> Orders can be canceled within a specified timeframe before dispatch. Cancellation requests made after dispatch will not be accepted.</li>
            <li><strong>Exchange:</strong> Due to the nature of our products, we do not accept exchange unless the item is defective or damaged upon arrival.</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">6. Privacy & Data Protection</h3>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li>We value your privacy and ensure that your personal information is protected.</li>
            <li>We do not sell, rent, or share your data with third parties for marketing purposes without your explicit consent.</li>
          </ul>
          <p>For more details, please refer to our <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.</p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">7. Customer Responsibilities</h3>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li>Customers must provide accurate details, including recipient name, address, and contact information, to ensure smooth delivery.</li>
            <li>Any fraudulent activity, misuse of discounts, or violation of policies may result in order cancellation and account suspension.</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">8. Modifications & Updates</h3>
          <p className="leading-snug">
            BTJ Admirer reserves the right to update these Terms & Conditions at any time. Continued use of our services after changes implies acceptance of the revised terms.
          </p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">9. Contact Us</h3>
          <p className="leading-snug">For any queries or clarifications, please reach out to:</p>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li><strong>📩 Email:</strong> <a href="mailto:support@admirer.in" className="text-blue-600 hover:underline">support@admirer.in</a></li>
            <li><strong>📞 Customer Support:</strong> 0120-4525483</li>
          </ul>
          <p className="leading-snug mt-2">We appreciate your trust in BTJ Admirer and look forward to making your celebrations truly special!</p>
        </section>
      </div>
    </div>
  );
};


export default TermsConditions