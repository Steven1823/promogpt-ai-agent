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
  
  // Check memory for context
  const memory = getBusinessMemory();
  const hasHistory = memory.conversations.length > 0;
  
  // Enhanced responses with memory recall
  const mockResponses: Record<string, GenerateResponse> = {
    "What are my top selling products this week?": {
      text: hasHistory 
        ? `Looking at your data again, Baby Diapers continue to dominate with 89 units (KES 26,700), followed by Baby Wipes (49 units, KES 14,700), and Baby Oil (26 units, KES 7,800). Baby Diapers show a 15% growth since we last spoke.`
        : "Your top products this week are Baby Diapers (89 units, KES 26,700), Baby Wipes (49 units, KES 14,700), and Baby Oil (26 units, KES 7,800). Baby Diapers show the strongest growth with a 15% increase from last week.",
      actions: [
        { type: "highlight_chart", payload: { chart: "product_performance" } },
        { type: "save_to_library", payload: { category: "insights" } },
      ],
    },
    "What is selling well?": {
      text: memory.mentionedProducts.includes("Baby Diapers")
        ? "As I mentioned earlier, Baby Diapers remain your star performer. They're leading with 89 units this week. Baby Wipes are also doing well with 49 units sold."
        : "Baby Diapers and Baby Wipes are your star products. Diapers lead with 89 units sold this week, generating KES 26,700 in revenue. Wipes follow closely with 49 units.",
      actions: [
        { type: "save_to_library", payload: { category: "insights" } },
      ],
    },
    "Generate a social media post for Baby Diapers": {
      text: "🍼 Moms trust Sunrise Baby Store! Our premium Baby Diapers keep your little one dry and happy all day. Shop now and get 10% off! 💕 #BabyEssentials #SunriseBabyStore #MomLife",
      actions: [
        { type: "save_to_library", payload: { category: "social_media", platform: "instagram" } },
        { type: "open_editor", payload: { content_type: "post" } },
      ],
    },
    "How are sales?": {
      text: hasHistory
        ? "Sales continue their upward trend! You're up 12% this week with KES 53,700 in revenue from 183 units. Your strongest regions remain Nairobi and Kisumu, contributing 65% of total revenue."
        : "Sales are up 12% this week compared to last week. Total revenue is KES 53,700 from 183 units sold. Nairobi and Kisumu are your strongest regions, contributing 65% of total revenue.",
      actions: [
        { type: "save_to_library", payload: { category: "insights" } },
      ],
    },
  };
  
  const response = mockResponses[prompt] || {
    text: hasHistory
      ? `Based on our previous conversations and your current data, Baby Diapers remain your bestseller with strong performance. Customer retention is at 26%. ${memory.pastRecommendations.length > 0 ? 'Remember, we discussed focusing on high-performing regions like Nairobi and Kisumu.' : 'I recommend focusing on your top products and expanding in high-performing regions.'}`
      : "I understand your question. Based on Sunrise Baby Store's performance, your business is trending positively. Baby Diapers remain your bestseller, and customer retention has improved to 26%. I recommend focusing on your top products and expanding in high-performing regions like Nairobi and Kisumu.",
    actions: [
      { type: "save_to_library", payload: { category: "insights" } },
    ],
  };
  
  // Update memory
  updateBusinessMemory({
    conversation: { question: request.prompt, answer: response.text, language: request.language || "english" },
    product: prompt.toLowerCase().includes("diaper") ? "Baby Diapers" : undefined,
    insight: response.text.includes("26%") ? "Customer retention at 26%" : undefined,
  });
  
  return response;
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
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate processing
  
  // Return mock audio URL (empty data URL for demo)
  return {
    audioUrl: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=",
  };
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
