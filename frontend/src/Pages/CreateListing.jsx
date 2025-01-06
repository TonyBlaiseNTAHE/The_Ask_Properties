import React from "react";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/backend/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      // navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-lg mt-20">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        List Your Property
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Property Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter property name"
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Describe your property"
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              required
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              required
              onChange={handleChange}
              value={formData.address}
            />
          </div>
          <fieldset className="border-t pt-4">
            <legend className="text-sm font-medium text-gray-700">
              Property Features
            </legend>
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                { id: "sale", label: "For Sale" },
                { id: "rent", label: "For Rent" },
                { id: "parking", label: "Parking Spot" },
                { id: "furnished", label: "Furnished" },
                { id: "offer", label: "Special Offer" },
              ].map((feature) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={feature.id}
                    className="h-5 w-5 text-blue-600 rounded focus:ring focus:ring-blue-300"
                    onChange={handleChange}
                    checked={formData[feature.id]}
                  />
                  <label htmlFor={feature.id} className="text-sm text-gray-700">
                    {feature.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <fieldset>
            <legend className="text-sm font-medium text-gray-700">
              Bedrooms & Bathrooms
            </legend>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { id: "bedrooms", label: "Bedrooms", min: 1, max: 10 },
                { id: "bathrooms", label: "Bathrooms", min: 1, max: 10 },
              ].map((input) => (
                <div key={input.id}>
                  <label
                    htmlFor={input.id}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {input.label}
                  </label>
                  <input
                    type="number"
                    id={input.id}
                    min={input.min}
                    max={input.max}
                    required
                    onChange={handleChange}
                    value={formData[input.id]}
                    className="mt-1 block w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  />
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-medium text-gray-700">
              Pricing
            </legend>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { id: "regularPrice", label: "Regular Price ($/month)" },
                { id: "discountPrice", label: "Discount Price ($/month)" },
              ].map((price) => (
                <div key={price.id}>
                  <label
                    htmlFor={price.id}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {price.label}
                  </label>
                  <input
                    type="number"
                    id={price.id}
                    min="0"
                    required
                    onChange={handleChange}
                    value={formData[price.id]}
                    className="mt-1 block w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  />
                </div>
              ))}
            </div>
          </fieldset>
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Images
            </label>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <small className="block text-xs text-gray-500 mt-1">
              Max 6 images. The first image will be the cover.
            </small>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      <div className="mt-8 text-center">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
        >
          Submit Listing
        </button>
      </div>
      </form>
    </main>
  );
}
