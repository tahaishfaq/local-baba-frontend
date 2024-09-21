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
import { useSeller } from "../context/SellerContext";
import DeleteAccountPopover from "./DeleteAccountPopover";

export default function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openLoginDropdown, setOpeLoginDropdown] = useState(false);
  const [openRegisterDropdown, setOpenRegisterDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState("Buyer");
  const { setCurrentStep } = useSeller();
  const [openDeleteAccountPopover, setOpenDeleteAccountPopover] =
    useState(false);
  

  const handleDeleteAccount = () => {
    setOpenDeleteAccountPopover(!openDeleteAccountPopover);
  };

  const handleLogout = async () => {
    const res = await logout();

    console.log(res);
    if (res.success) {
      navigate("/");
    }
  };
  return (
    <>
      <DeleteAccountPopover
        open={openDeleteAccountPopover}
        setOpen={setOpenDeleteAccountPopover}
      />
      <Disclosure
        as="nav"
        className="bg-white drop-shadow font-figtree relative z-20 "
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-0">
          <div className="flex justify-between py-[16px]">
            <div className="flex">
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                {/* Mobile menu button */}
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
                <BsPerson className="w-5 h-5" /> Become a seller
              </Link>
              {localStorage.token && user !== null ? (
                <Popover className="relative">
                  <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                    <span>
                      <img
                        src={
                          user?.image
                            ? user?.image
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8GwkViOEunBePpydMn-mpr6mEIaK5MU-7w&s"
                        }
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover object-center"
                      />
                    </span>
                  </Popover.Button>

                  <Popover.Panel className="absolute z-30 w-screen lg:max-w-sm max-w-xs lg:right-0 -right-20 bg-white drop-shadow-md border rounded-xl lg:p-4 p-2">
                    {/* User Info */}
                    <div className="flex items-center gap-4 p-4 border-b">
                      <img
                        src={
                          user?.image
                            ? user?.image
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8GwkViOEunBePpydMn-mpr6mEIaK5MU-7w&s"
                        }
                        alt={user?.name}
                        className="w-14 h-14 rounded-full object-cover object-center"
                      />
                      <div className="flex-1">
                        <p className="text-base font-semibold text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <Link to="/account">
                        <FiEdit2 className="text-gray-500 cursor-pointer" />
                      </Link>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/account"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
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
                      </Link>
                      <Link
                        to="/change-password"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
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
                      </Link>
                      <Link
                        to="/my-orders"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="p-2 text-[#434343] bg-gray-200 rounded-full">
                          <AiOutlineInfoCircle className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-normal text-[#0D4041]">
                            My Orders
                          </p>
                          <p className="text-xs text-[#8B8B8B]">
                            Track Your Orders
                          </p>
                        </div>
                      </Link>
                      <span
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={handleDeleteAccount}
                      >
                        <div className="p-2 text-[#434343] bg-gray-200 rounded-full">
                          <RiDeleteBinLine className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-normal text-[#0D4041]">
                            Delete Account
                          </p>
                          <p className="text-xs text-[#8B8B8B]">
                            Delete Your Account
                          </p>
                        </div>
                      </span>
                      <Link
                        to="/aboutus"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="p-2 text-[#434343] bg-gray-200 rounded-full">
                          <AiOutlineInfoCircle className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-normal text-[#0D4041]">
                            About Us
                          </p>
                        </div>
                      </Link>
                      <span
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={handleLogout}
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
                  </Popover.Panel>
                </Popover>
              ) : (
                <div className="flex-shrink-0 flex items-center lg:space-x-3 space-x-1">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpeLoginDropdown(!openLoginDropdown)}
                      className="relative inline-flex items-center gap-x-1.5 rounded-full border border-[#FE4101] hover:border-[#e03901] hover:text-[#e03901] lg:px-8 md:px-8 px-6 lg:py-3 md:py-3 py-2 text-sm font-normal text-[#FE4101] shadow-sm"
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
                            onClick={() =>
                              window.open(
                                "https://seller.localbaba.app/login",
                                "_self"
                              )
                            }
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
                      onClick={() => navigate("/register")}
                      className="relative lg:inline-flex md:inline-flex hidden items-center gap-x-1.5 rounded-full bg-[#FE4101] hover:bg-[#e03901] px-8 lg:py-3 text-sm font-normal text-white shadow-sm"
                    >
                      Register
                    </button>
                    {/* {openRegisterDropdown && (
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
                  )} */}
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

                <Disclosure.Button className="lg:hidden md:hidden inline-flex items-center justify-center focus:outline-none focus:ring-0 ">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 text-[#FE4101]"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 text-[#FE4101]"
                  />
                </Disclosure.Button>

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

        <Disclosure.Panel className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-gray-100 px-4 ">
            {localStorage.token ? (
              <>
                <Link
                  to="/account"
                  className="block px-4 py-2 rounded-md text-base font-medium text-[#FE4101] "
                >
                  My Account
                </Link>
                <Link
                  to="/my-orders"
                  className="block px-4 py-2 rounded-md text-base font-medium text-[#FE4101] "
                >
                  My Orders
                </Link>
                <Link
                  to="/logout"
                  onClick={handleLogout}
                  className="block px-4 py-2 rounded-md text-base font-medium text-[#FE4101] "
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 rounded-md text-base font-medium text-[#FE4101] "
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 rounded-md text-base font-medium text-[#FE4101] "
                >
                  Register
                </Link>
              </>
            )}
            <Link
              to="/seller"
              className="block px-4 py-3 rounded-full text-white font-normal text-base text-center  bg-[#FE4101] "
            >
              Become a Seller
            </Link>
          </div>
        </Disclosure.Panel>

        <Cart open={openCart} setOpen={setOpenCart} />
      </Disclosure>
    </>
  );
}
