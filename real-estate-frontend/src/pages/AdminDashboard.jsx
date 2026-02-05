import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({ name: "Admin", email: "admin@dreamhome.com" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Close sidebar when active tab changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  // --- MOCK DATA ---
  const stats = [
    { title: "Total Users", value: "1,240", icon: "👥", change: "+12.5%", isPositive: true },
    { title: "Active Listings", value: "450", icon: "🏠", change: "+5.2%", isPositive: true },
    { title: "Pending Reviews", value: "12", icon: "⏳", change: "-2.4%", isPositive: false },
    { title: "Total Revenue", value: "$45.2k", icon: "💰", change: "+8.1%", isPositive: true },
  ];

  const allListings = [
    { id: 1, title: "Luxury 3BHK Apartment", location: "Noida, Sector 75", status: "Pending", price: "₹85L", date: "2 Feb 2025" },
    { id: 2, title: "Modern Villa with Pool", location: "South Delhi", status: "Approved", price: "₹4.5Cr", date: "1 Feb 2025" },
    { id: 3, title: "Cozy Studio Flat", location: "Hinjewadi, Pune", status: "Pending", price: "₹45L", date: "30 Jan 2025" },
    { id: 4, title: "Commercial Office Space", location: "Bangalore", status: "Rejected", price: "₹2.1Cr", date: "28 Jan 2025" },
    { id: 5, title: "Seaside Penthouse", location: "Mumbai", status: "Approved", price: "₹12Cr", date: "25 Jan 2025" },
    { id: 6, title: "Farmhouse Land", location: "Gurgaon", status: "Approved", price: "₹5Cr", date: "20 Jan 2025" },
  ];

  const agents = [
    { id: 1, name: "Robert Fox", email: "robert@dreamhome.com", sales: 24, rating: 4.9, image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Kristin Watson", email: "kristin@dreamhome.com", sales: 18, rating: 4.8, image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Esther Howard", email: "esther@dreamhome.com", sales: 32, rating: 5.0, image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 4, name: "Cameron Williamson", email: "cameron@dreamhome.com", sales: 15, rating: 4.6, image: "https://randomuser.me/api/portraits/men/85.jpg" },
  ];

  const recentActivity = [
    { user: "John Doe", action: "listed a new property", time: "2 hrs ago" },
    { user: "Sarah Smith", action: "updated profile settings", time: "4 hrs ago" },
    { user: "Mike Johnson", action: "requested a tour", time: "5 hrs ago" },
    { user: "System", action: "backup completed", time: "1 day ago" },
  ];

  // --- RENDER CONTENT BASED ON TAB ---
  const renderContent = () => {
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
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-slate-500 text-sm mt-1">{stat.title}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Chart/Table Area */}
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
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {allListings.slice(0, 4).map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={`/images/house${(item.id % 4) + 1}.jpg`} alt="" className="h-full w-full object-cover" />
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-sm truncate max-w-[150px]">{item.title}</p>
                                <p className="text-xs text-gray-500">{item.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-bold text-slate-800">{item.price}</td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                              item.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button className="text-slate-400 hover:text-amber-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column - Activity & Analytics */}
              <div className="space-y-8">
                {/* Analytics Preview */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg shadow-slate-900/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full blur-[80px] opacity-20"></div>
                  <h3 className="text-lg font-bold mb-4 relative z-10">Weekly Traffic</h3>
                  <div className="flex items-end gap-2 h-32 relative z-10 pl-2 pb-2 border-l border-b border-white/20">
                    {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                      <div key={i} className="flex-1 bg-amber-500 rounded-t-sm hover:bg-amber-400 transition-colors" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>Mon</span><span>Sun</span>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
                  <div className="space-y-6">
                    {recentActivity.map((act, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="h-2 w-2 mt-2 rounded-full bg-amber-500 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-slate-700">
                            <span className="font-bold">{act.user}</span> {act.action}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{act.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "Properties":
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
              <h3 className="text-xl font-bold text-slate-800">All Property Listings</h3>
              <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hovering:bg-slate-800">
                + Add New
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Property ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Details</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allListings.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-slate-500">#PROP-{item.id + 1000}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800 truncate max-w-[200px]">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.location}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.price}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          item.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1 text-slate-400 hover:text-amber-500" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button className="p-1 text-slate-400 hover:text-red-500" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "Agents":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-all">
                <img src={agent.image} alt={agent.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-slate-50" />
                <h3 className="text-lg font-bold text-slate-900">{agent.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{agent.email}</p>

                <div className="flex items-center justify-center gap-6 w-full mb-6 border-t border-b border-gray-50 py-4">
                  <div>
                    <span className="block text-xl font-bold text-slate-900">{agent.sales}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Sales</span>
                  </div>
                  <div>
                    <span className="block text-xl font-bold text-slate-900">{agent.rating} ⭐</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Rating</span>
                  </div>
                </div>

                <button className="w-full py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-slate-900 hover:text-white transition-colors">
                  View Profile
                </button>
              </div>
            ))}

            {/* Add Agent Card */}
            <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center hover:border-amber-500 hover:bg-amber-50 transition-all cursor-pointer group min-h-[300px]">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 group-hover:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-400 group-hover:text-amber-600">Add New Agent</h3>
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
            { name: "Properties", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1msq-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
            { name: "Agents", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
            { name: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" },
            { name: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
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
          <Link to="/">
            <button className="flex items-center w-full px-4 py-3 text-slate-400 hover:text-white transition-colors hover:bg-slate-800 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </Link>
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
              <p className="text-sm text-gray-500 hidden md:block">Welcome back, {user.name.split(' ')[0]}.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 w-64 transition-all focus:bg-white"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2.5 bg-gray-50 rounded-full text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors hidden sm:block">
                <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
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
