const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Property = require("./models/Property");
const User = require("./models/User");

dotenv.config();

const seedProperties = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for Seeding Properties");

        // Find Admin User to assign as agent
        const adminUser = await User.findOne({ email: "admin@dreamnest.com" });
        if (!adminUser) {
            console.error("Admin user not found! Please run seedAdmin.js first.");
            process.exit(1);
        }

        const properties = [
            {
                title: "Luxury Villa in Mumbai",
                description: "A stunning 5-bedroom villa with sea view, private pool, and modern amenities. Located in the heart of South Mumbai.",
                price: 450000000,
                location: "Malabar Hill, Mumbai",
                type: "For Sale",
                beds: 5,
                baths: 6,
                sqft: 6500,
                status: "Approved",
                images: [
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600596542815-2a4d9fddace7?auto=format&fit=crop&w=800&q=80"
                ],
                agent: adminUser._id
            },
            {
                title: "Modern Apartment in Bangalore",
                description: "Spacious 3BHK apartment in Whitefield with gym, club house access, and 24/7 security.",
                price: 12000000,
                location: "Whitefield, Bangalore",
                type: "For Rent",
                beds: 3,
                baths: 3,
                sqft: 1800,
                status: "Pending",
                images: [
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
                ],
                agent: adminUser._id
            },
            {
                title: "Cozy Cottage in Manali",
                description: "Beautiful wooden cottage surrounded by pine trees. Perfect for vacation home or rental investment.",
                price: 8500000,
                location: "Old Manali, Himachal Pradesh",
                type: "For Sale",
                beds: 2,
                baths: 1,
                sqft: 1200,
                status: "Approved",
                images: [
                    "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80"
                ],
                agent: adminUser._id
            },
            {
                title: "Seaview Penthouse in Goa",
                description: "Experience luxury living with panoramic ocean views. Fully furnished penthouse with private terrace.",
                price: 35000000,
                location: "Candolim, Goa",
                type: "For Sale",
                beds: 4,
                baths: 4,
                sqft: 3200,
                status: "Approved",
                images: [
                    "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
                ],
                agent: adminUser._id
            },
            {
                title: "Urban Loft in Delhi",
                description: "Contemporary loft-style apartment in South Delhi. Close to metro and premium shopping centers.",
                price: 25000000,
                location: "Greater Kailash, New Delhi",
                type: "For Rent",
                beds: 2,
                baths: 2,
                sqft: 1500,
                status: "Pending",
                images: [
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=800&q=80"
                ],
                agent: adminUser._id
            },
            {
                title: "Royal Haveli in Jaipur",
                description: "Traditional Rajasthani style haveli with modern interiors. Huge courtyard and rooftop terrace.",
                price: 55000000,
                location: "Civil Lines, Jaipur",
                type: "For Sale",
                beds: 6,
                baths: 5,
                sqft: 5000,
                status: "Approved",
                images: [
                    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1590743846664-9cb6fb286b25?auto=format&fit=crop&w=800&q=80"
                ],
                agent: adminUser._id
            },
            {
                title: "Tech Hub Villa in Hyderabad",
                description: "Smart home enabled villa in Gachibowli. Close to major IT parks and international schools.",
                price: 32000000,
                location: "Gachibowli, Hyderabad",
                type: "For Sale",
                beds: 4,
                baths: 4,
                sqft: 3500,
                status: "Pending",
                images: [
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80"
                ],
                agent: adminUser._id
            },
            {
                title: "Backwater Retreat in Kerala",
                description: "Serene waterfront property in Alleppey. Traditional Kerala architecture with modern luxury.",
                price: 18000000,
                location: "Alleppey, Kerala",
                type: "For Sale",
                beds: 3,
                baths: 3,
                sqft: 2000,
                status: "Approved",
                images: [
                    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                ],
                agent: adminUser._id
            }
        ];

        for (const prop of properties) {
            // Check if title exists
            const existing = await Property.findOne({ title: prop.title });
            if (!existing) {
                await Property.create(prop);
                console.log(`✅ Created property: ${prop.title}`);
            } else {
                // FORCE UPDATE IMAGES
                existing.images = prop.images;
                await existing.save();
                console.log(`🔄 Updated images for: ${prop.title}`);
            }
        }

        console.log("Seeding Completed Successfully");
        mongoose.disconnect();

    } catch (error) {
        console.error("❌ Seeding Error:", error);
        process.exit(1);
    }
};

seedProperties();
