import React from "react";

interface OfferBannerProps {
  percentageDiscount: number;
}

const OfferBanner: React.FC<OfferBannerProps> = ({ percentageDiscount }) => {
  return (
    <div className="bg-purple-100 rounded-lg p-4 shadow-sm mt-6">
      <h3 className="text-xl font-semibold text-purple-800 mb-3">Offer For You</h3>
      <div className="flex items-center bg-white rounded-md shadow p-3 space-x-4">
        <img
          src="/icons/discount.jpg"
          alt="Discount"
          className="w-8 h-8"
        />
        <div className="text-sm text-gray-800 font-medium">
          Biggest sale of the season! Get up to{" "}
          <span className="text-[#7B48A5] font-bold">
            {percentageDiscount ?? 0}% off
          </span>{" "}
          on the hottest trends. Shop now before it's over!
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
