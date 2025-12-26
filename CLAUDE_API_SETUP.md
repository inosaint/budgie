# Claude API Integration Setup Guide

This guide will help you deploy Budgie with Claude API integration for AI-powered itinerary generation.

## Prerequisites

1. **GitHub Account** - Your code repository
2. **Netlify Account** - Free tier is sufficient ([signup here](https://netlify.com))
3. **Claude API Key** - Get from [Anthropic Console](https://console.anthropic.com/)

---

## Step 1: Get Your Claude API Key

1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **Create Key**
5. Copy your API key (starts with `sk-ant-...`)
6. **IMPORTANT**: Store it securely - you won't see it again!

---

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Connect Your Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **GitHub** and authorize Netlify
   - Select your `budgie` repository

2. **Configure Build Settings**
   - **Build command**: Leave empty (static site)
   - **Publish directory**: `.` (current directory)
   - Click **"Show advanced"** → **"New variable"**

3. **Add Environment Variable**
   - **Key**: `budgie`
   - **Value**: Paste your Claude API key
   - Click **"Deploy site"**

4. **Done!** Your site will be live in ~1 minute

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Set environment variable
netlify env:set budgie "your-api-key-here"

# Deploy
netlify deploy --prod
```

---

## Step 3: Configure Your Site (Optional)

### Custom Domain

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow instructions to add DNS records

### Environment Variables (Update Later)

1. Go to **Site settings** → **Environment variables**
2. Edit `CLAUDE_API_KEY` if needed
3. Changes take effect on next deploy

---

## Step 4: Test the Integration

1. Visit your deployed site (e.g., `https://your-site.netlify.app`)
2. Use the budget calculator:
   - Enter **Source**: Bangalore
   - Enter **Destination**: Auckland
   - Set **Duration**: 7 days
   - Click **"Calculate"**
3. Click **"Generate Itinerary"**
4. You should see:
   - ✅ Loading spinner: "Generating your itinerary..."
   - ✅ AI-generated itinerary with real recommendations
   - ✅ Dot matrix printer sound effect

### Troubleshooting

**If you see "Failed to generate itinerary":**

1. **Check Environment Variable**
   - Go to Netlify Dashboard → Site Settings → Environment variables
   - Verify `budgie` is set correctly
   - Make sure there are no extra spaces

2. **Check API Key**
   - Visit [Anthropic Console](https://console.anthropic.com/)
   - Verify your API key is active
   - Check you have credits available

3. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for error messages
   - Common issues:
     - `401 Unauthorized` → Invalid API key
     - `429 Too Many Requests` → Rate limit (wait a minute)
     - `500 Server Error` → Check Netlify function logs

4. **Check Netlify Function Logs**
   - Go to Netlify Dashboard → Functions
   - Click on `generate-itinerary`
   - View real-time logs for errors

---

## Cost & Usage

### Claude API Pricing (as of 2025)

- **Model**: Claude 3.5 Sonnet
- **Input**: ~$3 per million tokens
- **Output**: ~$15 per million tokens

**Estimated cost per itinerary:**
- ~2,000 input tokens (prompt + trip data)
- ~2,000 output tokens (itinerary JSON)
- **Cost**: ~$0.03 - $0.06 per itinerary

### Free Tier Estimates

Anthropic offers free credits for new accounts. With typical free credits:
- ~150-300 itineraries can be generated for free
- After that, you'll need to add billing

### Monitor Usage

1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Go to **Usage & Billing**
3. Set up usage alerts to avoid surprises

---

## API Rate Limits

By default, Claude API has these limits:

- **Requests per minute**: 50
- **Tokens per minute**: 40,000

For Budgie (personal use), you'll never hit these limits.

If you're sharing with many users, consider:
- Adding rate limiting in the Netlify function
- Caching itineraries for popular routes
- Implementing user authentication

---

## Security Best Practices

### ✅ DO

- ✅ Store API key in Netlify environment variables
- ✅ Use HTTPS for all requests (Netlify does this automatically)
- ✅ Monitor API usage regularly
- ✅ Set up usage alerts in Anthropic Console
- ✅ Rotate API keys periodically

### ❌ DON'T

- ❌ NEVER commit API key to Git
- ❌ NEVER expose API key in frontend code
- ❌ NEVER share your API key publicly
- ❌ Don't allow unlimited public access without rate limiting

---

## Local Development

### Running Locally Without API

Just open `index.html` in your browser - it will use dummy data.

### Running Locally With API (Advanced)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Create `.env` file** (in project root)
   ```bash
   budgie=your-api-key-here
   ```

3. **Add to `.gitignore`**
   ```bash
   echo ".env" >> .gitignore
   ```

4. **Run development server**
   ```bash
   netlify dev
   ```

5. **Visit**: http://localhost:8888

---

## Deployment Checklist

- [ ] Claude API key obtained from Anthropic Console
- [ ] GitHub repository is up to date
- [ ] Netlify account created
- [ ] Repository connected to Netlify
- [ ] `budgie` environment variable set
- [ ] Site deployed successfully
- [ ] Test itinerary generation works
- [ ] Usage alerts configured in Anthropic Console
- [ ] Custom domain configured (optional)

---

## Updating the Deployment

### Push Changes to GitHub

```bash
git add .
git commit -m "Your commit message"
git push
```

Netlify will automatically detect the push and redeploy!

### Manual Redeploy

1. Go to Netlify Dashboard
2. Click **"Trigger deploy"** → **"Deploy site"**

---

## Alternative: Local-Only Mode

If you don't want to use the Claude API:

1. Simply open `itinerary.html` directly in your browser
2. It will show the dummy itinerary data
3. No API calls will be made
4. No cost incurred

---

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Claude API Docs**: https://docs.anthropic.com/
- **Budgie Issues**: https://github.com/inosaint/budgie/issues

---

## Summary

1. Get Claude API key from Anthropic Console
2. Deploy to Netlify via dashboard or CLI
3. Add `CLAUDE_API_KEY` environment variable
4. Test the integration
5. Monitor usage and costs

**Total setup time**: ~10 minutes

Your travel planning app is now powered by AI! 🚀

---

*Last updated: December 26, 2025*
