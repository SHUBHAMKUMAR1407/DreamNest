import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Hide on Admin Dashboard
  if (location.pathname === "/admin") return null;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        // Reset after 5 seconds so they can see the input again if they want
        setTimeout(() => setIsSubscribed(false), 5000);
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Failed to connect to server.");
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-amber-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <span className="text-2xl font-bold font-serif tracking-tight">Dream<span className="text-amber-600">Home</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Experience the pinnacle of real estate excellence. We curate the finest properties for a distinguished lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-slate-200">Quick Links</h3>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link to="/listings" className="hover:text-amber-500 transition-colors">Properties</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-slate-200">Services</h3>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><Link to="/listings" className="hover:text-amber-500 transition-colors">Buy House</Link></li>
              <li><Link to="/listings" className="hover:text-amber-500 transition-colors">Rent House</Link></li>
              <li><Link to="/add-property" className="hover:text-amber-500 transition-colors">Sell House</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Consultancy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-slate-200">Newsletter</h3>
            <p className="text-slate-400 mb-4 text-sm">Subscribe for exclusive market insights.</p>

            {isSubscribed ? (
              <div className="bg-green-900/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-900 border border-slate-800 text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-600 text-sm"
                />
                <button type="submit" className="bg-amber-600 px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-white shadow-lg shadow-amber-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">© 2025 DreamHome Realty. All rights reserved.</p>
          <div className="flex gap-6 text-slate-500 text-xs font-medium">
            <Link to="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
