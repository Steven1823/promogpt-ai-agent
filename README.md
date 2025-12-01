# PromoGPT - AI Marketing Intelligence Platform

Transform your business data into marketing magic with AI-powered insights, content generation, and campaign automation built for African SMEs.

## 🚀 Overview

PromoGPT is an all-in-one AI marketing platform that combines business intelligence, content creation, and campaign automation. Upload your sales data, get instant insights, generate professional marketing content, and automate your campaigns—all powered by conversational AI.

**Core Value Proposition:** Giving African SMEs a superpower—the intelligence to grow, the content to scale, and the automation to compete globally.

## ✨ Key Features

### 🎤 Voice AI Assistant
- **Conversational Interface**: Ask questions about your business using your voice
- **Multilingual Support**: English, Swahili, and Kikuyu
- **Real-time Transcription**: Powered by OpenAI Whisper
- **Natural Voice Responses**: Powered by Eleven Labs TTS
- **Business Memory**: AI remembers your previous questions and context

### 📊 Business Intelligence
- **Data-Driven Insights**: Upload CSV sales data and get instant analysis
- **Smart Forecasting**: Revenue predictions and trend analysis
- **Product Performance**: Top sellers, stock alerts, pricing suggestions
- **Regional Analysis**: Geographic performance breakdowns

### 🎨 Content & Campaign Studio
- **AI Content Generation**: Social posts, ads, emails, blogs, video scripts
- **Visual Creator**: Branded posters, flyers, infographics
- **Carousel Maker**: Auto-generate Instagram carousels
- **Video Ads**: Script-to-video with AI voiceovers

### 🤖 Marketing Automation
- **Campaign Planning**: Full campaigns with timeline and budget
- **Workflow Automation**: If-then marketing rules
- **Multi-Platform Publishing**: Instagram, TikTok, Facebook scheduling
- **Performance Tracking**: Analytics and optimization

## 🎯 Access Options

### Option 1: Start Demo (Recommended)
- Click "Start Demo" on landing page
- Instant full access with all features
- Pre-loaded with Sunrise Baby Store mock data
- Perfect for exploring all capabilities

### Option 2: Continue as Guest
- Read-only access to all dashboards
- Quick preview without any commitment
- No data persistence

**Zero friction**: No passwords, no signup forms, no configuration needed.

## 📱 Core Dashboards

1. **Home/Overview** - Business summary and quick insights
2. **Data Hub** - Upload and manage business data (CSV)
3. **Intelligence** - AI-powered analytics and forecasting
4. **Content & Campaign** - Generate marketing content and campaigns
5. **Automation** - Build and manage workflow automations
6. **Ad Generator** - Create AI-powered video and voice ads
7. **Settings** - Business profile, brand voice, integrations

## 🛠️ Technology Stack

### Frontend
- **React 18** + TypeScript
- **Vite** for fast development
- **Tailwind CSS** + shadcn-ui components
- **Recharts** for data visualization
- **React Router** for navigation

### Backend (Lovable Cloud)
- **Supabase** for database and authentication
- **Edge Functions** for serverless logic
- **Real-time** data synchronization

### AI Integrations
- **OpenAI Whisper** - Speech-to-text transcription
- **Eleven Labs** - Text-to-speech voice generation
- **AI Models** - Content generation and analysis

## 🚀 Quick Start

### For Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd promogpt
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

4. **Configure API keys (for Voice AI)**
- `OPENAI_API_KEY` - For Whisper speech-to-text
- `ELEVENLABS_API_KEY` - For text-to-speech voice generation

5. **Run development server**
```bash
npm run dev
```

### For Demo/Presentation

1. Visit the deployed app
2. Click **"Start Demo"**
3. Explore all dashboards with pre-loaded data
4. Try voice commands with the floating microphone button
5. Generate content, create campaigns, test automation

## 🎨 Mock Business Profile

**Pre-loaded Demo Business: Sunrise Baby Store**
- **Industry**: Baby Products
- **Products**: Diapers, wipes, baby oils, shampoos
- **Regions**: Nairobi, Kisumu, Mombasa
- **Brand Colors**: Pink (#FFB6C1), Gold (#FFD700)
- **Brand Voice**: Friendly, educational, warm

All dashboards populate with realistic mock data based on this profile.

## 🎓 Demo Flow for Presentations

1. **Landing Page** → Click "Start Demo"
2. **Home** → Show business overview and AI suggestions
3. **Intelligence** → Display sales charts and forecasts
4. **Voice AI** → Ask "What are my top products?" using voice
5. **Content Studio** → Generate social media posts
6. **Ad Generator** → Create video with AI voice
7. **Campaign** → Show full campaign plan with calendar
8. **Automation** → Demonstrate workflow triggers
9. **Data Hub** → Upload CSV (mock processing)

## 🌍 Target Market

**Primary Users:**
- African SMEs (44M+ businesses)
- Small retail shops and online sellers
- Restaurants and cafes
- Fashion and beauty brands
- Digital creators and influencers

**Key Problems Solved:**
1. Lack of business intelligence (70% track sales manually)
2. Inconsistent marketing strategy (guesswork vs data-driven)
3. Slow/expensive content creation (no design/video skills)
4. Time-consuming manual tasks (no automation)

## 💡 Key Differentiators

1. **All-in-One Platform** - Business intelligence + content + automation in one place
2. **Voice-First Interface** - Conversational AI in local languages
3. **Zero Technical Skills Required** - Built for non-technical SME owners
4. **African Market Focus** - Supports local languages and platforms
5. **Instant ROI** - See results in first session with demo mode

## 🔒 Security & Production

**Current Demo Mode:**
- In-memory sessions for instant access
- Mock data and API responses
- No external dependencies required
- Perfect for presentations and demos

**Production Considerations:**
- Secure authentication with Lovable Cloud
- Real-time data synchronization with Supabase
- API rate limiting and security policies
- Encrypted storage of API keys and secrets

## 📦 Project Structure

```
promogpt/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # shadcn-ui components
│   │   ├── VoiceAI.tsx  # Voice assistant component
│   │   └── ...
│   ├── pages/           # Main dashboard pages
│   ├── lib/             # Utilities and mock data
│   │   ├── mockData.ts  # Mock business data
│   │   ├── mockAuth.ts  # Demo authentication
│   │   └── mockApi.ts   # Mock API endpoints
│   ├── integrations/    # Supabase integration
│   └── hooks/           # Custom React hooks
├── supabase/
│   └── functions/       # Edge functions
│       └── speech-to-text/  # Whisper integration
└── public/              # Static assets
```

## 🔧 Configuration

### Voice AI Setup
The Voice AI requires two API keys configured as secrets:

1. **OpenAI API Key** - For Whisper speech-to-text
   - Get from: https://platform.openai.com/api-keys
   - Configure in project secrets as `OPENAI_API_KEY`

2. **Eleven Labs API Key** - For text-to-speech
   - Get from: https://elevenlabs.io/
   - Configure in project secrets as `ELEVENLABS_API_KEY`

### Supported Languages
- **English** - Full support
- **Swahili** - Voice input and text responses
- **Kikuyu** - Voice input mapped to English responses

## 📚 Documentation

- **Lovable Docs**: https://docs.lovable.dev/
- **Project URL**: https://lovable.dev/projects/d728d28d-7cba-4f3c-b623-c779e33d5446
- **Supabase Docs**: https://supabase.com/docs

## 🤝 Contributing

This is a demo/MVP project built with Lovable. For questions or contributions:
1. Review the existing codebase structure
2. Follow the established patterns (mock-first development)
3. Maintain the dark theme design system
4. Test with demo mode before production changes

## 📄 License

Built with ❤️ for African SMEs • Powered by AI • Zero Friction Access

## 🆘 Support

For issues or questions:
- Check the demo mode functionality first
- Review console logs for errors
- Verify API keys are configured correctly
- Test with mock data before connecting real data

---

**Built with Lovable** - AI-powered web app builder
