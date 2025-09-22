import React from "react";
import { useNavigate } from "react-router-dom";

interface OrderedProduct {
  product_id: string;
  product_name: string;
  price: string;
  quantity: string;
  order_status: string;
  payment_status: string;
  date: string;
  time: string;
  product_image: string;
}

interface OrderedDataProps {
  [orderId: string]: OrderedProduct[];
}

interface OrderCardProps {
  orderedData: OrderedDataProps;
}

const OrderCard: React.FC<OrderCardProps> = ({ orderedData }) => {
  const navigate = useNavigate();
  console.log("Ordered Data received in OrderCard:", orderedData);

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto mt-6">
      {Object.entries(orderedData).map(([orderId, products]) => {
        const productIds = products.map((product) => product.product_id);

        return (
          <div
            key={orderId}
            className="border rounded-md max-md:rounded-none p-4 max-md:p-3 bg-white flex flex-col gap-2 cursor-pointer hover:shadow transition"
            onClick={() => {
              console.log("Navigating to order ID:", orderId);
              navigate(`/order/${orderId}`, {
                state: { productIds },
              });
            }}
          >
            {products.map((product, index) => (
              <div key={index} className="flex gap-4  rounded-md bg-gray-50 p-3 max-md:p-3 max-md:py-4 border items-center">
                <img
                  src={
                    "https://admirer.in/asset/image/product/" +
                    product.product_image
                  }
                  alt="product"
                  className="w-28 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between max-sm:block max-sm:mb-1 items-start">
                    <h3 className="font-medium text-gray-800 text-sm">
                      {product.product_name}
                    </h3>
                    {/* <span className="text-sm font-medium text-gray-900">
                      ₹{product.price}
                    </span> */}
                  </div>
                  <div className=" justify-between max-md:block items-center">
                    <div className="flex items-center gap-1 text-sm max-md:mb-1 mb-1 font-medium">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      {product.order_status}
                    </div>
                    <span className="text-xs text-gray-500">
                      Order Date: {product.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="border rounded-md bg-gray-50 px-4 mt-2 py-2 text-sm text-gray-700">
              {/* <p className="font-medium mb-1"> */}
                <span className="text-gray-600 font-normal text-xs ml-1 ">
                  (Order ID: {orderId})
                </span>
              {/* </p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCard;
