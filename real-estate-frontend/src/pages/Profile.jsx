import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [saving, setSaving] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await fetch(`${API_URL}/api/auth/profile`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData);
                    // Update local storage with fresh data
                    localStorage.setItem("user", JSON.stringify(userData));

                    setFormData({
                        name: userData.name,
                        email: userData.email,
                        phone: userData.phone || "",
                        dob: userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : "",
                        password: ""
                    });
                } else {
                    // Fallback to local storage if API fails, or redirect
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                        const userData = JSON.parse(storedUser);
                        setUser(userData);
                        setFormData({
                            name: userData.name,
                            email: userData.email,
                            phone: userData.phone || "",
                            dob: userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : "",
                            password: ""
                        });
                    } else {
                        navigate("/login");
                    }
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                // Fallback attempt
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate, API_URL]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSaving(true);

        // Remove empty password
        const updates = { ...formData };
        if (!updates.password) delete updates.password;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/api/auth/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // Update Local State & Storage
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            if (data.token) localStorage.setItem("token", data.token);

            setSuccess("Profile updated successfully!");
            setFormData(prev => ({ ...prev, password: "" })); // Clear password field
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return null;

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 px-4 font-sans">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header Banner - Classic Navy */}
                    <div className="h-32 bg-slate-900 relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    <div className="px-8 pb-8">
                        {/* Profile Image & Role Badge */}
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="h-24 w-24 bg-white rounded-full p-1.5 shadow-lg">
                                <div className="h-full w-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border border-gray-200">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user.name}&background=0f172a&color=fff&bold=true&size=128`}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="mb-2">
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-900 text-white border border-slate-700 uppercase tracking-widest shadow-sm">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        {/* User Identifiers */}
                        <h2 className="text-3xl font-serif text-slate-900 mb-1">{user.name}</h2>
                        <p className="text-gray-500 mb-8 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {user.email}
                        </p>

                        <div className="border-t border-gray-100 pt-8">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </span>
                                Edit Profile
                            </h3>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm mb-6 flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm mb-6 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder-gray-400 hover:border-gray-300 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder-gray-400 hover:border-gray-300 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder-gray-400 hover:border-gray-300 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder-gray-400 hover:border-gray-300 shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">New Password (Optional)</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Leave blank to keep current password"
                                            className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder-gray-400 hover:border-gray-300 shadow-sm"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">At least 6 characters strongly recommended.</p>
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-end">
                                    <Link to="/" className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 hover:bg-gray-100 transition-colors text-center">
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transform hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Listings Section */}
            <div className="max-w-2xl mx-auto mt-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="p-2 bg-amber-50 rounded-lg text-amber-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </span>
                        My Listings
                    </h3>

                    <MyListings />
                </div>
            </div>
        </div>
    );
};

// Sub-component for listing User Properties
const MyListings = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyProperties = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties/user/my-properties`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) setProperties(data);
            } catch (err) {
                console.error("Failed to fetch properties", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyProperties();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this property?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                setProperties(prev => prev.filter(p => p._id !== id));
            } else {
                alert("Failed to delete property");
            }
        } catch (err) {
            alert("Error deleting property");
        }
    };

    if (loading) return <p className="text-slate-500">Loading your properties...</p>;
    if (properties.length === 0) return (
        <div className="text-center py-8">
            <p className="text-slate-500 mb-4">You haven't listed any properties yet.</p>
            <Link to="/add-property" className="inline-block bg-slate-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors">
                List a Property
            </Link>
        </div>
    );

    return (
        <div className="space-y-4">
            {properties.map(property => (
                <div key={property._id} className="flex flex-col sm:flex-row gap-4 border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50">
                    <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {property.images && property.images[0] ? (
                            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Image</div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-slate-800 text-lg">{property.title}</h4>
                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${property.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {property.status}
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm mb-2">{property.location}</p>
                        <p className="text-amber-600 font-bold">₹{property.price.toLocaleString()}</p>

                        <div className="flex gap-3 mt-4">
                            <Link to={`/edit-property/${property._id}`} className="px-4 py-2 bg-white border border-gray-200 text-slate-700 rounded-lg text-sm font-bold hover:border-amber-500 hover:text-amber-600 transition-colors">
                                Edit
                            </Link>
                            <button onClick={() => handleDelete(property._id)} className="px-4 py-2 bg-white border border-gray-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 hover:border-red-200 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Profile;
