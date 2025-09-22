import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

interface productItemProps {
  name: string;
  price: string;
  description: string;
  originalPrice: string;
  discount: string;
  imageUrl?: string;
  wishlist_id: number;
  id: number;
  onRemove: (id: number) => void;
  onMoveToCart: (id: number) => void;
}

const ProductItem: React.FC<productItemProps> = ({
  name,
  price,
  description,
  originalPrice,
  discount,
  imageUrl,
  wishlist_id,
  id,
  onRemove,
  onMoveToCart,
}) => {
  return (
    <div className="max-w-[300px] font-sans bg-white rounded-[5px]  max-md:p-0 pb-2 flex flex-col gap-1 max-md:gap-1 items-center text-center border  border-gray-300">
      {/* Product Image with Hover Button */}
      <div className="relative group">
        <Link to={`/product/${id}`}>
          <img src={imageUrl} alt="product" className="w-full h-auto rounded " />
        </Link>

        {/* Heart Button at Top Right (Hidden initially, shows on hover) */}
        <button
          className="absolute top-0 right-0 transition-opacity"
          onClick={() => onRemove(wishlist_id)} // <== call onRemove with ID
        >
          <div className="p-1 m-2 max-md:p-0 rounded-full border bg-gray-50 border-gray-100 text-gray-500 hover:text-black">
            <IoClose className="text-xl max-md:text-lg" />
          </div>
        </button>
      </div>

      {/* Product Id */}
      <div className="hidden">{wishlist_id}</div>
      <div className="hidden">{id}</div>

      {/* Product Name */}
      <div className="font-semibold text-black text-[18px] max-md:text-[16px] !truncate whitespace-nowrap overflow-hidden w-full px-3 max-md:px-1 mt-2 ">
        <Link to={`/product/${id}`}>{name}</Link>
      </div>

      {/* Product Description */}
      {/* <div className="text-gray-400 text-xs leading-relaxed font-bold truncate overflow-hidden whitespace-nowrap w-full max-w-[250px] px-2">
        {description}
      </div> */}

      {/* Price Section */}
      <div className="flex items-center justify-center gap-2.5 max-md:gap-1 mb-2 max-md:mb-1 max-md:p-1 flex-wrap w-full">
        <span className="font-semibold text-black text-xl max-md:text-[14px]">
          Rs {price}
        </span>
        <span className="line-through text-gray-400 text-lg max-md:text-xs">
          Rs {originalPrice}
        </span>
        <span className="bg-red-50 text-red-700 font-bold  px-2 max-md:px-1 py-0.5 rounded text-sm max-md:text-xs">
          {discount}% OFF
        </span>
      </div>
      <hr className="p-0 w-full" />
      <div
        className="p-1 text-center font-semibold select-none text-[#7B48A5] text-md max-md:text-sm leading-6 tracking-tight cursor-pointer w-full"
        onClick={() => onMoveToCart(id)}
      >
        MOVE TO CART
      </div>
    </div>
  );
};

export default ProductItem;
