# PromoGPT - AI Marketing Intelligence Platform

Transform your business data into marketing magic with AI-powered insights, content generation, and campaign automation for SMEs.

## 🚀 Quick Start for Presentation

### Option 1: Instant Demo (Recommended)
Click **"Try Demo Now"** on the landing page for instant access with pre-loaded Sunrise Baby Store data.

### Option 2: Manual Login
Use these demo credentials:

```
Email: demo@sunrise.test
Password: DemoPass123!

Email: owner@sunrise.test
Password: OwnerPass123!

Email: agency@sunrise.test
Password: AgencyPass123!
```

### Option 3: Passwordless Magic Link
1. Go to /auth
2. Click "Passwordless" tab
3. Enter any email
4. Click "Send Magic Link"
5. Click the link shown in the modal

### Option 4: Social Login (Mock)
Click "Sign in with Google" for instant mocked OAuth login.

### Option 5: Guest Mode
Click "View Demo (Read-only)" for a read-only preview.

## ⌨️ Keyboard Shortcuts

- **Ctrl+D** - Auto-login as demo user (works on /auth page)

## 🎯 Demo Tools (Presentation Helper)

When logged in, look for the **"Demo Tools"** button in the top-right corner:
- Auto Login Demo
- Load Mock Data
- Clear Session
- Show Magic Link Info

## 📊 Mock Data Package

### Business Profile
- **Business Name:** Sunrise Baby Store
- **Industry:** Baby Products
- **Brand Voice:** Friendly, educational, warm
- **Target Audience:** New mothers aged 25-40

### Sample CSV Data
Upload this CSV in the "Upload Data" dashboard:

```csv
date,product,units,revenue,region,customer_email
2024-01-01,Baby Diapers,34,10200,Nairobi,grace@mail.com
2024-01-02,Baby Oil,26,7800,Kisumu,kevin@mail.com
2024-01-03,Baby Wipes,49,14700,Mombasa,mercy@mail.com
2024-01-04,Baby Shampoo,15,4500,Nairobi,grace@mail.com
2024-01-05,Baby Diapers,55,16500,Kisumu,kevin@mail.com
```

### Mock Customers
```json
[
  {"name":"Grace Otieno","email":"grace@mail.com","phone":"0712345678","totalSpent":5400,"visits":3},
  {"name":"Kevin Wanjiru","email":"kevin@mail.com","phone":"0798765432","totalSpent":12900,"visits":5},
  {"name":"Mercy Nduta","email":"mercy@mail.com","phone":"0789001122","totalSpent":2400,"visits":1}
]
```

## ✅ Presentation Checklist

Before presenting to judges:

- [ ] Landing page loads with "Try Demo Now" button prominent
- [ ] Click "Try Demo Now" → Dashboard loads with Sunrise Baby Store data
- [ ] Test login with demo@sunrise.test credentials
- [ ] Test "Send Magic Link" → Modal shows clickable link
- [ ] Test "Sign in with Google" → Instant mocked login
- [ ] Verify all dashboard sections have data
- [ ] Test "Generate Content" button → Shows mock content
- [ ] Test "Create Campaign" → Shows campaign calendar
- [ ] Test "Publish" buttons → Shows success toasts
- [ ] Logout and verify redirect to landing page

## 🔒 Security Note for Judges

**For Presentation:** This demo uses in-memory mock accounts and a mock magic-link flow to ensure reliability during the presentation. No external dependencies or network calls are required.

**For Production:** We will implement:
- Secure OAuth 2.0 (Google, Facebook, etc.)
- Transactional email service (SendGrid, Mailgun, Resend) for magic links
- Proper password hashing with bcrypt/argon2
- Server-side session management
- Rate limiting and CSRF protection
- Secure token storage and refresh mechanisms

## 📱 Tech Stack

- **Frontend:** React + TypeScript + Vite
- **UI Framework:** Tailwind CSS + shadcn-ui
- **Charts:** Recharts
- **Routing:** React Router
- **State Management:** React hooks + localStorage (demo mode)

## 🌟 Features Demonstrated

1. **Business Intelligence Agent** - AI-powered insights from sales data
2. **Content Studio** - Generate social posts, ads, emails, blogs
3. **Campaign Builder** - Multi-channel campaign planning
4. **Publishing Center** - Schedule and publish to platforms
5. **Performance Analytics** - Track engagement and results
6. **Business Profile** - Brand customization and settings

## 📄 Project Links

- **Project URL:** https://lovable.dev/projects/d728d28d-7cba-4f3c-b623-c779e33d5446
- **Docs:** https://docs.lovable.dev/

## 🤝 Support

For questions or issues, contact the PromoGPT team or visit our documentation.

---

**Built with ❤️ using Lovable** - The AI-powered web app builder
