import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className="flex flex-col justify-center items-center my-28">
      <h2 className="text-base sm:text-xl font-medium text-fuchsia-500 mb-4 flex-shrink-0">
        THE BEST PIZZA IN THIS TOWN
      </h2>
      <p className="w-[70%] text-base text-gray-500  flex-shrink-0">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
      <div className="flex flex-col sm:flex-row w-full justify-center items-center flex-wrap mt-20">
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
