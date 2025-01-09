import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "create_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/backend/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/backend/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row bg-indigo-50 min-h-screen">
      {/* Sidebar */}
      <div className="p-8 bg-indigo-100 shadow-lg md:w-1/3 md:min-h-screen border-r border-indigo-300">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">
          Search Filters
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Search Term */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="searchTerm"
              className="font-semibold text-indigo-600"
            >
              Search Term
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Enter keywords..."
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          {/* Type Filter */}
          <div>
            <label className="font-semibold text-indigo-600">Type</label>
            <div className="flex flex-wrap gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5 h-5 accent-indigo-600"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <span className="text-indigo-600">Rent & Sale</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 h-5 accent-indigo-600"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span className="text-indigo-600">Rent</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 h-5 accent-indigo-600"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                />
                <span className="text-indigo-600">Sale</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 h-5 accent-indigo-600"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <span className="text-indigo-600">Offer</span>
              </label>
            </div>
          </div>

          {/* Amenities Filter */}
          <div>
            <label className="font-semibold text-indigo-600">Amenities</label>
            <div className="flex flex-wrap gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5 h-5 accent-indigo-600"
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <span className="text-indigo-600">Parking</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5 h-5 accent-indigo-600"
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <span className="text-indigo-600">Furnished</span>
              </label>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sort_order"
              className="font-semibold text-indigo-600"
            >
              Sort By
            </label>
            <select
              id="sort_order"
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="regularPrice_desc">Price: High to Low</option>
              <option value="regularPrice_asc">Price: Low to High</option>
              <option value="createAt_desc">Latest</option>
              <option value="createAt_asc">Oldest</option>
            </select>
          </div>

          {/* Submit Button */}
          <button className="bg-indigo-700 text-white py-3 rounded-lg font-semibold uppercase tracking-wide hover:bg-indigo-600">
            Search
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="flex-1 bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-indigo-700 border-b pb-3 mb-6">
          Listing Results
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
