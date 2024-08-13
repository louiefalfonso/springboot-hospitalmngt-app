import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarData } from "../data/sidebarData";

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [isSidebarSize, setIsSidebarSize] = useState(true);
    const location = useLocation();

    const toggleSubMenu = (key) => {
      setActiveMenu(activeMenu === key ? null : key);
    };

  return (
    <>
      <nav className="sidebar fixed z-[9999] flex-none w-[240px] ltr:border-r rtl:border-l dark:bg-darkborder border-black/10 transition-all duration-300 overflow-hidden">
        <div className="h-full bg-white dark:bg-darklight">
          <div className="p-4">
            <Link to="index" className="w-full main-logo">
            
            </Link>
          </div>
          <div className="h-[calc(100vh-60px)]  overflow-y-auto overflow-x-hidden px-5 pb-4 space-y-16 detached-menu">
            <ul className="relative flex flex-col gap-5">
              {sidebarData.map((item, key) => (
                <React.Fragment key={key}>
                  {item.isTitle ? (
                    <h2 className="my-2 text-sm text-black/50 dark:text-white/30">
                      <span>{item.label}</span>
                    </h2>
                  ) : (
                    <li className="menu nav-item">
                      <Link
                        to={item.link}
                        className={`items-center justify-between text-black nav-link group ${
                          activeMenu === key || location.pathname === item.link
                            ? "active"
                            : ""
                        }`}
                        onClick={() => toggleSubMenu(key)}
                      >
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                          >
                            <path d={item.icon} fill="currentColor"></path>
                          </svg>
                          <span className="ltr:pl-1.5 rtl:pr-1.5">
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
