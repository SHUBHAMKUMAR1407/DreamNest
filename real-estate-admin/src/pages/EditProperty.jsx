import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

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
    const [existingImages, setExistingImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await fetch(`${API_URL}/api/properties/${id}`);
            if (!response.ok) throw new Error("Property not found");
            const data = await response.json();

            setFormData({
                title: data.title,
                price: data.price,
                type: data.type,
                location: data.location,
                beds: data.beds,
                baths: data.baths,
                sqft: data.sqft,
                furnishing: data.furnishing || "Unfurnished",
                description: data.description,
            });
            setExistingImages(data.images || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch property details");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const token = localStorage.getItem("token");

            // For updates, we'll send JSON as we are not handling image updates in this version
            // (Complexity of replacing specific images vs appending is high for a quick fix)
            // Future TODO: Add image replacement logic

            const response = await fetch(`${API_URL}/api/properties/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const resData = await response.json();

            if (response.ok) {
                toast.success("Property updated successfully!");
                navigate("/dashboard");
            } else {
                toast.error(resData.message || "Failed to update property");
            }
        } catch (error) {
            console.error("Error updating property:", error);
            toast.error("Failed to connect to server");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div></div>;

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-800 font-serif">Edit Property</h1>
                    <Link to="/dashboard" className="text-slate-500 hover:text-amber-600 font-medium">
                        ← Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
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
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-stone-50 focus:bg-white"
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
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-stone-50 focus:bg-white"
                                        required
                                    />
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
                                        <option value="For Sale">For Sale</option>
                                        <option value="For Rent">For Rent</option>
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
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-stone-50 focus:bg-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Bedrooms</label>
                                    <input
                                        type="number"
                                        name="beds"
                                        value={formData.beds}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-stone-50 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Bathrooms</label>
                                    <input
                                        type="number"
                                        name="baths"
                                        value={formData.baths}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-stone-50 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Carpet Area (sq ft)</label>
                                    <input
                                        type="number"
                                        name="sqft"
                                        value={formData.sqft}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-stone-50 focus:bg-white"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Description */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 border-b border-stone-200 pb-2 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                                <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Description
                            </h3>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all focus:bg-white bg-stone-50"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                            <p className="text-sm text-amber-800">
                                <strong>Note:</strong> Image editing is currently disabled for security reasons. To update images, please delete and re-list the property.
                            </p>
                            <div className="flex gap-2 mt-2 overflow-x-auto">
                                {existingImages.map((img, i) => (
                                    <img key={i} src={img} alt="Existing" className="h-16 w-16 object-cover rounded border border-amber-200" />
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="w-1/3 py-4 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-2/3 flex justify-center py-4 border border-transparent rounded-xl shadow-lg shadow-amber-900/10 text-lg font-bold text-white bg-slate-900 hover:bg-amber-600 transition-all ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {submitting ? 'Updating...' : 'Save Changes'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProperty;
