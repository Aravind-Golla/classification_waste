# Transforming Waste Management with Transfer Learning  
**An Intelligent Waste Classification Web Application Using React, Flask & TensorFlow**

---

## Overview

This project demonstrates an AI-powered full-stack web application that classifies waste images into **12 categories** including battery, biological, brown-glass, cardboard, clothes, footwear, green-glass, metal, paper, plastic, trash, and white-glass. It leverages transfer learning with MobileNetV2 to accurately identify waste types and provides actionable disposal tips for environmental responsibility.

The app features a modern React frontend with drag-and-drop upload, real-time backend connectivity monitoring, and a Flask REST API with in-memory processing for optimal performance and security.

---

## Features

### Frontend
- **Drag-and-Drop Upload:** Modern file upload with drag-drop support
- **Real-Time Preview:** Full-size image preview with dark gradient background
- **Backend Status Monitor:** Live connection status indicator
- **Responsive Design:** Mobile-first design with optimized layouts for all devices
- **Animated Results:** Smooth animations with category confidence bars
- **Disposal Tips:** Actionable recycling and disposal recommendations

### Backend
- **12-Category Classification:** Comprehensive waste categorization
- **In-Memory Processing:** No file storage - RAM-only image processing for security
- **REST API:** Clean JSON endpoints for health check and predictions
- **MobileNetV2 Model:** Fine-tuned transfer learning for high accuracy
- **CORS Enabled:** Seamless cross-origin frontend integration

---

## Technologies Used

### Frontend
- React 18.2.0
- CSS3 with responsive design & animations
- Fetch API for HTTP requests

### Backend
- Flask 3.0.0 with Flask-CORS
- TensorFlow 2.15.0
- MobileNetV2 (Transfer Learning)
- Pillow 10.1.0 for image processing
- NumPy 1.24.3
- Gunicorn 21.2.0 (Production WSGI server)

### Deployment
- Vercel (Frontend hosting)
- AWS EC2 Ubuntu (Backend hosting)
- PM2 (Process management)
- API Gateway (Request routing)

---

## Installation

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aravind-Golla/classification_waste.git
   cd classification_waste/backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate       # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask app:**
   ```bash
   python app.py
   ```
   Backend runs on `http://127.0.0.1:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure backend URL:**
   - Copy `.env.example` to `.env`
   - Set `REACT_APP_API_BASE_URL=http://localhost:5000`

4. **Start development server:**
   ```bash
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## Usage

1. Open browser to `http://localhost:3000`
2. Drag-and-drop a waste image or click to browse
3. View classification results with confidence scores
4. See disposal tips and all category predictions
5. Backend status indicator shows connection health

## Project Structure

```
classification_waste/
├── backend/
│   ├── app.py                          # Flask REST API
│   ├── train_deep_model.py            # Model training script
│   ├── waste_classifier_mobilenet.h5  # Trained MobileNetV2 model
│   ├── class_names.json               # Category labels
│   ├── ecosystem.config.js            # PM2 configuration
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
│   └── readme.md                      # Project documentation
└── requirements.txt                   # Python dependencies
```

## How It Works

1. **Frontend:** React app sends image via FormData POST to `/api/predict`
2. **Backend:** Flask receives image bytes, processes in-memory with PIL
3. **Model:** MobileNetV2 classifies into 12 waste categories
4. **Response:** JSON with top prediction, confidence, all probabilities, disposal tip
5. **Display:** Animated results with progress bars and category cards
6. **No Storage:** Pure in-memory processing - no files saved to disk

## Waste Categories

The model classifies waste into **12 categories** with disposal recommendations:

| Category | Recyclability | Disposal Tip |
|----------|--------------|--------------|
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

## API Endpoints

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
  "all_predictions": {
    "plastic": 95.8,
    "metal": 2.1,
    "cardboard": 1.3,
    ...
  },
  "disposal_tip": "Check local recycling guidelines for plastic type..."
}
```

## Production Deployment

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
pm2 status              # Check process status
pm2 logs waste-classifier-api  # View logs
pm2 restart waste-classifier-api  # Restart app
pm2 stop waste-classifier-api     # Stop app
pm2 delete waste-classifier-api   # Remove from PM2
```

## Model Training

The model uses transfer learning with MobileNetV2:

```bash
cd backend
python train_deep_model.py
```

- **Architecture:** MobileNetV2 base + custom classification head
- **Training data:** 12 waste categories with data augmentation
- **Output:** `waste_classifier_mobilenet.h5`

## Performance

- **Inference Time:** ~100-200ms per image
- **Model Size:** ~15MB (MobileNetV2)
- **Memory Usage:** ~500MB RAM (in-memory processing)
- **Accuracy:** Varies by category (see training metrics)

## Future Enhancements

- [ ] Batch image processing
- [ ] User feedback loop for model improvement
- [ ] Multi-language support for disposal tips
- [ ] Mobile app (React Native)
- [ ] Real-time camera classification
- [ ] Integration with local waste management APIs

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- MobileNetV2 architecture from TensorFlow
- Training dataset from Kaggle Garbage Classification
- React community for frontend best practices