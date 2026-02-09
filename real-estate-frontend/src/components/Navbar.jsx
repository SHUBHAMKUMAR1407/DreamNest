import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check for logged in user
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing user data", e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    // Close dropdown on route change
    setShowDropdown(false);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  // Determine if we should show the solid navbar style
  const showSolidNavbar = isScrolled || location.pathname !== "/";

  // Hide Navbar on Admin Dashboard
  if (location.pathname === "/admin") return null;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Buy/Rent", path: "/listings" },
    { name: "Add Property", path: "/add-property" },
  ];

  // Add Admin link only if user is admin
  if (user && user.role === 'admin') {
    navLinks.push({ name: "Admin Panel", path: "/admin" });
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${showSolidNavbar
        ? "bg-white/95 backdrop-blur-md shadow-md py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-slate-900 text-white p-2 rounded-lg group-hover:bg-slate-800 transition-colors shadow-lg group-hover:shadow-slate-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-amber-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <span className={`text-2xl font-bold tracking-tight transition-colors ${showSolidNavbar ? "text-slate-900" : "text-white"}`}>
            Dream<span className="text-amber-600">Home</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium relative transition-colors duration-300 hover:scale-105 ${showSolidNavbar ? "text-slate-600 hover:text-amber-700" : "text-white/90 hover:text-white"
                  }`}
              >
                {link.name}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className={`h-10 w-10 rounded-full overflow-hidden border-2 ${showDropdown ? 'border-amber-400 ring-4 ring-amber-100' : 'border-amber-500'} shadow-md transform hover:scale-105 transition-all`}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=0f172a&color=f59e0b&bold=true`}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className={`hidden md:block font-bold ${showSolidNavbar ? "text-slate-800" : "text-white"}`}>
                  {user.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center px-4 py-2.5 text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    My Profile
                  </Link>

                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center mt-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className={`font-medium transition-colors hover:scale-105 ${showSolidNavbar ? "text-slate-600 hover:text-amber-700" : "text-white/90 hover:text-white"}`}>
                Login
              </Link>
              <Link to="/signup">
                <button className={`px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 ${showSolidNavbar
                  ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20"
                  : "bg-white text-slate-900 hover:bg-gray-100 hover:shadow-xl"
                  }`}>
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
