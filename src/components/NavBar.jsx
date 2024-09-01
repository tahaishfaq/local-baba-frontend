import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import logo from "../assets/Local Baba Logo 1.png";
import { CiShoppingCart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Cart from "./Cart";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { RiDeleteBinLine, RiLogoutBoxLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlinePerson } from "react-icons/md";
import { BsPerson } from "react-icons/bs";

export default function NavBar() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const { cartItems } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openLoginDropdown, setOpeLoginDropdown] = useState(false);
  const [openRegisterDropdown, setOpenRegisterDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState("Buyer");

  return (
    <Disclosure
      as="nav"
      className="bg-white drop-shadow font-figtree relative z-20"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-0">
        <div className="flex justify-between py-[16px]">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative hidden  items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
              </DisclosureButton>
            </div>
            <Link
              to="/"
              className="flex flex-shrink-0 items-center cursor-pointer"
            >
              <img
                alt="Your Company"
                src={logo}
                className="lg:w-auto w-32 h-auto"
              />
            </Link>
          </div>

          <div className="flex items-center lg:gap-x-[30px]">
            <Link
              to="/seller"
              className="text-[#FE4101] capitalize lg:flex md:flex hidden items-center gap-x-1"
            >
              {" "}
              <BsPerson className="w-5 h-5" /> Become a seller
            </Link>
            {localStorage.token ? (
              <Popover className="relative">
                <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  <span>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8GwkViOEunBePpydMn-mpr6mEIaK5MU-7w&s"
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover object-center"
                    />
                  </span>
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute z-30 w-screen lg:max-w-sm max-w-xs lg:right-0 -right-10 bg-white drop-shadow-md border rounded-xl lg:p-4 p-2"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-4 p-4 border-b">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8GwkViOEunBePpydMn-mpr6mEIaK5MU-7w&s"
                      alt={user?.name}
                      className="w-14 h-14 rounded-full object-cover object-center"
                    />
                    <div className="flex-1">
                      <p className="text-base font-semibold text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <FiEdit2 className="text-gray-500 cursor-pointer" />
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <span className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="p-2 text-[#434343] bg-gray-200 rounded-full">
                        <AiOutlineUser className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-normal text-[#0D4041]">
                          My Account
                        </p>
                        <p className="text-xs text-[#8B8B8B]">
                          Make Changes To Your Account
                        </p>
                      </div>
                    </span>
                    <span className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="p-2 text-[#434343] bg-gray-200 rounded-full">
                        <AiOutlineLock className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-normal text-[#0D4041]">
                          Change Password
                        </p>
                        <p className="text-xs text-[#8B8B8B]">
                          Manage Your Device Security
                        </p>
                      </div>
                    </span>
                    <span className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="p-2 text-[#434343] bg-gray-200 rounded-full">
                        <AiOutlineInfoCircle className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-normal text-[#0D4041]">
                          Privacy Policy
                        </p>
                      </div>
                    </span>
                    <span className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="p-2 text-[#434343] bg-gray-200 rounded-full">
                        <RiDeleteBinLine className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-normal text-[#0D4041]">
                          Delete Account
                        </p>
                        <p className="text-xs text-[#8B8B8B]">
                          Log Out Your Account
                        </p>
                      </div>
                    </span>
                    <span className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="p-2 text-[#434343] bg-gray-200 rounded-full">
                        <AiOutlineInfoCircle className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-normal text-[#0D4041]">
                          About
                        </p>
                      </div>
                    </span>
                    <span
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={logout}
                    >
                      <div className="p-2 text-[#434343] bg-gray-200 rounded-full">
                        <RiLogoutBoxLine className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-normal text-[#0D4041]">
                          Log Out
                        </p>
                        <p className="text-xs text-[#8B8B8B]">
                          Log Out Your Account
                        </p>
                      </div>
                    </span>
                  </div>
                </PopoverPanel>
              </Popover>
            ) : (
              <div className="flex-shrink-0 flex items-center space-x-3 ">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpeLoginDropdown(!openLoginDropdown)}
                    className="relative inline-flex items-center gap-x-1.5 rounded-full border border-[#FE4101] hover:border-[#e03901] hover:text-[#e03901] lg:px-8 md:px-8 px-6 lg:py-3 md:py-3 py-1.5 text-sm font-normal text-[#FE4101] shadow-sm"
                  >
                    Login
                  </button>
                  {openLoginDropdown && (
                    <div className="absolute top-12 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1 space-y-2">
                        <p
                          onClick={() => navigate("/login")}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Buyer Login
                        </p>
                        <p
                          onClick={() => navigate("/seller-login")}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Seller Login
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenRegisterDropdown(!openRegisterDropdown)}
                    className="relative lg:inline-flex md:inline-flex hidden items-center gap-x-1.5 rounded-full bg-[#FE4101] hover:bg-[#e03901] px-8 lg:py-3 text-sm font-normal text-white shadow-sm"
                  >
                    Register
                  </button>
                  {openRegisterDropdown && (
                    <div className="absolute top-12 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1 space-y-2">
                        <p
                          onClick={() => navigate("/register")}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Buyer Register
                        </p>
                        <p
                          onClick={() => navigate("/seller-register")}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Seller Register
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center gap-x-3">
              <div
                className="flex flex-shrink-0 items-center lg:border-l md:border-l border-[#949494]"
                onClick={() => setOpenCart(true)}
              >
                <button
                  type="button"
                  className="flex flex-row lg:space-x-2 space-x-1.5 relative rounded-full bg-white p-1 text-[#0D4041] focus:outline-none ring-0 font-figtree"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <div className="relative">
                    <CiShoppingCart aria-hidden="true" className="h-6 w-6" />
                    <span className="text-xs absolute -top-1 -right-1 rounded-full bg-red-500 text-white w-4 h-4 z-50">
                      {cartItems?.length}
                    </span>
                  </div>
                  <span className="font-figtree">Cart</span>
                </button>
              </div>

              <div
                className="lg:flex md:flex hidden flex-shrink-0 items-center lg:border-l md:border-l border-[#949494] p-1 pl-4"
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                <div className="flex items-center gap-x-1 cursor-pointer">
                  <span className="text-[#434343] text-md font-normal ">
                    {selectedUser}
                  </span>
                  <span className="text-[#434343]">
                    {openDropdown ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        ></path>
                      </svg>
                    )}
                  </span>
                </div>
                {openDropdown && (
                  <div className="absolute mt-2 top-1/2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <span
                        onClick={() =>
                          setSelectedUser(
                            selectedUser === "Seller" ? "Buyer" : "Seller"
                          )
                        }
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {selectedUser === "Seller" ? "Buyer" : "Seller"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Cart open={openCart} setOpen={setOpenCart} />

      <DisclosurePanel className="hidden">
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
