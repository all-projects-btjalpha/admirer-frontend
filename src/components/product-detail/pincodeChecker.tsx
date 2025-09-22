import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const DeliveryTimeChecker: React.FC = () => {
  const [pincode, setPincode] = useState<string>("201301");
  const [loading, setLoading] = useState<boolean>(false);
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPincode(onlyDigits);
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) return;

    setLoading(true);
    setDeliveryDate("");

    // Simulate API delay
    setTimeout(() => {
      const today = new Date();
      today.setDate(today.getDate() + 2); // Delivery in 2 days
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
      };
      const formattedDate = today.toLocaleDateString("en-IN", options);
      setDeliveryDate(`${formattedDate}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className=" w-full mt-5 mb-4">
      <p className="  mb-3 text-[19px] text-gray-600 tracking-wide">
        Estimated Delivery Time
      </p>
      <form
  onSubmit={handleCheck}
  className="flex overflow-hidden rounded-md border mt-2 border-purple-300 shadow-sm focus-within:ring-1 focus-within:ring-purple-400 focus-within:shadow-md"
>

        <input
          type="text"
          value={pincode}
          onChange={handleChange}
          placeholder="Enter 6 digit pincode"
          className="flex-1 bg-white text-gray-800 p-3 text-sm outline-none"
          maxLength={6}
          required
        />
        <button
          type="submit"
          className="bg-purple-100 w-20 flex items-center justify-center px-4 py-2 text-purple-600 text-sm font-medium transition-all"
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="animate-spin text-purple-700" />
          ) : (
            "Check"
          )}
        </button>
      </form>

      {deliveryDate && (
  <div className="mt-3 flex items-center text-sm text-gray-700">
    <span className="text-purple-500 mr-2">🎁</span>
    <span className="mr-1 text-gray-600">Free Delivery by </span>
    <span className="font-semibold text-gray-800">{deliveryDate}</span>
  </div>
)}
    </div>
  );
};

export default DeliveryTimeChecker;
