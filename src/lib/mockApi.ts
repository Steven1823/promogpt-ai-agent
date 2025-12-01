// Mock API Stubs - Client-side only, no backend required
import { mockBusinessProfile, mockSalesData, mockCustomers, mockInsights, mockGeneratedContent, mockCampaign, mockPublishingResults } from "./mockData";

// Mock Dashboard Data Schema
export interface MockDashboardData {
  home: {
    kpis: {
      revenue: number;
      orders: number;
      customers: number;
      growth: number;
    };
    topProducts: Array<{ name: string; revenue: number; units: number }>;
    aiSummary: string;
  };
  dataHub: {
    salesData: typeof mockSalesData;
    customers: typeof mockCustomers;
    connectedSources: string[];
  };
  intelligence: typeof mockInsights;
  content: typeof mockGeneratedContent;
  automation: typeof mockPublishingResults;
  adGenerator: {
    recentAds: Array<{ title: string; platform: string; status: string }>;
  };
  settings: typeof mockBusinessProfile;
}

// GET /api/demo/mock-dashboard
export const getMockDashboard = async (): Promise<{ dashboard: MockDashboardData }> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  
  return {
    dashboard: {
      home: {
        kpis: {
          revenue: 53700,
          orders: 183,
          customers: 3,
          growth: 12,
        },
        topProducts: [
          { name: "Baby Diapers", revenue: 26700, units: 89 },
          { name: "Baby Wipes", revenue: 14700, units: 49 },
          { name: "Baby Oil", revenue: 7800, units: 26 },
        ],
        aiSummary: "Your business is performing well this week! Baby Diapers lead with 89 units sold. Nairobi and Kisumu are your strongest regions. Consider launching a promotion for Baby Shampoo to boost slower-moving products.",
      },
      dataHub: {
        salesData: mockSalesData,
        customers: mockCustomers,
        connectedSources: ["Manual CSV Upload", "Jumia (Mocked)", "Shopify (Mocked)"],
      },
      intelligence: mockInsights,
      content: mockGeneratedContent,
      automation: mockPublishingResults,
      adGenerator: {
        recentAds: [
          { title: "Baby Diapers Promo", platform: "Instagram", status: "Published" },
          { title: "Summer Sale Campaign", platform: "TikTok", status: "Draft" },
          { title: "Product Launch Video", platform: "Facebook", status: "Scheduled" },
        ],
      },
      settings: mockBusinessProfile,
    },
  };
};

// POST /api/ai/stt - Speech to Text
export interface STTRequest {
  audioBlob: Blob | string;
  languageHint?: string;
}

export interface STTResponse {
  transcript: string;
  language: "english" | "swahili" | "kikuyu";
}

// Helper function to analyze sales data
const analyzeSalesData = () => {
  // Calculate total revenue and units
  const totalRevenue = mockSalesData.reduce((sum, sale) => sum + sale.revenue, 0);
  const totalUnits = mockSalesData.reduce((sum, sale) => sum + sale.units, 0);
  
  // Find top product
  const productSales: Record<string, { units: number; revenue: number }> = {};
  mockSalesData.forEach((sale) => {
    if (!productSales[sale.product]) {
      productSales[sale.product] = { units: 0, revenue: 0 };
    }
    productSales[sale.product].units += sale.units;
    productSales[sale.product].revenue += sale.revenue;
  });
  
  const topProduct = Object.entries(productSales)
    .sort(([, a], [, b]) => b.revenue - a.revenue)[0];
  
  // Find top region
  const regionSales: Record<string, number> = {};
  mockSalesData.forEach((sale) => {
    regionSales[sale.region] = (regionSales[sale.region] || 0) + sale.revenue;
  });
  
  const topRegion = Object.entries(regionSales)
    .sort(([, a], [, b]) => b - a)[0];
  
  // Find best selling day
  const daySales: Record<string, { units: number; date: string }> = {};
  mockSalesData.forEach((sale) => {
    if (!daySales[sale.date]) {
      daySales[sale.date] = { units: 0, date: sale.date };
    }
    daySales[sale.date].units += sale.units;
  });
  
  const bestDay = Object.entries(daySales)
    .sort(([, a], [, b]) => b.units - a.units)[0];
  
  return {
    totalRevenue,
    totalUnits,
    topProduct: topProduct ? { name: topProduct[0], ...topProduct[1] } : null,
    topRegion: topRegion ? { name: topRegion[0], revenue: topRegion[1] } : null,
    bestDay: bestDay ? { date: bestDay[0], units: bestDay[1].units } : null,
    averageOrderValue: Math.round(totalRevenue / mockSalesData.length),
  };
};

export const speechToText = async (request: STTRequest): Promise<STTResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
  
  // Mock transcripts for demo
  const mockTranscripts = [
    { transcript: "What are my top selling products this week?", language: "english" as const },
    { transcript: "nĩ kĩĩ kĩrathondeka wega?", language: "kikuyu" as const },
    { transcript: "Generate a social media post for Baby Diapers", language: "english" as const },
    { transcript: "Nionyeshe uuzaji wa wiki hii", language: "swahili" as const },
  ];
  
  return mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
};

// POST /api/ai/generate - AI Content Generation
export interface GenerateRequest {
  prompt: string;
  context: {
    dashboard: string;
    businessProfile: typeof mockBusinessProfile;
  };
  language?: string;
}

export interface GenerateResponse {
  text: string;
  actions: Array<{ type: string; payload: any }>;
}

// Kikuyu phrase mappings
const kikuyuPhrases: Record<string, string> = {
  "nĩ kĩĩ kĩrathondeka wega?": "What is selling well?",
  "nĩ kĩĩ kĩbatari gũthondeka?": "What is not selling?",
  "thondeka atĩa?": "How are sales?",
  "nĩ andũ akĩrĩ athĩ?": "Who are the customers?",
  "nĩ kĩĩ kĩngĩhota gwĩka?": "What can I do?",
};

export const generateContent = async (request: GenerateRequest): Promise<GenerateResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing
  
  // Map Kikuyu to English if needed
  const prompt = kikuyuPhrases[request.prompt.toLowerCase()] || request.prompt;
  const promptLower = prompt.toLowerCase();
  
  // Get real-time data analysis
  const analysis = analyzeSalesData();
  const memory = getBusinessMemory();
  const hasHistory = memory.conversations.length > 0;
  
  let text = "";
  const actions = [];

  // Sales queries
  if (promptLower.includes("sales") || promptLower.includes("revenue") || promptLower.includes("performance")) {
    const growthPercent = 12; // From mock insights
    text = `Your sales performance is strong! Total revenue: KES ${analysis.totalRevenue.toLocaleString()} from ${analysis.totalUnits} units sold. `;
    
    if (analysis.topProduct) {
      text += `${analysis.topProduct.name} leads with ${analysis.topProduct.units} units (KES ${analysis.topProduct.revenue.toLocaleString()}). `;
    }
    
    if (hasHistory) {
      text += `As we discussed earlier, focusing on ${analysis.topRegion?.name} continues to pay off. `;
    }
    
    text += `Sales are up ${growthPercent}% compared to last period. Want me to create a campaign to maintain this momentum?`;
    
    updateBusinessMemory({
      conversation: { question: request.prompt, answer: text, language: request.language || "english" },
      insight: `Revenue: KES ${analysis.totalRevenue.toLocaleString()}, Top: ${analysis.topProduct?.name}`,
    });
  }
  
  // Product queries
  else if (promptLower.includes("product") || promptLower.includes("selling") || promptLower.includes("top") || promptLower.includes("best")) {
    if (analysis.topProduct) {
      text = `${analysis.topProduct.name} is crushing it! ${analysis.topProduct.units} units sold, generating KES ${analysis.topProduct.revenue.toLocaleString()}. `;
      
      if (analysis.bestDay) {
        const date = new Date(analysis.bestDay.date);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        text += `Peak sales day was ${formattedDate} with ${analysis.bestDay.units} units. `;
      }
      
      if (hasHistory && memory.mentionedProducts.includes(analysis.topProduct.name)) {
        text += `As I mentioned before, ${analysis.topProduct.name} continues its strong performance. `;
      }
      
      text += `Should I generate social media content to boost these products further?`;
      
      updateBusinessMemory({
        conversation: { question: request.prompt, answer: text, language: request.language || "english" },
        product: analysis.topProduct.name,
        insight: `${analysis.topProduct.name}: ${analysis.topProduct.units} units, KES ${analysis.topProduct.revenue.toLocaleString()}`,
      });
    }
  }
  
  // Region queries
  else if (promptLower.includes("region") || promptLower.includes("location") || promptLower.includes("where") || promptLower.includes("area")) {
    if (analysis.topRegion) {
      const regionPercent = Math.round((analysis.topRegion.revenue / analysis.totalRevenue) * 100);
      text = `${analysis.topRegion.name} is your powerhouse, generating KES ${analysis.topRegion.revenue.toLocaleString()} (${regionPercent}% of sales). `;
      
      if (hasHistory) {
        text += `Continuing our earlier discussion, ${analysis.topRegion.name} remains the optimal target for expansion. `;
      }
      
      text += `I recommend doubling down on ${analysis.topRegion.name} with targeted campaigns. Want me to create one?`;
      
      updateBusinessMemory({
        conversation: { question: request.prompt, answer: text, language: request.language || "english" },
        insight: `${analysis.topRegion.name} leads with ${regionPercent}% of sales`,
        recommendation: `Focus campaigns on ${analysis.topRegion.name}`,
      });
    }
  }
  
  // Social media content generation
  else if (promptLower.includes("social") || promptLower.includes("post") || promptLower.includes("caption")) {
    text = `🍼 Moms love Sunrise Baby Store! Our ${analysis.topProduct?.name || 'Baby Products'} keep your little one happy and comfortable. Shop the best today! 💕 #BabyEssentials #MomLife #SunriseBabyStore`;
    actions.push(
      { type: "save_to_library", payload: { category: "social_media" } },
    );
    
    updateBusinessMemory({
      conversation: { question: request.prompt, answer: text, language: request.language || "english" },
    });
  }
  
  // Recommendation queries
  else if (promptLower.includes("recommend") || promptLower.includes("suggest") || promptLower.includes("what should") || promptLower.includes("help")) {
    text = `Based on real data analysis:\n\n`;
    text += `1. **Push ${analysis.topProduct?.name}** - Your best seller (${analysis.topProduct?.units} units). Create a flash sale.\n`;
    text += `2. **Target ${analysis.topRegion?.name}** - Strongest region (${Math.round((analysis.topRegion?.revenue || 0) / analysis.totalRevenue * 100)}% of sales). Increase ad spend here.\n`;
    text += `3. **Retention Focus** - Current rate: 26%. Let's boost it to 35% with a loyalty program.\n\n`;
    
    if (hasHistory && memory.pastRecommendations.length > 0) {
      text += `Earlier I suggested: "${memory.pastRecommendations[memory.pastRecommendations.length - 1]}". Ready to implement it?`;
    }
    
    updateBusinessMemory({
      conversation: { question: request.prompt, answer: text, language: request.language || "english" },
      recommendation: `Push ${analysis.topProduct?.name}, target ${analysis.topRegion?.name}, boost retention`,
    });
  }
  
  // Default response with data insights
  else {
    text = hasHistory
      ? `Based on our conversation history and current data: ${analysis.topProduct?.name} (${analysis.topProduct?.units} units, KES ${analysis.topProduct?.revenue.toLocaleString()}) is your top performer. ${analysis.topRegion?.name} leads in regional sales. ${memory.pastRecommendations.length > 0 ? 'Should we revisit our earlier recommendations?' : 'Want specific insights or recommendations?'}`
      : `Looking at your Sunrise Baby Store data: Total revenue is KES ${analysis.totalRevenue.toLocaleString()} from ${analysis.totalUnits} units. ${analysis.topProduct?.name} leads sales, and ${analysis.topRegion?.name} is your strongest region. Customer retention is at 26%. What would you like to explore?`;
    
    updateBusinessMemory({
      conversation: { question: request.prompt, answer: text, language: request.language || "english" },
    });
  }

  actions.push({ type: "save_to_library", payload: { category: "insights" } });
  
  return { text, actions };
};

// POST /api/ai/tts - Text to Speech
export interface TTSRequest {
  text: string;
  voiceId?: string;
  language?: string;
}

export interface TTSResponse {
  audioUrl: string;
}

export const textToSpeech = async (request: TTSRequest): Promise<TTSResponse> => {
  try {
    const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
    
    if (!ELEVENLABS_API_KEY) {
      console.warn("Eleven Labs API key not found, using mock audio");
      return { audioUrl: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" };
    }

    // Use Aria voice by default (9BWtsMINqrJLrRacOk9x) - female, warm, professional
    const voiceId = request.voiceId || "9BWtsMINqrJLrRacOk9x";
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: request.text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Eleven Labs API error: ${response.status}`, errorText);
      throw new Error(`Eleven Labs API error: ${response.status}`);
    }

    // Convert audio to blob and create object URL
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    return { audioUrl };
  } catch (error) {
    console.error("TTS Error:", error);
    // Fallback to mock audio on error
    return { audioUrl: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" };
  }
};

// Business Memory (session-based)
interface BusinessMemory {
  conversations: Array<{
    id: string;
    question: string;
    answer: string;
    timestamp: number;
    language: string;
  }>;
  mentionedProducts: string[];
  pastRecommendations: string[];
  keyInsights: string[];
}

let businessMemory: BusinessMemory = {
  conversations: [],
  mentionedProducts: [],
  pastRecommendations: [],
  keyInsights: [],
};

export const updateBusinessMemory = (update: {
  conversation?: { question: string; answer: string; language: string };
  product?: string;
  recommendation?: string;
  insight?: string;
}) => {
  if (update.conversation) {
    businessMemory.conversations.push({
      id: `conv-${Date.now()}`,
      ...update.conversation,
      timestamp: Date.now(),
    });
  }
  if (update.product && !businessMemory.mentionedProducts.includes(update.product)) {
    businessMemory.mentionedProducts.push(update.product);
  }
  if (update.recommendation) {
    businessMemory.pastRecommendations.push(update.recommendation);
  }
  if (update.insight) {
    businessMemory.keyInsights.push(update.insight);
  }
};

export const getBusinessMemory = () => businessMemory;

export const getConversationHistory = () => {
  return [...businessMemory.conversations].reverse();
};

// Library storage (in-memory for demo)
let libraryItems: Array<{
  id: string;
  type: string;
  content: string;
  audioUrl?: string;
  timestamp: number;
}> = [];

export const saveToLibrary = (item: {
  type: string;
  content: string;
  audioUrl?: string;
}) => {
  const newItem = {
    id: `lib-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...item,
    timestamp: Date.now(),
  };
  libraryItems.push(newItem);
  return newItem;
};

export const getLibraryItems = () => {
  return [...libraryItems].reverse(); // Most recent first
};
