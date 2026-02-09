import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  // Safe access to image
  const imageSrc = property.images && property.images.length > 0 ? property.images[0] : "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-stone-200">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageSrc}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 bg-slate-900 text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest shadow-md">
          {property.type}
        </div>
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-sm text-slate-900 font-bold shadow-sm border border-stone-100">
          ₹{parseInt(property.price).toLocaleString()}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover:text-amber-700 transition-colors font-serif">
          {property.title}
        </h3>

        <div className="flex items-center text-slate-500 text-sm mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-amber-500">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span className="truncate">{property.location || property.address || "Location not specified"}</span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-stone-100 mb-4">
          <div className="text-center">
            <span className="block text-slate-900 font-bold">{property.beds}</span>
            <span className="text-xs text-slate-500 font-medium uppercase">Beds</span>
          </div>
          <div className="text-center border-l border-stone-100">
            <span className="block text-slate-900 font-bold">{property.baths}</span>
            <span className="text-xs text-slate-500 font-medium uppercase">Baths</span>
          </div>
          <div className="text-center border-l border-stone-100">
            <span className="block text-slate-900 font-bold">{property.sqft}</span>
            <span className="text-xs text-slate-500 font-medium uppercase">Sqft</span>
          </div>
        </div>

        <Link to={`/property/${property._id}`}>
          <button className="w-full bg-stone-50 text-slate-900 font-semibold py-3 rounded-lg border border-stone-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 uppercase tracking-wide text-sm">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
