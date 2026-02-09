import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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
    const [images, setImages] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/properties/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setFormData({
                        title: data.title,
                        price: data.price,
                        type: data.type,
                        location: data.location,
                        beds: data.beds + (typeof data.beds === 'number' ? ' BHK' : ''), // Simple hack to match select options if needed, or better logic
                        baths: data.baths.toString(),
                        sqft: data.sqft,
                        furnishing: data.furnishing,
                        description: data.description,
                    });
                    // For beds/baths, ensuring value matches select options
                    if (data.beds) {
                        // Normalize beds to match options "1 BHK", "2 BHK"...
                        // Assuming data.beds is just a number
                        const bedOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
                        const match = bedOptions.find(opt => parseInt(opt) === data.beds);
                        if (match) setFormData(prev => ({ ...prev, beds: match }));
                    }
                    if (data.baths) {
                        const bathOptions = ["1", "2", "3", "4+"];
                        const match = bathOptions.find(opt => parseInt(opt) === data.baths);
                        // If data.baths is 4 or more, select "4+"
                        if (data.baths >= 4) setFormData(prev => ({ ...prev, baths: "4+" }));
                        else setFormData(prev => ({ ...prev, baths: data.baths.toString() }));
                    }

                    setCurrentImages(data.images || []);
                } else {
                    setMessage({ type: "error", text: "Property not found." });
                }
            } catch (error) {
                setMessage({ type: "error", text: "Failed to fetch property details." });
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        // Basic Validation
        if (!formData.title || !formData.price || !formData.location || !formData.sqft || !formData.description) {
            setMessage({ type: "error", text: "Please fill in all required fields." });
            setSaving(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage({ type: "error", text: "You must be logged in." });
                setSaving(false);
                return;
            }

            const data = new FormData();
            data.append("title", formData.title);
            data.append("price", Number(formData.price));
            data.append("type", formData.type);
            data.append("location", formData.location);
            data.append("beds", parseInt(formData.beds));
            data.append("baths", parseInt(formData.baths));
            data.append("sqft", Number(formData.sqft));
            data.append("furnishing", formData.furnishing);
            data.append("description", formData.description);

            // Append new images if any
            for (let i = 0; i < images.length; i++) {
                data.append("images", images[i]);
            }

            const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: data,
            });

            const resData = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: "Property updated successfully!" });
                window.scrollTo(0, 0);
                setTimeout(() => navigate('/profile'), 1500);
            } else {
                setMessage({ type: "error", text: resData.message || "Something went wrong." });
            }
        } catch (error) {
            console.error("Error updating property:", error);
            setMessage({ type: "error", text: "Failed to connect to server." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 font-serif">Edit Property</h1>
                    <p className="text-slate-500">Update your property details.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
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
                        {/* Reuse the form layout from AddProperty, simplified here for brevity but assuming same fields */}
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
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all focus:bg-white bg-slate-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all focus:bg-white bg-slate-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Property Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all focus:bg-white bg-slate-50"
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
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all focus:bg-white bg-slate-50"
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
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all focus:bg-white bg-slate-50"
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

                        {/* Description & Images */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 border-b border-stone-200 pb-2 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                                <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Description & Media
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all focus:bg-white bg-slate-50"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Update Images (Optional)</label>
                                    <input type="file" multiple onChange={handleImageChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" />
                                    <p className="text-xs text-slate-500 mt-1">Uploading new images will replace existing ones.</p>
                                    {/* Show current images if any */}
                                    {currentImages.length > 0 && (
                                        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                                            {currentImages.map((img, idx) => (
                                                <img key={idx} src={img} alt="Current" className="h-20 w-20 object-cover rounded-lg border border-gray-200" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className={`px-8 py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all ${saving ? 'opacity-70' : ''}`}
                            >
                                {saving ? 'Saving...' : 'Update Property'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProperty;
