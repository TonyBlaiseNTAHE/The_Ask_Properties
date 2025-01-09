import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation, Pagination, Autoplay]);

  useEffect(() => {
    const fetchListings = async (url, setter) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setter(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListings("/backend/listing/get?offer=true&limit=6", setOfferListings);
    fetchListings("/backend/listing/get?type=rent", setRentListings);
    fetchListings("/backend/listing/get?type=sale", setSaleListings);
  }, []);

  const rentImage = rentListings.length > 0 ? rentListings[0].imageUrls[0] : "/default-rent-image.jpg";
  const saleImage = saleListings.length > 0 ? saleListings[0].imageUrls[0] : "/default-rent-image.jpg";
  const offerImage = offerListings.length > 0 ? offerListings[0].imageUrls[0] : "/default-offer-image.jpg";

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-500 to-blue-400 h-[90vh] text-white overflow-hidden">
        <video className="absolute inset-0 object-cover w-full h-full" autoPlay loop muted>
          <source src="/path/to/your/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-6 flex flex-col justify-center h-full">
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 animate-pulse">
            Welcome to <span className="text-yellow-300">TheAsk Properties</span>
          </h1>
          <p className="text-lg lg:text-2xl mb-8">
            Your one-stop solution for finding luxurious properties for rent or sale. Start your journey with us today!
          </p>
          <Link
            to="/search"
            className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 py-4 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Explore Properties
          </Link>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Properties</h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="rounded-lg shadow-lg"
          >
            {offerListings.map((listing) => (
              <SwiperSlide key={listing._id} className="transform transition duration-300 hover:scale-105">
                <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                  <img
                    src={listing.imageUrls[0]}
                    alt="Listing"
                    className="h-[250px] w-full object-cover transition duration-300 ease-in-out transform hover:scale-110"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800">{listing.name}</h3>
                    <p className="text-gray-600 text-sm">
                      ${listing.offer ? listing.discountPrice : listing.regularPrice}
                    </p>
                    <Link
                      to={`/listing/${listing._id}`}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Browse Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Rent Category */}
            <Link to="/search?type=rent" className="relative group block">
              <div
                className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
                style={{
                  backgroundImage: `url(${rentImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "250px",
                }}
              >
                <div className="bg-black bg-opacity-50 p-4 text-white text-2xl font-bold">For Rent</div>
              </div>
            </Link>
            {/* Sale Category */}
            <Link to="/search?type=sale" className="relative group block">
              <div
                className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
                style={{
                  backgroundImage: `url(${saleImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "250px",
                }}
              >
                <div className="bg-black bg-opacity-50 p-4 text-white text-2xl font-bold">For Sale</div>
              </div>
            </Link>
            {/* Offers Category */}
            <Link to="/search?offer=true" className="relative group block">
              <div
                className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
                style={{
                  backgroundImage: `url(${offerImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "250px",
                }}
              >
                <div className="bg-black bg-opacity-50 p-4 text-white text-2xl font-bold">Special Offers</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000 }}
            loop
          >
            <SwiperSlide>
              <blockquote className="text-gray-700 text-lg italic">
                "TheAsk Properties helped me find my dream home in no time! The process was smooth, and the team was highly professional."
              </blockquote>
              <p className="text-gray-800 font-bold mt-4">- Ben Iradukunda</p>
            </SwiperSlide>
            <SwiperSlide>
              <blockquote className="text-gray-700 text-lg italic">
                "I was amazed by the variety of properties available. Highly recommend their services!"
              </blockquote>
              <p className="text-gray-800 font-bold mt-4">- Sapiens Abavandimwe</p>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Start Your Journey Today</h2>
        <p className="text-lg mb-8">
          Sign up to explore a wide range of properties and make your dream a reality!
        </p>
        <Link
          to="/sign-up"
          className="bg-yellow-400 text-blue-900 py-4 px-8 rounded-lg text-lg hover:bg-yellow-500 transition duration-300 ease-in-out"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
}