// Mock Authentication Service for PromoGPT Demo/Presentation
// All credentials and flows work without external dependencies

import { mockBusinessProfile, mockSalesData, mockCustomers, mockInsights } from "./mockData";

export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: "Business Owner" | "Admin";
  business: typeof mockBusinessProfile;
}

// Pre-seeded demo accounts for presentation
const MOCK_USERS: Record<string, { password: string; user: MockUser }> = {
  "demo@sunrise.test": {
    password: "DemoPass123!",
    user: {
      id: "demo-user-1",
      email: "demo@sunrise.test",
      name: "Demo User",
      role: "Business Owner",
      business: mockBusinessProfile,
    },
  },
  "owner@sunrise.test": {
    password: "OwnerPass123!",
    user: {
      id: "owner-user-2",
      email: "owner@sunrise.test",
      name: "Sarah Kimani",
      role: "Business Owner",
      business: mockBusinessProfile,
    },
  },
  "agency@sunrise.test": {
    password: "AgencyPass123!",
    user: {
      id: "admin-user-3",
      email: "agency@sunrise.test",
      name: "Marketing Agency",
      role: "Admin",
      business: mockBusinessProfile,
    },
  },
};

export const mockAuthService = {
  // Password login
  login: async (email: string, password: string): Promise<{ success: boolean; user?: MockUser; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    
    const userRecord = MOCK_USERS[email.toLowerCase()];
    
    if (!userRecord) {
      return { success: false, error: "No account found with this email" };
    }
    
    if (userRecord.password !== password) {
      return { success: false, error: "Incorrect password" };
    }
    
    // Store session
    localStorage.setItem("promogpt_session", JSON.stringify({
      token: `demo-token-${Date.now()}`,
      user: userRecord.user,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    }));
    
    return { success: true, user: userRecord.user };
  },

  // Demo auto-login
  demoLogin: async (): Promise<{ success: boolean; user?: MockUser }> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const demoUser = MOCK_USERS["demo@sunrise.test"].user;
    
    localStorage.setItem("promogpt_session", JSON.stringify({
      token: `demo-token-${Date.now()}`,
      user: demoUser,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000),
      isDemo: true,
    }));
    
    return { success: true, user: demoUser };
  },

  // Magic link (mock)
  requestMagicLink: async (email: string): Promise<{ success: boolean; demoLink?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Generate demo magic link token
    const token = btoa(`magic-${email}-${Date.now()}`);
    return { 
      success: true, 
      demoLink: `/auth?magic-token=${token}&email=${encodeURIComponent(email)}` 
    };
  },

  // Verify magic link token
  verifyMagicLink: async (token: string, email: string): Promise<{ success: boolean; user?: MockUser; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // For demo, any valid-looking token works
    if (!token || token.length < 10) {
      return { success: false, error: "Invalid magic link" };
    }
    
    // Create or get user for this email
    let user = MOCK_USERS[email]?.user;
    
    if (!user) {
      // Create new demo user for any email
      user = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: "Business Owner",
        business: mockBusinessProfile,
      };
    }
    
    localStorage.setItem("promogpt_session", JSON.stringify({
      token: `demo-token-${Date.now()}`,
      user,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000),
    }));
    
    return { success: true, user };
  },

  // Google OAuth (mock)
  googleLogin: async (): Promise<{ success: boolean; user?: MockUser }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const googleUser: MockUser = {
      id: "google-user-4",
      email: "google_user@sunrise.test",
      name: "Google Demo User",
      role: "Business Owner",
      business: mockBusinessProfile,
    };
    
    localStorage.setItem("promogpt_session", JSON.stringify({
      token: `demo-token-${Date.now()}`,
      user: googleUser,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000),
      provider: "google",
    }));
    
    return { success: true, user: googleUser };
  },

  // Guest mode (read-only)
  guestLogin: async (): Promise<{ success: boolean; user?: MockUser }> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const guestUser: MockUser = {
      id: "guest-user-5",
      email: "guest@demo.test",
      name: "Guest User",
      role: "Business Owner",
      business: mockBusinessProfile,
    };
    
    localStorage.setItem("promogpt_session", JSON.stringify({
      token: `demo-token-${Date.now()}`,
      user: guestUser,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000),
      isReadOnly: true,
    }));
    
    return { success: true, user: guestUser };
  },

  // Get current session
  getSession: (): { user: MockUser; isDemo?: boolean; isReadOnly?: boolean } | null => {
    const sessionStr = localStorage.getItem("promogpt_session");
    if (!sessionStr) return null;
    
    try {
      const session = JSON.parse(sessionStr);
      if (session.expiresAt < Date.now()) {
        localStorage.removeItem("promogpt_session");
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("promogpt_session");
  },

  // Get mock credentials (for display)
  getMockCredentials: () => [
    { email: "demo@sunrise.test", password: "DemoPass123!", role: "Business Owner" },
    { email: "owner@sunrise.test", password: "OwnerPass123!", role: "Business Owner" },
    { email: "agency@sunrise.test", password: "AgencyPass123!", role: "Admin" },
  ],
};
