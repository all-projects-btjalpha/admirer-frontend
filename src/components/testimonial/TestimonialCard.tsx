import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Testimonial {
  name: string;
  avatar: string;
  review: string;
  rating?: number; // Optional: defaults to 5
  prodName?: string;
  prodImg?: string;
  prodSrc: string;
}

const SingleTestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  const { name, avatar, review, rating = 5, prodName, prodImg, prodSrc } = testimonial;

  const renderStars = () =>
    Array.from({ length: rating }).map((_, idx) => (
      <AiFillStar key={idx} className="text-[#FDB241] w-5 h-5" />
    ));

  return (
    <div className="flex flex-col overflow-hidden shadow-xl mx-1">
      <div className="flex flex-col justify-between flex-1 p-4 bg-white !pb-5 lg:py-8 lg:px-7">
        <div className="flex-1">
          <blockquote className="flex-1 ">
            <p className="text-lg leading-relaxed text-gray-900 font-pj">
              {review}
            </p>
          </blockquote>
          <div className="flex items-center mt-3">{renderStars()}</div>
        </div>
        <div className="flex items-center mt-5 mb-3">
          <img
            className="flex-shrink-0 object-cover rounded-full w-11 h-11"
            src={avatar}
            alt={name}
          />
          <div className="ml-4">
            <p className="text-base font-bold text-gray-900 font-pj">{name}</p>
            {/* <p className="mt-0.5 text-sm font-pj text-gray-600">{role}</p> */}
          </div>
        </div>
        <hr />
          <Link to={prodSrc}>
        <div className="flex justify-between mt-3 gap-2">
          <div
            className="self-center text-md leading-relaxed text-gray-900 truncate w-full"
            title={prodName}
          >
            {prodName}
          </div>
          <div>
            <img src={prodImg} alt="" className="w-12 h-12" />
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default SingleTestimonialCard;
