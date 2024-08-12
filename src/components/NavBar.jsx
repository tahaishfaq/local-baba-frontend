import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assets/Local Baba Logo 1.png";

export default function NavBar() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-1 sm:px-2 lg:px-1">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-shrink-0 items-center">
              <img alt="Your Company" src={logo} className="" />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 space-x-2">
              <button
                type="button"
                onClick={() => navigate("/login")} // Navigate to Login page
                className="relative inline-flex items-center gap-x-1.5 rounded-full border border-[#FE4101] px-3 py-2 text-sm font-medium text-[#FE4101] shadow-sm"
              >
                Login
              </button>
              <button
                type="button"
                className="relative inline-flex items-center gap-x-1.5 rounded-full bg-[#FE4101] px-3 py-2 text-sm font-medium text-white shadow-sm"
              >
                Register
              </button>
            </div>
            <div className="hidden md:block border-r border-gray-300 h-8 mx-4" />
            <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
              <button
                type="button"
                className="flex flex-row space-x-2 relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <LiaShoppingBasketSolid
                  aria-hidden="true"
                  className="h-6 w-6"
                />
                <span className="">Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 pb-3 pt-2">
          <DisclosureButton
            as="a"
            href="#"
            className="block border-l-4 border-[#FE4101] bg-white py-2 pl-3 pr-4 text-base font-medium text-[#FE4101] sm:pl-5 sm:pr-6"
          >
            Cart
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
          >
            Items
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

