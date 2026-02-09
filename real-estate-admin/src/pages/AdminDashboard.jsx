import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({ name: "Admin", email: "admin@dreamhome.com" });

  // Data States
  const [stats, setStats] = useState([
    { title: "Total Users", value: "0", icon: "👥", change: "+0%", isPositive: true },
    { title: "Active Listings", value: "0", icon: "🏠", change: "+0%", isPositive: true },
    { title: "Avg. Price", value: "₹0", icon: "💰", change: "+0%", isPositive: true },
    { title: "Total Inquiries", value: "0", icon: "📩", change: "+0%", isPositive: true },
  ]);
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all data in parallel
      const [usersRes, propsRes, inquiriesRes] = await Promise.all([
        fetch(`${API_URL}/api/auth/users`),
        fetch(`${API_URL}/api/properties?admin=true`), // Ensure admin=true is passed
        fetch(`${API_URL}/api/inquiries`)
      ]);

      const usersData = await usersRes.json();
      const propsData = await propsRes.json();
      const inquiriesData = await inquiriesRes.json();

      if (Array.isArray(usersData)) setUsers(usersData);
      if (Array.isArray(propsData)) setProperties(propsData);
      if (Array.isArray(inquiriesData)) setInquiries(inquiriesData);

      // Calculate Stats
      const totalUsers = Array.isArray(usersData) ? usersData.length : 0;
      const activeListings = Array.isArray(propsData) ? propsData.length : 0;
      const totalInquiries = Array.isArray(inquiriesData) ? inquiriesData.length : 0;

      const avgPrice = Array.isArray(propsData) && propsData.length > 0
        ? propsData.reduce((acc, curr) => acc + (parseInt(curr.price) || 0), 0) / propsData.length
        : 0;

      setStats([
        { title: "Total Users", value: totalUsers.toString(), icon: "👥", change: "+12%", isPositive: true },
        { title: "Active Listings", value: activeListings.toString(), icon: "🏠", change: "+5%", isPositive: true },
        { title: "Avg. Price", value: `₹${(avgPrice / 100000).toFixed(1)}L`, icon: "💰", change: "+8%", isPositive: true },
        { title: "Total Inquiries", value: totalInquiries.toString(), icon: "📩", change: "+24%", isPositive: true },
      ]);

    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Close sidebar when active tab changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  // --- RENDER CONTENT BASED ON TAB ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      );
    }

    switch (activeTab) {
      case "Dashboard":
        return (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${index === 3 ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-600"}`}>
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-slate-500 text-sm mt-1">{stat.title}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Properties */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Recent Listings</h3>
                  <button onClick={() => setActiveTab("Properties")} className="text-amber-600 font-bold text-sm hover:underline">View All</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Property</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {properties.slice(0, 5).map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                {item.images && item.images[0] ? (
                                  <img src={item.images[0]} alt="" className="h-full w-full object-cover" />
                                ) : (
                                  <div className="h-full w-full bg-slate-200 flex items-center justify-center text-xs">No Img</div>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-sm truncate max-w-[150px]">{item.title}</p>
                                <p className="text-xs text-gray-500">{item.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-bold text-slate-800">₹{parseInt(item.price).toLocaleString()}</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700">
                              {item.type}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button className="text-slate-400 hover:text-amber-600">View</button>
                          </td>
                        </tr>
                      ))}
                      {properties.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-gray-500">No properties found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column - Recent Inquiries */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Inquiries</h3>
                <div className="space-y-6">
                  {inquiries.slice(0, 5).map((inq, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 rounded-full bg-amber-500 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm text-slate-700">
                          <span className="font-bold">{inq.name}</span> inquired about <span className="font-bold">{inq.propertyTitle || "Property"}</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(inq.createdAt).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500 mt-1 italic">"{inq.message?.substring(0, 40)}..."</p>
                      </div>
                    </div>
                  ))}
                  {inquiries.length === 0 && <p className="text-gray-500 text-center">No inquiries yet.</p>}
                </div>
              </div>
            </div>
          </>
        );

      case "Approvals":
        const pendingProperties = properties.filter(p => p.status === "Pending");
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
              <h3 className="text-xl font-bold text-slate-800">Pending Approvals ({pendingProperties.length})</h3>
            </div>
            {pendingProperties.length === 0 ? (
              <div className="p-10 text-center text-gray-500">No properties waiting for approval.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Image</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Details</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Agent</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Listed Date</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pendingProperties.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="h-12 w-16 bg-gray-200 rounded overflow-hidden">
                            {item.images && item.images[0] ? (
                              <img src={item.images[0]} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">No Img</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-800 truncate max-w-[200px]">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.location}</p>
                          <div className="text-xs font-bold text-amber-600 mt-1">₹{parseInt(item.price).toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {/* Assuming agent is populated, otherwise user ID */}
                          {item.agent ? (item.agent.name || item.agent.email || "Unknown Agent") : "System"}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          <button
                            onClick={async () => {
                              if (!confirm("Approve this property?")) return;
                              try {
                                const token = localStorage.getItem("token");
                                const res = await fetch(`${API_URL}/api/properties/${item._id}/approve`, {
                                  method: "PUT",
                                  headers: { "Authorization": `Bearer ${token}` }
                                });
                                if (res.ok) {
                                  const updated = await res.json();
                                  // Update local state
                                  setProperties(properties.map(p => p._id === item._id ? { ...p, status: 'Approved' } : p));
                                } else {
                                  alert("Failed to approve");
                                }
                              } catch (e) { alert("Error approving"); }
                            }}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold hover:bg-green-200 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm("Reject (Delete) this property?")) return;
                              try {
                                const token = localStorage.getItem("token");
                                const res = await fetch(`${API_URL}/api/properties/${item._id}`, {
                                  method: "DELETE",
                                  headers: { "Authorization": `Bearer ${token}` }
                                });
                                if (res.ok) {
                                  setProperties(properties.filter(p => p._id !== item._id));
                                } else {
                                  alert("Failed to delete");
                                }
                              } catch (e) { alert("Error deleting"); }
                            }}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case "Properties":
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
              <h3 className="text-xl font-bold text-slate-800">All Property Listings ({properties.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Image</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Details</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Listed Date</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {properties.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="h-12 w-16 bg-gray-200 rounded overflow-hidden">
                          {item.images && item.images[0] ? (
                            <img src={item.images[0]} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">No Img</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800 truncate max-w-[200px]">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.location}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-800">₹{parseInt(item.price).toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{item.type}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-amber-500 mr-2">Edit</button>
                        <button className="text-slate-400 hover:text-red-500">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "Users":
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
              <h3 className="text-xl font-bold text-slate-800">Registered Users ({users.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-slate-800">{user.name}</td>
                      <td className="px-6 py-4 text-slate-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "Profile":
        return (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 bg-slate-50">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 bg-slate-900 rounded-full overflow-hidden text-white font-bold shadow-lg border-4 border-white mb-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=0f172a&color=fff&bold=true&size=128`}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{user.name}</h3>
                <p className="text-slate-500">{user.email}</p>
                <span className="mt-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 uppercase tracking-wide">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="p-8">
              <h4 className="text-lg font-bold text-slate-800 mb-6 border-b pb-2">Edit Profile</h4>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updates = Object.fromEntries(formData.entries());

                // Remove empty password if not changing
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

                  alert("Profile updated successfully!");
                } catch (err) {
                  alert(err.message);
                }
              }} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user.name}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={user.phone || ""}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      defaultValue={user.dob ? new Date(user.dob).toISOString().split('T')[0] : ""}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">New Password (Optional)</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Leave blank to keep current"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-amber-600/30 hover:bg-amber-700 transform hover:-translate-y-1 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      default:
        return <div className="p-10 text-center text-gray-500">Coming Soon...</div>;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex font-sans relative overflow-x-hidden">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Responsive Fixed Left */}
      <aside className={`
        w-64 bg-slate-900 text-white flex flex-col fixed h-full z-40 transition-transform duration-300 ease-in-out shadow-2xl
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="h-20 flex items-center justify-center border-b border-slate-800 relative">
          <Link to="/" className="text-2xl font-bold font-serif tracking-tight">Dream<span className="text-amber-500">Admin</span></Link>
          {/* Close Button Mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute right-4 md:hidden text-slate-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-3 overflow-y-auto">
          {[
            { name: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
            { name: "Approvals", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { name: "Properties", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1msq-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
            { name: "Users", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
            { name: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" },
            { name: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center w-full px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === item.name
                ? "bg-amber-600 text-white shadow-lg shadow-amber-900/40"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="flex items-center w-full px-4 py-3 text-slate-400 hover:text-white transition-colors hover:bg-slate-800 rounded-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 p-4 md:p-10 transition-all w-full ml-0 md:ml-64`}>

        {/* Top Header Bar */}
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-4 z-30">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-gray-100 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">{activeTab}</h2>
              <p className="text-sm text-gray-500 hidden md:block">Real-time data from DreamNest</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 md:h-11 md:w-11 bg-slate-900 rounded-full overflow-hidden text-white font-bold cursor-pointer hover:bg-amber-600 transition-colors shadow-md border-2 border-white text-sm md:text-base">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=0f172a&color=fff&bold=true`}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Render */}
        <div className="fade-in-up pb-10">
          {renderContent()}
        </div>

      </main>

      {/* Simple CSS animation for content switch */}
      <style>{`
        .fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
