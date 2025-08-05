# 🚀 Deployment Guide - GitHub Pages

This guide will help you deploy your Indian Defence Equipment Management System to GitHub Pages.

## 📋 Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git**: Git should be installed on your system
3. **Node.js**: Required for building the React app

## 🔧 Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `defence-project`
5. Description: `Indian Defence Equipment Management System`
6. Make it **Public** (required for free GitHub Pages)
7. **Don't** initialize with README, .gitignore, or license
8. Click "Create repository"

### Step 2: Update Homepage URL

Before pushing to GitHub, update the homepage URL in `frontend/package.json`:

```json
"homepage": "https://YOUR_USERNAME.github.io/defence-project"
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Push to GitHub

Run these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/defence-project.git

# Push to GitHub
git push -u origin main
```

### Step 4: Install gh-pages Package

Navigate to the frontend directory and install the gh-pages package:

```bash
cd frontend
npm install --save-dev gh-pages
```

### Step 5: Deploy to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

### Step 6: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch and **/ (root)** folder
6. Click **Save**

### Step 7: Access Your Deployed App

Your app will be available at:
```
https://YOUR_USERNAME.github.io/defence-project
```

## 🔄 Updating the Deployment

Whenever you make changes to your code:

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. Deploy the updated version:
   ```bash
   cd frontend
   npm run deploy
   ```

## 🛠️ Alternative Deployment Options

### Option 1: Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `build`

### Option 2: Vercel
1. Connect your GitHub repository to Vercel
2. Framework preset: Create React App
3. Build command: `npm run build`
4. Output directory: `build`

## 🐛 Troubleshooting

### Common Issues:

1. **404 Error on Refresh**: This is normal for React Router. Consider using HashRouter instead of BrowserRouter.

2. **Images Not Loading**: Make sure all image paths are relative and images are in the public folder.

3. **Build Failures**: Check that all dependencies are installed:
   ```bash
   cd frontend
   npm install
   ```

4. **Deployment Not Working**: Ensure the gh-pages package is installed:
   ```bash
   npm install --save-dev gh-pages
   ```

## 📝 Important Notes

- **Public Repository**: GitHub Pages requires a public repository for free hosting
- **Build Process**: The deployment process builds your React app before deploying
- **Branch**: The gh-pages branch is created automatically during deployment
- **Updates**: Changes may take a few minutes to appear after deployment

## 🎉 Success!

Once deployed, your Indian Defence Equipment Management System will be live on the web and accessible to anyone with the URL!

---

**कर्तव्यं शौर्यं धर्मः** - Duty, Valor, Righteousness 