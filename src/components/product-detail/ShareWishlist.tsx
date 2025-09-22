import React, { useState, useEffect } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { wishlist_add_remove } from "../api/api-end-points";
import { toast } from "react-toastify";
import {
  FaHeart,
  FaRegHeart,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { FaXTwitter } from "react-icons/fa6";

interface ProductActionsProps {
  productId: number;
  wishlist: number; // 0 or 1
}

const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  wishlist,
}) => {
  const [inWishlist, setInWishlist] = useState(wishlist === 1);
  const [shareOpen, setShareOpen] = useState(false);
  const productUrl = `https://admirer.in/product/${productId}`;
  const productTitle = "Love this piece from Admirer! Have a look:";

  useEffect(() => {
    setInWishlist(wishlist === 1);
  }, [productId, wishlist]);

  const toggleWishlist = async () => {
    try {
      const response = await fetch(wishlist_add_remove, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
        body: JSON.stringify({
          product_id: productId,
          wishlist: inWishlist ? 0 : 1,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setInWishlist(!inWishlist);
        console.log(result.message || "Wishlist updated");
        toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist" )
      } else if (response.status === 401) {
        toast.error("Please log in to add items to your wishlist.");
      } else {
        // alert("Something went wrong.");
        console.error(result);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  const toggleSharePopup = () => {
    setShareOpen(!shareOpen);
  };

  return (
    <div className="flex items-start pt-1.5 gap-2 relative">
      <button
        onClick={toggleWishlist}
        className="text-xl text-[#7B48A5] hover:scale-110 transition-transform"
        aria-label="Add to wishlist"
      >
        {inWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>

      <button
        onClick={toggleSharePopup}
        className="hover:scale-105 transition-transform"
        aria-label="Share"
      >
        <IoShareSocialOutline className="text-2xl text-[#7B48A5] hover:scale-110 transition-transform" />
      </button>

      {shareOpen && (
        <>
          {/* Dark overlay behind everything */}
          <div
            className="fixed inset-0 w-full h-full bg-black bg-opacity-40 z-30"
            onClick={toggleSharePopup}
          />

          {/* Share popup container relative to the share icon */}
          <div className="absolute top-10 right-0 z-50 bg-white border rounded-xl shadow-lg p-4 w-max">
            <p className="text-sm font-semibold ">Share this product</p>
            <div className="flex gap-3 mt-3">
              <FacebookShareButton url={productUrl} title={productTitle}>
                <FacebookIcon size={36} round />
              </FacebookShareButton>
              <WhatsappShareButton url={productUrl} title={productTitle}>
                <WhatsappIcon size={36} round />
              </WhatsappShareButton>
              <TwitterShareButton url={productUrl} title={productTitle}>
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
                  <FaXTwitter size={23} />
                </div>
              </TwitterShareButton>
              <EmailShareButton url={productUrl} subject={productTitle}>
                <EmailIcon size={36} round />
              </EmailShareButton>
              {/* LinkedIn Share Button */}
              {/* <LinkedinShareButton url={productUrl} title={productTitle}>
                <LinkedinIcon size={36} round />
              </LinkedinShareButton> */}
              {/* Telegram Share Button */}
              {/* <TelegramShareButton url={productUrl} title={productTitle}>
                <TelegramIcon size={36} round />
              </TelegramShareButton> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductActions;
