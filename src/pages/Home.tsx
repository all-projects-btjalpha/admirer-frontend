import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useState } from "react";
import TestimonialsSection from "../components/testimonial/Testimonial";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { homePageData } from "../components/api/api-end-points";
import LoaderCode from "../components/Loader";
import AOS from "aos";
import "aos/dist/aos.css";

const Loader = () => <LoaderCode />;

// Arrows
const CustomPrevArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute left-5 max-md:left-1 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
    onClick={onClick}
  >
    <IoIosArrowBack className="text-3xl max-md:text-xl text-gray-700 hover:text-white" />
  </button>
);

const CustomNextArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute right-5 max-md:right-1 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
    onClick={onClick}
  >
    <IoIosArrowForward className="text-3xl max-md:text-xl text-gray-700 hover:text-white" />
  </button>
);

// Interfaces
interface BannerItem {
  image: string;
  mobile_img: string;
  url: string;
}
interface CategoryItem {
  image: string;
  title: string;
  url: string;
}
interface AdvertisementItem {
  image: string;
  url: string;
}
interface OffersItem {
  image: string;
  url: string;
}
interface BannerData {
  image: string;
  url: string;
}
interface BottomBanner {
  mobile_banner: BannerData;
  desktop_banner: BannerData;
}

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [category, setCategory] = useState<CategoryItem[]>([]);
  const [advertisement, setAdvertisement] = useState<AdvertisementItem[]>([]);
  const [offers, setOffers] = useState<OffersItem[]>([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const [videoErrors, setVideoErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [bottombanner, setBottombanner] = useState<BottomBanner>({
    mobile_banner: { image: "", url: "" },
    desktop_banner: { image: "", url: "" },
  });
  const navigate = useNavigate();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
  };

  const exquisiteSetting = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const shortsSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: false,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 768, // for screens <= 768px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false, // optional: hide arrows on small screens
          dots: true,
        },
      },
    ],
  };

  const companies = [
    "Cash On Delivery",
    "Fast Shipping",
    "7 Day Exchange",
    "100% Original",
    "Best Quality",
    "UPI and Cards acceptable",
    "No Hidden Charges",
    "Secure Payment Gateway",
  ];

  const shorts = [
    {
      videoUrl: "/home/video/letter_ring.mp4",
      url: "87",
    },
    // {
    //   videoUrl: "/home/video/necklace.mp4",
    //   url: "158",
    // },
    {
      videoUrl: "/home/video/hand_ring.mp4",
      url: "167",
    },
    {
      videoUrl: "/home/video/box_ring.mp4",
      url: "108",
    },
    {
      videoUrl: "/home/video/coupleRing.mp4",
      url: "152",
    },
    {
      videoUrl: "/home/video/stone_ring.mp4",
      url: "24",
    },
  ];

  const features = [
    {
      img: "/home/safe_delivery.png",
      title: "Safe & Secure Delivery",
    },
    {
      img: "/home/shipping.png",
      title: "Free Shipping",
    },
    {
      img: "/home/exchange.png",
      title: "7 Days Exchange",
    },
    {
      img: "/home/secure.png",
      title: "Secure Payment",
    },
  ];

  const exquisite = [
    {
      id: 1,
      label: "Engagement Ring",
      items: [
        {
          name: "Special King And Queen Adjustable Couple Rings For Lovers",
          image: "/home/exquisite/1.jpg",
          url: "/product/46",
        },
        {
          name: "Special Rose Gold Plated Solitaire Couple Ring Set",
          image: "/home/exquisite/2.jpg",
          url: "/product/61",
        },
        {
          name: "Special Valentines Crown King Queen Silver Plated Cubic Zirconia Ring",
          image: "/home/exquisite/3.jpg",
          url: "/product/40",
        },
      ],
    },
    {
      id: 2,
      label: "Necklace",
      items: [
        {
          name: "Special Rhodium Plated American Diamond Studded Jewellry Set",
          image: "/home/exquisite/10.jpg",
          url: "/product/37",
        },
        {
          name: "Special Rhodium-Plated CZ Studded Jewellry Set",
          image: "/home/exquisite/11.jpg",
          url: "/product/35",
        },
        {
          name: "Silver-Plated American Diamond Studded Jewelry Set",
          image: "/home/exquisite/12.jpg",
          url: "/product/34",
        },
      ],
    },
    {
      id: 3,
      label: "Alphabet Ring",
      items: [
        {
          name: "Special Women Zircon Adjustable Ring (Y) Letter",
          image: "/home/exquisite/7.jpg",
          url: "/product/88",
        },
        {
          name: "Special Women Zircon Adjustable Ring (U) Letter",
          image: "/home/exquisite/8.jpg",
          url: "/product/98",
        },
        {
          name: "Special Women Zircon Adjustable Ring (I) Letter",
          image: "/home/exquisite/9.jpg",
          url: "/product/87",
        },
      ],
    },
    {
      id: 4,
      label: "3 Ring Combo Set",
      items: [
        {
          name: "Letter Ring Trio Set",
          image: "/home/exquisite/13.jpg",
          url: "/product/276",
        },
        {
          name: "Trinity Shine Set",
          image: "/home/exquisite/14.jpg",
          url: "/product/238",
        },
        {
          name: "Twinkle Trio Set",
          image: "/home/exquisite/15.jpg",
          url: "/product/249",
        },
      ],
    },
    {
      id: 5,
      label: "Women Ring",
      items: [
        {
          name: "Radiant Solitaire Ring",
          image: "/home/exquisite/4.jpg",
          url: "/product/176",
        },
        {
          name: "Silver Plated Round Cut Zircon Korean design Ring",
          image: "/home/exquisite/5.jpg",
          url: "/product/102",
        },
        {
          name: "Green Emerald Heart Ring",
          image: "/home/exquisite/6.jpg",
          url: "/product/153",
        },
      ],
    },
  ];

  const [exquisiteId, setExquisiteId] = useState<number>(1);
  const selectedSet = exquisite.find((set) => set.id === exquisiteId);

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

  const handleClick = (url: string) => {
    const catIdMatch = url.match(/cat-([a-zA-Z0-9]+)/);
    const subcatIdMatch = url.match(/subcat-([a-zA-Z0-9]+)/);
    console.log("url", url);
    // console.log(subcatIdMatch);
    const categoryId = catIdMatch ? catIdMatch[1] : "";
    const subcategoryId = subcatIdMatch ? subcatIdMatch[1] : "";

    sessionStorage.setItem("categoryId", categoryId);
    sessionStorage.setItem("activeSubcategory", subcategoryId);

    // setCategoryId(categoryId);
    // setSubcategoryId(subcategoryId);

    // ✅ Navigate with params in URL
    navigate(`/listing?cat=26&subcat=${subcategoryId}`);
  };

  useEffect(() => {
    axios
      .get(homePageData)
      .then((response) => {
        const data = response.data.data;
        setBanners(data.banners);
        setCategory(data.category_subcategory);
        setAdvertisement(data.advertisement);
        setOffers(data.offers_slider);
        setBottombanner(data.bottom_banner);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching homepage data:", error);
      });
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      {/* Content starts here after loading is complete */}

      <main>
        {/* Hero Slider */}
        <section
          {...(isDesktop && { "data-aos": "fade-up", "data-aos-delay": "100" })}
          className="mt-[-55px]"
        >
          <div className="relative">
            <Slider {...sliderSettings}>
              {banners.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(item.url)}
                  className="cursor-pointer"
                >
                  <img
                    className="w-full desktop-banner hidden md:block"
                    src={item.image}
                    alt={`Banner ${index}`}
                  />
                  <img
                    className="w-full mobile-banner block md:hidden"
                    src={item.mobile_img}
                    alt={`Mobile Banner ${index}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Scrolling Text */}
        <section className="relative overflow-hidden bg-purple-200 py-3 max-md:py-2">
          <div className="scroll-wrapper flex w-max animate-scroll">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="mx-8 whitespace-nowrap text-lg max-md:text-base font-semibold text-gray-800"
              >
                {company}
              </div>
            ))}
          </div>
        </section>

        {/* Hero Content */}
        <section
          className="bg-white flex items-center justify-center pt-10 max-md:pt-4 flex-col"
          {...(isDesktop && { "data-aos": "fade-up", "data-aos-delay": "300" })}
        >
          <div className="flex justify-center items-center ml-20 max-md:ml-6">
            <img src="/home/1.jpeg" className="w-[900px] max-md:mt-2" alt="" />
          </div>
          <img
            src="/home/offer-banner.jpg"
            className="w-[90%] block  mt-5 max-md:mt-4 h-full cursor-pointer"
            alt=""
            onClick={() => handleClick("subcat-15")}
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "400",
            })}
          />
        </section>

        {/* Categories */}
        <section>
          <div
            className="text-center py-6 pb-0 pt-8 max-md:pt-4 bg-white max-md:pb-0"
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "500",
            })}
          >
            <div className="flex justify-center items-center mt-3 max-md:mt-0">
              <img
                src="/home/2.jpeg"
                className="w-[650px] max-md:mt-2"
                alt=""
              />
            </div>

            <div className="mt-8 max-md:mt-4 w-full px-2 max-md:w-full gap-2 max-md:p-2 grid grid-cols-6 max-md:grid-cols-2 max-md:gap-2 m-auto">
              {category.map((cat, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(cat.url)}
                  className="cursor-pointer "
                  {...(isDesktop && {
                    "data-aos": "zoom-in-up",
                    "data-aos-delay": `${100 + index * 100}`,
                  })}
                >
                  <div className="max-md:rounded-2xl rounded-full overflow-hidden mb-4 max-md:mb-1.5">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://admirer.in/asset/image/combo-offer-image.jpg";
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {cat.title}
                  </h3>
                </div>
              ))}
              <div
                key={5}
                onClick={() => handleClick("subcat-10")}
                className="cursor-pointer "
                {...(isDesktop && {
                  "data-aos": "zoom-in-up",
                  "data-aos-delay": `600`,
                })}
              >
                <div className="max-md:rounded-2xl rounded-full overflow-hidden mb-4 max-md:mb-1.5">
                  <img
                    src="https://admirer.in/asset/image/single ring.jpg"
                    alt="Asf"
                    className="w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://admirer.in/asset/image/single ring.jpg";
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Women's Ring
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Exquisite Section */}
        <section
          className="bg-white py-2 pt-5 max-md:py-4"
          {...(isDesktop && {
            "data-aos": "fade-up",
            "data-aos-delay": "600",
          })}
        >
          <div className="flex justify-center items-center mt-3 mb-6 max-md:mt-0">
            <img
              src="/home/exquisite.png"
              className="w-[500px] max-md:w-[300px] max-md:mt-2"
              alt=""
            />
          </div>
          {/* Tabs */}
          <div
            className="border-b w-fit max-md:w-full max-md:overflow-x-auto m-auto border-gray-200 flex justify-center max-md:justify-start"
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "600",
            })}
          >
            {exquisite.map((set) => (
              <button
                key={set.id}
                onClick={() => setExquisiteId(set.id)}
                className={`relative mx-4 px-1.5 py-2 transition max-md:text-sm max-md:whitespace-nowrap ${
                  exquisiteId === set.id
                    ? "font-semibold text-gray-900"
                    : "text-gray-600"
                }`}
              >
                {set.label}
                {exquisiteId === set.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900"></span>
                )}
              </button>
            ))}
          </div>

          {/* <hr className="w-[55%] m-auto" /> */}

          {/* Grid Desktop */}
          <div
            className="grid grid-cols-3 w-[90%] mt-4 m-auto gap-5 max-md:hidden"
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "700",
            })}
          >
            {selectedSet &&
              selectedSet.items.map((item, index) => (
                <Link to={item.url} key={index} className="cursor-pointer">
                  <div key={index} className="">
                    <img src={item.image} alt={item.name} />
                    <div className="py-4 text-lg w-[90%] font-semibold text-center text-gray-800">
                      {item.name}
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {/* Grid Mobile */}
          <div
            className="max-md:grid max-md:grid-cols-1 hidden w-[90%] mt-2 mb-6 m-auto gap-5 max-md:gap-2"
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "700",
            })}
          >
            <Slider key={exquisiteId} {...exquisiteSetting}>
              {selectedSet &&
                selectedSet.items.map((item, index) => (
                  <Link to={item.url} key={index} className="cursor-pointer">
                    <div key={index} className="mb-1">
                      <img src={item.image} alt={item.name} />
                      <div className="pb-4 text-base font-semibold text-center text-gray-800">
                        {item.name}
                      </div>
                    </div>
                  </Link>
                ))}
            </Slider>
          </div>
        </section>

        {/* Advertisement */}
        <section>
          <div className="bg-white flex flex-col items-center p-8 pt-6 max-md:p-4 max-md:pt-3">
            <div
              className="flex justify-center items-center mt-3 max-md:mt-0"
              {...(isDesktop && {
                "data-aos": "fade-up",
                "data-aos-delay": "100",
              })}
            >
              <img
                src="/home/3.png"
                className="w-[700px] max-md:mt-2 "
                alt=""
              />
            </div>

            {advertisement.length >= 3 && (
              <div className="mt-10 max-md:mt-6 grid grid-cols-2 max-md:grid-cols-1 gap-2 w-[97%] m-auto">
                <div
                  {...(isDesktop && {
                    "data-aos": "fade-right",
                    "data-aos-delay": "300",
                  })}
                >
                  <img
                    onClick={() => handleClick(advertisement[0].url)}
                    src={advertisement[0].image}
                    alt="Main collection"
                    className="w-full h-[800px] max-md:h-full rounded-2xl shadow-md cursor-pointer"
                  />
                </div>

                <div className="grid gap-2 max-md:gap-4">
                  <img
                    onClick={() => handleClick(advertisement[1].url)}
                    src={advertisement[1].image}
                    alt="advertisement 1"
                    className="w-full h-[395px] max-md:h-full rounded-2xl shadow-md cursor-pointer"
                    {...(isDesktop && {
                      "data-aos": "fade-down",
                      "data-aos-delay": "400",
                    })}
                  />

                  <img
                    onClick={() => handleClick(advertisement[2].url)}
                    src={advertisement[2].image}
                    alt="advertisement 2"
                    className="w-full h-[395px] max-md:h-full rounded-2xl shadow-md cursor-pointer"
                    {...(isDesktop && {
                      "data-aos": "fade-up",
                      "data-aos-delay": "400",
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Offers */}
        <section>
          <div className="bg-white flex flex-col items-center p-6 pb-16 max-md:p-4">
            <div
              className="flex justify-center items-center mt-3 max-md:mt-0"
              {...(isDesktop && {
                "data-aos": "fade-up",
                "data-aos-delay": "100",
              })}
            >
              <img
                src="/home/4.jpeg"
                className="w-[400px] max-md:w-[250px] max-md:mt-2 "
                alt=""
              />
            </div>

            {/* Desktop */}
            <div className="mt-8 hidden md:grid grid-cols-3 gap-4 w-[90%] m-auto">
              {offers.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleClick(item.url)}
                  className="cursor-pointer"
                  {...(isDesktop && {
                    "data-aos": "fade-up",
                    "data-aos-delay": `${200 + idx * 250}`,
                  })}
                >
                  <img
                    src={item.image}
                    className="w-full h-full object-cover rounded-xl shadow-md"
                    alt={`Curated ${idx}`}
                  />
                </div>
              ))}
            </div>

            {/* Mobile */}
            <div className="mt-4 w-full md:hidden overflow-hidden">
              <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4">
                {offers.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleClick(item.url)}
                    className="flex-shrink-0 w-[72vw] snap-center"
                  >
                    <img
                      src={item.image}
                      className="w-full h-auto object-cover rounded-xl shadow-md"
                      alt={`Curated ${idx}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Shop by Budget */}
        <section>
          <div
            className="relative bg-[url('/home/background.jpg')] bg-cover bg-center h-screen 
             max-lg:bg-[linear-gradient(to_bottom,white_0%,#F7D6E0_30%,#FAD4C0_70%,white_100%)] 
           max-lg:h-[660px]"
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": 200,
            })}
          >
            <img
              src="/home/background_mobile.png"
              alt="Shop by Budget"
              className="max-lg:block w-60 max-lg:mb-6 hidden mx-auto pt-6"
            />
            {/* Desktop Layout */}
            <div className="relative hidden lg:block">
              <Link to="/listing?cat=26&subcat=10">
                <img
                  src="/home/1st.png"
                  className="w-[250px] absolute top-80 left-44 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                  alt=""
                />
              </Link>
              <Link to="/listing?cat=26&subcat=15">
                <img
                  src="/home/2nd.png"
                  className="w-[350px] absolute top-40 left-1/3 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay="800"
                  alt=""
                />
              </Link>
              <Link to="/listing?cat=26&subcat=12">
                <img
                  src="/home/3rd.png"
                  className="w-[450px] absolute top-8 right-9  hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay="1200"
                  alt=""
                />
              </Link>
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col items-center gap-0 ">
              {/* Top row */}
              <div className="flex justify-center gap-0 w-full">
                <Link to="/listing?cat=26&subcat=10">
                  <div className="flex-shrink-0">
                    <img
                      src="/home/1st.png"
                      className="w-[135px] lg:hidden hover:scale-105 mt-[-25px] transition-transform duration-300 ease-in-out cursor-pointer"
                      alt=""
                    />
                  </div>
                </Link>
                <Link to="/listing?cat=26&subcat=15">
                  <div className="flex-shrink-0">
                    <img
                      src="/home/2nd.png"
                      className="w-[200px] lg:hidden hover:scale-105 ml-[-10px] transition-transform duration-300 ease-in-out cursor-pointer"
                      alt=""
                    />
                  </div>
                </Link>
              </div>

              {/* Bottom row */}
              <Link to="/listing?cat=26&subcat=12">
                <div className="flex justify-center w-full">
                  <img
                    src="/home/3rd.png"
                    className="w-[320px] lg:hidden mt-[-13px] hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                    alt=""
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Designer Banner */}
        <section className="bg-white max-md:py-6 pt-10">
          {/* desktop view */}
          <div className="flex max-md:hidden justify-center  m-auto">
            <div>
              <img
                src="https://www.giva.co/cdn/shop/files/Heer_main-min.jpg?v=1757084733&width=750"
                alt=""
                className="h-[220px] w-[630px]"
              />
              <img
                src="https://www.giva.co/cdn/shop/files/Heer_4-min.jpg?v=1757084732&width=750"
                alt=""
                className="h-[220px] w-[630px]"
              />
            </div>
            <div className="flex">
              <div>
                <img
                  src="https://www.giva.co/cdn/shop/files/Heer_2-min.jpg?v=1757084732&width=750"
                  alt=""
                  className="h-[220px] w-[240px]"
                />
                <img
                  src="https://www.giva.co/cdn/shop/files/Heer_5-min.jpg?v=1757084732&width=750"
                  alt=""
                  className="h-[220px] w-[240px]"
                />
              </div>
              <div>
                <img
                  src="https://www.giva.co/cdn/shop/files/Heer_3-min.jpg?v=1757084732&width=750"
                  alt=""
                  className="h-[220px] w-[240px]"
                />
                <img
                  src="https://www.giva.co/cdn/shop/files/Heer_6-min.jpg?v=1757084732&width=750"
                  alt=""
                  className="h-[220px] w-[240px]"
                />
              </div>
            </div>
          </div>

          {/* mobile view */}
          <div className="hidden max-md:flex p-4">
            <div>
              <img
                src="https://www.giva.co/cdn/shop/files/Everyday_Elegance_4_-min.png?v=1757080295&width=750"
                alt=""
              />
              <img
                src="https://www.giva.co/cdn/shop/files/Gifts_under_15k_3_-min_18f7179c-2c79-4691-89d6-50343124954c.png?v=1757080295&width=750"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://www.giva.co/cdn/shop/files/Captivating_Solitaires_3_-min.png?v=1757080295&width=750"
                alt=""
              />
              <img
                src="https://www.giva.co/cdn/shop/files/Engagement_Rings_3_-min_bcec0ebb-712e-4246-863e-8a167dd5765e.png?v=1757080296&width=750"
                alt=""
              />
            </div>
          </div>
        </section>

        {/* Four Part Section */}
        <section>
          <div className="bg-white flex flex-col items-center p-8  max-md:p-3 max-md:pt-0">
            <div
              className="flex justify-center items-center mt-3 max-md:mt-0"
              {...(isDesktop && {
                "data-aos": "fade-up",
                "data-aos-delay": "100",
              })}
            >
              <img
                src="/home/four_part/heading.jpg"
                className="w-[700px] max-md:mt-2 "
                alt=""
              />
            </div>

            <div className="mt-10 max-md:mt-6 grid grid-cols-2 max-md:grid-cols-2 gap-2 max-md:gap-3 w-[90%] max-md:w-full m-auto">
              <div className=" flex flex-col gap-2 max-md:gap-3">
                <img
                  onClick={() => handleClick("subcat-12")}
                  src={
                    isDesktop
                      ? "/home/four_part/1.jpg"
                      : "/home/four_part/1mobile.jpg"
                  }
                  alt="advertisement 1"
                  className="w-full rounded-2xl shadow-md h-full cursor-pointer"
                  {...(isDesktop && {
                    "data-aos": "fade-up",
                    "data-aos-delay": "400",
                  })}
                />

                <img
                  onClick={() => handleClick("subcat-11")}
                  src={
                    isDesktop
                      ? "/home/four_part/3.jpg"
                      : "/home/four_part/3mobile.jpg"
                  }
                  alt="advertisement 2"
                  className="w-full h-full rounded-2xl shadow-md cursor-pointer"
                  {...(isDesktop && {
                    "data-aos": "fade-down",
                    "data-aos-delay": "400",
                  })}
                />
              </div>

              <div className="flex flex-col gap-2 max-md:gap-3">
                <img
                  onClick={() => handleClick("subcat-12")}
                  src={
                    isDesktop
                      ? "/home/four_part/2.jpg"
                      : "/home/four_part/2mobile.jpg"
                  }
                  alt="advertisement 1"
                  className="w-full h-full rounded-2xl shadow-md cursor-pointer"
                  {...(isDesktop && {
                    "data-aos": "fade-down",
                    "data-aos-delay": "400",
                  })}
                />

                <img
                  onClick={() => handleClick("subcat-10")}
                  src={
                    isDesktop
                      ? "/home/four_part/4.jpg"
                      : "/home/four_part/4mobile.jpg"
                  }
                  alt="advertisement 2"
                  className="w-full h-full rounded-2xl shadow-md cursor-pointer"
                  {...(isDesktop && {
                    "data-aos": "fade-up",
                    "data-aos-delay": "400",
                  })}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Banner with two sub-images */}
        <section className="!pb-20 bg-white relative h-[630px] max-md:h-[400px]">
          <div
            className=" py-12 bg-white"
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "200",
            })}
          >
            <img
              onClick={() => handleClick("subcat-11")}
              src={isDesktop ? "/home/sec/banner.jpg" : "/home/sec/mobile.jpg"}
              alt=""
              className=" cursor-pointer"
            />
          </div>
          <div
            className="flex py-12 max-md:py-20 gap-4 max-md:gap-3 justify-center max-md:justify-start absolute max-md:w-full max-md:px-3 top-[45%] max-md:top-[16%] overflow-x-auto scrollbar-hide"
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "400",
            })}
          >
            <img
              onClick={() => handleClick("subcat-12")}
              src="/home/sec/1.jpg"
              alt=""
              className="p-3 rounded-xl w-[42%] max-md:w-full bg-white cursor-pointer"
            />
            <img
              onClick={() => handleClick("subcat-10")}
              src="/home/sec/2.jpg"
              alt=""
              className="p-3 rounded-xl w-[42%] max-md:w-full bg-white cursor-pointer"
            />
          </div>
        </section>

        {/* Bottom Banner */}
        {bottombanner.desktop_banner.image &&
          bottombanner.mobile_banner.image && (
            <section className="bg-white flex flex-col items-center pb-8 pt-16 max-md:p-1 2xl:pt-32">
              <div
                className="flex justify-center items-center"
                {...(isDesktop && {
                  "data-aos": "fade-up",
                  "data-aos-delay": "100",
                })}
              >
                <img
                  src="/home/6.jpeg"
                  className="w-[400px] max-md:mt-2 mb-6 "
                  alt=""
                />
              </div>
              <div
                className="w-[90%] m-auto max-md:w-[95%]"
                {...(isDesktop && {
                  "data-aos": "fade-up",
                  "data-aos-delay": "200",
                })}
              >
                <img
                  onClick={() => handleClick(bottombanner.desktop_banner.url)}
                  src={bottombanner.desktop_banner.image}
                  className="w-full rounded-lg desktop-banner cursor-pointer"
                  alt="Desktop Bottom Banner"
                />
                <img
                  onClick={() => handleClick(bottombanner.mobile_banner.url)}
                  src={bottombanner.mobile_banner.image}
                  className="w-full rounded-lg mobile-banner cursor-pointer"
                  alt="Mobile Bottom Banner"
                />
              </div>
            </section>
          )}

        {/* Shorts */}
        <section>
          <div className="bg-white flex flex-col pt-0 items-center pb-16 max-md:p-1">
            <div
              className="flex justify-center items-center mt-3 max-md:mt-0"
              {...(isDesktop && {
                "data-aos": "fade-up",
                "data-aos-delay": "100",
              })}
            >
              <img
                src="/home/5.jpeg"
                className="w-[400px] max-md:mt-2 "
                alt=""
              />
            </div>
            <div className="grid grid-cols-1 mt-6 max-md:mt-3 overflow-auto max-md:pb-7">
              <Slider {...shortsSetting}>
                {shorts.map((item, index) => (
                  <div
                    key={index}
                    className="p-1 max-md:p-0.5"
                    {...(isDesktop && {
                      "data-aos": "zoom-in",
                      "data-aos-delay": `${200 + index * 100}`,
                    })}
                  >
                    <Link to={`product/${item.url}`}>
                      {!videoErrors[index] ? (
                        <video
                          autoPlay
                          muted
                          loop
                          preload="auto"
                          onError={() =>
                            setVideoErrors((prev) => ({
                              ...prev,
                              [index]: true,
                            }))
                          }
                        >
                          <source src={item.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src="/home/video/fallback_image.png"
                          alt="Fallback"
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white pb-10 max-md:pt-10">
          <div className="bg-[linear-gradient(to_bottom,white_0%,#F7D6E0_30%,#FAD4C0_70%,white_100%)]">
            <div
              className="grid grid-cols-4 max-md:grid-cols-2 items-center justify-center py-12 w-[85%] max-md:w-full text-center m-auto gap-4"
              {...(isDesktop && {
                "data-aos": "fade-up",
                "data-aos-delay": "100",
              })}
            >
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-5"
                  {...(isDesktop && {
                    "data-aos": "fade-up",
                    "data-aos-delay": `${100 + index * 100}`,
                  })}
                >
                  <img
                    src={item.img}
                    alt=""
                    className={`mx-auto ${index == 1 ? "w-20 " : "w-16"}`}
                  />
                  <p
                    className={`font-semibold ${
                      index == 1 ? "mt-[-16px] " : ""
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          {...(isDesktop && { "data-aos": "fade-up", "data-aos-delay": "100" })}
        >
          <TestimonialsSection />
        </section>
      </main>
    </>
  );
};

export default Home;
