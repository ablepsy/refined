# Deployment Guide for ChatGPT Fine-Tuning Application

This document provides detailed instructions for deploying the ChatGPT Fine-Tuning application in various environments.

## Local Deployment

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- OpenAI API key

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chatgpt-finetuning-app.git
   cd chatgpt-finetuning-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Initialize the database**
   ```bash
   wrangler d1 execute DB --local --file=migrations/0001_initial.sql
   ```

4. **Build the application**
   ```bash
   pnpm build
   ```

5. **Start the production server**
   ```bash
   pnpm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Deployment to Vercel

### Prerequisites
- Vercel account
- Vercel CLI (optional)
- OpenAI API key

### Steps

1. **Install Vercel CLI (optional)**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel (if using CLI)**
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**
   
   **Option 1: Using Vercel Dashboard**
   - Fork or push the repository to GitHub
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your repository
   - Configure the project settings
   - Click "Deploy"

   **Option 2: Using Vercel CLI**
   ```bash
   vercel
   ```

4. **Configure environment variables**
   - In the Vercel Dashboard, go to your project
   - Navigate to "Settings" > "Environment Variables"
   - Add any required environment variables (if needed)

5. **Access your deployed application**
   - Vercel will provide a URL for your deployed application
   - Open the URL in your browser

## Deployment to Netlify

### Prerequisites
- Netlify account
- Netlify CLI (optional)
- OpenAI API key

### Steps

1. **Install Netlify CLI (optional)**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify (if using CLI)**
   ```bash
   netlify login
   ```

3. **Deploy to Netlify**
   
   **Option 1: Using Netlify Dashboard**
   - Fork or push the repository to GitHub
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect to your Git provider and select the repository
   - Configure build settings:
     - Build command: `pnpm build`
     - Publish directory: `.next`
   - Click "Deploy site"

   **Option 2: Using Netlify CLI**
   ```bash
   netlify deploy
   ```

4. **Configure environment variables**
   - In the Netlify Dashboard, go to your site
   - Navigate to "Site settings" > "Environment variables"
   - Add any required environment variables (if needed)

5. **Access your deployed application**
   - Netlify will provide a URL for your deployed application
   - Open the URL in your browser

## Deployment as a Desktop Application (Electron)

For users who prefer a desktop application experience, you can package the application using Electron.

### Prerequisites
- Electron
- electron-builder

### Steps

1. **Install Electron dependencies**
   ```bash
   pnpm add -D electron electron-builder
   ```

2. **Create main Electron file**
   Create a file named `electron/main.js`:
   ```javascript
   const { app, BrowserWindow } = require('electron');
   const path = require('path');
   const url = require('url');

   let mainWindow;

   function createWindow() {
     mainWindow = new BrowserWindow({
       width: 1200,
       height: 800,
       webPreferences: {
         nodeIntegration: true,
         contextIsolation: false
       }
     });

     const startUrl = process.env.ELECTRON_START_URL || url.format({
       pathname: path.join(__dirname, '../.next/index.html'),
       protocol: 'file:',
       slashes: true
     });

     mainWindow.loadURL('http://localhost:3000');

     mainWindow.on('closed', function() {
       mainWindow = null;
     });
   }

   app.on('ready', createWindow);

   app.on('window-all-closed', function() {
     if (process.platform !== 'darwin') {
       app.quit();
     }
   });

   app.on('activate', function() {
     if (mainWindow === null) {
       createWindow();
     }
   });
   ```

3. **Update package.json**
   Add the following to your package.json:
   ```json
   {
     "main": "electron/main.js",
     "scripts": {
       "electron-dev": "concurrently \"pnpm dev\" \"wait-on http://localhost:3000 && electron .\"",
       "electron-pack": "electron-builder build --mac --win --linux"
     },
     "build": {
       "appId": "com.yourdomain.chatgpt-finetuning-app",
       "productName": "ChatGPT Fine-Tuning App",
       "files": [
         ".next/**/*",
         "node_modules/**/*",
         "electron/**/*",
         "package.json"
       ],
       "directories": {
         "buildResources": "resources"
       }
     }
   }
   ```

4. **Install additional dependencies**
   ```bash
   pnpm add -D concurrently wait-on
   ```

5. **Build and package the application**
   ```bash
   pnpm build
   pnpm electron-pack
   ```

6. **Find the packaged application**
   The packaged application will be in the `dist` directory.

## Important Notes for All Deployments

1. **API Key Security**
   - The application stores the OpenAI API key locally
   - In production deployments, ensure proper security measures are in place
   - Consider using environment variables for API keys in production

2. **Database Considerations**
   - The application uses SQLite for local storage
   - For production deployments with multiple users, consider migrating to a more robust database solution

3. **Scaling**
   - The application is designed for individual use
   - For multi-user deployments, additional authentication and database modifications would be required

4. **Updating the Application**
   - Pull the latest changes from the repository
   - Rebuild and redeploy following the steps above
   - Run database migrations if schema changes have been made

## Troubleshooting Deployment Issues

1. **Application fails to start**
   - Check if Node.js version is 18 or higher
   - Ensure all dependencies are installed
   - Verify that the database has been initialized

2. **API calls failing**
   - Confirm that the OpenAI API key has been entered correctly
   - Check if the API key has sufficient permissions and credits
   - Verify network connectivity to the OpenAI API

3. **Database errors**
   - Ensure the database has been properly initialized
   - Check file permissions for the database directory
   - Try resetting the database with `rm -rf .wrangler/state/v3` and reinitializing

4. **Deployment platform specific issues**
   - Refer to the platform's documentation for troubleshooting
   - Check environment variables and build settings
   - Review deployment logs for specific error messages
