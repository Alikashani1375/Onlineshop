"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../app/globals.css";
import $ from "jquery";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { useEdgeStore } from "@/lib/edgestore";
import Allproducts from "./Allproducts";
import Basket from "./Basket";
import { Item } from "@/lib/types/Types";
import UserProducts from "./UserProducts";

type NavbarProps = {
  user: any;
};

type Slide = {
  title: string;
  price: string;
  category: string;
  image: string;
  usercreated: string;
};

const Products: React.FC<NavbarProps> = ({ user }) => {
  const [file, setFile] = useState<File>();
  const [products, setProducts] = useState<Item[]>([]);
  const [phones, setPhones] = useState<Item[]>([]);
  const [laptops, setLaptops] = useState<Item[]>([]);
  const [clothes, setClothes] = useState<Item[]>([]);
  const [basket, setBasket] = useState<Item[]>([]);
  const [userProducts, setUserProducts] = useState<Item[]>([]);
  const [newphone, setNewphone] = useState<Slide>({
    title: "",
    price: "",
    image: "",
    category: "others",
    usercreated: `${user.username}`,
  });
  const [topphone, setTopphones] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<Boolean | null>(null);
  const { edgestore } = useEdgeStore();

  const addToBasket = (e: any) => {
    setBasket([...basket, e]);
  };

  const handleUpload = async () => {
    show("#showUpload");
    setUploading(true);
    if (file) {
      const res = await edgestore.myPublicImages.upload({ file });
      setNewphone((prev: any) => ({ ...prev, image: res.url }));
      if (res) {
        alert("uploaded");
        setUploading(false);
      } else {
        alert("not uploaded");
      }
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch(`/api/phones?userId=${user._id}`);
      if (response.ok) {
        const products = await response.json();
        setProducts(products);
        setPhones(
          products.filter((product: Item) => product.category === "phones")
        );
        setLaptops(
          products.filter((product: Item) => product.category === "laptops")
        );
        setClothes(
          products.filter((product: Item) => product.category === "clothes")
        );
        setTopphones(products.slice(0, 8));
        setLoading(false);
        setUserProducts(
          products.filter(
            (product: Item) => product.usercreated === user.username
          )
        );
      } else {
      }
    } catch (err) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  const allFieldsFilled = (obj: Slide): boolean => {
    return Object.values(obj).every((value) => value !== "");
  };

  const handleAddproduct = async () => {
    if (allFieldsFilled(newphone)) {
      try {
        const response = await fetch(`/api/phones?userId=${user._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newphone),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Product Added");
        window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("please fill all inputs and update image");
    }
  };

  const show = (e: any) => {
    $(e).show(500);
  };

  const close = (e: any) => {
    $(e).hide(500);
  };

  return (
    <div className="flex flex-col justify-center w-90 mx-auto py-5">
      <Allproducts
        products={products}
        addToBasket={addToBasket}
        setBasket={setBasket}
      />
      <Basket setBasket={setBasket} basket={basket} />
      <UserProducts userId={user._id} products={userProducts} />
      <button
        onClick={() => {
          $("#userproducts").show(500);
        }}
        className="absolute top-10 left-10 bg-blue-600 rounded-xl p-2 text-white hover:shadow-2xl"
      >
        Your Products
      </button>
      <div className="flex flex-row text-center w-7/12 text-gray-800 font-semibold justify-between mx-auto items-center">
        <div className="flex flex-row text-center ms-auto text-gray-800 font-semibold justify-between mx-auto items-center">
          <div className="text-xl border-gray-500 text-gray-600  border-collapse border-2 px-20 py-2 rounded-lg">
            Clothes
          </div>
        </div>

        <div className="flex flex-row space-x-5">
          <button
            className="bg-blue-500 text-white p-3 rounded-2xl"
            onClick={() => {
              show("#register-container");
            }}
          >
            Add Product
          </button>
          <button
            onClick={() => {
              show("#allproducts");
            }}
            className="btn-greenshadow rounded-2xl px-5 py-3 bg-green-500 text-sky-50"
          >
            See All products
          </button>
        </div>
      </div>
      <div className="absolute">
        <div id="register-container">
          <div id="auth">
            <button
              id="close-btn"
              onClick={() => {
                close("#register-container");
              }}
            >
              <img width={30} height={30} src="closebtn.png" />
            </button>
            <div className="text-lg font-medium text-blue-600">
              Add Your Product To Sell
            </div>

            <input
              placeholder="Product Name"
              onChange={(e) =>
                setNewphone((prev: any) => ({ ...prev, title: e.target.value }))
              }
              className="mt-5 w-3/4 rounded-lg p-2 text-center shadow text-blue-700"
            />
            <input
              type="number"
              placeholder="Price"
              onChange={(e) =>
                setNewphone((prev: any) => ({ ...prev, price: e.target.value }))
              }
              className="mt-5 w-3/4 rounded-lg p-2 text-center shadow text-blue-700"
            />
            <div className="mt-5">select category</div>
            <select
              onChange={(e) =>
                setNewphone((prev: any) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              name="category"
              className="mt-2 p-2 rounded-2xl w-6/12"
            >
              <option value="clothes">Clothes</option>
              <option value="phones">Phones</option>
              <option value="laptops">Laptops</option>
              <option value="others">others</option>
            </select>
            <div className="mt-3">Select Image</div>
            <div className="flex flex-row justify-between mt-2">
              <input
                type="file"
                onChange={(e) => {
                  setFile(e.target.files?.[0]);
                }}
              ></input>
              <button
                onClick={handleUpload}
                className="px-2 py-1 text-white bg-green-500 rounded"
              >
                upload
              </button>
            </div>
            <div id="showUpload" className="mt-2 hidden text-blue-500">
              {uploading ? (
                <div>
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <>Upload Finished</>
              )}
            </div>

            <button
              onClick={handleAddproduct}
              className="btn-greenshadow mt-6 rounded-lg px-5 py-2 bg-blue-500 text-sky-50"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto text-gray-950 flex flex-row space-x-10 flex-wrap items-cebter justify-center">
        {loading ? (
          <div className="flex items-center justify-center flex-col">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <Swiper
            effect={"coverflow"}
            loop={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={false}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {clothes.map((phone) => (
              <SwiperSlide key={phone._id}>
                <div
                  key={phone._id}
                  className="w-10/12 bg-gray-100 rounded-3xl flex flex-col p-3 shadow-lg  my-2"
                >
                  <div className="w-11/12 items-center justify-center flex">
                    <img
                      style={{ width: "full", height: 240 }}
                      src={phone.image}
                      alt={phone.title}
                    />
                  </div>
                  <div className="text-dark font-semibold  text-lg ms-5 mt-2">
                    {phone.title}
                  </div>
                  <div className="text-sm text-gray-900 mt-1">
                    <div>Seller : {phone.usercreated}</div>
                  </div>
                  <div className="text-md mt-2 flex flex-row font-semibold text-gray-800">
                    Price :{" "}
                    <div className="text-blue-500 ms-4">{phone.price} $</div>
                  </div>
                  <button
                    onClick={() => {
                      addToBasket(phone);
                    }}
                    className="btn-greenshadow p-2 mt-2 bg-green-400 rounded-lg text-white text-lg"
                  >
                    Add To Basket
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="flex flex-row text-center ms-auto text-gray-800 font-semibold justify-between mx-auto items-center">
        <div className="text-xl border-gray-500 text-gray-600  border-collapse border-2 px-20 py-2 rounded-lg">
          Phones
        </div>
      </div>
      <div className="w-full mx-auto text-gray-950 flex flex-row space-x-10 flex-wrap items-cebter justify-center">
        {loading ? (
          <div className="flex items-center justify-center flex-col">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <Swiper
            effect={"coverflow"}
            loop={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={false}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {phones.map((phone) => (
              <SwiperSlide key={phone._id}>
                <div
                  key={phone._id}
                  className="w-10/12 bg-gray-100 rounded-3xl flex flex-col p-3 shadow-lg  my-2"
                >
                  <div className="w-11/12 items-center justify-center flex">
                    <img
                      style={{ width: "full", height: 240 }}
                      src={phone.image}
                      alt={phone.title}
                    />
                  </div>
                  <div className="text-dark font-semibold  text-lg ms-5 mt-2">
                    {phone.title}
                  </div>
                  <div className="text-sm text-gray-900 mt-1">
                    <div>Seller : {phone.usercreated}</div>
                  </div>
                  <div className="text-md mt-2 flex flex-row font-semibold text-gray-800">
                    Price :{" "}
                    <div className="text-blue-500 ms-4">{phone.price} $</div>
                  </div>
                  <button
                    onClick={() => {
                      addToBasket(phone);
                    }}
                    className="btn-greenshadow p-2 mt-2 bg-green-400 rounded-lg text-white text-lg"
                  >
                    Add To Basket
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="flex flex-row text-center ms-auto text-gray-800 font-semibold justify-between mx-auto items-center">
        <div className="text-xl border-gray-500 text-gray-600  border-collapse border-2 px-20 py-2 rounded-lg">
          Laptops
        </div>
      </div>
      <div className="w-full mx-auto text-gray-950 flex flex-row space-x-10 flex-wrap items-cebter justify-center">
        {loading ? (
          <div className="flex items-center justify-center flex-col">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <Swiper
            effect={"coverflow"}
            loop={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={false}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {laptops.map((phone) => (
              <SwiperSlide key={phone._id}>
                <div
                  key={phone._id}
                  className="w-10/12 bg-gray-100 rounded-3xl flex flex-col p-3 shadow-lg  my-2"
                >
                  <div className="w-11/12 items-center justify-center flex">
                    <img
                      style={{ width: "full", height: 240 }}
                      src={phone.image}
                      alt={phone.title}
                    />
                  </div>
                  <div className="text-dark font-semibold  text-lg ms-5 mt-2">
                    {phone.title}
                  </div>
                  <div className="text-sm text-gray-900 mt-1">
                    <div>Seller : {phone.usercreated}</div>
                  </div>
                  <div className="text-md mt-2 flex flex-row font-semibold text-gray-800">
                    Price :{" "}
                    <div className="text-blue-500 ms-4">{phone.price} $</div>
                  </div>
                  <button
                    onClick={() => {
                      addToBasket(phone);
                    }}
                    className="btn-greenshadow p-2 mt-2 bg-green-400 rounded-lg text-white text-lg"
                  >
                    Add To Basket
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Products;
