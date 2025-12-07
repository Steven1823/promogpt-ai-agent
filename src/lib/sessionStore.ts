// Session Store for PromoGPT - manages user session data, CSV uploads, and usage limits

import { mockBusinessProfile, mockSalesData } from "./mockData";

const SESSION_KEY = "promo_demo_session";

export interface SalesRow {
  date: string;
  product: string;
  units: number;
  revenue: number;
  region: string;
  customer_email?: string;
  [key: string]: string | number | undefined;
}

export interface ContentItem {
  id: string;
  type: "instagramCaption" | "adScript" | "emailPromo" | "tiktokScript" | "blogPost";
  text: string;
  createdAt: number;
  audioUrl?: string;
}

export interface Conversation {
  id: string;
  question: string;
  answer: string;
  language: string;
  timestamp: number;
}

export interface SessionData {
  sessionId: string;
  businessProfile: typeof mockBusinessProfile;
  currentData: SalesRow[];
  isUsingDemoData: boolean;
  lastUploadFilename: string | null;
  conversations: Conversation[];
  contentLibrary: ContentItem[];
  usageCounters: {
    aiQueries: number;
    contentGenerations: number;
    dataUploads: number;
  };
  limits: {
    maxAiQueries: number;
    maxContentGenerations: number;
  };
  latestInsight: string | null;
  generatedContent: ContentItem[];
  createdAt: number;
}

// Convert mock data to proper format
const convertMockSalesData = (): SalesRow[] => {
  return mockSalesData.map((row) => ({
    date: row.date,
    product: row.product,
    units: row.units,
    revenue: row.revenue,
    region: row.region,
    customer_email: "demo@example.com",
  }));
};

// Create default session
const createDefaultSession = (): SessionData => ({
  sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  businessProfile: mockBusinessProfile,
  currentData: convertMockSalesData(),
  isUsingDemoData: true,
  lastUploadFilename: null,
  conversations: [],
  contentLibrary: [],
  usageCounters: {
    aiQueries: 0,
    contentGenerations: 0,
    dataUploads: 0,
  },
  limits: {
    maxAiQueries: 10,
    maxContentGenerations: 2,
  },
  latestInsight: null,
  generatedContent: [],
  createdAt: Date.now(),
});

// Get session from localStorage
export const getSession = (): SessionData => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      const session = JSON.parse(stored) as SessionData;
      // Ensure all required fields exist
      return {
        ...createDefaultSession(),
        ...session,
        usageCounters: {
          ...createDefaultSession().usageCounters,
          ...session.usageCounters,
        },
        limits: {
          ...createDefaultSession().limits,
          ...session.limits,
        },
      };
    }
  } catch (error) {
    console.error("Error loading session:", error);
  }
  return createDefaultSession();
};

// Save session to localStorage
export const saveSession = (session: SessionData): void => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

// Update session with partial data
export const updateSession = (updates: Partial<SessionData>): SessionData => {
  const session = getSession();
  const updated = { ...session, ...updates };
  saveSession(updated);
  return updated;
};

// Reset to demo data
export const resetToDemo = (): SessionData => {
  const session = createDefaultSession();
  saveSession(session);
  return session;
};

// Add conversation
export const addConversation = (
  question: string,
  answer: string,
  language: string = "english"
): SessionData => {
  const session = getSession();
  const conversation: Conversation = {
    id: `conv-${Date.now()}`,
    question,
    answer,
    language,
    timestamp: Date.now(),
  };
  session.conversations.push(conversation);
  session.usageCounters.aiQueries += 1;
  saveSession(session);
  return session;
};

// Add content to library
export const addToLibrary = (item: Omit<ContentItem, "id" | "createdAt">): ContentItem => {
  const session = getSession();
  const newItem: ContentItem = {
    ...item,
    id: `lib-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: Date.now(),
  };
  session.contentLibrary.push(newItem);
  saveSession(session);
  return newItem;
};

// Check if within usage limits
export const checkUsageLimit = (type: "aiQueries" | "contentGenerations"): boolean => {
  const session = getSession();
  if (type === "aiQueries") {
    return session.usageCounters.aiQueries < session.limits.maxAiQueries;
  }
  return session.usageCounters.contentGenerations < session.limits.maxContentGenerations;
};

// Increment usage counter
export const incrementUsage = (type: "aiQueries" | "contentGenerations"): void => {
  const session = getSession();
  session.usageCounters[type] += 1;
  saveSession(session);
};

// Upload CSV data
export const uploadCSVData = (rows: SalesRow[], filename: string): SessionData => {
  const session = getSession();
  session.currentData = rows;
  session.isUsingDemoData = false;
  session.lastUploadFilename = filename;
  session.usageCounters.dataUploads += 1;
  saveSession(session);
  return session;
};

// Update generated content
export const updateGeneratedContent = (content: ContentItem[]): void => {
  const session = getSession();
  session.generatedContent = content;
  saveSession(session);
};

// Update latest insight
export const updateLatestInsight = (insight: string): void => {
  const session = getSession();
  session.latestInsight = insight;
  saveSession(session);
};

// CSV Parsing utilities
export const REQUIRED_COLUMNS = ["date", "product", "units", "revenue", "region", "customer_email"];

export const parseCSV = (
  csvText: string
): { success: true; rows: SalesRow[]; headers: string[] } | { success: false; error: string; missingColumns: string[] } => {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) {
    return { success: false, error: "CSV must contain headers and at least one data row", missingColumns: [] };
  }

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  
  // Check for required columns
  const missingColumns = REQUIRED_COLUMNS.filter((col) => !headers.includes(col));
  if (missingColumns.length > 0) {
    return {
      success: false,
      error: `Missing required columns: ${missingColumns.join(", ")}`,
      missingColumns,
    };
  }

  const rows: SalesRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    if (values.length !== headers.length) continue;

    const row: SalesRow = {
      date: "",
      product: "",
      units: 0,
      revenue: 0,
      region: "",
    };

    headers.forEach((header, index) => {
      const value = values[index];
      if (header === "units" || header === "revenue") {
        row[header] = parseFloat(value) || 0;
      } else {
        row[header] = value;
      }
    });

    rows.push(row);
  }

  return { success: true, rows, headers };
};

// Check if guest mode
export const isGuestMode = (): boolean => {
  const authSession = localStorage.getItem("promogpt_session");
  if (!authSession) return true;
  try {
    const parsed = JSON.parse(authSession);
    return parsed.isReadOnly === true;
  } catch {
    return true;
  }
};
