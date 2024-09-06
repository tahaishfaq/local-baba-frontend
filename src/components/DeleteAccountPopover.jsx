import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axiosInstance from "../utils/axiosInstance";
import { toast, Toaster } from "sonner";
import { useAuth } from "../context/AuthContext";

const DeleteAccountPopover = ({ open, setOpen }) => {
    const {logout} = useAuth()
  const handleDeleteAccount = () => {
    try {
      axiosInstance.delete("/user/delete-account").then((res) => {
        console.log(res?.data);
        toast.success("Account Deleted Successfully");
        setOpen(false)
        logout()
      });
    } catch (error) {
      console.log(error);
      toast.error("Error deleting account");
      setOpen(false)
    }
  };
  return (
    <>
      <Toaster richColors position="top-center" />
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6"
          >
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex items-center justify-center rounded-full bg-[#fe400114] h-12 w-20">
                <ExclamationTriangleIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-[#FE4101]"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Delete Account
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete your account? All of your
                    data will be permanently removed from our servers.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="inline-flex w-full justify-center rounded-full bg-[#FE4101] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteAccountPopover;
