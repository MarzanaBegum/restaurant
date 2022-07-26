import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const Admin = ({ products, orders }) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://pizza-restaurant-amber.vercel.app/api/products/${id}`
      );
      setProductList(productList.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put(`https://pizza-restaurant-amber.vercel.app/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="grid justify-center w-full grid-cols-1 py-20 md:grid-cols-2">
      <div className="mx-4">
        <h2 className="mb-3 text-xl font-bold text-center text-black sm:text-left">
          Products
        </h2>
        <table className="w-[100%] text-left flex flex-col justify-center sm:table">
          <thead>
            <tr className="hidden sm:table-row">
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr
                key={product._id}
                className="flex flex-col items-center justify-center mb-3 sm:table-row sm:mb-0 md:mb-0"
              >
                <td>
                  <Image
                    src={product.img}
                    alt="pizza"
                    width={70}
                    height={70}
                    objectFit="contain"
                  />
                </td>
                <td>
                  <span>{product._id.slice(0, 5)}...</span>
                </td>
                <td>
                  <span>{product.title}</span>
                </td>
                <td>
                  <span>${product.price[0]}</span>
                </td>
                <td className="flex flex-row">
                  <button className="px-2 py-1 mr-2 text-sm text-white bg-pink-500 rounded-md">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-2 py-1 text-sm text-white rounded-md bg-rose-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-3 mt-10 sm:mt-0">
        <h2 className="mb-3 text-xl font-bold text-center text-black sm:text-left">
          Orders
        </h2>
        <table className="w-[100%] text-left flex flex-col justify-center sm:table">
          <thead>
            <tr className="hidden sm:table-row">
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr
                key={order._id}
                className="flex flex-col items-center justify-center mb-4 sm:table-row sm:mb-0 md:mb-0"
              >
                <td>
                  <span>{order._id.slice(0, 5)}...</span>
                </td>
                <td>
                  <span>{order.customer}</span>
                </td>
                <td>
                  <span>${order.total}</span>
                </td>
                <td>
                  <span>
                    {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                  </span>
                </td>
                <td>
                  <span>{status[order.status]}</span>
                </td>
                <td>
                  <button
                    onClick={() => handleStatus(order._id)}
                    className="px-2 py-1 text-sm text-white rounded-md bg-fuchsia-500"
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;

export const getServerSideProps = async (context) => {
  const cookie = context.req?.cookies || "";
  const ProductRes = await axios.get(`https://pizza-restaurant-amber.vercel.app/api/products`);
  const OrderRes = await axios.get(`https://pizza-restaurant-amber.vercel.app/api/orders`);

  if (cookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      products: ProductRes.data,
      orders: OrderRes.data,
    },
  };
};
