# Local Development Guide

This guide shows you how to test the full Budgie app (including Claude API integration) on your local machine **without** deploying to Netlify.

## Why Test Locally?

- ✅ Test Claude API integration before merging PRs
- ✅ Faster iteration (no waiting for Netlify deploys)
- ✅ Debug serverless functions locally
- ✅ Work offline (once dependencies are installed)
- ✅ Save API costs during development

## Prerequisites

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **Claude API Key** - [Get one here](https://console.anthropic.com/)
3. **Netlify CLI** (will be installed automatically)

## Quick Start (First Time Setup)

### 1. Install Dependencies

```bash
npm install
```

This installs:
- `node-fetch` (required by the serverless function)
- `netlify-cli` (for running functions locally)

### 2. Set Up Environment Variables

Create a `.env` file in the project root (it's already created, just edit it):

```bash
# .env file
budgie=sk-ant-api03-xxxxx  # Replace with your actual Claude API key

# Optional: Specify Claude model version (defaults to claude-3-5-sonnet-20240620)
# CLAUDE_MODEL=claude-3-5-sonnet-20240620
```

**Important:**
- The variable name MUST be `budgie` (that's what the function expects)
- Get your API key from https://console.anthropic.com/
- This file is already in `.gitignore` so it won't be committed

### 3. Run the Development Server

```bash
npm run netlify
```

This starts:
- **Main site** at http://localhost:8888
- **Functions** at http://localhost:8888/.netlify/functions/generate-itinerary

### 4. Test the App

1. Open http://localhost:8888 in your browser
2. Fill out the budget calculator form
3. Click "Generate Itinerary"
4. The app will call your **local** serverless function
5. The function will call the Claude API with your `.env` key
6. You'll see a real AI-generated itinerary!

## How It Works

### Architecture

```
Browser
   ↓
   ↓ AJAX POST
   ↓
Local Netlify Dev Server (localhost:8888)
   ↓
   ↓ Runs function locally
   ↓
netlify/functions/generate-itinerary.js
   ↓
   ↓ API call with process.env.budgie
   ↓
Claude API (api.anthropic.com)
   ↓
   ↓ Returns itinerary
   ↓
Back to browser ✨
```

### What Netlify CLI Does

- Emulates the Netlify serverless environment locally
- Loads `.env` variables into `process.env`
- Runs functions at `/.netlify/functions/*` endpoints
- Serves static files from the publish directory
- Hot-reloads when you change files

## Common Commands

```bash
# Start development server (recommended)
npm run netlify

# Alternative: static files only (no functions)
npm start

# Install/update Netlify CLI globally
npm install -g netlify-cli

# Check Netlify CLI version
netlify --version
```

## Troubleshooting

### "budgie environment variable not set"

**Problem:** The function can't find your API key

**Solution:**
1. Check that `.env` exists in the project root
2. Check that it contains `budgie=sk-ant-...`
3. Restart the dev server (`Ctrl+C` then `npm run netlify`)
4. Make sure the variable name is `budgie` (not `CLAUDE_API_KEY`)

### "Function not found" or 404 errors

**Problem:** Netlify CLI isn't finding the functions

**Solution:**
1. Check `netlify.toml` has `functions = "netlify/functions"`
2. Verify the function file exists at `netlify/functions/generate-itinerary.js`
3. Restart the dev server

### CORS errors in browser console

**Problem:** Cross-origin request blocked

**Solution:**
- This shouldn't happen with Netlify CLI (it handles CORS)
- If it does, check that the function returns CORS headers (it already does)
- Try using `http://localhost:8888` instead of `127.0.0.1`

### API rate limits or quota errors

**Problem:** Claude API returns 429 or quota errors

**Solution:**
- Check your API key's rate limits at https://console.anthropic.com/
- Add delays between test requests
- Use the sample data fallback (comment out the API call temporarily)

## Testing Different Scenarios

### Test with Different Budget Tiers

Try these combinations:
- Bangkok, 7 days, Budget tier
- Paris, 5 days, Luxury tier
- Tokyo, 10 days, Moderate tier

### Test Error Handling

1. **Invalid API key:** Set `budgie=invalid` in `.env` and restart
2. **Missing fields:** Submit the form without selecting a destination
3. **Network errors:** Disconnect internet and try generating

### Monitor Function Logs

Netlify CLI shows function logs in the terminal:
```
◈ Local functions server listening on :9999
Request from ::1: POST /.netlify/functions/generate-itinerary
Response with status 200 in 3456 ms
```

## Changing Claude Models

The function uses **claude-3-5-sonnet-20240620** by default, but you can change it:

### Available Models

```bash
# In your .env file, add:

# Fast and cheap (recommended for testing)
CLAUDE_MODEL=claude-3-haiku-20240307

# Balanced (default)
CLAUDE_MODEL=claude-3-5-sonnet-20240620

# Most capable (higher cost)
CLAUDE_MODEL=claude-3-opus-20240229
```

### Why Change Models?

- **Testing**: Use Haiku to save API costs during development
- **Performance**: Use Opus for highest quality itineraries
- **Compatibility**: Use a model your API key has access to
- **Cost Control**: Haiku is ~50x cheaper than Opus per request

After changing the model in `.env`, restart `npm run netlify`.

## Comparing Local vs Production

| Feature | Local (`npm run netlify`) | Production (Netlify) |
|---------|---------------------------|----------------------|
| Environment variable | `.env` file | Netlify dashboard |
| Function URL | `localhost:8888/.netlify/functions/*` | `budgie.travel/.netlify/functions/*` |
| SSL/HTTPS | ❌ No (uses HTTP) | ✅ Yes (automatic) |
| Performance | Same | CDN-optimized |
| Cost | Free (your API key) | Free (your API key) |

## Environment Variables: Local vs Production

### Local Development
- Stored in `.env` file (not committed to git)
- Loaded automatically by Netlify CLI
- Easy to update (just edit the file)

### Production (Netlify)
- Stored in Netlify dashboard: **Site Settings** → **Environment Variables**
- Variable name: `budgie`
- Variable value: Your Claude API key
- Encrypted and secure

## Next Steps

Once you've tested locally and everything works:

1. **Create a PR** with your changes
2. **Netlify will create a deploy preview** (unique URL)
3. **Test on the preview URL** (uses production env vars from Netlify dashboard)
4. **Merge the PR** when ready
5. **Main site auto-deploys** to budgie.travel

## Pro Tips

### Faster Iteration
- Keep `npm run netlify` running
- Edit HTML/CSS/JS files
- Browser auto-refreshes
- Functions auto-reload

### Save API Costs During Development
Add a mock mode to the function (optional):

```javascript
// At the top of generate-itinerary.js
const MOCK_MODE = process.env.MOCK_MODE === 'true';

if (MOCK_MODE) {
  return { statusCode: 200, body: JSON.stringify({ /* sample data */ }) };
}
```

Then in `.env`:
```
MOCK_MODE=true  # Uncomment to skip API calls
```

### Debug Mode
Add verbose logging:

```javascript
console.log('Request body:', event.body);
console.log('API response:', data);
```

Logs appear in the terminal where you ran `npm run netlify`.

## Resources

- [Netlify CLI Docs](https://docs.netlify.com/cli/get-started/)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Claude API Docs](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [Environment Variables Guide](https://docs.netlify.com/environment-variables/overview/)

## Questions?

If something isn't working:
1. Check the terminal logs where `npm run netlify` is running
2. Check the browser console for errors (F12)
3. Verify your `.env` file is set up correctly
4. Make sure you're using the correct API key format (`sk-ant-api03-...`)

Happy developing! 🐦
