import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="py-2 text-center text-black dark:text-darkmuted ltr:md:text-left rtl:md:text-right">
        &copy; {new Date().getFullYear()} St. Luke Medical Center
      </footer>
    </>
  );
}

export default Footer