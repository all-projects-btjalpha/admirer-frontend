import React from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SingleTestimonialCard from "./TestimonialCard";

const CustomPrevArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute left-[46%] max-md:left-[40%] bottom-[-80px] max-md:bottom-[-60px] transform -translate-y-1/2  bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
    onClick={onClick}
  >
    <IoIosArrowBack className="text-3xl max-md:text-2xl text-gray-700 hover:text-white" />
  </button>
);

const CustomNextArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute right-[46%] max-md:right-[40%] bottom-[-80px] max-md:bottom-[-60px] transform -translate-y-1/2  bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
    onClick={onClick}
  >
    <IoIosArrowForward className="text-3xl max-md:text-2xl text-gray-700 hover:text-white" />
  </button>
);

const testimonials = [ 
  {
    name: "Anshu Shyanda",
    rating: 5,
    avatar: "/home/testimonial/anshu.jpg",
    review:
      "The ring arrived on time and looked even better than expected. The shine and design are perfect for any occasion!",
    prodName: "Women Set of Sterling Silver Rose...",
    prodImg: "/home/testimonial/one.jpg",
    prodSrc: "product/56"
  },
  {
    name: "Vibudh Rathore",
    rating: 5,
    avatar: "/home/testimonial/vibudh.jpeg",
    review:
      "Admirer has the best jewelry! The ring I ordered had a beautiful sparkle, and the craftsmanship was outstanding.",
    prodName: "Special Women Zircon (p) Letter",
    prodImg: "/home/testimonial/four.jpg",
    prodSrc: "product/84"
  },
  {
    name: "Abhay Kumar",
    rating: 4,
    avatar: "/home/testimonial/Abhay.jpg",
    review:
      "Ordered a beautiful ring for my girlfriend, and she loved it! Delivery was fast, and the quality was amazing.",
    prodName: "Special Rose Gold Plated Solitaire...",
    prodImg: "/home/testimonial/two.jpg",
    prodSrc: "/product/61"
  },
  {
    name: "Yash Raj Mishra",
    rating: 5,
    avatar: "/home/testimonial/yash.jpeg",
    review:
      "The ring I got was even prettier in person! The design is elegant, and the packaging made it feel so premium. ",
    prodName: "Special Knuckle Trillion Ring...",
    prodImg: "/home/testimonial/three.jpg",
    prodSrc: "/product/73"
  },
  {
    name: "Mohd Zaid",
    rating: 4,
    avatar: "/home/testimonial/zaid.jpg",
    review:
      "Bought a necklace and my girlfriend was beyond happy! The set looked so elegant, and the quality was amazing.",
    prodName: "Silver-Plated American Diamond...",
    prodImg: "/home/testimonial/five.jpg",
    prodSrc: "/product/34"
  },
  {
    name: "Dhruv",
    rating: 5,
    avatar: "/home/testimonial/dhruv.jpeg",
    review:
      "The ring was beautifully designed, and the material feels premium. Perfect for a special gift or personal collection!",
    prodName: "Special Silver Plated Adjustable...",
    prodImg: "/home/testimonial/six.jpg",
    prodSrc: "product/63"
  }
];



const TestimonialsSection = () => {
  const testimonialsSlider = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 768, // screens less than or equal to 768px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-8 !pb-24 bg-gray-50 sm:py-10 lg:py-10 ">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <div className="flex justify-center items-center mt-3">
              <img
                src="/home/7.png"
                className="w-[600px] max-md:mt-2 "
                alt=""
              />
            </div>
          </div>

          <div className="relative mt-10 md:mt-12 md:order-2">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                style={{
                  background:
                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}
              ></div>
            </div>

            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 ">
              <Slider {...testimonialsSlider}>
                {testimonials.map((testimonial, idx) => (
                  <SingleTestimonialCard key={idx} testimonial={testimonial} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
