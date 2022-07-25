import { useState } from "react";

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };
  return (
    <div className="w-[100%] h-[100%] sm:h-[100vh] flex fixed bg-[rgba(245,240,240,0.52)] top-0 left-0 justify-center items-center z-50">
      <div className="flex flex-col w-[85%] sm:w-[500px] justify-center px-5 py-4 bg-gray-500 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-5">You will pay $12 after order</h2>
        <div className="flex flex-col mb-4">
          <label className="mb-2">Name Surname</label>
          <input
            type="text"
            placeholder="Enter your name..."
            className="px-2 py-1"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2">Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number..."
            className="px-2 py-1"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2">Address</label>
          <textarea
            rows={3}
            type="text"
            placeholder="Your address..."
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            className="bg-cyan-400 text-black px-2 py-1 rounded-md"
            onClick={handleClick}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
