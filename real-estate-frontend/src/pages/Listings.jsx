import { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-2 block">Exclusive Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">Available Properties</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Browse our curated list of premium properties available for sale and rent.
            Find the perfect home that suits your lifestyle.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-xl">Loading properties...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-xl">Error: {error}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-xl">No properties found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
