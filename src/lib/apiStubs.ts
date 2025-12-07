// API Stubs - Client-side implementations matching production API contracts
// These stubs can be swapped with real endpoints later

import {
  getSession,
  SalesRow,
  ContentItem,
  uploadCSVData,
  updateLatestInsight,
  updateGeneratedContent,
  addConversation,
  incrementUsage,
} from "./sessionStore";
import { mockBusinessProfile } from "./mockData";

// Simulated network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// GET /api/demo/mock-dashboard
// ============================================
export interface MockDashboardResponse {
  dashboard: {
    businessProfile: typeof mockBusinessProfile;
    home: {
      summary: string;
      kpis: { revenue: number; orders: number; avgOrderValue: number; repeatRate: number };
      quickActions: string[];
    };
    dataHub: {
      sampleCSVPreview: SalesRow[];
      connections: string[];
      lastUpload: string | null;
    };
    intelligence: {
      insightsText: string;
      topProducts: Array<{ name: string; units: number; revenue: number }>;
      forecast30d: { expectedGrowthPercent: number };
      askExamples: string[];
    };
    content: {
      generatedSamples: ContentItem[];
      library: ContentItem[];
    };
    automation: {
      scheduledPosts: any[];
      workflows: any[];
    };
    adGenerator: {
      lastAd: any;
    };
    settings: {
      languages: string[];
      defaultLanguage: string;
    };
  };
}

export const getMockDashboard = async (): Promise<MockDashboardResponse> => {
  await delay(300);
  const session = getSession();
  const analysis = analyzeData(session.currentData);

  return {
    dashboard: {
      businessProfile: session.businessProfile,
      home: {
        summary: session.isUsingDemoData
          ? "Upload a CSV to get instant insights and content suggestions."
          : `Analyzing ${session.currentData.length} records from ${session.lastUploadFilename}`,
        kpis: {
          revenue: analysis.totalRevenue,
          orders: session.currentData.length,
          avgOrderValue: analysis.averageOrderValue,
          repeatRate: 26,
        },
        quickActions: ["Upload CSV", "Ask PromoGPT", "Generate Content"],
      },
      dataHub: {
        sampleCSVPreview: session.currentData.slice(0, 10),
        connections: session.isUsingDemoData ? ["Demo CSV"] : ["Uploaded CSV"],
        lastUpload: session.lastUploadFilename,
      },
      intelligence: {
        insightsText: session.latestInsight || "",
        topProducts: analysis.topProducts,
        forecast30d: { expectedGrowthPercent: 8 },
        askExamples: [
          "Which product performed best last month?",
          "Why did sales drop last week?",
          "What should I promote next?",
        ],
      },
      content: {
        generatedSamples: session.generatedContent,
        library: session.contentLibrary,
      },
      automation: {
        scheduledPosts: [],
        workflows: [],
      },
      adGenerator: {
        lastAd: {},
      },
      settings: {
        languages: ["english", "swahili", "kikuyu"],
        defaultLanguage: "english",
      },
    },
  };
};

// ============================================
// POST /api/ingest/csv
// ============================================
export interface IngestCSVRequest {
  rows: SalesRow[];
  filename: string;
}

export interface IngestCSVResponse {
  ok: boolean;
  parsedRowsCount: number;
  sampleRows: SalesRow[];
}

export const ingestCSV = async (request: IngestCSVRequest): Promise<IngestCSVResponse> => {
  await delay(500);
  uploadCSVData(request.rows, request.filename);
  return {
    ok: true,
    parsedRowsCount: request.rows.length,
    sampleRows: request.rows.slice(0, 10),
  };
};

// ============================================
// POST /api/ai/generate
// ============================================
export type AIAction =
  | "regenerate_insights"
  | "generate_content_samples"
  | "ad_script"
  | "ask_question";

export interface AIGenerateRequest {
  action: AIAction;
  dataPreview?: SalesRow[];
  dataSummary?: any;
  prompt?: string;
  language?: string;
  context?: {
    dashboard?: string;
    businessProfile?: typeof mockBusinessProfile;
    userSessionData?: any;
  };
}

export interface AIGenerateResponse {
  text: string;
  insights?: {
    topProducts: Array<{ name: string; units: number; revenue: number }>;
    topRegions: string[];
    forecast30d: { expectedGrowthPercent: number };
  };
  contentSamples?: ContentItem[];
  actions?: Array<{ type: string; payload: any }>;
  memoryUpdates?: any;
}

// Analyze data helper
const analyzeData = (data: SalesRow[]) => {
  const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
  const totalUnits = data.reduce((sum, row) => sum + row.units, 0);

  // Group by product
  const productSales: Record<string, { units: number; revenue: number }> = {};
  data.forEach((row) => {
    if (!productSales[row.product]) {
      productSales[row.product] = { units: 0, revenue: 0 };
    }
    productSales[row.product].units += row.units;
    productSales[row.product].revenue += row.revenue;
  });

  const topProducts = Object.entries(productSales)
    .sort(([, a], [, b]) => b.revenue - a.revenue)
    .slice(0, 5)
    .map(([name, stats]) => ({ name, ...stats }));

  // Group by region
  const regionSales: Record<string, number> = {};
  data.forEach((row) => {
    regionSales[row.region] = (regionSales[row.region] || 0) + row.revenue;
  });

  const topRegions = Object.entries(regionSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([name]) => name);

  return {
    totalRevenue,
    totalUnits,
    topProducts,
    topRegions,
    averageOrderValue: data.length > 0 ? Math.round(totalRevenue / data.length) : 0,
  };
};

export const aiGenerate = async (request: AIGenerateRequest): Promise<AIGenerateResponse> => {
  await delay(600); // Simulate AI processing
  const session = getSession();
  const analysis = analyzeData(session.currentData);

  switch (request.action) {
    case "regenerate_insights": {
      const topProduct = analysis.topProducts[0];
      const topRegion = analysis.topRegions[0];
      const insight = topProduct
        ? `📊 **Key Insight**: ${topProduct.name} is your top performer with ${topProduct.units} units sold (KES ${topProduct.revenue.toLocaleString()}). ${topRegion} leads regional sales. Expected growth: +8% over next 30 days. Consider running a flash sale on your top 3 products to capitalize on momentum.`
        : "Upload sales data to generate AI-powered insights.";

      updateLatestInsight(insight);

      return {
        text: insight,
        insights: {
          topProducts: analysis.topProducts,
          topRegions: analysis.topRegions,
          forecast30d: { expectedGrowthPercent: 8 },
        },
      };
    }

    case "generate_content_samples": {
      incrementUsage("contentGenerations");
      const topProduct = analysis.topProducts[0]?.name || "Baby Products";
      const businessName = session.businessProfile.businessName;

      const samples: ContentItem[] = [
        {
          id: `cap-${Date.now()}-1`,
          type: "instagramCaption",
          text: `🌟 Moms trust ${businessName} for quality ${topProduct}! Soft, safe, and perfect for your little one. Shop now and feel the difference! 💕 #BabyEssentials #MomLife #${businessName.replace(/\s+/g, "")}`,
          createdAt: Date.now(),
        },
        {
          id: `ad-${Date.now()}-2`,
          type: "adScript",
          text: `[0-5s] Open on happy baby with mom\n[5-15s] "Looking for the best ${topProduct}? ${businessName} has you covered."\n[15-25s] Show products with features\n[25-30s] "Shop today and give your baby the best. ${businessName} - Where comfort meets care."`,
          createdAt: Date.now(),
        },
        {
          id: `email-${Date.now()}-3`,
          type: "emailPromo",
          text: `Hi there! 👋 Our best-selling ${topProduct} is back in stock! Get 15% off this week only. Your baby deserves the best—shop ${businessName} today! 💝`,
          createdAt: Date.now(),
        },
      ];

      updateGeneratedContent(samples);

      return {
        text: "Generated 3 content samples based on your data.",
        contentSamples: samples,
      };
    }

    case "ad_script": {
      const topProduct = analysis.topProducts[0]?.name || "Baby Products";
      const script = `[INTRO - 0-5s]\n"Every mom wants the best for her baby..."\n\n[PROBLEM - 5-10s]\n"Finding quality ${topProduct} shouldn't be hard."\n\n[SOLUTION - 10-20s]\n"${session.businessProfile.businessName} brings you premium ${topProduct}—trusted by thousands of moms across Kenya."\n\n[CTA - 20-30s]\n"Visit us today and experience the difference. ${session.businessProfile.businessName}—comfort your baby deserves."`;

      return {
        text: script,
        actions: [{ type: "generate_video", payload: { script } }],
      };
    }

    case "ask_question": {
      const prompt = request.prompt?.toLowerCase() || "";
      let answer = "";

      if (prompt.includes("sales") || prompt.includes("revenue") || prompt.includes("performance")) {
        answer = `Your total revenue is KES ${analysis.totalRevenue.toLocaleString()} from ${analysis.totalUnits} units. ${analysis.topProducts[0]?.name || "Your top product"} leads with ${analysis.topProducts[0]?.units || 0} units sold. Sales are trending positively.`;
      } else if (prompt.includes("product") || prompt.includes("top") || prompt.includes("best")) {
        const top = analysis.topProducts[0];
        answer = top
          ? `${top.name} is your best seller with ${top.units} units (KES ${top.revenue.toLocaleString()}). Consider running a promotion to maintain momentum.`
          : "Upload data to see your top products.";
      } else if (prompt.includes("region") || prompt.includes("where") || prompt.includes("location")) {
        answer = `Your strongest regions are: ${analysis.topRegions.join(", ")}. ${analysis.topRegions[0] || "Your top region"} leads in sales volume.`;
      } else if (prompt.includes("recommend") || prompt.includes("suggest") || prompt.includes("what should")) {
        answer = `Based on your data:\n1. Push ${analysis.topProducts[0]?.name || "your top product"} with a flash sale\n2. Focus marketing on ${analysis.topRegions[0] || "your top region"}\n3. Create content highlighting customer favorites`;
      } else {
        answer = `Your ${session.businessProfile.businessName} has ${session.currentData.length} sales records. Revenue: KES ${analysis.totalRevenue.toLocaleString()}. Top product: ${analysis.topProducts[0]?.name || "N/A"}. What specific insight would you like?`;
      }

      addConversation(request.prompt || "", answer, request.language || "english");

      return {
        text: answer,
        insights: {
          topProducts: analysis.topProducts,
          topRegions: analysis.topRegions,
          forecast30d: { expectedGrowthPercent: 8 },
        },
      };
    }

    default:
      return { text: "Unknown action" };
  }
};

// ============================================
// POST /api/ai/tts
// ============================================
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
    const { supabase } = await import("@/integrations/supabase/client");

    const { data, error } = await supabase.functions.invoke("text-to-speech", {
      body: {
        text: request.text,
        voiceId: request.voiceId,
        language: request.language,
      },
    });

    if (error) throw error;
    if (data.error) throw new Error(data.error);

    // Convert base64 audio to blob URL
    const binaryString = atob(data.audioBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const audioBlob = new Blob([bytes], { type: data.contentType || "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);

    return { audioUrl };
  } catch (error) {
    console.error("TTS Error:", error);
    // Fallback to mock audio
    return { audioUrl: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" };
  }
};
