import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { LiaShoppingBasketSolid } from "react-icons/lia";
import logo from "../assets/Local Baba Logo 1.png";
import { CiShoppingCart } from "react-icons/ci";

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-0 sm:px-2 lg:px-0">
        <div className="flex  justify-between py-[16px]">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              {/* Mobile menu button */}
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
          <div className="flex items-center gap-x-[16px]">
            <div className="flex-shrink-0 space-x-2">
              <button
                type="button"
                className="  relative inline-flex items-center gap-x-1.5 rounded-full border border-[#FE4101] hover:border-[#e03901] hover:text-[#e03901]   px-8 py-3 text-sm font-normal text-[#FE4101] shadow-sm "
              >
                Login
              </button>
              <button
                type="button"
                className=" relative inline-flex items-center gap-x-1.5 rounded-full bg-[#FE4101] hover:bg-[#e03901]  px-8 py-3  text-sm font-normal text-white shadow-sm"
              >
                Register
              </button>
            </div>
            {/* <div className="hidden md:block border-r border-gray-900 h-8 mx-4" />/ */}
            <div className="hidden  md:flex md:flex-shrink-0 md:items-center border-l border-[#0D4041]">
              <button
                type="button"
                className=" flex flex-row space-x-2 relative rounded-full bg-white p-1 text-[#0D4041]  focus:outline-none ring-0 font-figtree"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <CiShoppingCart
                  aria-hidden="true"
                  className="h-6 w-6"
                />
                <span className="font-figtree">Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 pb-3 pt-2">
          {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
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
