// Mock Data Package for PromoGPT MVP

export const mockBusinessProfile = {
  businessName: "Sunrise Baby Store",
  industry: "Baby Products",
  brandColors: ["#FFB6C1", "#FFD700"],
  brandVoice: "Friendly, educational, warm",
  logo: "",
  targetAudience: "New mothers and parents aged 25-40",
  products: "Baby diapers, wipes, oils, shampoos, clothing",
  socialMedia: {
    instagram: "instagram.com/sunrisebabystore",
    facebook: "facebook.com/sunrisebabystore",
    tiktok: "tiktok.com/@sunrisebabystore",
  }
};

export const mockSalesData = [
  { date: "2024-01-01", product: "Baby Diapers", units: 34, revenue: 10200, region: "Nairobi" },
  { date: "2024-01-02", product: "Baby Oil", units: 26, revenue: 7800, region: "Kisumu" },
  { date: "2024-01-03", product: "Baby Wipes", units: 49, revenue: 14700, region: "Mombasa" },
  { date: "2024-01-04", product: "Baby Shampoo", units: 15, revenue: 4500, region: "Nairobi" },
  { date: "2024-01-05", product: "Baby Diapers", units: 55, revenue: 16500, region: "Kisumu" },
  { date: "2024-01-06", product: "Baby Lotion", units: 38, revenue: 11400, region: "Mombasa" },
  { date: "2024-01-07", product: "Baby Wipes", units: 42, revenue: 12600, region: "Nairobi" },
  { date: "2024-01-08", product: "Baby Oil", units: 31, revenue: 9300, region: "Kisumu" },
  { date: "2024-01-09", product: "Baby Diapers", units: 67, revenue: 20100, region: "Mombasa" },
  { date: "2024-01-10", product: "Baby Shampoo", units: 22, revenue: 6600, region: "Nairobi" },
];

export const mockCustomers = [
  { name: "Grace Otieno", email: "grace@mail.com", phone: "0712345678", totalSpent: 5400, visits: 3, lastPurchase: "2024-01-08" },
  { name: "Kevin Wanjiru", email: "kevin@mail.com", phone: "0798765432", totalSpent: 12900, visits: 5, lastPurchase: "2024-01-10" },
  { name: "Mercy Nduta", email: "mercy@mail.com", phone: "0789001122", totalSpent: 2400, visits: 1, lastPurchase: "2024-01-05" },
  { name: "John Kamau", email: "john@mail.com", phone: "0756789012", totalSpent: 8700, visits: 4, lastPurchase: "2024-01-09" },
  { name: "Alice Mwangi", email: "alice@mail.com", phone: "0723456789", totalSpent: 15300, visits: 6, lastPurchase: "2024-01-10" },
];

export const mockInsights = {
  summary: "Sales increased by 12% this week. Baby Diapers remain the top-performing product with Kisumu as the strongest region. Customer repeat rate improved from 20% to 26%.",
  topProducts: ["Baby Diapers", "Baby Wipes", "Baby Oil"],
  topRegions: ["Nairobi", "Kisumu", "Mombasa"],
  forecast: "Next 30 days expect +8% revenue growth.",
  metrics: {
    totalRevenue: 111600,
    totalOrders: 379,
    averageOrderValue: 294,
    conversionRate: 3.2,
    customerRetention: 26,
    growthRate: 12
  }
};

export const mockGeneratedContent = {
  instagramCaption: "Moms love our Baby Diapers! 🍼✨ Soft, comfortable, and perfect for all-day protection. Shop now! #BabyEssentials #MomLife #SunriseBabyStore",
  tiktokScript: "Hey mama! Looking for diapers that keep your baby dry all day? Our premium diapers are soft, breathable, and leak-proof. Try them today!",
  adScript: "Introducing Sunrise Baby Store—your trusted home for quality baby essentials. From diapers to oils, we've got everything your little one needs. Shop comfort, shop love!",
  emailCampaign: "Hello Mum! 👋\n\nGet 10% off our best-selling baby diapers this week. Your baby deserves the best comfort and protection.\n\nLimited offer—shop now!\n\n💝 Sunrise Baby Store",
  blogPost: "## The 5 Must-Have Baby Products Every New Mom Needs\n\nBecoming a new mom is exciting but overwhelming. Here are the essential products that will make your life easier:\n\n1. **Premium Diapers** - Keep your baby dry and comfortable\n2. **Gentle Baby Oil** - Perfect for massage time\n3. **Soft Baby Wipes** - For quick and gentle cleanups\n4. **Natural Shampoo** - Tear-free formula for bath time\n5. **Moisturizing Lotion** - Keeps baby's skin soft\n\nVisit Sunrise Baby Store for all your baby needs!",
  hashtags: ["#BabyEssentials", "#MomLife", "#NewMom", "#BabyCare", "#SunriseBabyStore", "#KenyanMoms"]
};

export const mockCampaign = {
  campaignName: "January Baby Essentials Push",
  objective: "Increase sales by 20% and build brand awareness",
  channels: ["Instagram", "Facebook", "Email", "TikTok"],
  budget: "KES 15,000",
  duration: "14 days",
  targetAudience: "New mothers aged 25-40 in Nairobi, Kisumu, and Mombasa",
  contentCalendar: [
    { date: "2024-01-08", platform: "Instagram", post: "New Diaper Promo - 10% Off", type: "Carousel" },
    { date: "2024-01-09", platform: "Facebook", post: "Baby Care Tips", type: "Video" },
    { date: "2024-01-10", platform: "TikTok", post: "Morning Routine with Baby", type: "Short Video" },
    { date: "2024-01-12", platform: "Email", post: "Weekly Newsletter - Baby Oil Benefits", type: "Email" },
    { date: "2024-01-14", platform: "Instagram", post: "Customer Testimonial", type: "Story" },
    { date: "2024-01-16", platform: "Facebook", post: "Flash Sale Announcement", type: "Post" },
    { date: "2024-01-18", platform: "TikTok", post: "Product Unboxing", type: "Video" },
  ]
};

export const mockPublishingResults = {
  instagram: { status: "success", message: "Content scheduled for posting on 2024-01-10 at 10:00 AM", reach: 1250, engagement: 89 },
  facebook: { status: "success", message: "Posted successfully", reach: 890, engagement: 62 },
  tiktok: { status: "success", message: "Video uploaded successfully", views: 3400, likes: 187 },
  email: { status: "success", message: "Campaign sent to 1,234 subscribers", openRate: 24, clickRate: 8 }
};

export const mockPerformanceData = [
  { date: "2024-01-01", impressions: 1200, engagement: 85, clicks: 45 },
  { date: "2024-01-02", impressions: 1450, engagement: 102, clicks: 58 },
  { date: "2024-01-03", impressions: 1680, engagement: 118, clicks: 67 },
  { date: "2024-01-04", impressions: 1320, engagement: 93, clicks: 51 },
  { date: "2024-01-05", impressions: 1890, engagement: 134, clicks: 72 },
  { date: "2024-01-06", impressions: 2100, engagement: 156, clicks: 89 },
  { date: "2024-01-07", impressions: 1950, engagement: 142, clicks: 78 },
];
