import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import RemoveFromBag from "./RemoveFromBag";
import { wishlist_add_remove } from "../../api/api-end-points";
import { Select } from "antd";
const { Option } = Select;

interface ItemProps {
  id: number;
  brandName: string;
  description: string;
  price: string;
  quantity: string;
  brandId: string;
  discount: string;
  return_day: string;
  finalPrice: string;
  totalQuantity: string;
  image: string;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, newQty: number) => void; // ✅ Added this
  totalItem: number;
}

const Item: React.FC<ItemProps> = ({
  id,
  brandName,
  description,
  price,
  quantity,
  image,
  brandId,
  discount,
  return_day,
  finalPrice,
  totalQuantity,
  totalItem,
  onRemove,
  onQuantityChange,
}) => {
  let qty = parseInt(quantity);
  const totalQty = parseInt(totalQuantity);

  if (qty > totalQty) {
    qty = totalQty;
  }
  // console.log("wrgrefwqfb", discount);
  console.log("qty", quantity);
  const quantityOptions = Array.from({ length: totalQty }, (_, i) => i + 1);

  async function onMoveToWishlist(id: string | number): Promise<void> {
    try {
      const response = await fetch(wishlist_add_remove, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
        body: JSON.stringify({
          product_id: id,
          wishlist: 1,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message || "Wishlist updated");
      } else if (response.status === 401) {
      } else {
        // alert("Something went wrong.");
        console.error(result);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  }

  // const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  // console.log("Cart Items:", cartItems);
  // console.log("Subcat IDs:", cartItems.map((item: { subcat_id: any; }) => item.subcat_id));
  // const isComboApplied =
  //   cartItems.length === 3 &&
  //   cartItems.every(
  //     (item: { subcat_id: string }) => parseInt(item.subcat_id) === 10
  //   );

  return (
    <div className="bg-white relative mt-1 mb-2">
      <div className="flex border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200">
        <div className="absolute right-2 top-2">
          <RemoveFromBag
            id={id}
            productImage={image}
            onRemove={onRemove}
            onMoveToWishlist={onMoveToWishlist}
            onQuantityChange={onQuantityChange}
          />
        </div>

        <div className="w-[25%] relative flex  items-center justify-center">
          <Link to={`/product/${id}`}>
            <img className="w-[120px] h-fit" src={image} alt={brandName} />
          </Link>
        </div>

        <div className="w-[75%] p-3  flex flex-col h-fit">
          <div className="hidden">{id}</div>
          <Link to={`/product/${id}`}>
            <h2 className="text-[17px] font-[500] text-gray-900 mb-1 w-[95%] truncate">
              {brandName}
            </h2>
          </Link>

          <div className="flex items-center mb-3 mt-2">
            <span className="font-semibold text-sm mr-2  text-black">Qty:</span>


            <Select
              value={qty}
              onChange={(value) => onQuantityChange(id, value)}
              className="w-16 border border-gray-300 bg-gray-50 !h-[30px] rounded text-sm font-medium focus:outline-none"
              size="small"
            >
              {quantityOptions.map((num) => (
                <Option  key={num} value={num}>
                  {num}
                </Option>
              ))}
            </Select>

            {/* <select
              className="border border-gray-300 cursor-pointer rounded px-2 py-1 text-sm font-medium bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 w-16"
              value={1}
            >
              <option key={1} value={1}>
                1
              </option>
            </select> */}
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-black font-semibold">
              ₹{(parseFloat(discount) * qty).toFixed(2)}
            </span>
            <span className="text-gray-400 line-through text-xs">
              ₹{(parseFloat(price) * qty).toFixed(2)}
            </span>
            <span className="text-red-600 text-xs font-bold bg-red-50 px-1 py-0.5 rounded">
              {Math.round(
                ((parseFloat(price) - parseFloat(discount)) /
                  parseFloat(price)) *
                  100
              )}
              % off
            </span>
          </div>
          {parseFloat(discount) == 349 && (
            <div className="text-green-600 text-xs font-semibold">
              Combo Offer Price
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
