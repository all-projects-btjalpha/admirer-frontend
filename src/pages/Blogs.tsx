import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  image: string;
  descpt: string;
  date: string;
  time: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const blogData = [
      {
        id: 1,
        title: "The Future of Sustainable Fashion",
        image: "/blogs/blog1.jpg",
        descpt:
          "Sustainable fashion is becoming a major trend so everyone just buying jewelry to look cool ...",
        date: "2025-04-13",
        time: "10:00 AM",
      },
      {
        id: 2,
        title: "Top Jewelry Trends for 2025",
        image: "/blogs/blog2.jpg",
        descpt:
          "<p>Discover the hottest jewelry trends for this year these are the major trnds of this year...</p>",
        date: "2025-04-10",
        time: "2:30 PM",
      },
      {
        id: 3,
        title: "How to Style Your Rings for Every Occasion",
        image: "/blogs/blog3.jpg",
        descpt:
          "<p>Learn how to incorporate rings into your daily outfit to look cool...</p>",
        date: "2025-04-08",
        time: "1:15 PM",
      },
    ];

    setPosts(blogData);
  }, []);

  return (
    <section className="bg-[#f8f8f8] flex flex-col lg:flex-row pb-12 px-4 max-md:px-0">
      {/* Blog Posts */}
      <div className="flex flex-wrap gap-8 justify-center w-full lg:w-[70%] bg-white p-6 max-md:p-4 rounded-lg shadow-sm">
        {posts.map((post) => {
          const image = post.image || "/asset/image/blog/default-blog.jpg";
          const description = post.descpt.replace(/<[^>]+>/g, "").slice(0, 120);

          return (
            <Link
              key={post.id}
              to={`/blog-details/${post.id}`}
              state={{ post }}
              className="w-full sm:w-[360px] transition-all"
            >
              <div className="flex flex-col bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden transition duration-300">
                <div className="h-full bg-cover bg-center">
                  <img src={image} alt="" />
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-[15px] text-gray-500 flex gap-2 mb-4">
                    <div className="border w-fit px-3 py-1 rounded-lg border-purple-800 text-purple-800">
                      Rings
                    </div>
                    <div className="border w-fit px-3 py-1 rounded-lg border-purple-800 text-purple-800">
                      Fashion Jewelry
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 transition truncate">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-md leading-relaxed tracking-wide line-clamp-2">
                    {description}
                  </p>
                  <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString("en-GB")}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Sidebar */}
      <div className="lg:w-[30%] p-6 flex flex-col gap-6 max-md:p-3">
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h3 className="border-b pb-4 mb-4 font-medium text-xl text-gray-800">
            RECENT POSTS
          </h3>
          {posts.slice(0, 2).map((post) => (
            <Link
              to={`/blog-details/${post.id}`}
              state={{ post }}
              key={post.id}
            >
              <div className="flex justify-between items-center mb-4 pb-3 border-b gap-4">
                <p className="text-black hover:text-[#7b48a5] text-[17px] leading-snug font-normal line-clamp-2">
                  {post.title}
                </p>
                <img
                  src={post.image || "/asset/image/blog/default-blog.jpg"}
                  alt="thumbnail"
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Categories Section */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h3 className="border-b pb-4 mb-4 font-medium text-xl text-gray-800">
            CATEGORIES
          </h3>
          <div className="space-y-2">
            <a
              href="#"
              className="block text-gray-600 hover:text-[#7b48a5] text-md"
            >
              Sustainable Fashion
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-purple-700 text-md"
            >
              Jewelry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
