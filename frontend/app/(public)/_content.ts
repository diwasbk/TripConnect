export const heroStats = [
  { value: "2,500+", label: "Travelers hosted" },
  { value: "4.9/5", label: "Verified reviews" },
  { value: "24/7", label: "Local support" },
];

export const packages = [
  {
    _id: "6a0719dfec37788a7a15b283",
    title: "Pokhara Relax Trip",
    destination: "Pokhara, Nepal",
    intro: "Relax by the serene Phewa Lake surrounded by snow-capped mountains. Perfect for couples and families seeking a peaceful getaway.",
    description:
      "A well-balanced leisure package for couples and families with lakeside comfort and guided local experiences.",
    duration: "2 night / 3 days",
    price: "NPR 14,200",
    includes: ["Lakeside hotel", "Boating", "Airport transfer", "Booking history"],
    photoUrls: [
      "https://d3owbckoeihl9o.cloudfront.net/images/10adv/wp-content/uploads/2021/06/BLOG-NepalTravelGuide-02-1200x900-Pokhara-harbour-boat-docks-at-sunset-in-Nepal.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Pokhara",
        description: "Private transfer from Kathmandu or airport to your lakeside hotel. Check-in and freshen up. Evening walk along the lake promenade with sunset views.",
        activities: ["Transfer", "Hotel check-in", "Lakeside walk", "Dinner"],
      },
      {
        day: 2,
        title: "Lake Activities & Local Culture",
        description: "Morning boating on Phewa Lake. Visit Tal Barahi Temple on the lake. Afternoon free for relaxation or visit a local café. Evening explore the market streets.",
        activities: ["Boating", "Temple visit", "Café time", "Market exploration"],
      },
      {
        day: 3,
        title: "Sarangkot & Departure",
        description: "Early morning drive to Sarangkot for mountain views. Return for breakfast. Free time before your departure transfer to airport or Kathmandu.",
        activities: ["Mountain viewpoint", "Breakfast with views", "Souvenir shopping", "Departure"],
      },
    ],
    departures: [
      {
        date: {
          date: "2026-07-12T00:00:00.000Z"
        },
        totalSeats: 20,
        availableSeats: 0,
      },
      {
        date: {
          date: "2026-07-14T00:00:00.000Z"
        },
        totalSeats: 30,
        availableSeats: 20,
      }
    ],
    status: "published",
    isActive: true,
  },
  {
    _id: "everest-view-escape",
    title: "Everest View Escape",
    destination: "Everest Region / Kathmandu, Nepal",
    price: "NPR 18,500",
    duration: "3 night / 4 days",
    photoUrls: [
      "https://wallpaperaccess.com/full/6582353.jpg",
    ],
    description:
      "A signature Himalayan route featuring panoramic sunrise viewpoints, curated stays, and seamless private transfers.",
    includes: ["Kathmandu pickup", "Nagarkot sunrise", "Meal plan", "Trip support"],
    intro: "Experience the majesty of the Himalayas with stunning sunrise views, cultural encounters, and comfortable accommodations.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Arrive at Tribhuvan International Airport. Our representative will greet you and transfer you to your hotel. Rest and acclimatize. Evening stroll around Thamel district.",
        activities: ["Airport transfer", "Hotel check-in", "Welcome dinner"],
      },
      {
        day: 2,
        title: "Kathmandu City Exploration",
        description: "Visit Pashupatinath Temple, Boudhanath Stupa, and Durbar Square. Guided tour with cultural insights. Traditional lunch at a local restaurant.",
        activities: ["Temple visits", "Guided tour", "Local cuisine", "Photography"],
      },
      {
        day: 3,
        title: "Nagarkot Sunrise & Transfer",
        description: "Early morning drive to Nagarkot. Witness the breathtaking sunrise over the Himalayas. Spend the day exploring local villages and enjoy panoramic views.",
        activities: ["Mountain sunrise", "Village walk", "Panoramic views", "Traditional lunch"],
      },
      {
        day: 4,
        title: "Departure",
        description: "Leisurely morning at Nagarkot. Drive back to Kathmandu. Afternoon at your leisure for shopping or exploration before evening airport transfer.",
        activities: ["Breakfast with views", "Return transfer", "Souvenir shopping", "Departure"],
      },
    ],
    departures: [],
    status: "published",
    isActive: true,
  },
  {
    _id: "chitwan-wildlife-weekend",
    title: "Chitwan Wildlife Weekend",
    price: "NPR 16,800",
    duration: "3 night / 4 days",
    photoUrls: [
      "https://irp.cdn-website.com/ca5742e6/dms3rep/multi/Chitwan_Elephant_Ride.jpg",
    ],
    description:
      "An immersive wildlife package with guided jungle activities, eco-lodge stays, and family-friendly adventure pacing.",
    includes: ["Safari ride", "Jungle lodge", "Meals included", "Family friendly"],
    intro: "Embark on an exciting wildlife adventure in Chitwan National Park. Spot rhinos, tigers, and diverse bird species in their natural habitat.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Jungle Orientation",
        description: "Arrive at Chitwan. Check-in at eco-lodge. Afternoon jungle walk with naturalist guide. Learn about wildlife and forest ecosystem. Dinner at lodge.",
        activities: ["Jungle walk", "Naturalist briefing", "Dinner", "Fireflies watching"],
      },
      {
        day: 2,
        title: "Safari & Elephant Experience",
        description: "Early morning jeep safari in Chitwan National Park. Spot rhinos, deer, and birds. Afternoon elephant ride through the jungle. Evening tribal cultural show.",
        activities: ["Jeep safari", "Elephant ride", "Cultural show", "Bonfire"],
      },
      {
        day: 3,
        title: "Canoeing & Departure",
        description: "Morning canoe ride on the Rapti River - spot crocodiles and water birds. Breakfast and leisure time. Afternoon transfer back to Kathmandu.",
        activities: ["River canoeing", "Bird watching", "Lunch", "Return transfer"],
      },
    ],
    departures: [],
    status: "published",
    isActive: true,
  },
  {
    _id: "lumbini-heritage-tour",
    title: "Lumbini Heritage Tour",
    price: "NPR 11,900",
    duration: "2 days · Cultural",
    photoUrls: [
      "https://www.nepalsanctuarytreks.com/wp-content/uploads/2023/05/8F3FC504-8BE1-499F-BF4C-06EC99493224-600x338.jpg",
    ],
    description:
      "A thoughtful cultural itinerary centered on sacred sites, guided storytelling, and comfortable heritage accommodation.",
    includes: ["Historic sites", "Group pricing", "Local guide", "Trip tracking"],
    intro: "Visit the sacred birthplace of Lord Buddha. A spiritual and cultural journey through ancient temples and monastic zones.",
    itinerary: [
      {
        day: 1,
        title: "Travel to Lumbini & Temple Visit",
        description: "Drive Kathmandu to Lumbini (6 hours). Check-in at your heritage hotel. Visit the Maya Devi Temple, the most sacred site. Explore the monastic zone.",
        activities: ["Temple visit", "Guided tour", "Monastic zone", "Evening meditation"],
      },
      {
        day: 2,
        title: "Spiritual Journey & Departure",
        description: "Morning prayer session at the temple. Visit other religious sites in the pilgrimage area. Lunch with local monk community. Return to Kathmandu.",
        activities: ["Meditation", "Site visits", "Lunch with monks", "Return journey"],
      },
    ],
    destination: "Lumbini, Nepal",
    departures: [],
    status: "published",
    isActive: true,
  },
];

export const destinationCards = [
  {
    _id: "kathmandu",
    title: "Kathmandu",
    photoUrls:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    note: "Historic temples, vibrant markets, and easy cultural day tours.",
    intro: "A strong starting point for short city breaks, temple tours, and weekend trips.",
    details: ["Pashupatinath", "Boudhanath", "Durbar Square", "Food tours"],
  },
  {
    _id: "pokhara",
    title: "Pokhara",
    photoUrls:
      "https://d3owbckoeihl9o.cloudfront.net/images/10adv/wp-content/uploads/2021/06/BLOG-NepalTravelGuide-02-1200x900-Pokhara-harbour-boat-docks-at-sunset-in-Nepal.jpg",
    note: "Mountain views, lakeside stays, and slow-paced premium escapes.",
    intro: "Known for lakeside views, mountain backdrops, and slower-paced travel planning.",
    details: ["Phewa Lake", "Sarangkot", "Boating", "Sunrise views"],
  },
  {
    _id: "lumbini",
    title: "Lumbini",
    photoUrls:
      "https://res-1.cloudinary.com/enchanting/f_auto/et-web/2019/08/World-Peace-Pagoda-in-Lumbini-Nepal.-Lumbini-the-Birthplace-of-the-Lord-Buddha-and-The-Eight-Great-Places.jpg",
    note: "Sacred landmarks, spiritual circuits, and guided heritage experiences.",
    intro: "Best suited for calm heritage experiences and reflective itinerary design.",
    details: ["Maya Devi Temple", "Monastic zones", "Guided tour", "Quiet stays"],
  },
  {
    _id: "chitwan",
    title: "Chitwan",
    photoUrls:
      "https://irp.cdn-website.com/ca5742e6/dms3rep/multi/Chitwan_Elephant_Ride.jpg",
    note: "National park safaris, river activities, and adventure for all ages.",
    intro: "Great for wildlife-focused trips, jungle lodges, and family weekend plans.",
    details: ["Jeep safari", "Jungle walk", "Resort stay", "Nature activities"],
  },
];