"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [navToggle, setNavToggle] = useState(false);
  const navbarRef = useRef(null);

  const handleNavbarToggle = () => {
    console.log("nav clicked");
    setNavToggle(!navToggle);
  };

  const closeNavbar = () => {
    setNavToggle(false);
  };

  const handleLinkClick = (event) => {
    event.stopPropagation();
    closeNavbar();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeNavbar();
        console.log("closing navbar");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [navToggle]);

  const navLinks = [
    { href: "#", text: "Home", className: "text-white bg-indigo-700" },
    { href: "#", text: "About", className: "text-gray-900 hover:bg-gray-100" },
    {
      href: "#",
      text: "Services",
      className: "text-gray-900 hover:bg-gray-100",
    },
    {
      href: "#",
      text: "Pricing",
      className: "text-gray-900 hover:bg-gray-100",
    },
    {
      href: "#",
      text: "Contact",
      className: "text-gray-900 hover:bg-gray-100",
    },
  ];

  return (
    <nav className="bg-white border-gray-200">
      <div
        className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto"
        ref={navbarRef}
      >
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/next.svg" className="h-8" alt="NextJS Logo" />
        </Link>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={handleNavbarToggle}
        >
          <span className="sr-only">Open main menu</span>
          {navToggle ? <X /> : <Menu />}
        </button>

        <div
          className={` w-full md:block md:w-auto ${
            navToggle ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={`block px-3 py-2 rounded ${link.className}`}
                  onClick={handleLinkClick}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// "use client";
// import { Menu, X } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";

// const Navbar = () => {
//   const [navToggle, setNavToggle] = useState(false);
//   const navbarRef = useRef(null);

//   // const handleNavbarToggle = () => {
//   //   console.log("nav clicked");
//   //   setNavToggle(!navToggle);
//   // };

//   // const closeNavbar = () => {
//   //   setNavToggle(false);
//   // };

//   // useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     if (
//   //       navbarRef.current &&
//   //       !navbarRef.current.contains(event.target) &&
//   //       !event.target.closest("a[href]")
//   //     ) {
//   //       closeNavbar();
//   //       console.log("closing navbar");
//   //     }
//   //   };

//   //   document.addEventListener("click", handleClickOutside);

//   //   return () => {
//   //     document.removeEventListener("click", handleClickOutside);
//   //   };
//   // }, [navToggle]);

//   const handleNavbarToggle = () => {
//     console.log("nav clicked");
//     setNavToggle(!navToggle);
//   };

//   const closeNavbar = () => {
//     setNavToggle(false);
//   };

//   const handleLinkClick = (event) => {
//     event.stopPropagation();
//     closeNavbar();
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navbarRef.current && !navbarRef.current.contains(event.target)) {
//         closeNavbar();
//         console.log("closing navbar");
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [navToggle]);
//   return (
//     <nav className="bg-white border-gray-200 ">
//       <div
//         className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto"
//         ref={navbarRef}
//       >
//         <Link
//           href="/"
//           className="flex items-center space-x-3 rtl:space-x-reverse"
//         >
//           <img src="/next.svg" className="h-8" alt="NextJS Logo" />
//           {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//             NextJS
//           </span> */}
//         </Link>
//         <button
//           data-collapse-toggle="navbar-default"
//           type="button"
//           className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//           aria-controls="navbar-default"
//           aria-expanded="false"
//           onClick={handleNavbarToggle}
//         >
//           <span className="sr-only">Open main menu</span>
//           {navToggle ? <X /> : <Menu />}
//         </button>

//         <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//           <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
//             <li>
//               <Link
//                 href="#"
//                 className="block px-3 py-2 text-white bg-indigo-700 rounded md:bg-transparent md:text-indigo-700 md:p-0 dark:text-white md:dark:text-indigo-500"
//                 aria-current="page"
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="#"
//                 className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-700 md:p-0 "
//               >
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="#"
//                 className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-700 md:p-0 "
//               >
//                 Services
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="#"
//                 className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-700 md:p-0 "
//               >
//                 Pricing
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="#"
//                 className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-700 md:p-0 "
//               >
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {navToggle ? (
//           <div
//             className={`absolute z-10 top-20 left-0 right-0 w-[90%] mx-auto md:relative md:w-auto`}
//             id="navbar-default"
//           >
//             <ul className="flex flex-col p-4 mx-auto mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
//               <li>
//                 <Link
//                   href="#"
//                   className="block px-3 py-2 text-white bg-indigo-700 rounded md:bg-transparent md:text-indigo-700 md:p-0 dark:text-white md:dark:text-indigo-500"
//                   aria-current="page"
//                   onClick={handleLinkClick}
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-700 md:p-0 "
//                   onClick={handleLinkClick}
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-700 md:p-0 "
//                   onClick={handleLinkClick}
//                 >
//                   Services
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-700 md:p-0 "
//                   onClick={handleLinkClick}
//                 >
//                   Pricing
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-700 md:p-0 "
//                   onClick={handleLinkClick}
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         ) : (
//           ""
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
