import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AddPizza = ({ setClose }) => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };
  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/du70yx0zz/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        description,
        price: prices,
        setExtraOptions,
        img: url,
      };
      await axios.post("https://pizza-restaurant-amber.vercel.app/api/products", newProduct);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[100%] h-[100vh] sm:h-[100%] overflow-scroll bg-[rgba(245,240,240,0.52)] fixed top-0 z-50 flex justify-center items-center">
      <div className="relative w-[85%] mt-12 sm:mt-24 md:mt-32 md:mb-4 mb-1 sm:mb-3 sm:w-[500px] bg-white flex flex-col px-6 py-4 sm:px-[50px] sm:py-8 shadow-lg rounded-md justify-between">
        <span
          className="absolute flex items-center justify-center w-6 h-6 text-white bg-black rounded-full cursor-pointer -top-3 -right-2"
          onClick={() => setClose(true)}
        >
          X
        </span>
        <h2 className="mb-4 text-2xl font-bold text-black">Add a new Pizza</h2>
        <div className="flex flex-col mb-2">
          <label className="mb-2 text-sm font-normal">Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="flex flex-col mb-2">
          <label className="mb-2 text-base font-normal">Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="border-b border-gray-500 outline-none"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="mb-2 text-base font-normal">Description</label>
          <textarea
            type="text"
            rows={2}
            onChange={(e) => setDescription(e.target.value)}
            className="border-b border-gray-500 outline-none"
          />
        </div>
        <div className="flex flex-col my-2">
          <label className="mb-2 text-base font-normal">Prices</label>
          <div className="flex justify-between">
            <input
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
              className="border-b border-gray-500 outline-none w-[25%]"
            />
            <input
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
              className="border-b border-gray-500 outline-none w-[25%]"
            />
            <input
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
              className="border-b border-gray-500 outline-none w-[25%]"
            />
          </div>
        </div>
        <div className="flex flex-col my-2">
          <label className="mb-2 text-base font-normal">Extra</label>
          <div className="flex justify-between">
            <input
              type="text"
              name="text"
              placeholder="item"
              onChange={handleExtraInput}
              className="border-b border-gray-500 outline-none w-[27%]"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleExtraInput}
              className="border-b border-gray-500 outline-none w-[27%]"
            />
            <button
              className="px-2 border border-slate-400"
              onClick={handleExtra}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap mt-4">
            {extraOptions.map((option) => (
              <span
                key={option.text}
                className="px-2 py-1 mb-1 mr-2 text-orange-400 border border-orange-500 rounded-md cursor-pointer"
              >
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <button
            className="bg-orange-600 text-white w-[100%] py-2"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPizza;
