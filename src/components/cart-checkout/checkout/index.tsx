import React, { useEffect, useState } from "react";
// Coupons modal component
import Coupons_screen from "../../coupons/Coupons_screen";
// Order success modal (abhi commented)
import OrderSuccessModal from "../../OrderSuccessModal";
// Toast for notifications
import { toast } from "react-toastify";
// Routing hooks
import { useNavigate, useLocation } from "react-router-dom";
// Ant Design modal
import { Modal } from "antd";
// APIs
import {
  nimbusDelievery_API,
  razorPayCreateOrderApi,
  razorPayStoreApi,
} from "../../api/api-end-points";
// AWB context (for storing generated awb number)
import { useAwb } from "../../../contexts/AwbContext";

// Types for static price details display
interface PriceDetail {
  label: string;
  value: string;
  isFree?: boolean;
  isDiscount?: boolean;
  isLink?: boolean;
  hasMoreInfo?: boolean;
  moreInfoContent?: string;
}

// Address data structure
interface ShippingData {
  first_name: string;
  last_name: string;
  flat: string;
  street: string;
  locality: string;
  country_name: string;
  state: string;
  city: string;
  zip_code: string;
  phone: string;
  email: string;
  addr_type: string;
}

// Props for checkout component
interface IndexProps {
  itemCount?: number;
  totalMRP?: string;
  discount?: string;
  couponApplied?: boolean;
  platformFee?: string;
  shippingFee?: string;
  totalAmount?: string;
  shippingData?: ShippingData;
  onRequestAddressModal?: () => void;
}

const Checkout: React.FC<IndexProps> = ({
  itemCount = 1,
  totalMRP = "0",
  discount = "0",
  couponApplied = false,
  platformFee = "Free",
  shippingFee = "Free",
  totalAmount = "0",
  shippingData,
  onRequestAddressModal,
}) => {
  // DEBUG: show shipping data in console when changes
  useEffect(() => {
    // console.log("the shipping data in checkout is = ", shippingData);
  }, [shippingData]);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // Selected payment method (cod/online)
  const [selected, setSelected] = useState("cod");
  // For showing success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // Order number generated
  const [orderId, setOrderId] = useState("");
  // Loading flag for place order
  const [loading, setLoading] = useState(false);

  // For modal: coupon or know more
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Razorpay amount calculations
  const cleanedTotal = Number(totalAmount.replace(/,/g, ""));
  const gstAmount = Math.ceil(Number((cleanedTotal * 0.05).toFixed(2)));

  // Final payable amount with GST (no combo condition active)
  let totalWithGST = Number((cleanedTotal + gstAmount).toFixed(2));

  // Navigation hook for redirect
  const navigate = useNavigate();
  // Awb context for storing delivery tracking number
  const { setAwbNumber } = useAwb();

  // Basic check for incomplete data, show blank if missing
  const isLoading =
    !itemCount ||
    itemCount === 0 ||
    !totalMRP ||
    totalMRP === "0" ||
    !totalAmount ||
    totalAmount === "0";

  if (isLoading) return <div></div>;

  // Place order handler for both COD and online payment
  const handlePlaceOrder = async () => {
    const authToken = localStorage.getItem("auth_token");

    // If not logged in, redirect to login
    if (!authToken) {
      navigate("/LogIn", { state: { fromCheckout: true } });
      toast.error("Please LogIn before placing your order.");
      return;
    }

    // If address missing, show address modal
    if (!shippingData) {
      onRequestAddressModal?.();
      toast.error("Please fill in your address before placing your order.");

      return;
    }
    setLoading(true);

    // Order number created with timestamp
    const order_number = "BTJ" + new Date().getTime();

    // Online payment flow
    if (selected === "online") {
      try {
        // Create order in backend
        const createOrderRes = await fetch(razorPayCreateOrderApi, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalWithGST }),
        });

        const orderData = await createOrderRes.json();
        // console.log(orderData);

        // Razorpay config
        const options = {
          key: "rzp_live_9dQQZTZXMKwBMJ",
          amount: orderData.amount,
          image: "/logo/admirer_logo.png",
          currency: "INR",
          name: "BTJ Admirer",
          notes: {
            order_type: "Online",
            platform: "WebApp",
          },
          description: "Order Payment",
          order_id: orderData.order_id,
          handler: async function (response: any) {
            try {
              setLoading(true);
              // Verify payment signature
              const verifyRes = await fetch(razorPayStoreApi, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${authToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              if (verifyRes.ok) {
                // Place delivery order in Nimbus
                const payload = {
                  orderID: order_number,
                  paymentType: "prepaid",
                  amount: totalWithGST,
                  city: shippingData?.city || "",
                  firstName: shippingData?.first_name || "",
                  lastName: shippingData?.last_name || "",
                  flat: shippingData?.flat || "",
                  locality: shippingData?.locality || "",
                  state: shippingData?.state || "",
                  street: shippingData?.street || "",
                  pincode: shippingData?.zip_code || "",
                };
                const nimbusRes = await fetch(nimbusDelievery_API, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                });

                if (nimbusRes.status === 200) {
                  const data = await nimbusRes.json();
                  const awb = data.data.data.awb_number;
                  console.log(awb);
                  setAwbNumber(awb);
                  setOrderId(order_number);
                  navigate("/order-confirmation", {
                    state: { orderID: order_number },
                  });
                  setLoading(false);
                } else {
                  alert("Order placed but failed to notify delivery service.");
                  setLoading(false);
                }
              } else {
                alert("Payment verification failed.");
              }
            } catch (err) {
              console.error("❌ Error verifying payment:", err);
              alert("Error verifying payment. Please try again.");
            }
          },
          prefill: {
            name: `${shippingData?.first_name || ""} ${
              shippingData?.last_name || ""
            }`,
            email: shippingData?.email || "",
            contact: shippingData?.phone || "",
          },
          theme: { color: "#7B48A5" },
        };

        // Open Razorpay widget
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("❌ Error during payment:", err);
        alert("Something went wrong while processing online payment.");
      }
    } else {
      // Cash on Delivery flow
      try {
        const payload = {
          orderID: order_number,
          paymentType: "cod",
          amount: totalWithGST,
          city: shippingData?.city || "",
          firstName: shippingData?.first_name || "",
          lastName: shippingData?.last_name || "",
          flat: shippingData?.flat || "",
          locality: shippingData?.locality || "",
          state: shippingData?.state || "",
          street: shippingData?.street || "",
          pincode: shippingData?.zip_code || "",
        };
        console.log("payload is ", payload);
        const response = await fetch(nimbusDelievery_API, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          const awb = data.data.data.awb_number;
          console.log(awb);
          setAwbNumber(awb);
          setOrderId(order_number);
          navigate("/order-confirmation", { state: { payload } });
        } else {
          toast.error("Failed to place COD order.");
        }
      } catch (err) {
        console.error("❌ Error placing COD order:", err);
        // toast.error(data.message);
        toast.error("Courier is not serviceable.");
      }
    }
    // Cart cleanup & header sync
    localStorage.removeItem("cartItems");
    localStorage.setItem("itemCount", "0");
    window.dispatchEvent(new Event("itemCountUpdated"));
    setLoading(false);
  };

  // Price breakdown for UI
  const priceDetails: PriceDetail[] = [
    { label: "Total MRP", value: `₹${totalMRP}` },
    {
      label: "Discount on MRP",
      value: `-₹${discount}`,
      isDiscount: true,
      hasMoreInfo: true,
      moreInfoContent: "This is a discount based on ongoing offers and sales.",
    },
    {
      label: "Discounted Price",
      value: `₹${totalAmount}`,
    },
    {
      label: "GST",
      value: `₹${gstAmount.toFixed(2)}`,
      hasMoreInfo: true,
      moreInfoContent: "A GST of 5% is applied to the total product value.",
    },
    {
      label: "Shipping Fee",
      value: shippingFee,
      isFree: shippingFee === "Free",
      hasMoreInfo: true,
      moreInfoContent: "There is no shipping cost on this order.",
    },
  ];

  return (
    <>
      {/* <OrderSuccessModal
        open={showSuccessModal}
        orderId={orderId}
        onClose={() => setShowSuccessModal(false)}
      /> */}

      <div className="w-[35%] max-md:w-[100%] p-5 max-md:p-3 py-6 pb-3 border-l bg-white border-[#eaeaec]">
        {/* <div className="mb-4">
          <h3 className="text-[14px] text-[#535766] font-bold mb-4">COUPONS</h3>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <GoTag className="text-[19px] mt-0.5" />
              <p className="font-semibold text-[#282c3f]">Apply Coupons</p>
            </div>
            <button
              className="px-3 py-1 border border-[#7B48A5] text-sm font-semibold text-[#7B48A5] hover:bg-[rgb(245,245,245)]"
              onClick={showModal}
            >
              APPLY
            </button>
            <Modal
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              width={550}
              centered
              closable={false}
              className="no-padding-modal"
              bodyStyle={{
                padding: 0,
                background: "transparent",
                boxShadow: "none",
                borderRadius: 0,
              }}
            >
              <Coupons_screen onClose={() => setIsModalOpen(false)} />
            </Modal>
          </div>
        </div> */}

        <hr className="max-md:hidden" />
        <div className="mt-5 mb-4 ">
          <div className="clear-both"></div>
          <h3 className="text-[14px] text-[#535766] font-bold mb-4">
            PRICE DETAILS ({itemCount} item{itemCount > 1 ? "s" : ""})
          </h3>
          <hr className="hidden max-md:block" />

          <div className="leading-[28px] max-md:mt-4">
            {priceDetails.map((detail, index) => (
              <div key={index} className="flex justify-between text-[14px]">
                <div className="text-[#282c3f] tracking-normal flex gap-1">
                  {detail.label}
                  {detail.hasMoreInfo && (
                    <span
                      onClick={() => {
                        setModalContent(detail.moreInfoContent || "");
                        setIsModalOpen(true);
                      }}
                      className="text-purple-800 ml-1 font-bold cursor-pointer"
                    >
                      Know More
                    </span>
                  )}
                </div>
                <div
                  className={`${
                    detail.isDiscount
                      ? "text-[#03a685]"
                      : detail.isFree
                      ? "text-[#03a685]"
                      : "text-[#282c3f]"
                  }`}
                >
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className="hidden max-md:block" />
        <div className="mb-5">
          <div className="flex justify-between mt-4 mb-4 text-[15px] font-bold text-[#3e4152]">
            {totalWithGST === 1049 ? (
              <div>Offer Amount</div>
            ) : (
              <div>Total Amount</div>
            )}

            <div>₹{totalWithGST.toFixed(2)}</div>
          </div>
        </div>
        <hr className="max-md:hidden" />

        <h2 className="text-[14px] text-[#535766] font-bold mb-4 mt-5 max-md:mt-8">
          PAYMENT METHOD
        </h2>

        <div className="border mb-5 rounded-lg">
          {/* COD First */}
          <div
            onClick={() => setSelected("cod")}
            className={`flex items-center p-4 bg-purple-100 rounded-t-lg cursor-pointer ${
              selected === "cod"
                ? "bg-purple-300 border-l-4 border-purple-900"
                : "bg-white"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={selected === "cod"}
              onChange={() => setSelected("cod")}
              className="form-radio hidden text-purple-950 mr-3"
            />
            <div
              className={`flex items-center ${
                selected === "cod" ? "font-semibold text-purple-950" : "ml-1"
              }`}
            >
              <img src="/icons/cash-icon.svg" className="w-6 h-6 mr-2" alt="" />
              <label className="text-[15px] select-none cursor-pointer">
                Cash On Delivery (No extra charges)
              </label>
            </div>
          </div>

          {/* Online Second */}
          <div
            onClick={() => setSelected("online")}
            className={`flex items-center p-4 rounded-b-lg cursor-pointer ${
              selected === "online"
                ? "bg-purple-300 border-l-4 border-purple-900"
                : "bg-white"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={selected === "online"}
              onChange={() => setSelected("online")}
              className="form-radio hidden text-purple-950 mr-3"
            />
            <div
              className={`flex items-center ${
                selected === "online" ? "font-semibold text-purple-950" : "ml-1"
              }`}
            >
              <img src="/icons/online.svg" className="w-6 h-6 mr-2" alt="" />
              <label className="text-[15px] select-none cursor-pointer">
                Online (UPI / Credit, Debit Card)
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`w-full border rounded h-[44px] py-2 text-sm font-semibold text-white ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "hover:bg-purple-700 bg-[#7b48a5]"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center text-sm text-white">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Confirming your order...
            </div>
          ) : (
            "PLACE ORDER"
          )}
        </button>
        <div className=" flex justify-center items-center mt-3 text-center">
          <img
            src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png"
            className="w-8 h-8 mr-3 max-md:w-6 max-md:h-6 max-md:mr-2"
            alt="100% Secure"
          />
          <p className="text-[#535766] text-md max-md:text-sm tracking-wider font-semibold">
            100% SECURE
          </p>
        </div>
      </div>
      <Modal
        title="More Information"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={"350px"}
      >
        <p>{modalContent}</p>
      </Modal>
    </>
  );
};

export default Checkout;
