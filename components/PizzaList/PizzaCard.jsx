import Image from "next/image";
import Link from "next/link";

const PizzaCard = ({ pizza }) => {
  return (
    <Link href={`product/${pizza._id}`}>
      <div className="w-[70%] sm:w-[30%] sm:p-8 flex flex-col justify-center items-center shadow-lg p-7 bg-red-300 m-2 rounded-md cursor-pointer">
        <Image
          src={pizza.img}
          className="flex-shink-0"
          width={500}
          height={500}
          alt="pizza"
          objectFit="contain"
        />
        <h1 className="text-purple-600 mt-5 font-semibold flex-shink-0">
          {pizza.title}
        </h1>
        <span className="text-fuchsia-800">${pizza.price[0]}</span>
        <p className="text-center text-rose-700 flex-shink-0 mb-6">
          {pizza.description}
        </p>
      </div>
    </Link>
  );
};

export default PizzaCard;
