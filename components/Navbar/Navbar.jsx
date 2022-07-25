import { AiOutlinePhone, AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr";
import { Disclosure } from "@headlessui/react";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Products", href: "/products", current: false },
  { name: "Admin", href: "/admin", current: false },
  { name: "Events", href: "/events", current: false },
  { name: "Blog", href: "/blog", current: false },
  { name: "Contact", href: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <Disclosure
      as="nav"
      className="bg-pink-400 sticky top-0 right-0 left-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto w-full px-2 sm:px-6 lg:px-8 border-b border-orange-700">
            <div className="flex justify-between items-center h-14">
              <div className=" flex items-center justify-center sm:hidden">
                <Disclosure.Button className="inline-flex text-pink-600 bg-white p-2 rounded-md">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <GrFormClose
                      className="w-6 h-6 block"
                      aria-current="true"
                    />
                  ) : (
                    <GiHamburgerMenu
                      className="w-6 h-6 block"
                      aria-current="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 justify-center items-center sm:justify-start sm:items-stretch">
                <div className="flex items-center flex-shrink-0">
                  <AiOutlinePhone className="w-8 h-8 rounded-full bg-white p-1 mr-3 text-pink-400" />
                  <div className="text-white">
                    <h6 className="mb-0 text-xs ">ORDER NOW!</h6>
                    <h4 className="mt-0 ">012 454 654</h4>
                  </div>
                </div>
                <div className="hidden sm:flex sm:ml-6 md:ml-28 justify-center items-center">
                  <div className="space-x-4">
                    {Navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-white text-pink-500"
                            : "text-white hover:text-pink-500 hover:bg-white",
                          "rounded-full px-3 py-2 text-sm font-normal"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/cart">
                <div className="relative md:ml-10 md:mr-2 cursor-pointer">
                  <AiOutlineShoppingCart className="w-8 h-8 text-white" />
                  <div>
                    <span className="flex justify-center items-center absolute -top-1 -right-1 text-pink-500 bg-white rounded-full p-1 w-5 h-5 ">
                      {quantity}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {Navigation.map((item) => (
                <Disclosure.Button
                  as="a"
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-white text-pink-500 shadow-lg"
                      : "text-white hover:text-pink-500 hover:bg-white hover:shadow-lg",
                    "rounded-md block px-3 py-2 font-normal text-base"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
