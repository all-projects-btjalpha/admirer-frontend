import React from "react";

export interface CouponData {
  code: string;
  title: string;
  description: string;
  savings: string;
  expiryDate: string;
  expiryTime: string;
}

interface CouponsProps {
  coupon: CouponData;
  selectedCoupon: string | null;
  setSelectedCoupon: (code: string | null) => void;
}

const Coupons: React.FC<CouponsProps> = ({ coupon, selectedCoupon, setSelectedCoupon }) => {
  const isSelected = selectedCoupon === coupon.code;

  const handleSelect = () => {
    setSelectedCoupon(isSelected ? null : coupon.code);
  };

  return (
    <div className="flex items-start gap-4 bg-white px-5 py-4 mt-2">
      <div className="mt-1">
        <input
          type="checkbox"
          className="scale-125 accent-purple-700"
          checked={isSelected}
          onChange={handleSelect}
        />
      </div>

      <div>
        <div
          className={`inline-block border-2 border-dashed ${
            isSelected ? "border-purple-800 text-purple-800" : "border-gray-500 text-gray-500"
          } font-bold px-3 py-1 rounded-md cursor-pointer text-sm mb-2 select-none`}
          onClick={handleSelect}
        >
          {coupon.code}
        </div>

        {/* Offer Details */}
        <p className="font-semibold text-sm text-gray-900 mt-1 mb-1">{coupon.savings}</p>
        <p className="text-sm text-gray-700">{coupon.description}</p>
        <p className="text-sm text-gray-600 mt-1">
          Expires on: <span className="font-medium">{coupon.expiryDate}</span>
          <span className="mx-2">|</span>
          <span>{coupon.expiryTime}</span>
        </p>
      </div>
    </div>
  );
};

export default Coupons;
