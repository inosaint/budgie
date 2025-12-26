# Budgie - AI-Powered Travel Planner

A retro-styled travel budget calculator with AI-powered itinerary generation. Built with vanilla HTML, CSS, JavaScript, and Claude API.

## 📁 Project Structure

```
budgie-calculator/
├── index.html          # Main HTML file (clean and readable)
├── styles.css          # All styling (external file)
├── script.js           # All JavaScript logic (external file)
└── README.md           # This file
```

## 🚀 Quick Start

### Local Development

**Option 1: Direct File (No Setup Required)**
Simply open `index.html` in your browser. No build process or server required!

**Option 2: Development Server (Recommended)**
```bash
npm start
```
This will start a local server at `http://localhost:3000` with live reloading.

### Deployment Options

**Option 1: Netlify with Claude API (Recommended)**

For full AI itinerary generation:
1. Push code to GitHub
2. Connect to Netlify (free account)
3. Add environment variable `budgie` with your Claude API key
4. Deploy with your custom domain

**Option 2: GitHub Pages (Calculator Only)**

For budget calculator without AI itineraries:
1. Create a new GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select `main` branch and `/ (root)` folder
5. Your site will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/`

Note: GitHub Pages doesn't support serverless functions, so AI itinerary generation won't work. The itinerary page will show sample data instead.

## ✨ Features

### Budget Calculator
- **Real-time Budget Calculation** - Instant updates as you type
- **80+ Popular Destinations** - Auto-categorized by cost tier
- **20 Currency Support** - Convert to INR, USD, EUR, and more
- **Seasonal Pricing** - Adjusts estimates based on travel dates
- **Retro Display** - Dithered LCD effect with scanlines
- **Keyboard Navigation** - Full accessibility with shortcuts
- **Receipt Export** - Save estimates as JPG images
- **3D Button Effects** - Tactile gameboy-inspired design

### AI Itinerary Generator (NEW!)
- **Claude-Powered Planning** - AI generates personalized day-by-day itineraries
- **Budget-Aware Recommendations** - Suggestions tailored to your budget tier
- **Dot Matrix Printer Design** - Authentic tractor-feed paper aesthetic
- **Interactive Day Cards** - Click to modify or regenerate individual days
- **PDF Export** - Save itineraries for offline access
- **Retro Sound Effects** - Dot matrix printer sounds (Web Audio API)
- **Smart Activity Selection** - Optimized for duration and traveler count

## ⌨️ Keyboard Shortcuts

- **Tab** - Navigate between fields
- **Alt + S** - Save receipt
- **Alt + C** - Clear form
- **Alt + A** - Toggle advanced options
- **Escape** - Close receipt overlay
- **Arrow Keys** - Navigate autocomplete suggestions
- **Enter** - Select autocomplete suggestion

## 🎨 Design Philosophy

Budgie embraces a retro computing aesthetic:
- **Monospace typography** throughout
- **Paper texture background** for warmth
- **3D beveled buttons** like classic hardware
- **LCD-style display** with authentic dither effects
- **Sticker logo** for that DIY maker vibe

## 🔧 Customization

### Update Cost Data
Edit the constants in `script.js`:
- `exchangeRates` - Currency conversion rates
- `flightCosts` - Average flight prices by distance
- `accommodationCosts` - Nightly rates by tier
- `mealCosts` - Daily food budgets
- `activityCosts` - Daily entertainment costs

### Add New Destinations
Add to the `destinations` object in `script.js`:
```javascript
'Your City': 'budget', // or 'moderate', 'expensive', 'luxury'
```

### Modify Colors
Main colors in `styles.css`:
- Green display: `#00ff88`
- Background: `#f5f5f5`
- Calculator body: `#3a3a3a`

## 📊 Cost Estimates

All costs are in USD and converted to selected currency:

### Flight Costs
- Domestic: $250
- Short-haul (<3hrs): $400
- Medium-haul (3-7hrs): $700
- Long-haul (7+ hrs): $1200

### Seasonal Adjustments
- **Peak Season** (Jun-Aug, Dec): +30%
- **Shoulder Season** (Apr-May, Sep-Oct): +10%
- **Off Season** (Jan-Mar, Nov): -10%

### Accommodation (per night)
Varies by destination tier and style (Budget/Moderate/Comfort/Luxury)

## 🌐 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 📝 Dependencies

### External CDNs
- **Material Icons** - Google Fonts (for icons)
- **html2canvas** - Cloudflare CDN (for receipt export)

Both are free and load from reliable CDNs.

## 🔒 Privacy

### Budget Calculator
- **No tracking** - No analytics or cookies
- **No data collection** - Your trip info stays local
- **Client-side calculations** - All budget math runs in your browser

### AI Itinerary Generator (When Deployed)
- **API calls via Netlify** - Itinerary requests go to Claude API
- **No data storage** - Itineraries aren't saved on servers
- **localStorage only** - Trip data stored locally in your browser
- **Secure transmission** - HTTPS encryption for API calls

Note: When running locally (opening HTML files directly), no API calls are made - it uses sample data.

## 📦 File Sizes

- `index.html`: ~5 KB
- `styles.css`: ~15 KB
- `script.js`: ~20 KB
- **Total**: ~40 KB (tiny!)


## 📄 License

Free to use and modify. Built with Claude AI.

## 🐦 About

Budgie helps travelers estimate trip costs before booking. Named after the budgerigar (budgie bird), known for being economical and efficient travelers themselves!

---

