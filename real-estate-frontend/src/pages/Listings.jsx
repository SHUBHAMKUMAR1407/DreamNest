import PropertyCard from "../components/PropertyCard";

const properties = [
  {
    id: 1,
    title: "Luxury Apartment",
    price: "$850,000",
    address: "123 Palm Street, Beverly Hills, CA",
    beds: 3,
    baths: 2,
    sqft: 2100,
    image: "/images/house1.jpg",
    type: "For Sale"
  },
  {
    id: 2,
    title: "Modern Villa",
    price: "$2,500,000",
    address: "45 Ocean View, Miami, FL",
    beds: 5,
    baths: 4,
    sqft: 4500,
    image: "/images/house2.jpg",
    type: "For Sale"
  },
  {
    id: 3,
    title: "Cozy City Loft",
    price: "$650,000",
    address: "789 Skyline Ave, New York, NY",
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: "/images/house3.jpg",
    type: "For Rent"
  },
  {
    id: 4,
    title: "Suburban Family Home",
    price: "$950,000",
    address: "321 Maple Drive, Austin, TX",
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: "/images/house4.jpg",
    type: "For Sale"
  },
  {
    id: 5,
    title: "Seaside Cottage",
    price: "$1,200,000",
    address: "555 Beach Road, Malibu, CA",
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: "/images/house1.jpg",
    type: "For Sale"
  },
  {
    id: 6,
    title: "Minimalist Studio",
    price: "$3,500/mo",
    address: "101 Downtown Blvd, Seattle, WA",
    beds: 1,
    baths: 1,
    sqft: 800,
    image: "/images/house2.jpg",
    type: "For Rent"
  },
];

const Listings = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;
