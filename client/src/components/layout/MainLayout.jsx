import React from 'react'
import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

const MainLayout = ({ children }) => {
    
  return (
    <>
      <React.Fragment>
        <div className="bg-[#f9fbfd] dark:bg-dark text-black">
          <div className="bg-black min-h-[220px] sm:min-h-[250px] bg-bottom fixed hidden w-full -z-50 detached-img"></div>
          {/* Start Menu Sidebar Overlay */}
          <div className="fixed inset-0 bg-black/60 dark:bg-dark/90 z-[999] lg:hidden "></div>
          {/* End Menu Sidebar Overlay */}

          <div className="flex mx-auto main-container">
            <Sidebar />
            <div className="flex-1 main-content">
              <Topbar />
              <div className="h-[calc(100vh-60px)] relative overflow-y-auto overflow-x-hidden p-4 space-y-4 detached-content">
                {children}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default MainLayout