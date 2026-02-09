const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white pt-20">

            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=100&w=3000&auto=format&fit=crop"
                    alt="DreamHome Headquarters"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">About DreamHome</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md">
                        We are redefining the real estate experience with trust, transparency, and technology.
                    </p>
                </div>
            </div>

            {/* Our Story & Mission */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block px-3 py-1 border border-amber-500 text-amber-600 rounded-full text-sm font-bold tracking-widest mb-4 uppercase">
                            Our Mission
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight font-serif">
                            Helping you find more than just a house—finding a home.
                        </h2>
                        <p className="text-slate-600 text-lg mb-6 leading-relaxed font-light">
                            Founded in 2025, DreamHome started with a simple belief: that buying a home shouldn't be stressful. Use our platform to browse thousands of verified listings, connect with top agents, and seal the deal securely.
                        </p>
                        <p className="text-slate-600 text-lg leading-relaxed font-light">
                            Whether you are a first-time buyer or a seasoned investor, our team is dedicated to guiding you through every step of the process.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500 rounded-tl-3xl z-0 opacity-20"></div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-800 rounded-br-3xl z-0"></div>
                        <img
                            src="/images/house4.jpg"
                            alt="Our Mission"
                            className="relative z-10 w-full h-96 object-cover rounded-2xl shadow-2xl border border-white"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-slate-900 py-16 text-white border-y border-amber-500/30">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold mb-2 font-serif text-amber-500">500+</div>
                        <div className="text-slate-300 uppercase tracking-widest text-xs">Properties Sold</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2 font-serif text-amber-500">1200+</div>
                        <div className="text-slate-300 uppercase tracking-widest text-xs">Happy Clients</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2 font-serif text-amber-500">50+</div>
                        <div className="text-slate-300 uppercase tracking-widest text-xs">Expert Agents</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2 font-serif text-amber-500">10</div>
                        <div className="text-slate-300 uppercase tracking-widest text-xs">Years Experience</div>
                    </div>
                </div>
            </div>

            {/* Our Team */}
            <div className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4 font-serif">Meet The Team</h2>
                <p className="text-slate-600 mb-12 max-w-2xl mx-auto font-light">
                    Our team of dedicated professionals is here to turn your real estate goals into reality.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                        { name: "Amit Sharma", role: "CEO & Founder" },
                        { name: "Priya Singh", role: "Head of Sales" },
                        { name: "Rahul Verma", role: "Senior Consultant" },
                    ].map((member, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 hover:shadow-2xl transition-all duration-300 border border-slate-100 group hover:-translate-y-2">
                            <div className="w-32 h-32 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-slate-200 group-hover:border-amber-500 transition-colors">
                                {/* Placeholder Avatar */}
                                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500 text-3xl font-serif font-bold group-hover:bg-amber-500 group-hover:text-white transition-all">
                                    {member.name.charAt(0)}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 font-serif">{member.name}</h3>
                            <p className="text-amber-600 font-medium text-sm tracking-wide uppercase mt-1">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
