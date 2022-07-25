import Image from "next/image";
import axios from "axios";

const Orders = ({ order }) => {
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return "flex flex-col mb-4 sm:mb-0";
    if (index - status === 1) return "flex flex-col animate-pulse mb-4 sm:mb-0";
    if (index - status > 1) return "opacity-30 flex flex-col mb-4 sm:mb-0";
  };

  return (
    <div className="flex flex-col items-center justify-between px-10 py-20 md:flex-row">
      <div className="flex flex-col w-[70%] justify-center items-center">
        <table className=" w-[100%] text-center flex flex-col justify-center sm:table">
          <thead>
            <tr className="hidden sm:table-row">
              <th>Order Id</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex flex-col items-center justify-center sm:table-row">
              <td>
                <span className="text-orange-700">{order._id}</span>
              </td>
              <td>
                <span>{order.customer}</span>
              </td>
              <td>
                <span>{order.address}</span>
              </td>
              <td>
                <span>${order.total}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-col md:flex-row w-[70%] justify-center sm:justify-around mt-20">
          <div className={statusClass(0)}>
            <Image
              src="/img/payment.png"
              alt="payment"
              width={40}
              height={40}
              objectFit="contain"
            />
            <span className="text-center">Payment</span>
            <Image
              src="/img/checkicon.png"
              alt="payment"
              width={20}
              height={20}
              objectFit="contain"
            />
          </div>
          <div className={statusClass(1)}>
            <Image
              src="/img/preparation.png"
              alt="preparation"
              width={40}
              height={40}
              objectFit="contain"
            />
            <span className="text-center">Preparing</span>
            <Image
              src="/img/checkicon.png"
              alt="payment"
              width={20}
              height={20}
              objectFit="contain"
              className="opacity-0"
            />
          </div>
          <div className={statusClass(2)}>
            <Image
              src="/img/bicycle.png"
              alt="bicycle"
              width={40}
              height={40}
              objectFit="contain"
            />
            <span className="text-center">On the way</span>
            <Image
              src="/img/checkicon.png"
              alt="payment"
              width={20}
              height={20}
              objectFit="contain"
              className="opacity-0"
            />
          </div>
          <div className={statusClass(3)}>
            <Image
              src="/img/delivered.png"
              alt="delevered"
              width={40}
              height={40}
              objectFit="contain"
            />
            <span className="text-center">Delivered</span>
            <Image
              src="/img/checkicon.png"
              alt="payment"
              width={20}
              height={20}
              objectFit="contain"
              className="opacity-0"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-black text-white w-[80%] sm:w-[25%] p-5 rounded-md">
        <h2>CART TOTAL</h2>
        <b>Subtotal: ${order.total}</b>
        <b>Discount: $0.00</b>
        <b>Total: ${order.total}</b>
        <button className="p-2 mt-2 text-purple-600 bg-white rounded-md">
          PAID
        </button>
      </div>
    </div>
  );
};

export default Orders;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);

  return {
    props: {
      order: res.data,
    },
  };
};
