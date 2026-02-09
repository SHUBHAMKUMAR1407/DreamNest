import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";

// Mock data for featured properties section
const featuredProperties = [
  {
    id: 1,
    title: "Aliva Priva Jardin",
    price: "$350,000",
    address: "1088, Jakarta, Indonesia",
    beds: 3,
    baths: 2,
    sqft: 1200,
    image: "/images/house1.jpg",
    type: "For Sell"
  },
  {
    id: 2,
    title: "Asatti Garden City",
    price: "$550,000",
    address: "66, Bandung, Indonesia",
    beds: 4,
    baths: 3,
    sqft: 2200,
    image: "/images/house2.jpg",
    type: "For Rent"
  },
  {
    id: 3,
    title: "Citralan Puri Serang",
    price: "$600,000",
    address: "102, Surabaya, Indonesia",
    beds: 5,
    baths: 3,
    sqft: 2800,
    image: "/images/house3.jpg",
    type: "For Sell"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="relative h-[700px] flex items-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=100&w=3000&auto=format&fit=crop')" // 4K White Minimalist Villa
          }}
        >
          {/* Cinematic Gradient (Dark on left, transparent on right) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/40 to-transparent"></div>
        </div>

        {/* Hero Content - Left Aligned */}
        <div className="relative z-10 container mx-auto px-6 text-left text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-serif drop-shadow-2xl max-w-4xl">
            Find Your <span className="text-amber-500 italic">Perfect</span><br />
            Place To Live
          </h1>
          <p className="text-xl text-stone-200 mb-10 max-w-xl font-light leading-relaxed drop-shadow-md">
            Discover a wide range of properties that suit your lifestyle.
            Buy, rent, and sell with confidence using our premium platform.
          </p>


        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 shadow-xl relative z-20 -mt-24 mx-6 md:mx-auto max-w-6xl rounded-3xl border border-stone-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-x divide-stone-100">
          <div>
            <h3 className="text-5xl font-bold text-slate-900">1,500+</h3>
            <p className="text-amber-600 font-bold uppercase tracking-widest text-xs mt-2">Premium Houses</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-slate-900">5,000+</h3>
            <p className="text-amber-600 font-bold uppercase tracking-widest text-xs mt-2">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-slate-900">150+</h3>
            <p className="text-amber-600 font-bold uppercase tracking-widest text-xs mt-2">Award Winning</p>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">Best Choices</span>
          <h2 className="text-4xl font-bold mt-3 text-slate-900 font-serif">Popular Residencies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProperties.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/listings">
            <button className="px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-xl shadow-slate-900/20 uppercase tracking-wider text-sm">
              View All Properties
            </button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-10"></div>

        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Ready to Find Your Dream Home?</h2>
          <p className="text-stone-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Browse our exclusive listings and find the perfect property that matches your lifestyle and budget.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/listings">
              <button className="bg-amber-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-900/30 uppercase tracking-wide">
                Browse Properties
              </button>
            </Link>
            <Link to="/contact">
              <button className="bg-transparent text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors border border-stone-600 uppercase tracking-wide">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
