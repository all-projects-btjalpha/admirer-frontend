import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import Dashboard_Profile from "../components/dashboard-profile";
import OrderPage from "../components/dashboard-orders";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { logout } from "../components/api/api-end-points";
import { IoLogOut } from "react-icons/io5";
import Dashboard_Address from "../components/dashboard-address";

const Dashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sectionFromURL = queryParams.get("section");

  const [activeSection, setActiveSection] = useState(
    sectionFromURL || "profile"
  ); // default is profile

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

  return (
    <div className="p-6 max-sm:p-0 w-[85%] mt-1 max-sm:mt-3 max-md:w-[100%] m-auto flex max-sm:block gap-5">
      <div className="w-[30%] max-sm:w-[100%] max-sm:m-auto flex flex-col gap-5 ">
        {/* Top Greeting Section */}
        <div className="max-md:hidden bg-white p-4 py-3 flex gap-5 shadow-md items-center">
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
            alt=""
          />
          <span className="font-semibold text-lg text-[#212121]">Hello</span>
        </div>

        {/* Sidebar Navigation */}
        <div className="bg-white p-4 shadow-md">
          <div className="gap-3 font-semibold text-[#212121] items-center mb-3 p-2 text-[16px] flex w-full">
            <FaUserAlt className="w-5 h-5 mr-1 text-[#7B48A5]" />
            <span className="mt-1 select-none">ACCOUNT DETAILS</span>
          </div>

          {/* Sidebar Items */}
          <div className="flex flex-col gap-2">
            {/* First Row: Profile & Orders */}
            <div className="flex flex-col gap-2 max-md:flex-row w-full">
              <div
                onClick={() => setActiveSection("profile")}
                className={`p-3 pl-12 max-md:pl-0 max-md:border w-full cursor-pointer select-none max-md:text-center ${
                  activeSection === "profile"
                    ? "bg-purple-200 text-purple-700 font-semibold"
                    : "hover:bg-purple-200 hover:text-purple-700"
                }`}
              >
                Profile
              </div>
              <div
                onClick={() => setActiveSection("orders")}
                className={`p-3 pl-12 max-md:pl-0 max-md:border w-full cursor-pointer select-none max-md:text-center ${
                  activeSection === "orders"
                    ? "bg-purple-200 text-purple-700 font-semibold"
                    : "hover:bg-purple-200 hover:text-purple-700"
                }`}
              >
                My Orders
              </div>
            </div>

            {/* Second Row: Address & Logout */}
            <div className="flex flex-col gap-2 max-md:flex-row w-full">
              <div
                onClick={() => setActiveSection("address")}
                className={`p-3 pl-12 max-md:pl-0 max-md:border w-full cursor-pointer select-none max-md:text-center ${
                  activeSection === "address"
                    ? "bg-purple-200 text-purple-700 font-semibold"
                    : "hover:bg-purple-200 hover:text-purple-700"
                }`}
              >
                Address
              </div>
              <div
                onClick={() => handleLogout()}
                className="p-3 pl-12 max-md:pl-0 max-md:border w-full hidden max-md:block cursor-pointer select-none max-md:text-center hover:bg-purple-200 hover:text-purple-700"
              >
                Logout
              </div>
            </div>
          </div>
        </div>

        {/* Optional Logout Icon for Desktop View */}
        <div className="max-md:hidden bg-white p-3 flex flex-col shadow-md items-start">
          <div className="gap-3 font-semibold text-[#212121] items-center hover:bg-purple-200 hover:text-purple-700 pl-2 text-[16px] flex w-full">
            <IoLogOut className="w-8 h-8 text-[#7B48A5]" />
            <div
              onClick={() => handleLogout()}
              className="p-3 pl-1 w-full select-none cursor-pointer"
            >
              Logout
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Section */}
      <div className="w-[70%] max-sm:w-[100%] m-auto">
        {activeSection === "profile" && <Dashboard_Profile />}
        {activeSection === "orders" && <OrderPage />}
        {activeSection === "address" && <Dashboard_Address />}
      </div>
    </div>
  );
};

export default Dashboard;
