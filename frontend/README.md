# Waste Classifier Frontend

React-based frontend application for AI-powered waste classification.

## Quick Start

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` to set your backend URL (default: `http://localhost:5000`)

4. **Start development server:**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the frontend directory with the following:

```env
# Backend API URL
REACT_APP_API_BASE_URL=http://localhost:5000
```

### Configuration Options:

- **Development (local backend):**
  ```
  REACT_APP_API_BASE_URL=http://localhost:5000
  ```

- **Production (deployed backend):**
  ```
  REACT_APP_API_BASE_URL=https://your-backend-api.com
  ```

- **Network testing (same network):**
  ```
  REACT_APP_API_BASE_URL=http://192.168.1.100:5000
  ```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Features

- 📸 Drag-and-drop image upload
- 🤖 AI-powered waste classification
- ♻️ Recycling recommendations
- 🎨 Modern gradient UI with animations
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔌 Backend connection status indicator
- ⚡ Real-time health checks
