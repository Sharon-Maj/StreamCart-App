# System Architecture for StreamCart

**StreamCart** is a mobile-first live commerce platform that **remixes existing social live video APIs** (Instagram Graph API, TikTok Shop Open API) to let small businesses **tag and sell products in real-time during live streams** — no new tech, no complex setup. Just point your phone, go live, and turn viewers into buyers.

This document is the **developer briefing** — everything a dev needs to clone, build, and ship the MVP in **under 48 hours**.

---

## Core Philosophy (Stage 3a DNA)

> **“No new invention. Just value discovered.”**  
> Like SwiftSnap revealed the hidden screenshot shortcut, **StreamCart reveals the hidden sales engine in every live stream.**

- **Already exists**: Instagram Live Shopping (2020), TikTok Shop Live (2022)  
- **Underutilized**: 80% of small businesses ignore live tagging  
- **No one knows**: It can be a **standalone sales app**, not just a creator perk

---

## Tech Stack (No-Code to Full-Code Path)

| Layer | Technology | Why |
|------|------------|-----|
| **Frontend** | **React Native** (Expo) | Cross-platform (iOS/Android), native camera access, real-time overlays |
| **Backend** | **Node.js + Express** (Vercel) | Serverless, free tier, handles Stripe + inventory sync |
| **Database** | **Google Sheets** (MVP) → **Firebase Firestore** | No-code catalog sync; real-time for analytics |
| **APIs** | Instagram Graph API, TikTok Shop Open API, Stripe | All free/public with OAuth |
| **No-Code Proto** | **Adalo** | Clickable MVP in 1 day (already built) |

---

## Component Communication (Data Flow)

```mermaid
graph TD
    A[User Opens App] --> B[Upload Inventory CSV / Shopify Link]
    B --> C[Backend: /sync-inventory → Zapier → Google Sheets]
    C --> D[Frontend: Load Tags into Memory]

    D --> E[Hit "Go Live"]
    E --> F[React Native Camera Stream]
    F --> G[Overlay Draggable Tags (AR via Gesture Handler)]
    G --> H[Voice Input → Speech-to-Text → Auto-Tag]

    H --> I[Viewer Taps Tag]
    I --> J[Frontend → Backend: /create-checkout]
    J --> K[Stripe Checkout Session]
    K --> L[Success → Zapier → Email Recap + Upsell]

    L --> M[Firestore: Log Sale + Analytics]
    M --> N[Dashboard: Views → Carts → Revenue]
