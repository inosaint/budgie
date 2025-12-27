# Claude Model Management Guide

## Current Model Configuration

**Current Default Model:** `claude-3-5-sonnet-20241022`

This is configured in:
- `netlify/functions/generate-itinerary.js` (line 47)
- `.env.example` (for local development reference)

## Why Dated Model Identifiers?

Anthropic uses dated model versions (e.g., `claude-3-5-sonnet-20241022`) instead of "latest" aliases for:
- **Stability**: Your app won't change behavior unexpectedly
- **Reproducibility**: Consistent results across deployments
- **Control**: You decide when to upgrade

## How to Stay Updated

### 1. Monitor Anthropic Announcements

Subscribe to updates from:
- **Anthropic Console**: https://console.anthropic.com/
- **Anthropic Documentation**: https://docs.anthropic.com/
- **Anthropic Changelog**: https://docs.anthropic.com/en/release-notes/overview
- **Anthropic API Status**: https://status.anthropic.com/

### 2. Set Up Monitoring

The code now includes **automatic deprecation detection**:
- When a model is deprecated, Netlify function logs will show: `MODEL DEPRECATION DETECTED`
- The error response includes the current model being used
- Users will see a helpful error message with upgrade instructions

### 3. Check Netlify Function Logs Regularly

Monitor your Netlify function logs for:
```
MODEL DEPRECATION DETECTED: The Claude model 'claude-x-x-xxxx' is no longer available
```

### 4. Test Before Major Updates

When updating the model:
1. Update the `CLAUDE_MODEL` environment variable in Netlify Dashboard first
2. Test with a deploy preview
3. If successful, update the code default for future deployments

## How to Update the Model

### Option A: Environment Variable (Recommended for Quick Updates)

1. Go to **Netlify Dashboard** → Site Settings → Environment Variables
2. Add or update: `CLAUDE_MODEL=claude-3-5-sonnet-20241022`
3. Redeploy the site
4. No code changes needed!

### Option B: Update Code Default

1. Edit `netlify/functions/generate-itinerary.js` line 47:
   ```javascript
   const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-NEW-VERSION';
   ```
2. Update `.env.example` line 13 to match
3. Commit and deploy

### Option C: Local Development

Update your `.env` file (not committed to git):
```bash
CLAUDE_MODEL=claude-3-5-sonnet-20241022
```

## Available Claude Models (as of Dec 2024)

Check the latest available models at: https://docs.anthropic.com/en/docs/models-overview

Common models:
- `claude-3-5-sonnet-20241022` - Latest Sonnet (recommended)
- `claude-3-5-haiku-20241022` - Fast and cost-effective
- `claude-opus-4-5-20251101` - Most capable (if available)

## Best Practices

1. **Pin to specific versions** - Don't use "latest" (not available anyway)
2. **Monitor Netlify logs** - Set up alerts for function errors
3. **Stay informed** - Subscribe to Anthropic updates
4. **Test updates** - Use deploy previews before production
5. **Update proactively** - Don't wait for deprecation errors

## Deprecation Timeline

Anthropic typically gives several months notice before deprecating models. When you see a deprecation warning:
1. Check the Anthropic changelog for the recommended replacement
2. Update the environment variable in Netlify
3. Test thoroughly
4. Update the code default in your next deployment

## Troubleshooting

### Error: "model: claude-x-x-xxxx not found"
- **Cause**: Model has been deprecated
- **Solution**: Update to a current model version (see above)

### How to find the current model in use?
- Check Netlify function logs - errors now include `currentModel` field
- Check your environment variables in Netlify Dashboard
- Check the code default in `generate-itinerary.js:47`

## Automation Ideas (Future)

Consider setting up:
- GitHub Actions to periodically check Anthropic docs for new models
- Netlify function to log current model version on each run
- Monitoring alerts for Netlify function errors
