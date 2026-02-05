const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">

            {/* Hero Header with Background Image */}
            <div
                className="relative h-64 bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=100&w=3000&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-gray-900/60 z-0"></div>
                <div className="relative z-10 text-center text-white p-4">
                    <h1 className="text-5xl font-bold mb-3 drop-shadow-md">Contact Us</h1>
                    <p className="text-xl text-gray-200 drop-shadow-sm font-light">We'd love to hear from you. Let's find your dream home.</p>
                </div>
            </div>

            <div className="container mx-auto px-6 pb-20 -mt-20 relative z-20">
                <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-stone-100">

                    {/* Contact Info Side */}
                    <div className="bg-slate-900 text-white p-12 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                        {/* Decorative circle */}
                        <div className="absolute -right-16 -top-16 w-40 h-40 bg-amber-500 opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute -left-16 -bottom-16 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-2 font-serif">Get In Touch</h3>
                            <p className="text-slate-400 mb-10 font-light">
                                Have questions about buying, selling, or renting? Our team is here to help.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-amber-500/20 transition-colors backdrop-blur-sm border border-white/10 group-hover:border-amber-500/50">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-lg font-serif">Our Office</h4>
                                        <p className="text-slate-400 leading-relaxed font-light">123 Dream Tower, Sector 62,<br />Noida, Uttar Pradesh 201301</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-amber-500/20 transition-colors backdrop-blur-sm border border-white/10 group-hover:border-amber-500/50">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-lg font-serif">Phone</h4>
                                        <p className="text-slate-400 font-light">+91 98765 43210</p>
                                        <p className="text-slate-500 text-sm font-light">Mon-Sat 9am to 6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-amber-500/20 transition-colors backdrop-blur-sm border border-white/10 group-hover:border-amber-500/50">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-lg font-serif">Email</h4>
                                        <p className="text-slate-400 font-light">hello@dreamhome.com</p>
                                        <p className="text-slate-400 font-light">support@dreamhome.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-12 flex gap-4 text-white/50">
                            <a href="#" className="hover:text-amber-500 hover:border-amber-500 transition-all duration-300 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">F</a>
                            <a href="#" className="hover:text-amber-500 hover:border-amber-500 transition-all duration-300 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">T</a>
                            <a href="#" className="hover:text-amber-500 hover:border-amber-500 transition-all duration-300 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">I</a>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="p-12 md:w-3/5 bg-white">
                        <h3 className="text-3xl font-bold text-slate-900 mb-8 font-serif">Send us a Message</h3>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block uppercase tracking-wider">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder-stone-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block uppercase tracking-wider">Your Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder-stone-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 block uppercase tracking-wider">Subject</label>
                                <input
                                    type="text"
                                    placeholder="I'm interested in..."
                                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder-stone-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 block uppercase tracking-wider">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Tell us more about your requirements..."
                                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all resize-none placeholder-stone-400"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-amber-600 transition-all duration-300 uppercase tracking-widest text-sm hover:shadow-amber-900/20 hover:-translate-y-1"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;
