"use client";
import React from "react";

const Footer = () => {
  return (
    <div className="mx-auto mt-10 flex w-10/12 items-start justify-start pb-10">
      <div className="flex w-4/12 flex-col items-start justify-start">
        <div className="text-3xl font-bold">
          Ba<span className="text-blue-600">chira</span>
        </div>
        <div className="mt-3 text-lg font-normal" style={{ color: "#535A56" }}>
          Bachira is an online store dealing with all product Bachira provide
          cheap, high quality, products to customers
        </div>
      </div>
      <div className="ms-20 flex w-2/12 flex-col items-start justify-start">
        <div className="text-lg font-semibold">For Beginner</div>
        <div className="mt-3" style={{ color: "#535A56" }}>
          About
        </div>
        <div className="mt-2" style={{ color: "#535A56" }}>
          Career
        </div>
        <div className="mt-2" style={{ color: "#535A56" }}>
          Promotion
        </div>
      </div>
      <div className="ms-20 flex w-2/12 flex-col items-start justify-start">
        <div className="text-lg font-semibold">Overview</div>
        <div className="mt-3" style={{ color: "#535A56" }}>
          Product
        </div>
        <div className="mt-2" style={{ color: "#535A56" }}>
          Categories
        </div>
        <div className="mt-2" style={{ color: "#535A56" }}>
          Pricing
        </div>
      </div>
      <div className="ms-10 flex w-2/12 flex-col items-start justify-start">
        <div className="text-lg font-semibold">Explore Us</div>
        <div className="mt-3" style={{ color: "#535A56" }}>
          Our Career
        </div>
        <div className="mt-2" style={{ color: "#535A56" }}>
          Privacy
        </div>
        <div className="mt-2" style={{ color: "#535A56" }}>
          Terms & Conditions
        </div>
      </div>
      <div className="ms-20 flex w-2/12 flex-col items-start justify-start">
        <div className="text-lg font-semibold">Connect Us</div>
        <div className="mt-3 text-blue-600 font-bold">
          s.a.s.kashani33@gmail.com
        </div>
        <div className="mt-2 text-blue-600 font-bold">0930-911-3021</div>
        <div className="mt-2 text-blue-600 font-bold">Iran,Gorgan</div>
      </div>
    </div>
  );
};

export default Footer;
