import React, { useEffect, useState } from "react";
import WishlistCard from "../components/WishlistCard";
import { addToCart, get_wishlist_data, movecart, remove } from "../components/api/api-end-points";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import LoaderCode from "../components/Loader";

const Loader = () => (
  <LoaderCode/>
);

const EmptyWishlist = () => (
  <div className="flex flex-col items-center justify-center h-[90vh]  text-center">
    <img
      src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
      alt="Empty Wishlist"
      className="w-28 h-28 mb-6"
    />
    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
    <p className="text-gray-500">Save your favorite items here to find them easily later.</p>
  </div>
);

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const response = await fetch(get_wishlist_data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      });

      const result = await response.json();
      console.log("Wishlist API response:", result);

      if (response.ok) {
        setWishlistItems(result.data);
      } else if (response.status === 401) {
        // alert("Unauthorized user. Please log in.");
        toast.info("Please log in first to see your wishlist.");
        navigate("/LogIn");
      } else {
        console.error("Error fetching wishlist:", result);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveToCart = async (product_id: number, wishlist_id: number) => {
    const authToken = localStorage.getItem("auth_token");
  
    try {
      const res = await axios.post(
        addToCart,
        {
          product_id,
          cart: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      );
  
      if (res.data?.status === "success") {
        toast.success("Added to cart");
      
        const currentCount = parseInt(localStorage.getItem("itemCount") || "0", 10);
        localStorage.setItem("itemCount", (currentCount + 1).toString());
      
        window.dispatchEvent(new Event("itemCountUpdated"));
      
        handleRemove(wishlist_id);
      } else {
        toast.error("Failed to move to cart");
      }
      
    } catch (error: any) {
      console.error("Failed to move to cart:", error);
      toast.error(error?.response?.data?.message || "Failed to move to cart");
    }
  };
  
  

  const handleRemove = async (wishlist_id: number) => {
    try {
      const res = await fetch(
        remove,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
          body: JSON.stringify({ wishlist_id }),
        }
      );

      const data = await res.json();
      console.log("Removed:", data);

      setWishlistItems((prev) =>
        prev.filter((item) => item.wishlist_id !== wishlist_id)
      );
    } catch (error) {
      console.error("Error removing wishlist item:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-white py-4 pb-16">
      {wishlistItems.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="p-5 max-md:p-2 w-[90%] max-md:w-full m-auto">
          <h1 className="mb-6 max-md:mb-4 font-semibold text-lg tracking-wide">
            My Wishlist{" "}
            <span className="font-normal">({wishlistItems.length} items)</span>
          </h1>

          <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-10 max-md:gap-2">
            {wishlistItems.map((item) => (
              <WishlistCard
                key={item.id}
                wishlist_id={item.wishlist_id}
                name={item.product_name}
                price={item.discount}
                description={item.description}
                originalPrice={item.price}
                discount={item.discount_percent}
                imageUrl={item.image_url}
                id={item.id}
                onRemove={handleRemove}
                onMoveToCart={(product_id: number) => handleMoveToCart(product_id, item.wishlist_id)} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
