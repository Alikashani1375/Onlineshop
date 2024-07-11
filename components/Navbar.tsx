"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import $ from "jquery";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../app/globals.css";
import "swiper/css/bundle";

type NavbarProps = {
  user: any;
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ user, logged, setLogged }) => {
  const handleLogout = () => {
    setLogged(false);
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  };

  let navLinks: string[];
  navLinks = ["Home", "Product", "Blog", "Contact Us"];

  return (
    <div
      className="flex justify-center w-full"
      style={{
        height: "auto", // Set the desired height
      }}
    >
      <div
        style={{ right: "30px" }}
        className="absolute mt-2 text-white font-bold flex justify-center"
      >
        <div className="text-gray-700"> wellcome {user.username}</div>
        <button
          className="absolute mt-7 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex flex-row my-5 space-x-5 absolute z-10">
        {navLinks.map((link, index) => (
          <button key={index} className="hover:text-blue-500">
            {link}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-10 flex w-10/12 flex-row items-start">
        <div className="me-auto mt-20 flex w-5/12 flex-col justify-start text-6xl font-medium">
          <div>Best Place To Buy And Sell</div>
          <div className="mt-4 text-blue-600">Everything.</div>
          <div
            className="mt-10 text-base font-normal"
            style={{ color: "#535A56" }}
          >
            At Bachira, you can shop for all your favorite beauty brands,
            clothes, household products and more at a single place.
          </div>
          <div className="text-sm">Created By : Ali Kashani</div>
          <button
            onClick={() => {
              $("#allproducts").show(500);
            }}
            className="btn-greenshadow bg-blue-600 mt-10 w-4/12  rounded-lg py-3 text-lg font-normal text-sky-50"
          >
            Shopping Now
          </button>
        </div>

        <div className="w-8/12" style={{ left: "30%" }}>
          <img src="hero.png"></img>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
