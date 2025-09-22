import React from 'react'

const ReturnRefund = () => {
  return (
    <div className="bg-white pb-12">
      <h1 className="text-[36px] max-md:text-[28px] pb-4 pt-12 font-bold text-center">
        Return & Refund Policy
      </h1>
      <div className="w-[85%] max-md:w-[100%] bg-[#fcfcfc] mx-auto my-auto h-[90%] pt-10 pb-12 px-8 max-md:px-5 max-md:pt-6 text-gray-800 space-y-10">
        <section className="space-y-4 text-gray-700">
          <h2 className="text-xl font-semibold">Return Policy</h2>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li>You may return any eligible items within 5 days from the date of delivery.</li>
            <li>To be eligible for a return, the product must be unused, in its original condition, and in the original packaging.</li>
            <li>Certain items such as personalized items and intimate products are non-returnable for hygiene or other reasons.</li>
            <li>
              To initiate a return, please contact our customer service team at{" "}
              <span className="text-blue-600">support@admirer.in</span> with your order details and reason for return.
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h2 className="text-xl font-semibold">Refund Policy</h2>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li>Once the returned item is received and inspected, your refund will be credited within 24 hours.</li>
            <li>The refund will be credited to the original payment method used at the time of purchase.</li>
            <li>Shipping fees are non-refundable, and you will be responsible for the cost of return shipping unless the item is defective or incorrect.</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h2 className="text-xl font-semibold">Defective or Incorrect Items</h2>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li>If you receive a defective or incorrect item, please contact us immediately, and we will arrange for a replacement within 24 hours at no additional cost to you.</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700">
          <h2 className="text-xl font-semibold">How to Return an Item</h2>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li>Contact us at <span className="text-blue-600">support@admirer.in</span> to request a return authorization.</li>
            <li>Once your return request is approved, we will provide you with instructions on how to return the item.</li>
          </ul>
          <p>
            We value your trust in us and strive to provide the best shopping experience possible. If you have any questions or concerns about our return and refund process, please don’t hesitate to reach out to our customer service team.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReturnRefund