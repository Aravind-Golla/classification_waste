# 🌍 AI-Powered Waste Classification System

[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15-FF6F00?logo=tensorflow)](https://www.tensorflow.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?logo=flask)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-ready waste classification web application powered by **Deep Learning (MobileNetV2)** with a modern React frontend and Flask API backend.

---

## 💡 Overview

This project is an **AI-powered waste classification system** that uses computer vision to identify and categorize waste materials in real-time. The system leverages **MobileNetV2** deep learning architecture for accurate classification across 12 waste categories.

### 🎯 Key Features

- **🔍 12-Category Classification**: battery, biological, brown-glass, cardboard, clothes, footwear, green-glass, metal, paper, plastic, trash, white-glass
- **🚀 Real-time Prediction**: In-memory image processing with instant results
- **📊 Confidence Scoring**: AI confidence levels with risk assessment (low/medium/high)
- **♻️ Environmental Insights**: Bin category, degradability status, and disposal tips
- **🎨 Modern UI**: Responsive React frontend with smooth animations and gradient design
- **⚡ Fast & Efficient**: MobileNetV2 optimized for speed without sacrificing accuracy
- **🔒 Secure**: No file storage—all processing done in-memory

### 🏗️ Architecture

```
Frontend (React)          →    Backend (Flask API)         →    Model
━━━━━━━━━━━━━━━                 ━━━━━━━━━━━━━━━━━━              ━━━━━━━
- Image Upload                 - /api/health                - MobileNetV2
- Result Display               - /api/classes               - TensorFlow 2.15
- Modern UI                    - /api/predict               - In-memory Processing
- Vercel Hosting               - CORS Enabled               - 224x224 Input
```

---

## 💻 Technology Stack

| Layer | Technology | Version | Purpose |
|:------|:-----------|:--------|:--------|
| **Frontend** | React | 18.2 | Modern, responsive UI with hooks |
| | CSS3 | - | Gradient animations, glassmorphism |
| **Backend** | Flask | 3.0 | RESTful API server |
| | Flask-CORS | 4.0 | Cross-origin resource sharing |
| | Gunicorn | 21.2 | Production WSGI server |
| **AI/ML** | TensorFlow | 2.15 | Deep learning framework |
| | MobileNetV2 | - | Pre-trained CNN architecture |
| | NumPy | 1.24 | Numerical computations |
| | Pillow | 10.1 | In-memory image processing |
| **Deployment** | PM2 | - | Process management (backend) |
| | Vercel | - | Serverless hosting (frontend) |
| | AWS EC2 | Ubuntu | Backend hosting |

---

## 📁 Project Structure

```
classification_waste/
├── backend/
│   ├── app.py                          # Flask API server (in-memory processing)
│   ├── train_deep_model.py             # Model training script (MobileNetV2)
│   ├── waste_classifier_mobilenet.h5   # Trained TensorFlow model (224x224 input)
│   ├── class_names.json                # 12 waste categories mapping
│   ├── ecosystem.config.js             # PM2 configuration for production
│   ├── requirements.txt                # Python dependencies with versions
│   └── garbage_classification/
│       └── train/                      # Training dataset (12 categories)
│           ├── battery/
│           ├── biological/
│           ├── brown-glass/
│           ├── cardboard/
│           ├── clothes/
│           ├── footwear/
│           ├── green-glass/
│           ├── metal/
│           ├── paper/
│           ├── plastic/
│           ├── trash/
│           └── white-glass/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js                      # Main React component
│   │   ├── components/
│   │   │   ├── Header.js               # App header
│   │   │   ├── ImageUpload.js          # Drag-and-drop upload
│   │   │   └── ResultDisplay.js        # Classification results
│   │   └── index.js
│   ├── .env                             # Environment variables (API URL)
│   └── package.json
├── .gitignore
└── README.md
```

---

## � Quick Start

### Prerequisites
- **Backend**: Python 3.9+, pip
- **Frontend**: Node.js 16+, npm

### Backend Setup (Local)

```bash
# Navigate to backend directory
cd classification_waste/backend

# Install dependencies
pip install -r requirements.txt

# Run Flask development server
python app.py

# Server will start at http://localhost:5000
```

### Frontend Setup (Local)

```bash
# Navigate to frontend directory
cd classification_waste/frontend

# Install dependencies
npm install

# Start development server
npm start

# App will open at http://localhost:3000
```

### Environment Configuration

**Frontend** (`.env`):
```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

For production, update to your EC2 instance:
```env
REACT_APP_API_BASE_URL=http://13.233.149.179:5000
```

---

## 🔌 API Documentation

### Health Check
```bash
GET /api/health
```
**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "classes_loaded": 12,
  "processing": "in-memory"
}
```

### Get Classes
```bash
GET /api/classes
```
**Response:**
```json
{
  "classes": ["battery", "biological", "brown-glass", ...],
  "total": 12
}
```

### Predict Waste Type
```bash
POST /api/predict
Content-Type: multipart/form-data
```
**Request:** Upload image file with field name `image`

**Response:**
```json
{
  "predicted_class": "plastic",
  "confidence": 0.95,
  "confidence_percentage": 95.32,
  "category": "Plastic",
  "degradable": false,
  "risk_level": "low",
  "disposal_tip": "Check the recycling number. Clean and dry before recycling."
}
```

---

## 🧠 Model Training (Optional)

Only needed if you want to retrain with custom dataset:

```bash
cd backend

# Ensure dataset is in garbage_classification/train/ with 12 subdirectories
python train_deep_model.py

# This will:
# - Load and preprocess images (resize to 224x224)
# - Train MobileNetV2 with transfer learning
# - Apply data augmentation
# - Save model as waste_classifier_mobilenet.h5
# - Save class mappings to class_names.json
```

---

## 🌐 Production Deployment

### Backend on AWS EC2 (Ubuntu)

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and dependencies
sudo apt install python3 python3-pip -y

# Install PM2 (process manager)
sudo npm install -g pm2

# Clone repository
git clone https://github.com/Aravind-Golla/classification_waste.git
cd classification_waste/backend

# Install Python packages
pip3 install -r requirements.txt

# Start API with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow the instructions to enable auto-start

# Check status
pm2 status
pm2 logs waste-classifier-api
```

### Frontend on Vercel

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com) and import your repository
3. Configure environment variable:
   - Key: `REACT_APP_API_BASE_URL`
   - Value: `http://your-ec2-ip:5000`
4. Deploy automatically

### Alternative: Backend without Virtual Environment

```bash
# Install packages globally (use with caution)
sudo pip3 install flask==3.0.0 flask-cors==4.0.0 tensorflow==2.15.0 numpy==1.24.3 pillow==10.1.0 gunicorn==21.2.0

# Start with PM2 using system Python
pm2 start ecosystem.config.js
```

---

## 🌿 Waste Classification Categories

| Waste Type | Bin Category | Degradable | Disposal Tip |
|:-----------|:-------------|:-----------|:-------------|
| **battery** | Metal | ❌ No | Take to designated battery recycling center |
| **biological** | Organic | ✅ Yes | Compost if possible, or use organic waste bin |
| **brown-glass** | Glass | ❌ No | Rinse clean and recycle. Remove lids/caps |
| **cardboard** | Paper | ✅ Yes | Recycle in paper bin. Remove tape/labels |
| **clothes** | Textile | ❌ No | Donate if reusable, or textile recycling |
| **footwear** | Textile | ❌ No | Donate if reusable, or textile recycling |
| **green-glass** | Glass | ❌ No | Rinse clean and recycle. Remove lids/caps |
| **metal** | Metal | ❌ No | Rinse and recycle. Highly recyclable! |
| **paper** | Paper | ✅ Yes | Recycle in paper bin. Remove plastic tape |
| **plastic** | Plastic | ❌ No | Check recycling number. Clean and dry |
| **trash** | Unknown | ❓ Varies | Check local guidelines |
| **white-glass** | Glass | ❌ No | Rinse clean and recycle. Remove lids/caps |

---

## 📊 Model Performance

- **Architecture**: MobileNetV2 (Transfer Learning)
- **Input Size**: 224x224x3 RGB images
- **Training Dataset**: 12 waste categories
- **Preprocessing**: Image normalization (0-1 scale), data augmentation
- **Output**: Softmax probabilities across 12 classes
- **Inference Time**: < 100ms per image (in-memory processing)

---

## 🎯 Future Enhancements

- [ ] **Mobile App**: Native iOS/Android apps
- [ ] **Batch Processing**: Upload and classify multiple images
- [ ] **Location Services**: Find nearest recycling centers
- [ ] **Gamification**: Reward users for proper waste sorting
- [ ] **Multi-language Support**: Localization for global use
- [ ] **Dataset Expansion**: Add more waste categories
- [ ] **Real-time Video**: Classify waste from camera feed
- [ ] **Analytics Dashboard**: Track usage statistics and trends

---

## 📝 License

This project is licensed under the MIT License.

---

## 👥 Contributors

- **Aravind Golla** - [@Aravind-Golla](https://github.com/Aravind-Golla)

---

## 🙏 Acknowledgments

- MobileNetV2 architecture by Google Research
- TensorFlow team for the ML framework
- React community for frontend libraries
- Open-source waste classification datasets

---

## 📧 Contact & Support

For questions, issues, or contributions:
- **GitHub Issues**: [Report a bug](https://github.com/Aravind-Golla/classification_waste/issues)
- **Repository**: [classification_waste](https://github.com/Aravind-Golla/classification_waste)

---

**⭐ If you find this project helpful, please give it a star!**
