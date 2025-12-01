// Simplified Mock Authentication - Demo & Guest Only
import { mockBusinessProfile } from "./mockData";

export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: "Demo User" | "Guest";
  business: typeof mockBusinessProfile;
}

export const mockAuthService = {
  // Start Demo - Instant login with full access
  startDemo: async (): Promise<{ success: boolean; user: MockUser }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const demoUser: MockUser = {
      id: "demo-user-1",
      email: "demo@promogpt.ai",
      name: "Demo User",
      role: "Demo User",
      business: mockBusinessProfile,
    };
    
    localStorage.setItem("promogpt_session", JSON.stringify({
      token: `demo-token-${Date.now()}`,
      user: demoUser,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000),
      isDemo: true,
    }));
    
    return { success: true, user: demoUser };
  },

  // Guest mode - Read-only access
  continueAsGuest: async (): Promise<{ success: boolean; user: MockUser }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const guestUser: MockUser = {
      id: "guest-user-1",
      email: "guest@promogpt.ai",
      name: "Guest",
      role: "Guest",
      business: mockBusinessProfile,
    };
    
    localStorage.setItem("promogpt_session", JSON.stringify({
      token: `guest-token-${Date.now()}`,
      user: guestUser,
      expiresAt: Date.now() + (2 * 60 * 60 * 1000), // 2 hours for guests
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
};
