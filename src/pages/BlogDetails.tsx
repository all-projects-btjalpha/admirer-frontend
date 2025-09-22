import React from "react";
import { useLocation } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  image: string;
  descpt: string;
  date: string;
}

const BlogDetails = () => {
  const location = useLocation();
  const post = (location.state as { post: BlogPost })?.post;

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">
          Blog not found. Please access this page from the blog listing.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-white py-10">
      <div className="w-[83%] max-md:w-full mx-auto px-4">
        <p className="text-sm text-purple-700 mb-3 uppercase tracking-wide">
          {new Date(post.date).toLocaleDateString("en-GB")}
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
          {post.title}
        </h1>
        <img
          src={post.image}
          alt="Blog"
          className="w-full lg:w-[80%] mb-6 rounded-lg"
        />
        <hr className="my-6" />
        <p
          className="text-gray-700 text-base leading-7"
          dangerouslySetInnerHTML={{ __html: post.descpt }}
        />
      </div>
    </section>
  );
};

export default BlogDetails;
