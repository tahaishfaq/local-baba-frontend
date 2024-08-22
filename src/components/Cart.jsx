"use client";

import { useState, useContext } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { CartContext } from "../context/CartContext"; // Adjust this path based on your project structure
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function Cart({ open, setOpen }) {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden font-figtree">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {/* Cart Header */}
                    <div className="flex items-start justify-between py-6 px-4 sm:px-6">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none  "
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Scrollable Cart Items Section */}
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <CartItem key={item.id} item={item} />
                        ))}
                      </div>
                    </div>

                    {/* Fixed Order Summary Section */}
                    {cartItems?.length > 0 && (
                      <div className=" p-4 border-t drop-shadow-md bg-white">
                        {/* <div className="flex justify-between items-center ">
                        <span className="text-sm font-medium text-white">
                          Sub-Total
                        </span>
                        <span className="text-sm font-medium text-white">
                          ₹
                          {cartItems.reduce(
                            (total, item) =>
                              total + item.basePrice * item.quantity,
                            0
                          )}
                        </span>
                      </div> */}
                        <button
                          className="bg-[#FE4101] text-white font-medium rounded-full w-full flex justify-between items-center pr-8 pl-10 py-4"
                          onClick={() => navigate("/payOrder")}
                        >
                          <span>Royal Chicken</span>
                          <span className="text-sm font-medium flex gap-x-1 items-center">
                            ₹
                            {cartItems.reduce(
                              (total, item) =>
                                total + item.basePrice * item.quantity,
                              0
                            )}
                            <IoIosArrowForward />
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  return (
    <div className="flex items-start space-x-4 p-4 border shadow-sm rounded-lg">
      <img
        src={item.image}
        alt={item.itemName}
        className="w-[120px] h-[106px] object-cover rounded-lg bg-gray-100"
      />
      <div className="flex-1 gap-y-10 flex flex-col">
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start ">
            <h3 className="text-sm font-semibold text-[#434343] mb-1 capitalize">
              {item.itemName}
            </h3>
            <p className="text-xs font-semibold text-[#434343] mb-1 w-60 truncate">
              {item?.description}
            </p>
          </div>
          <TrashIcon
            className="text-red-500 w-4 h-4 cursor-pointer hover:text-red-600"
            onClick={() => removeFromCart(item?._id)}
          />
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-sm font-medium text-[#434343]">
            ₹{(item.basePrice * item.quantity).toFixed(2)}
          </p>
          <div className="flex gap-x-4 items-center">
            <span
              onClick={() => decreaseQuantity(item._id)}
              className="bg-[#fe400171] w-5 h-5 rounded-md text-white cursor-pointer  text-sm text-center"
            >
              -
            </span>
            <span className="text-sm">{item.quantity}</span>
            <span
              onClick={() => increaseQuantity(item._id)}
              className="bg-[#FE4101] w-5 h-5  rounded-md text-white cursor-pointer text-sm text-center"
            >
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
