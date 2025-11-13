# Budgie - Travel Budget Calculator

A retro-styled travel budget calculator with a vintage gameboy aesthetic. Built with vanilla HTML, CSS, and JavaScript.

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
Simply open `index.html` in your browser. No build process or server required!

### GitHub Pages Deployment
1. Create a new GitHub repository
2. Upload these three files:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Go to Settings → Pages
4. Select `main` branch and `/ (root)` folder
5. Your site will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/`

## ✨ Features

- **Real-time Budget Calculation** - Instant updates as you type
- **80+ Popular Destinations** - Auto-categorized by cost tier
- **20 Currency Support** - Convert to INR, USD, EUR, and more
- **Seasonal Pricing** - Adjusts estimates based on travel dates
- **Retro Display** - Dithered LCD effect with scanlines
- **Keyboard Navigation** - Full accessibility with shortcuts
- **Receipt Export** - Save estimates as JPG images
- **3D Button Effects** - Tactile gameboy-inspired design

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

- **No tracking** - No analytics or cookies
- **No backend** - Everything runs in your browser
- **No data collection** - Your trip info stays local
- **No API calls** - All calculations are client-side

## 📦 File Sizes

- `index.html`: ~5 KB
- `styles.css`: ~15 KB
- `script.js`: ~20 KB
- **Total**: ~40 KB (tiny!)

## 🤝 Contributing

Want to add features or improve Budgie?

1. Update costs with current market rates
2. Add more destinations to autocomplete
3. Improve seasonal pricing logic
4. Add new currency options
5. Enhance mobile UX

## 📄 License

Free to use and modify. Built with Claude AI.

## 🐦 About

Budgie helps travelers estimate trip costs before booking. Named after the budgerigar (budgie bird), known for being economical and efficient travelers themselves!

---

**Coded with** ![Claude AI](https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg)
