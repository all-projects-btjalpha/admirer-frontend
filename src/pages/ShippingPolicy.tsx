import React from 'react'

const ShippingPolicy = () => {
  return (
    <div className="bg-white pb-12">
      <h1 className="text-[38px] max-md:text-[28px] pb-4 pt-12 font-bold text-center">
        Shipping Policy
      </h1>
      <div className="w-[85%] max-md:w-[100%] bg-[#fcfcfc] mx-auto my-auto h-[90%] pt-10 pb-12 px-8 max-md:px-5 max-md:pt-5 text-gray-800 space-y-10">
        <section className="space-y-4 text-gray-700">
          <p className="leading-snug">
            Thank you for shopping with us! We strive to provide an exceptional shopping experience by ensuring that your orders are shipped promptly and securely. Please read our shipping policy for more details on how we handle your order shipments.
          </p>
        </section>

        <section className="space-y-4 text-gray-700">
          <h2 className="text-xl font-semibold">Shipping within Delhi/NCR:</h2>
          <ul className="list-disc list-outside pl-6 space-y-2 leading-snug">
            <li>We are pleased to offer fast shipping within Delhi/NCR. All orders placed within this region will be processed and shipped within a day of order confirmation.</li>
            <li>You can expect your order to be delivered on the same day of shipping.</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h2 className="text-xl font-semibold">Shipping outside Delhi/NCR:</h2>
          <ul className="list-disc list-outside pl-6 space-y-2 leading-snug">
            <li className='leading-snug'>For orders outside Delhi/NCR, we aim to process and ship your order within 2-3 days of order confirmation.</li>
            <li>You can expect your order to be delivered in 3-4 days.</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h2 className="text-xl font-semibold">Shipping Methods:</h2>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li>We partner with trusted courier services to ensure safe and timely delivery. Once your order has been shipped, you will receive a tracking number to monitor the progress of your shipment.</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h2 className="text-xl font-semibold">Delivery Times:</h2>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li className='leading-snug'>Delivery times depend on the shipping method chosen and the delivery location. Typically, orders within Delhi/NCR will reach you faster, while deliveries to other regions may take a few extra days.</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h2 className="text-xl font-semibold">Important Notes:</h2>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li className="leading-snug">We are not responsible for delays caused by unforeseen circumstances such as extreme weather, natural disasters, or carrier-related delays.</li>
            <li className="leading-snug">If you have any specific shipping needs or concerns, feel free to reach out to our customer service team, and we will do our best to assist you.</li>
          </ul>
        </section>

        <p className="text-gray-700">
          We appreciate your understanding and thank you for choosing us.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy