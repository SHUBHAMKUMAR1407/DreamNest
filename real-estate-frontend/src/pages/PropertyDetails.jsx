import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const PropertyDetails = () => {
  const { id } = useParams();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://dream-nest-flame.vercel.app/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          propertyId: property.id,
          propertyTitle: property.title,
          agentName: property.agent.name
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitStatus("error");
      alert("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // Mock Data (simulating API response)
  const property = {
    id: id,
    title: "The Grand Regal Estate",
    subtitle: "Luxury 3 BHK Apartment with Panoramic City Views",
    price: "₹85,00,000",
    location: "Sector 75, Noida, Uttar Pradesh",
    beds: 3,
    baths: 2,
    area: "1,850 sqft",
    status: "For Sale",
    description: "Step into a world of unparalleled luxury. This exquisitely designed magnificent residence offers a harmonious blend of classic elegance and modern convenience. Features include polished marble floors, a gourmet chef's kitchen with quartz countertops, and expansive wrap-around balconies that offer breathtaking sunsets over the city skyline. Located in a prestigious gated community with world-class amenities including a temperature-controlled pool, private gymnasium, and 24/7 concierge service.",
    features: ["Modular Kitchen", "Marble Flooring", "Pool View", "24/7 Power Backup", "Gated Community", "Club House Access"],
    images: [
      "/images/house1.jpg",
      "/images/house2.jpg",
      "/images/house3.jpg",
      "/images/house4.jpg"
    ],
    agent: {
      name: "Alexander Sterling",
      role: "Senior Estate Manager",
      email: "alexander@dreamhome.com",
      phone: "+91 98765 43210"
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans">

      {/* 1. Classic Hero Header */}
      <div className="bg-slate-900 pt-32 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 border border-amber-500 text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {property.status}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-4 leading-tight">
            {property.title}
          </h1>
          <p className="text-xl text-slate-300 font-light mb-8 max-w-2xl mx-auto">
            {property.subtitle}
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-2 text-amber-500 text-lg hover:text-amber-400 hover:underline transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{property.location}</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">

        {/* 2. Image Gallery (Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 shadow-2xl rounded-xl overflow-hidden border-4 border-white bg-white p-2">
          <div className="h-[400px] md:h-[500px] overflow-hidden rounded-lg group cursor-pointer">
            <img src={property.images[0]} alt="Main View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div className="grid grid-cols-2 gap-4 h-[400px] md:h-[500px]">
            {property.images.slice(1, 5).map((img, idx) => (
              <div key={idx} className="h-full overflow-hidden rounded-lg group cursor-pointer">
                <img src={img} alt={`View ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column: Details */}
          <div className="lg:col-span-2">

            {/* Specs Bar */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-amber-500 mb-10 flex flex-wrap justify-around items-center gap-6">
              <div className="text-center">
                <div className="text-slate-400 text-xs uppercase tracking-widest mb-1">Price</div>
                <div className="text-3xl font-bold text-slate-800 font-serif">{property.price}</div>
              </div>
              <div className="w-px h-12 bg-slate-100 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-slate-400 text-xs uppercase tracking-widest mb-1">Bedrooms</div>
                <div className="text-2xl font-bold text-slate-800">{property.beds}</div>
              </div>
              <div className="w-px h-12 bg-slate-100 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-slate-400 text-xs uppercase tracking-widest mb-1">Bathrooms</div>
                <div className="text-2xl font-bold text-slate-800">{property.baths}</div>
              </div>
              <div className="w-px h-12 bg-slate-100 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-slate-400 text-xs uppercase tracking-widest mb-1">Area</div>
                <div className="text-2xl font-bold text-slate-800">{property.area}</div>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-6 font-serif">
                About this Residence
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">
                {property.description}
              </p>

              <h4 className="font-bold text-slate-900 mb-4">Premium Features</h4>
              <ul className="grid grid-cols-2 gap-y-3">
                {property.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-600">
                    <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Map Section */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-6 font-serif">
                Location on Map
              </h3>
              <div className="w-full h-[400px] bg-slate-100 rounded-xl overflow-hidden shadow-sm border border-slate-200 relative">
                {/* Google Maps Embed */}
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="mt-4 flex justify-between items-center text-sm text-slate-500">
                <p>{property.location}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 font-bold hover:underline flex items-center gap-1"
                >
                  Open in Google Maps
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Agent Business Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 relative">
                {/* Gold Header */}
                <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 font-serif text-center">Contact Agent</h3>

                  <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full p-1 border-2 border-amber-500 mb-4">
                      <img src={`https://ui-avatars.com/api/?name=Alexander+Sterling&background=0f172a&color=fff`} alt="Agent" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{property.agent.name}</h4>
                    <p className="text-amber-600 text-sm font-medium tracking-wide uppercase">{property.agent.role}</p>
                  </div>

                  {submitStatus === 'success' ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="font-bold">Message Sent!</h4>
                      <p className="text-sm">The agent will contact you shortly.</p>
                    </div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:border-amber-500 focus:bg-white outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:border-amber-500 focus:bg-white outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message</label>
                        <textarea
                          rows="3"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:border-amber-500 focus:bg-white outline-none transition-all"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 bg-slate-900 text-white font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg mt-2 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : 'Send Inquiry'}
                      </button>
                    </form>
                  )}

                  <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-500 text-sm">Prefer to call?</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">{property.agent.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div >
  );
};

export default PropertyDetails;
