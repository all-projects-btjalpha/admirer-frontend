import React from "react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { wishlist_add_remove } from "../api/api-end-points";

const SingleProductCard = ({ item }: { item: any }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistStatus, setWishlistStatus] = useState(item.wishlist === 1);

  const toggleWishlist = async (prodId?: string) => {
    const productIdToToggle = prodId || item.id;
    setWishlistStatus((prevStatus) => !prevStatus);

    try {
      const response = await fetch(wishlist_add_remove, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
        body: JSON.stringify({
          product_id: productIdToToggle,
          wishlist: isWishlisted ? 0 : 1,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const action = isWishlisted ? "Removed from" : "Added to";
        setIsWishlisted(!isWishlisted);
        toast.success(`${action} wishlist`);
        console.log(result.message || "Wishlist updated");
      } else if (response.status === 401) {
        toast.error("Please log in to add items to your wishlist.");
      } else {
        console.error(result);
        toast.error("Something went wrong while updating wishlist.");
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="px-2 max-md:px-1">
      <div className="w-full font-sans bg-white rounded-xl p-3 max-md:p-1.5 flex flex-col gap-2 max-md:gap-1 border border-gray-200">
        <div className="relative group">
          <Link to={`/product/${item.id}`}>
            <img
              src={
                `https://admirer.in/asset/image/product/${item.image}` ||
                "https://via.placeholder.com/100"
              }
              alt={item.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>

          <div
            className={`absolute top-2 right-2 p-2 sm:p-1 rounded-full border shadow-md cursor-pointer ${
              wishlistStatus
                ? "bg-purple-100 border-[#7B48A5] text-[#7B48A5]"
                : "bg-white border-[#7B48A5] text-[#7B48A5] "
            }`}
            onClick={() => toggleWishlist(item.id)}
          >
            {wishlistStatus ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
          </div>
        </div>

        <Link to={`/product/${item.id}`}>
          <div className="font-medium text-[16px] max-md:text-[16px] truncate">
            {item.title}
          </div>
        </Link>

        <div className="flex items-center gap-2 max-md:gap-1.5 text-lg">
          <span className="font-semibold text-black max-md:text-[16px]">
            ₹{item.discount}
          </span>
          <span className="line-through text-sm text-gray-400 max-md:text-[15px]">
            ₹{item.price}
          </span>
          <span className="bg-red-50 text-red-700 font-bold px-1 py-0.5 rounded text-xs max-md:text-[12px]">
            {item.discount_percent}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
