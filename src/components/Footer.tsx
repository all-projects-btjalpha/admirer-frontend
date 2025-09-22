import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { QRCode } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      offset: 100,
      mirror: false,
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      className=" text-white pt-[50px]"
      style={{
        backgroundImage: "url('/gray_bg.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-3 py-3 w-[90%] mb-[50px] m-auto max-sm:w-full max-sm:mb-[20px] mt-[60px] max-sm:mt-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Section */}
          <div
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "200",
              "data-aos-duration": "800",
            })}
          >
            <h3 className="font-semibold mb-3 tracking-wide">
              ONLINE SHOPPING
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 space-y-2 max-md:space-y-1 text-gray-100 max-sm:text-sm">
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/listing?cat=26">Jewellery</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/listing?cat=26&subcat=10">Women Ring</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/listing?cat=26&subcat=11">Engagement Ring</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/listing?cat=26&subcat=12">Necklace</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/listing?cat=26&subcat=13">Alphabet Rings</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/listing?cat=26&subcat=15">3 Ring Combo Set @ 999</Link>
              </li>
            </ul>
          </div>

          {/* Center Section */}
          <div
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "200",
              "data-aos-duration": "800",
            })}
          >
            <h3 className="font-semibold mb-3 tracking-wide">
              CUSTOMER POLICIES
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 space-y-2 max-md:space-y-1 text-gray-100 max-sm:text-sm">
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/exchange">Exchange Policy</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/about">About Us</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/help_faq">Help & FAQs</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/return">Return & Refund Policy</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/shipping">Shipping Policy</Link>
              </li>
              <li className="hover:text-white hover:font-semibold hover:underline">
                <Link to="/blogs">Blogs</Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "200",
              "data-aos-duration": "800",
            })}
          >
            <h3 className="font-semibold mb-3 tracking-wide">
              EXPERIENCE ON MOBILE
            </h3>
            <div className="bg-white w-fit rounded-lg">
              <QRCode
                errorLevel="H"
                value="https://admirer.in"
                icon="/logo/iconn.png"
                size={150}
              />
            </div>

            <h3 className="font-semibold mt-6">KEEP IN TOUCH</h3>
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61573035780558"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-[#1877F2] w-6 h-6 cursor-pointer transform transition-transform duration-200 hover:scale-110" />
              </a>
              <a
                href="https://www.x.com/BTJAdmirer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitterX className="text-black w-6 h-6 cursor-pointer transform transition-transform duration-200 hover:scale-110" />
              </a>
              <a
                href="https://www.instagram.com/official.admirer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-[#E1306C] w-6 h-6 cursor-pointer transform transition-transform duration-200 hover:scale-110" />
              </a>
              <a
                href="https://www.youtube.com/@AdmirerOfficial-t4e"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-[#FF0000] w-7 h-6 cursor-pointer transform transition-transform duration-200 hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Fourth Column */}
          <div
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "200",
              "data-aos-duration": "800",
            })}
          >
            <div className="mt-4 text-sm text-gray-100">
              <div className="flex gap-3 mb-4">
                <img
                  src="/icons/original.png"
                  className="w-10 h-10 mt-1 bg-white p-0.5"
                />
                <p className="text-[17px] leading-snug mb-0 max-sm:text-md">
                  <span className="font-bold text-white">100% ORIGINAL</span>{" "}
                  products — guaranteed, only at BTJ Admirer.
                </p>
              </div>
              <div className="flex gap-3 mb-4">
                <img
                  src="/icons/seven-days.png"
                  className="w-10 h-10 mt-1 bg-white p-0.5"
                />
                <p className="text-[17px] leading-snug max-sm:text-md">
                  <span className="font-bold text-white">
                    Exchange within 7 days
                  </span>{" "}
                  of receiving your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="w-[90%] m-auto border-white" />

      <div
        className="w-[90%] max-sm:w-full px-3 py-3 mb-8 m-auto max-sm:block flex justify-between mt-[40px] max-sm:mt-[20px]"
        {...(isDesktop && {
          "data-aos": "fade-up",
          "data-aos-delay": "300",
          "data-aos-duration": "800",
        })}
      >
        <div className="max-sm:mb-3 text-gray-100">
          <h3 className="font-semibold mb-3 text-white">
            REGISTERED OFFICE ADDRESS
          </h3>
          <p className="!mb-1 text-gray-100">B-26, Sector-2, Noida</p>
          <p className="!mb-1 text-gray-100">Gautam Buddha Nagar</p>
          <p className="!mb-1 text-gray-100">Uttar Pradesh, 201301</p>
          <p className="!mb-1 text-gray-100">India</p>
        </div>
        <div className="max-sm:mt-5 text-gray-100">
          <h3 className="font-semibold mb-3 text-white">LEGAL INFORMATION</h3>
          <p className="!mb-1 text-gray-100">
            <strong>Company Name:</strong> BTJ Alpha Technology Private Limited
          </p>
          <p className="!mb-1 text-gray-100">
            <strong>CIN:</strong> U62099UP2025PTC215855
          </p>
          <p className="!mb-1 text-gray-100">
            <strong>GSTIN:</strong> 09AANCB2020R1ZB
          </p>
        </div>
      </div>

      <div className="text-center pb-1 text-gray-100">
        © 2025 Admirer | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
