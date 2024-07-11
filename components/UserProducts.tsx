import React from "react";
import { Item } from "@/lib/types/Types";
import $ from "jquery";

type UserProductsProps = {
  products: Item[];
  userId: any;
};

const UserProducts: React.FC<UserProductsProps> = ({ products, userId }) => {
  const handleDelete = async (productid: string, user: string) => {
    try {
      const response = await fetch(
        `/api/phones?userId=${user}&phoneId=${productid}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Product Deleted");

      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="userproducts" className="text-white">
      <div className="w-full h-full flex flex-col">
        <button
          id="close-btn2"
          onClick={() => {
            $("#userproducts").hide(500);
          }}
        >
          <img width={30} height={30} src="closebtn.png" />
        </button>
        <div className="w-full h-full overflow-y-auto space-x-5 flex flex-wrap items-center justify-center flex-row">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="w-2/12  bg-gray-100 rounded-3xl flex flex-col p-3 shadow-lg  my-2"
            >
              <div className="w-11/12 items-center justify-center flex">
                <img
                  style={{ width: 250, height: 160 }}
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="text-gray-900 font-semibold  text-lg ms-5 mt-2">
                {product.title}
              </div>
              <div className="text-sm text-gray-900 mt-1">
                <div>Seller : {product.usercreated}</div>
              </div>
              <div className="text-md mt-2 flex flex-row font-semibold text-gray-800">
                Price :{" "}
                <div className="text-blue-500 ms-4">{product.price} $</div>
              </div>
              <button
                onClick={() => {
                  handleDelete(product._id, product.user);
                }}
                className="p-2 mt-2 bg-red-400 rounded-lg text-white text-lg"
              >
                Delete Item
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProducts;
