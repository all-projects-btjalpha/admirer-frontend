import React from "react";
import ChatBot from "./ChatBot";
import ScrollToTop from "./ScrollToTopComponent";

const RightSideBar = () => {
  return (
    <div className="fixed bottom-4 max-sm:bottom-20 right-1 max-sm:right-4 gap-2.5 flex flex-col justify-center text-center items-center">
      {/* <a
        href="https://wa.me/919717072701"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="./WhatsApp.webp" className="w-14 max-sm:w-12 hover:scale-105" alt="" />
      </a> */}
      <ChatBot />
      <ScrollToTop />
    </div>
  );
};

export default RightSideBar;
