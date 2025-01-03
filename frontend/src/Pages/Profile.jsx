import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    avatar: currentUser?.avatar,
    username: currentUser?.username,
    email: currentUser?.email,
    password: "",
  });

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prev) => ({ ...prev, avatar: downloadURL }))
        );
      }
    );
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated profile data:", formData);
    // Add logic to update the user profile in your backend or database
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          My Profile
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
          <div className="relative group self-center">
            <img
              src={formData.avatar || "/images/default-avatar.jpg"}
              alt="profile"
              className="rounded-full h-32 w-32 object-cover shadow-lg transition-transform transform group-hover:scale-105 cursor-pointer"
              onClick={() => fileRef.current.click()}
            />
            <button
              type="button"
              className="absolute bottom-2 right-2 bg-blue-500 text-white text-sm p-2 rounded-full shadow-md hover:bg-blue-600"
              onClick={() => fileRef.current.click()}
            >
              Edit
            </button>
          </div>
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error uploading image (max size: 2 MB)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading: ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">Upload complete!</span>
            ) : (
              ""
            )}
          </p>

          <div>
            <label
              htmlFor="username"
              className="block text-gray-600 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
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
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter a new password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium uppercase hover:bg-blue-700 transition"
          >
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
  );
}
