import $ from "jquery";

type NavbarProps = {
  products: any;
  addToBasket: any;
  setBasket: any;
};

const Allproducts: React.FC<NavbarProps> = ({
  products,
  addToBasket,
  setBasket,
}) => {
  return (
    <div id="allproducts" className="text-white">
      <div className="w-full h-full flex flex-col">
        <button
          id="close-btn2"
          onClick={() => {
            $("#allproducts").hide(500);
          }}
        >
          <img width={30} height={30} src="closebtn.png" />
        </button>
        <div className="w-full h-full overflow-y-auto space-x-5 flex flex-wrap items-center justify-center flex-row">
          {products.map((phone: any) => (
            <div
              key={phone._id}
              className="w-2/12  bg-gray-100 rounded-3xl flex flex-col p-3 shadow-lg  my-2"
            >
              <div className="w-11/12 items-center justify-center flex">
                <img
                  style={{ width: 250, height: 160 }}
                  src={phone.image}
                  alt={phone.title}
                />
              </div>
              <div className="text-gray-900 font-semibold  text-lg ms-5 mt-2">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allproducts;
