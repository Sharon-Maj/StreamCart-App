# System Architecture for StreamCart

StreamCart is a mobile app that unlocks live shopping APIs (Instagram Graph, TikTok Shop) for small businesses, enabling real-time product tagging during streams with seamless checkouts. This MVP design emphasizes no-code feasibility (e.g., Adalo proto) while scaling via free tiers—proving 10-min streams yield $45+ sales without custom dev.

## Tech Stack Overview
| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Frontend** | React Native | Cross-platform (iOS/Android) for camera/live overlays; integrates device AR (Vision API) for tag placement. Fast for real-time UI like draggable badges. |
| **Backend** | Node.js + Express (Vercel deploy) | Handles API calls for inventory sync and checkouts. Serverless for low-cost scaling (free <10K req/mo). |
| **Database** | Google Sheets (initial) or Firebase Firestore | Stores product catalogs (CSV sync); easy no-code for tags/prices, upgrades to real-time DB for analytics. |

## Component Communication
1. **Inventory Sync (Frontend to Backend)**:
   - User uploads CSV/Sheets link in app; frontend POSTs to backend `/sync-inventory` (JSON: {products: [{name: "Red Dress", price: 50, sizes: ["8"]}]}).
   - Backend uses Zapier webhook to pull from Shopify/Google Sheets, generates tags via simple rules (e.g., match voice keywords to items).

2. **Live Launch & Tagging (Frontend)**:
   - App launches camera stream (React Native Camera lib); overlays AR tags using Instagram Graph API for pinning (POST to `/media` endpoint with product IDs<grok-card data-id="6c5f3a" data-type="citation_card"></grok-card>).
   - Voice input (device speech-to-text) triggers auto-tag: e.g., "Size 8" → positions badge on screen.

3. **Sell Flow & Checkout (Frontend to Backend)**:
   - Viewer taps tag → streams intent to backend `/create-checkout` (integrates TikTok Shop API for embeds if cross-posted<grok-card data-id="69e180" data-type="citation_card"></grok-card>).
   - Backend generates Stripe session (JSON response with URL); post-purchase, Zapier emails recap.

4. **Analytics Dash (Backend to Frontend)**:
   - Backend aggregates via Firestore (views from stream API, sales from Stripe webhooks).
   - Frontend polls `/analytics` for charts (e.g., conversion rate).

5. **Data Flow Diagram** (Bonus Visual - ASCII; embed Adalo PNG in repo):
