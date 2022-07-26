import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.price[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const changeSize = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.price[sizeIndex] - pizza.price[size];
    setSize(sizeIndex);
    changeSize(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changeSize(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changeSize(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };
  return (
    <div className="flex flex-col items-center justify-center w-full py-10 space-x-4 sm:flex-row sm:py-20 md:py-16 sm:justify-around">
      <div className="mx-4 w-[60%] sm:w-[30%]">
        <Image
          src={pizza.img}
          alt="pizza"
          width={300}
          height={300}
          objectFit="contain"
        />
      </div>
      <div className="w-[87%] sm:w-[50%] mx-4">
        <h2 className="mb-3 text-xl font-semibold ">{pizza.title}</h2>
        <p className="mb-2 text-lg text-orange-700">${price}</p>
        <p>{pizza.desc}</p>
        <h2 className="mt-6 font-extrabold">Choose a size</h2>
        <div className="flex justify-between w-[70%] sm:w-[57%] mt-6 space-x-6">
          <div
            className="relative cursor-pointer"
            onClick={() => handleSize(0)}
          >
            <Image
              src="/img/small-pizza.png"
              alt="small-pizza"
              width={"30px"}
              height={"30px"}
              objectFit="contain"
            />
            <span className="absolute p-1 text-xs text-white bg-purple-600 rounded-md -top-2 -right-6">
              small
            </span>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => handleSize(1)}
          >
            <Image
              src="/img/small-pizza.png"
              alt="small-pizza"
              width={"50px"}
              height={"50px"}
              objectFit="contain"
            />
            <span className="absolute p-1 text-xs text-white bg-purple-600 rounded-md -top-2 -right-6">
              Medium
            </span>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => handleSize(2)}
          >
            <Image
              src="/img/small-pizza.png"
              alt="small-pizza"
              width={"70px"}
              height={"70px"}
              objectFit="contain"
            />
            <span className="absolute p-1 text-xs text-white bg-purple-600 rounded-md -top-1 -right-2">
              large
            </span>
          </div>
        </div>
        <h2 className="mt-4 mb-5 font-extrabold text-black">
          Choose additional ingredients
        </h2>
        <div className="flex flex-col justify-between sm:flex-row">
          {pizza.extraOptions.map((option) => (
            <div key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className="w-[60px] h-[30px]"
          />

          <button
            onClick={handleAddToCart}
            className="bg-orange-600 ml-5 h-[30px] rounded-md px-2 text-white text-normal cursor-pointer"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `https://pizza-restaurant-amber.vercel.app/api/products/${params.id}`
  );

  return {
    props: {
      pizza: res.data,
    },
  };
};
