import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          My Profile
        </h1>
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <img
              src={currentUser?.avatar || "/images/default-avatar.jpg"}
              alt="profile"
              className="rounded-full h-32 w-32 object-cover shadow-lg transition-transform transform group-hover:scale-105"
            />
            <button className="absolute bottom-2 right-2 bg-blue-500 text-white text-sm p-2 rounded-full shadow-md hover:bg-blue-600">
              Edit
            </button>
          </div>
          <form className="w-full space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-600 font-medium"
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                id="username"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                defaultValue={currentUser?.username || ""}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                defaultValue={currentUser?.email || ""}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter a new password"
                id="password"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium uppercase hover:bg-blue-700 transition disabled:opacity-50">
              Update Profile
            </button>
          </form>
          <div className="flex justify-between w-full mt-6">
            <button className="text-red-500 font-medium hover:underline">
              Delete Account
            </button>
            <button className="text-red-500 font-medium hover:underline">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
