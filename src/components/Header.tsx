import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { FaRegUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import SearchBarWithPopup from "./SearchBar";
import axios from "axios";
import { logout } from "./api/api-end-points";
import { Popover } from "antd";
import { useLocation } from "react-router-dom";

const Header = ({}) => {
  const [show, setShow] = useState(false);
  const [searchPopup, setSearchPopup] = useState(false);
  const [cartShow, setCartShow] = useState(false);
  const [itemCount, setItemCount] = useState<number>(() => {
    return parseInt(localStorage.getItem("itemCount") || "0", 10);
  });
  const location = useLocation();
  const isHome = location.pathname === "/";
  useEffect(() => {
    const handleItemCountUpdate = () => {
      const updatedCount = parseInt(
        localStorage.getItem("itemCount") || "0",
        10
      );
      setItemCount(updatedCount);
    };

    window.addEventListener("itemCountUpdated", handleItemCountUpdate);
    return () => {
      window.removeEventListener("itemCountUpdated", handleItemCountUpdate);
    };
  }, []);

  const isLoggedIn = !!localStorage.getItem("auth_token");

  const handleClick = () => setShow(!show);
  const handleCart = () => setCartShow(!cartShow);

  const handleLogout = async () => {
    try {
      await axios.post(
        logout,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      );

      // Clear token and cart count
      localStorage.removeItem("auth_token");
      localStorage.removeItem("itemCount");

      // Optional: dispatch a custom event to update header state (if you're not reloading)
      window.dispatchEvent(new Event("itemCountUpdated"));

      // Reload the page or redirect
      window.location.href = "/";
    } catch (err) {
      console.error("Error in logout:", err);
    }
  };

  const content = (
    <div className="flex gap-1 w-[100px] flex-col">
      <Link to="/dashboard" className=" font-semibold hover:text-[#7B48A5]">
        Dashboard
      </Link>
      <button
        onClick={handleLogout}
        className=" hover:text-[#7B48A5] font-semibold w-full text-left"
      >
        Logout
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Search Popup */}
      <div className="md:hidden">
        {searchPopup && (
          <div className="fixed inset-0 z-[1000] bg-white p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-lg font-semibold text-[#7B48A5]">Search</p>
              <IoClose
                className="text-2xl cursor-pointer text-[#7B48A5]"
                onClick={() => setSearchPopup(false)}
              />
            </div>
            <SearchBarWithPopup onSelectProduct={() => setSearchPopup(false)} />
          </div>
        )}
      </div>

      {/* Overlay */}
      {(show || cartShow) && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[900]"
          onClick={() => {
            setShow(false);
            setCartShow(false);
          }}
        ></div>
      )}

      {/* Mobile Menu */}
      {/* <div
        className={`categories fixed z-[1000] bg-white h-[100%] w-[310px] px-[30px] py-[40px] flex-col 
        transition-all duration-500 ease-in-out transform border border-white ${
          show ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <IoClose
          className="text-2xl absolute right-3 top-5 cursor-pointer"
          onClick={() => setShow(false)}
        />
        <div className="flex justify-center mb-5">
          <img
            src="/logo/admirer_logo.png"
            className="w-[110px] h-[72px] cover"
            alt=""
          />
        </div>
        <div>huij</div>
      </div> */}

      {/* Cart Sidebar */}
      <div
        className={`cart fixed z-[1000] bg-white h-[100vh] w-[340px] px-[30px] py-[40px] flex-col 
        transition-all duration-500 ease-in-out transform right-0 border border-white
        ${
          cartShow ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <IoClose
          className="text-2xl absolute right-3 top-5 cursor-pointer"
          onClick={() => setCartShow(false)}
        />
        <div>Cart Page</div>
      </div>

      {/* Main Header */}
      <main
        className={`w-full relative top-0 left-0 z-50 pb-[1px] ${
          isHome ? "bg-transparent" : "bg-white shadow-md"
        }`}
      >
        {/* Top Banner */}
        {/* <div className="tf-top-bar bg_white line">
          <div className="px_15 lg-px_40">
            <nav className="box-navigation text-center p-2 bg-[#e5d6eb]">
              <Slider {...offerBanner}>
                <div className="swiper-slide">
                  <p className="top-bar-text fw-5 text-[#7925bf] text-[14px]">
                    Upto 60% off on all products.
                  </p>
                </div>
                <div className="swiper-slide">
                  <p className="top-bar-text fw-5 text-[#7925bf] text-[14px]">
                    Trending Jewellery.
                  </p>
                </div>
                <div className="swiper-slide">
                  <p className="top-bar-text fw-5 text-[#7925bf] text-[14px]">
                    Fast Delivery
                  </p>
                </div>
              </Slider>
            </nav>
          </div>
        </div> */}

        {/* Main Header Content */}
        <div className="m-auto max-md:w-full">
          <div className="flex justify-between items-center w-[94%] m-auto max-md:w-full px-2">
            {/* Mobile Menu and Search */}
            <div className="gap-[12px] hidden max-md:flex max-md:mt-[-4px]">
              {/* <div
                className="w-5 h-[14px] mt-3 flex flex-col justify-between overflow-hidden cursor-pointer"
                onClick={handleClick}
              >
                <span className="w-full h-[2px] bg-black block"></span>
                <span
                  className={`w-full h-[2px] bg-black block ${
                    show ? "" : "ml-[-9px]"
                  }`}
                ></span>
                <span className="w-full h-[2px] bg-black block"></span>
              </div> */}
              <Search
                className="relative top-[15px] transform -translate-y-1/2 text-[#7B48A5] cursor-pointer"
                onClick={() => setSearchPopup(true)}
              />
            </div>

            {/* Logo */}
            <Link to="/">
              <img
                src="/logo/admirer_logo.png"
                className="w-[120px] max-md:w-[105px] h-[50px] max-md:h-[45px] cover ml-5"
                alt=""
              />
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchBarWithPopup />
            </div>

            {/* Right Side Icons */}
            <div className="flex gap-4 items-center max-md:mt-[-2px] max-md:mr-1">
              {isLoggedIn ? (
                <Popover placement="bottom" content={content}>
                  <div className="group relative">
                    <Link to="/dashboard">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <FaRegUser className="w-5 h-5 mb-[2px] text-[#7B48A5]" />
                        <p className="text-md max-lg:hidden tracking-wider font-semibold text-gray-600">
                          Account
                        </p>
                      </div>
                    </Link>
                    {/* <div className="max-md:hidden">
                    
                    </div> */}
                  </div>
                </Popover>
              ) : (
                <Link to="/LogIn">
                  <div className="flex items-center gap-2">
                    <FaRegUser className="w-5 h-5 mb-[2px] text-[#7B48A5]" />
                    <p className="text-md max-lg:hidden tracking-wider font-semibold text-gray-600">
                      Login
                    </p>
                  </div>
                </Link>
              )}

              {/* Divider */}
              <div className="max-md:hidden h-5 w-[1px] bg-black" />

              <Link to="/wishlist">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#7B48A5]" strokeWidth={2.5} />
                  <p className="text-md max-lg:hidden tracking-wider font-semibold text-gray-600">
                    Wishlist
                  </p>
                </div>
              </Link>

              {/* Divider */}
              <div className="max-md:hidden h-5 w-[1px] bg-black" />

              <Link to="/cart">
                <div className="flex items-center gap-2 relative">
                  <div className="relative">
                    <ShoppingBag
                      className="w-5 h-5 text-[#7B48A5]"
                      strokeWidth={2.5}
                    />

                    {/* Badge above the icon */}
                    {itemCount! > 0 && (
                      <div className="absolute -top-2 -right-2 bg-[#7B48A5] text-white w-4 h-4 text-[11px] flex items-center justify-center rounded-full">
                        {itemCount}
                      </div>
                    )}
                  </div>

                  <p className="text-md max-lg:hidden tracking-wider font-semibold text-gray-600">
                    Cart
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Header;
