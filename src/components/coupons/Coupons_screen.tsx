import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Coupons, { CouponData } from "./Coupons";

interface CouponsScreenProps {
  onClose: () => void; // 👈 Add this prop to handle modal close
}

const Coupons_screen: React.FC<CouponsScreenProps> = ({ onClose }) => {
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  const couponList: CouponData[] = [
    {
      code: "EXTRAC1M150",
      title: "Extra ₹150 Off",
      description: "15% off upto ₹100 on minimum purchase of ₹1000.",
      savings: "Save ₹150",
      expiryDate: "31st May 2025",
      expiryTime: "11:59 PM",
    },
    {
      code: "SAVE100",
      title: "₹100 Off",
      description: "Flat ₹100 off on orders above ₹799.",
      savings: "Save ₹100",
      expiryDate: "25th June 2025",
      expiryTime: "10:00 PM",
    },
    {
      code: "SAVE500",
      title: "₹500 Off",
      description: "Flat ₹500 off on orders above ₹2999.",
      savings: "Save ₹500",
      expiryDate: "25th June 2025",
      expiryTime: "10:00 PM",
    },
  ];

  const selected = couponList.find(c => c.code === selectedCoupon);
  const savingAmount = selected ? selected.savings.replace(/[^0-9]/g, "") : "0";

  return (
    <div className="w-[500px] max-w-full bg-[#f4f4f5] border rounded h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between p-5 pb-3 bg-white">
        <span className="text-[14px] font-semibold">APPLY COUPON</span>
        <IoCloseOutline
          className="text-3xl cursor-pointer"
          onClick={onClose} // 👈 Trigger onClose on icon click
        />
      </div>
      <hr />

      {/* Body */}
      <div className="overflow-y-auto space-y-2 flex-grow">
        {/* Input Section */}
        <div className="p-6 bg-white">
          <form className="flex items-center w-full max-w-md mx-auto bg-white border border-gray-300 rounded shadow-sm px-4 py-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="flex-1 outline-none bg-transparent text-[15px] h-[28px]"
            />
            <div className="font-semibold text-[#7B48A5] cursor-pointer">CHECK</div>
          </form>
        </div>

        {/* Coupons list */}
        <div>
          {couponList.map((coupon) => (
            <Coupons
              key={coupon.code}
              coupon={coupon}
              selectedCoupon={selectedCoupon}
              setSelectedCoupon={setSelectedCoupon}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between bg-white px-5 py-2 border-t border-gray-300 shadow-[0_-2px_4px_rgba(0,0,0,0.1)]">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-0">Maximum savings:</p>
          <p className="text-lg font-bold text-black mb-0"><span>₹</span>{savingAmount}</p>
        </div>
        <button className="bg-purple-600 text-white font-bold text-sm px-8 py-2 rounded-[4px] hover:bg-purple-700 transition duration-200">
          APPLY
        </button>
      </div>
    </div>
  );
};

export default Coupons_screen;
