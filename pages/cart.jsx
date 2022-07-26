import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail/OrderDetail.jsx";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const createOrder = async (data) => {
    try {
      const res = await axios.post("https://pizza-restaurant-amber.vercel.app/api/orders", data);
      res.status === 200 && router.push(`orders/${res.data._id}`);
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };
  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };
  return (
    <div className="flex flex-col py-10 sm:flex-row sm:py-20">
      <div className="flex-[2] pl-6 pr-3 mb-10 sm:mb-0 md:mb-0">
        <table className="w-[100%] sm:text-left text-center flex flex-col justify-center sm:table">
          <thead>
            <tr className="hidden sm:table-row">
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => (
              <tr
                key={product._id}
                className="flex flex-col items-center justify-center sm:table-row"
              >
                <td>
                  <div>
                    <Image
                      src={product.img}
                      alt="pizza"
                      width={90}
                      height={90}
                      objectFit="contain"
                    />
                  </div>
                </td>
                <td>
                  <span className="text-orange-700">{product.title}</span>
                </td>
                <td>
                  {product.extras.map((extra) => (
                    <span key={extra._id}>{extra.text}</span>
                  ))}
                </td>
                <td>
                  <span>${product.price}</span>
                </td>
                <td>
                  <span>{product.quantity}</span>
                </td>
                <td>
                  <span>${product.price * product.quantity} </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1 pl-5 pr-6">
        <div className="w-[100%] max-h-[300px] flex flex-col justify-center bg-black text-white p-5 rounded-md">
          <h2>CART TOTAL</h2>
          <b>Subtotal: ${cart.total}</b>
          <b>Discount: $0.00</b>
          <b>Total: ${cart.total}</b>
          {open ? (
            <div>
              <button
                onClick={() => setCash(true)}
                className="bg-white text-pink-500 p-2 mb-2 mt-2 rounded-md w-[100%] pointer"
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AZEvOVltUb5FXFRaLV_OKPLrZT0_DKpmJRFLavj06pk9_kE9Wd27tTTqzvmLmKUuM0A0ztgXa3GEv5un",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24,venmo",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="p-2 mt-2 text-pink-600 bg-white rounded-md"
            >
              CHECKOUT NOW
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
