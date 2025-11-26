# Intelligent Waste Classification using Deep Learning

A modern full-stack waste classification application built with React, Flask, and TensorFlow using Transfer Learning with MobileNetV2.

-----

## 💡 Overview

This project is an **AI-powered full-stack web application** designed to classify images of waste into **12 distinct categories** including battery, biological, brown-glass, cardboard, clothes, footwear, green-glass, metal, paper, plastic, trash, and white-glass. The system leverages **Transfer Learning with MobileNetV2** for high accuracy and fast inference.

### Architecture:

  * **Frontend:** Modern React SPA with drag-and-drop upload, real-time backend monitoring, and animated results
  * **Backend:** Flask REST API with in-memory image processing (no file storage)
  * **Model:** MobileNetV2 fine-tuned on 12 waste categories
  * **Deployment:** Vercel (frontend) + AWS EC2 with PM2 (backend)

The application provides actionable disposal tips and comprehensive category predictions with confidence scores.

-----

## ✨ Features

### Frontend
  * **Drag-and-Drop Upload:** Modern file upload with drag-drop support
  * **Real-Time Preview:** Full-size image preview with dark gradient background
  * **Backend Status Monitor:** Live connection status indicator
  * **Responsive Design:** Mobile-first design optimized for all devices
  * **Animated Results:** Smooth animations with category confidence bars
  * **Disposal Tips:** Actionable recycling and disposal recommendations

### Backend
  * **12-Category Classification:** Comprehensive waste categorization
  * **In-Memory Processing:** No file storage - RAM-only image processing for security
  * **REST API:** Clean JSON endpoints for health check and predictions
  * **Transfer Learning:** MobileNetV2 fine-tuned for high accuracy
  * **CORS Enabled:** Seamless cross-origin frontend integration

-----

## 💻 Technologies Used

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18.2.0 | Modern SPA with hooks and responsive design |
| **Backend Framework** | Flask 3.0.0 | Python REST API with Flask-CORS |
| **Deep Learning** | TensorFlow 2.15.0 | Model training and inference |
| **Model Architecture** | MobileNetV2 | Transfer learning for efficient classification |
| **Image Processing** | Pillow 10.1.0 | In-memory image preprocessing |
| **Numerical Computing** | NumPy 1.24.3 | Array operations and data handling |
| **Production Server** | Gunicorn 21.2.0 | WSGI server for production deployment |
| **Process Management** | PM2 | Backend process management on EC2 |
| **Hosting** | Vercel + AWS EC2 | Frontend and backend deployment |

-----

## 📁 Project Structure

```
classification_waste/
├── backend/
│   ├── app.py                          # Flask REST API
│   ├── train_deep_model.py            # Model training script
│   ├── waste_classifier_mobilenet.h5  # Trained MobileNetV2 model
│   ├── class_names.json               # Category labels mapping
│   ├── ecosystem.config.js            # PM2 configuration
│   ├── requirements.txt               # Python dependencies
│   └── garbage_classification/train/  # Training dataset (12 categories)
├── frontend/
│   ├── src/
│   │   ├── App.js                     # Main React component
│   │   ├── App.css                    # Global styles
│   │   └── components/
│   │       ├── Header.js              # Header with status indicator
│   │       ├── ImageUpload.js         # Drag-drop upload component
│   │       └── ResultDisplay.js       # Results with animations
│   ├── .env.example                   # Environment template
│   └── package.json                   # Node dependencies
├── Document/
│   └── readme.md                      # Detailed project documentation
└── README.md                          # This file
```

-----

## 🛠️ Installation & Setup

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Aravind-Golla/classification_waste.git
    cd classification_waste/backend
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On macOS/Linux
    venv\Scripts\activate     # On Windows
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Run the Flask app:**
    ```bash
    python app.py
    ```
    Backend runs on `http://127.0.0.1:5000`

### Frontend Setup

1.  **Navigate to frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure backend URL:**
    - Copy `.env.example` to `.env`
    - Set `REACT_APP_API_BASE_URL=http://localhost:5000`
4.  **Start development server:**
    ```bash
    npm start
    ```
    Frontend runs on `http://localhost:3000`

-----

## 🧠 Model Training (Optional)

You only need to run this if you want to retrain the model on your own dataset.

1.  Place your image dataset in `backend/garbage_classification/train/[CATEGORY_NAME]/`
2.  Run the training script:
    ```bash
    cd backend
    python train_deep_model.py
    ```
    This script will:
      * Load images from 12 waste categories
      * Apply data augmentation for better generalization
      * Fine-tune MobileNetV2 with custom classification head
      * Train with validation split
      * Save the final model as `waste_classifier_mobilenet.h5` and class names as `class_names.json`

-----

## ▶️ Usage

1.  **Ensure both backend and frontend are running** (see Installation & Setup above)
2.  **Access the application:**
    Open your web browser and navigate to:
    ```
    http://localhost:3000
    ```
3.  **Classify Waste:** 
    - Drag-and-drop a waste image or click to browse
    - View classification results with confidence scores
    - See disposal tips and all category predictions
    - Backend status indicator shows connection health

-----

## 🌿 Waste Categories & Disposal Tips

The model classifies waste into **12 categories** with disposal recommendations:

| Category | Recyclability | Disposal Tip |
| :--- | :--- | :--- |
| **Battery** | ⚠️ Hazardous | Take to designated battery recycling centers |
| **Biological** | 🌱 Compostable | Compost at home or use municipal composting |
| **Brown Glass** | ♻️ Recyclable | Rinse and place in glass recycling bin |
| **Cardboard** | ♻️ Recyclable | Flatten boxes and recycle with paper |
| **Clothes** | ♻️ Reusable | Donate wearable items or textile recycling |
| **Footwear** | ♻️ Reusable | Donate or recycle through shoe programs |
| **Green Glass** | ♻️ Recyclable | Rinse and recycle with glass containers |
| **Metal** | ♻️ Recyclable | Clean and place in metal recycling bin |
| **Paper** | ♻️ Recyclable | Keep dry and recycle with paper products |
| **Plastic** | ♻️ Recyclable | Check local recycling guidelines for type |
| **Trash** | 🗑️ Landfill | Dispose in general waste bin |
| **White Glass** | ♻️ Recyclable | Rinse and recycle separately from colored glass |

-----

## 🚀 Production Deployment

### EC2 Backend (Ubuntu)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python & dependencies
sudo apt install -y python3 python3-pip python3-venv

# Clone repository
git clone https://github.com/Aravind-Golla/classification_waste.git
cd classification_waste/backend

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Install PM2
sudo npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Vercel Frontend
```bash
cd frontend
vercel --prod
```
Set environment variable in Vercel dashboard:
- `REACT_APP_API_BASE_URL=https://your-api-gateway-url`

### PM2 Management Commands
```bash
pm2 status                          # Check process status
pm2 logs waste-classifier-api       # View logs
pm2 restart waste-classifier-api    # Restart app
pm2 stop waste-classifier-api       # Stop app
```

## 📊 API Endpoints

### Health Check
```bash
GET /api/health
# Response: {"status": "healthy", "model_loaded": true, "processing": "in-memory"}
```

### Predict Waste Category
```bash
POST /api/predict
Content-Type: multipart/form-data
Body: image file

# Response:
{
  "label": "plastic",
  "category": "plastic",
  "confidence": 95.8,
  "all_predictions": {...},
  "disposal_tip": "Check local recycling guidelines..."
}
```

<!-- ## 🎯 Future Enhancements

  * [ ] Batch image processing
  * [ ] User feedback loop for model improvement
  * [ ] Multi-language support for disposal tips
  * [ ] Mobile app (React Native)
  * [ ] Real-time camera classification
  * [ ] Integration with local waste management APIs -->

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- MobileNetV2 architecture from TensorFlow
- Training dataset from Kaggle Garbage Classification
- React community for frontend best practices
