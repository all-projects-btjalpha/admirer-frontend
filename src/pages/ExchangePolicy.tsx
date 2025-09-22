import React from 'react'
import { Link } from "react-router-dom";

const ExchangePolicy = () => {
  return (
    <div className="bg-white pb-12">
      <h1 className="text-[38px] max-md:text-[28px] pb-4 pt-12 font-bold text-center">
        Exchange Policy
      </h1>
      <div className="w-[85%] max-md:w-[100%] bg-[#fcfcfc] mx-auto my-auto h-[90%] pt-10 pb-12 px-8 max-md:px-5 max-md:pt-6 text-gray-800 space-y-10">
        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">1. Introduction</h3>
          <p>
            At BTJ Admirer, we are committed to delivering high-quality products that bring joy to your special moments. We take great care in processing and delivering your orders. However, if you are not satisfied with your purchase due to a valid reason, our Return & Refund Policy ensures a fair resolution.
          </p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">2. Exchange</h3>
          <p>
            We currently do not offer direct exchanges. If you wish to exchange an item for a different size, color, or model, please return the item and place a new order.
          </p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">3. Defective or Damaged Items</h3>
          <p>
            If you receive a defective or damaged product, please contact our customer service team within 5 days. We will offer you a full refund or replacement based on your preference.
          </p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">4. Contact Us</h3>
          <p>If you have any questions or concerns about our exchange policy, feel free to contact our customer support team at:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Email:</strong> support@admirer.in</li>
            <li><strong>Phone:</strong> 0120-4525483</li>
            <li><strong>Website:</strong> www.admirer.in</li>
          </ul>
        </section>
      </div>
    </div>
  );
};


export default ExchangePolicy