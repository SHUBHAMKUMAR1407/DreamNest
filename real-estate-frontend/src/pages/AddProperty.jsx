import { useState } from "react";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    type: "",
    location: "",
    beds: "1 BHK",
    baths: "1",
    sqft: "",
    furnishing: "Unfurnished",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Handle standard inputs
    // For selects, target.value works fine.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Basic Validation
    if (!formData.title || !formData.price || !formData.location || !formData.sqft || !formData.description) {
      setMessage({ type: "error", text: "Please fill in all required fields." });
      setLoading(false);
      return;
    }

    try {
      // Parse numeric values
      const payload = {
        ...formData,
        price: Number(formData.price),
        sqft: Number(formData.sqft),
        beds: parseInt(formData.beds), // Extract number from "1 BHK"
        baths: parseInt(formData.baths),
        // Adding dummy images for now as image upload is complex
        images: ["/images/house1.jpg", "/images/house2.jpg"]
      };

      const response = await fetch("https://dream-nest-flame.vercel.app/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Property list successfully!" });
        setFormData({
          title: "",
          price: "",
          type: "",
          location: "",
          beds: "1 BHK",
          baths: "1",
          sqft: "",
          furnishing: "Unfurnished",
          description: "",
        });
        window.scrollTo(0, 0);
      } else {
        setMessage({ type: "error", text: data.message || "Something went wrong." });
      }
    } catch (error) {
      console.error("Error adding property:", error);
      setMessage({ type: "error", text: "Failed to connect to server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundImage: "url('/images/house2.jpg')" }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-slate-900/70 z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl drop-shadow-lg font-serif">List Your Property</h1>
          <p className="mt-2 text-lg text-stone-200 drop-shadow-sm font-light">
            Fill in the details below to reach premium buyers and renters.
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500/30">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </span>
              Property Details
            </h2>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
              {message.type === 'success' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              )}
              {message.text}
            </div>
          )}

          <form className="p-8 space-y-8" onSubmit={handleSubmit}>

            {/* Section 1: Basic Information */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b border-stone-200 pb-2 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Property Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Luxury 3BHK Apartment in City Center"
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-stone-50 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500 font-bold">₹</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all focus:bg-white bg-stone-50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Property Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-stone-50 focus:bg-white"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="flat">Apartment / Flat</option>
                    <option value="villa">Independent Villa</option>
                    <option value="plot">Plot / Land</option>
                    <option value="commercial">Commercial Office</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Location & Specs */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b border-stone-200 pb-2 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Location & Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Full Address / Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. 123 Palm Avenue, Green District"
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all focus:bg-white bg-stone-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Bedrooms</label>
                  <select
                    name="beds"
                    value={formData.beds}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-stone-50 focus:bg-white"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="5+ BHK">5+ BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Bathrooms</label>
                  <select
                    name="baths"
                    value={formData.baths}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-stone-50 focus:bg-white"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Carpet Area (sq ft)</label>
                  <input
                    type="number"
                    name="sqft"
                    value={formData.sqft}
                    onChange={handleChange}
                    placeholder="e.g. 1500"
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all focus:bg-white bg-stone-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Furnishing Status</label>
                  <select
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-stone-50 focus:bg-white"
                  >
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Description & Media */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b border-stone-200 pb-2 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Detailed Description & Media
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Describe the property's key features, amenities, and surroundings..."
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all focus:bg-white bg-stone-50"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Property Images</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-stone-300 border-dashed rounded-xl hover:border-amber-500 hover:bg-amber-50/10 transition-all bg-stone-50 group cursor-pointer">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-slate-400 group-hover:text-amber-500 transition-colors transform group-hover:scale-110 duration-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-slate-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-amber-600 hover:text-amber-700 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-amber-900/10 text-lg font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all transform hover:scale-[1.01] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Submitting...' : 'Submit Property Listing'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
