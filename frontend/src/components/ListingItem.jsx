import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://www.google.com/imgres?q=real%20estate&imgurl=https%3A%2F%2Fanywhere.re%2Fwp-content%2Fuploads%2F2023%2F05%2F633f08923c4c51e97e723cde_State-of-Luxury-Real-Estate-in-Partnership-with-AREAA-2048x1406-1-1024x703.jpeg&imgrefurl=https%3A%2F%2Fanywhere.re%2F&docid=BUdiJIRiCSXrJM&tbnid=hePsBx4grm7YqM&vet=12ahUKEwizhfShs-iKAxXFQ_EDHZ_YPCYQM3oECGwQAA..i&w=1024&h=703&hcb=2&ved=2ahUKEwizhfShs-iKAxXFQ_EDHZ_YPCYQM3oECGwQAA"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold ">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
