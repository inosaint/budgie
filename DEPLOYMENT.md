# Budgie - Deployment Checklist

## 📋 Files to Upload

Make sure you have these 3 files ready:

- ✅ `index.html` - Main HTML file
- ✅ `styles.css` - All styling
- ✅ `script.js` - All JavaScript

Optional but recommended:
- ✅ `README.md` - Project documentation

## 🚀 GitHub Pages Deployment (5 minutes)

### Step 1: Create Repository
1. Go to https://github.com/new
2. Repository name: `budgie-calculator` (or your choice)
3. ✅ Public
4. ✅ Add a README (or use the provided one)
5. Click **Create repository**

### Step 2: Upload Files
Two ways to do this:

#### Option A: Web Upload (Easiest)
1. Click **Add file** → **Upload files**
2. Drag and drop all 3 files:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Scroll down and click **Commit changes**

#### Option B: Git Command Line
```bash
git clone https://github.com/YOUR-USERNAME/budgie-calculator.git
cd budgie-calculator
# Copy your 3 files here
git add .
git commit -m "Initial commit: Budgie calculator"
git push origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. ⏳ Wait 1-2 minutes

### Step 4: Visit Your Site! 🎉
Your calculator is live at:
```
https://YOUR-USERNAME.github.io/budgie-calculator/
```

## ✅ Verify Deployment

Check these things work:
- [ ] Calculator loads and displays properly
- [ ] Currency selector works
- [ ] Input fields accept data
- [ ] Calculations update in real-time
- [ ] Material Icons load (you see icons, not boxes)
- [ ] Save button downloads receipt
- [ ] Advanced options expand/collapse
- [ ] Autocomplete suggests destinations
- [ ] Mobile view looks good

## 🔧 Troubleshooting

### "404 - Page Not Found"
- ✅ Check file is named `index.html` (not Index.html or index.htm)
- ✅ Verify GitHub Pages is enabled in Settings
- ⏳ Wait 2-3 minutes after enabling

### CSS/JS Not Loading
- ✅ Check file names match exactly: `styles.css` and `script.js`
- ✅ Verify all 3 files are in the root folder (not in a subfolder)
- ✅ Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Icons Not Showing
- ✅ Check internet connection (icons load from Google CDN)
- ✅ Verify `<link href="https://fonts.googleapis.com/icon?family=Material+Icons"` is in HTML
- 🔄 Try different browser

### Receipt Download Not Working
- ✅ Check html2canvas script loads: `https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js`
- ✅ Allow pop-ups for your site
- 🔄 Try different browser

## 📱 Mobile Testing

Test on:
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] Tablet (iPad/Android)

## 🎯 Performance Check

Your site should:
- ✅ Load in < 2 seconds
- ✅ Work offline after first load
- ✅ Display correctly on all screen sizes
- ✅ Score 90+ on Google PageSpeed Insights

## 🔄 Updating Your Site

To make changes:

1. Edit the file(s) locally
2. Test by opening `index.html` in browser
3. Upload to GitHub (replace existing file)
4. Wait 1-2 minutes for GitHub Pages to rebuild
5. Clear browser cache and check live site

## 🌐 Custom Domain (Optional)

Want `budgie.yourdomain.com`?

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In GitHub repo Settings → Pages:
   - Enter your custom domain
   - Click Save
3. In your domain registrar's DNS settings:
   - Add CNAME record: `budgie` pointing to `YOUR-USERNAME.github.io`
4. Wait for DNS propagation (up to 48 hours)

## 📊 Add Analytics (Optional)

Want to see visitor stats?

1. Create Google Analytics account
2. Get tracking code
3. Add to `index.html` in `<head>` section
4. Commit and push

## ✨ You're Done!

Your Budgie calculator is now live and accessible to anyone with the URL.

Share it with:
- 📱 Friends planning trips
- 🌐 Travel communities
- 💼 On your resume/portfolio
- 🐦 Social media

**Happy calculating!** 🦜
