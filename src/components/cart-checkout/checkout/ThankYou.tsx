import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ThankYouPage = () => {
  const location = useLocation();
  const { payload } = location.state || {};

  const { orderID, amount, paymentType } = payload || {};

  useEffect(() => {
    if (amount) {
      (window as any).fbq("track", "Purchase", {
        value: parseFloat(amount).toFixed(2),
        currency: "INR",
        content_type: "product",
        content_ids: orderID, // No items passed, so keeping this empty
    });
    console.log("Facebook Pixel Tracked: ₹" + amount.toFixed(2));
    console.log("Facebook Pixel Tracked:" +  orderID);
    }
  }, [amount]);     

  return (
    <div className="flex flex-col items-center justify-center  max-md:justify-start  min-h-screen p-6 max-md:p-0 bg-gray-100 text-center">
      {/* <CheckCircleOutlined className="text-5xl text-green-600" /> */}
      <div className="block w-full lg:w-64 mx-auto">
  <DotLottieReact
    src="https://lottie.host/3fa4d0c0-ce8a-4a07-9f19-ab8e4600e66d/q3XWgXu6LJ.lottie"
    loop
    autoplay
  />
</div>

<div className="block w-96 lg:w-64 mx-auto">
  <DotLottieReact
    src="https://lottie.host/846ebe3b-0159-4e0f-a321-529f18a939c2/zYfsWTUfhy.lottie"
    loop
    autoplay
  />
</div>

      <h1 className="text-3xl font-bold text-green-600 mb-4 mt-0">Thank You for Your Order!</h1>
      <p className="text-lg text-gray-700 !mb-2">Your order has been placed successfully.</p>

      {orderID && (
        <p className="text-base max-md:text-lg text-gray-500 !mb-1">
          <strong>Order ID:</strong> {orderID}
        </p>
      )}
      {amount && (
        <p className="text-base max-md:text-lg text-gray-500 !mb-1">
          <strong>Amount Paid:</strong> ₹{amount.toFixed(2)}
        </p>
      )}
      {paymentType && (
        <p className="text-base max-md:text-lg text-gray-500 mb-1">
          <strong>Payment Mode:</strong> {paymentType.toUpperCase()}
        </p>
      )}

      <div className="flex gap-3 justify-center mt-5">
        <Link to="/dashboard?section=orders">
          <button className="ml-2 px-4 py-2 rounded border text-black border-gray-300 hover:border-gray-600 hover:text-gray-900">
            VIEW ORDER
          </button>
        </Link>
        <Link to="/">
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-800">
            CONTINUE SHOPPING
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
