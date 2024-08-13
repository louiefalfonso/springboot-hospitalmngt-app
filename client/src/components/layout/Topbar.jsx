import React, { useState } from "react";
import { Link } from "react-router-dom";


const Topbar = () => {

    const [isSidebarSize, setIsSidebarSize] = useState(false);
    const toggleSidebarCollapse = () => {
      document.body.classList.toggle("toggle-sidebar");
      setIsSidebarSize(!isSidebarSize);
    };


  return (
    <>
      <div className="bg-white dark:bg-darklight dark:border-darkborder flex gap-4 lg:z-10 items-center justify-between px-4 h-[60px] border-b border-black/10 detached-topbar relative">
        <div className="flex items-center flex-1 gap-2 sm:gap-4">
          <button
            type="button"
            className="text-black dark:text-white/80"
            onClick={toggleSidebarCollapse}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <form className="flex-1 hidden min-[420px]:block">
            <div className="relative max-w-[180px] md:max-w-[350px]">
              <input
                type="text"
                id="search"
                className="border-black/10 dark:text-white/80 dark:placeholder:text-white/30 dark:border-darkborder dark:bg-dark dark:focus:border-white/30 focus:border-black/30 placeholder:text-black/50 border text-black text-sm rounded block w-full ltr:pl-3 rtl:pr-3 ltr:pr-7 rtl:pl-7 h-10 bg-[#f9fbfd] focus:ring-0 focus:outline-0"
                placeholder="Search..."
                required
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Topbar