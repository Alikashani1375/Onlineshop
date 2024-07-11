import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Item } from "@/lib/types/Types";

type BasketProps = {
  basket: Item[];
  setBasket: React.Dispatch<React.SetStateAction<Item[]>>;
};

const Basket: React.FC<BasketProps> = ({ basket, setBasket }) => {
  const removeFromBasket = (_id: string) => {
    setBasket(basket.filter((item) => item._id !== _id));
  };

  useEffect(() => {
    $("#basketcontainer").hide(); // ابتدا مخفی کردن سبد خرید
  }, []);

  return (
    <div>
      <div
        className="flex flex-col justify-center align-middle"
        style={{ position: "absolute", top: 20, right: 200 }}
      >
        <button onClick={() => $("#basketcontainer").toggle(500)}>
          <img width={30} src="basket.png"></img>
        </button>
        <div className="ms-3 text-blue-600">{basket.length}</div>
      </div>
      <div
        id="basketcontainer"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          backgroundColor: "#0f0f0ff6",
        }}
        className="flex  p-3 hidden flex-col w-1/4 h-full z-10"
      >
        <div className="text-blue-400 text-2xl text-center font-semibold">
          Basket
        </div>
        <button
          className="absolute left-2 top-2 text-white"
          onClick={() => {
            $("#basketcontainer").hide(500);
          }}
        >
          <img src="closebtn.png" width={30}></img>
        </button>
        <div className="h-5/6 w-full overflow-y-auto">
          <div className="flex flex-col space-y-2 items-center mt-2">
            {basket.map((item: Item) => (
              <div
                key={item._id}
                className="w-11/12 h-20 bg-slate-200 flex flex-row rounded-xl"
              >
                <img src={item.image} alt={item.title} className="w-1/5"></img>
                <div className="flex flex-col w-3/5 mt-1 h-full ">
                  <div className="font-semibold">{item.title}</div>
                  <div>Seller: {item.usercreated}</div>
                </div>
                <div className="text-blue-600 text-lg font-semibold px-2 my-auto">
                  {item.price}$
                </div>
                <button
                  onClick={() => removeFromBasket(item._id)}
                  className="w-1/12 m-2 flex justify-start"
                >
                  <img
                    style={{ width: 20, position: "absolute" }}
                    src="closebtn.png"
                    alt="Remove"
                  ></img>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex">
          <button className="bg-green-500 text-2xl py-2 font-semibold text-white rounded-2xl w-4/5 mx-auto">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
