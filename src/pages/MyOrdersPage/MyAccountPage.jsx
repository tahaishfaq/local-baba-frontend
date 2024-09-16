import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import axiosInstance from "../../utils/axiosInstance";
import { FaCheckCircle, FaStar, FaTimesCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { toast, Toaster } from "sonner";

const MyAccountPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null); 
  const {setUser} = useAuth()

  useEffect(() => {
    axiosInstance
      .get("/user/current-user")
      .then((res) => {
        console.log("profile", res?.data);
        setCurrentUser(res?.data?.currentUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleProfileUpdate = async () => {
    if (!profileImage) return;

    const formData = new FormData();
    formData.append("profile", profileImage);

    try {
      const res = await axiosInstance.put("/user/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res?.data);
      // setCurrentUser(res?.data?.user); 
      setProfileImage(null); 
      setUser(res?.data?.user)
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture.");
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-500"; 
    if (rating >= 2) return "text-yellow-500"; 
    return "text-red-500"; 
  };

  return (
    <>
    <Toaster richColors position="top-center" />
      <div className="font-figtree">
        <NavBar />
        <div className="lg:py-12 py-10 mx-auto max-w-lg lg:px-0 px-4">
          <h1 className="text-2xl font-bold mb-4">My Account</h1>
          {currentUser ? (
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is some information about the user.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  {/* Profile Picture */}
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Profile Picture
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="flex items-center">
                        <img
                          alt=""
                          src={
                            profileImage
                              ? URL.createObjectURL(profileImage)
                              : currentUser.image ||
                                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          }
                          className="inline-block object-cover object-center h-16 w-16 rounded-full"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="ml-4 text-sm text-gray-500"
                        />
                      </div>
                    </dd>
                  </div>

                  {/* Other Profile Information */}
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUser.name}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUser.email}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                      {currentUser.role}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUser.status}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Verified
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      {currentUser.isVerified ? (
                        <>
                          <FaCheckCircle className="text-green-500 mr-2" />
                          Yes
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="text-red-500 mr-2" />
                          No
                        </>
                      )}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Ratings
                    </dt>
                    <dd className="text-sm text-gray-900 sm:col-span-2 flex items-center">
                      <FaStar
                        className={`mr-2 ${getRatingColor(
                          currentUser?.ratings
                        )}`}
                      />
                      {currentUser.ratings.toFixed(1)}
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Personal Details
                    </h3>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Gender
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUser.personalDetails?.gender}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Availability
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUser.personalDetails?.available}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="px-4 py-5 sm:px-6">
                <button
                  onClick={handleProfileUpdate}
                  className="bg-[#FE4101] text-white py-[10px] px-6 rounded-full hover:bg-[#FE4101] transition duration-300"
                >
                  Update Profile Picture
                </button>
              </div>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyAccountPage;
