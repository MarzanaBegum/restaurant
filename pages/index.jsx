import axios from "axios";
import { useState } from "react";
import Featured from "../components/Featured/Featured";
import PizzaList from "../components/PizzaList/PizzaList";
import AddNewPizzaButton from "../components/AddNewPizzaButton";
import AddPizza from "../components/AddPizza";

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <>
      <Featured />
      {admin && <AddNewPizzaButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <AddPizza setClose={setClose} />}
    </>
  );
}

export const getServerSideProps = async (context) => {
  const cookie = context.req?.cookies || "";
  let admin = false;
  if (cookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
