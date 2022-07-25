import Image from "next/image";
import bg from "../../public/img/footer-bg.jpg";

const Footer = () => {
  return (
    <div className="h-1/2 flex flex-col space-x-6 sm:flex-row w-full sm:mt-14 bg-slate-700 text-white">
      <div className="py-20">
        <Image src={bg} alt="footer-bg" width={500} height={500} />
      </div>
      <div className="flex flex-col md:flex-row justify-around items-start py-20 space-x-6">
        <div className="text-orange-600">
          <h2>OH YES,WE DID.WELL BAKED SLICE OF PIZZA.</h2>
        </div>
        <div className="space-y-6 text-orange-400">
          <h2 className="text-orange-600 ">FIND OUR RESTAURANT</h2>
          <p>
            145 R. Don Road <br /> NewYork ,84060 <br />
            (153) 565 1010
          </p>
          <p>
            145 R. Don Road <br /> NewYork ,84060 <br />
            (153) 565 1010
          </p>
          <p>
            145 R. Don Road <br /> NewYork ,84060 <br />
            (153) 565 1010
          </p>
          <p>
            145 R. Don Road <br /> NewYork ,84060 <br />
            (153) 565 1010
          </p>
        </div>
        <div className="space-y-6 text-orange-400">
          <h2 className="text-orange-600">WORKING HOURS</h2>
          <p>
            MONDAY UNTIL FRIDAT <br />
            9:00 - 22:00
          </p>
          <p>
            SATURDAT - SUNDAY <br />
            12:00 - 2:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
