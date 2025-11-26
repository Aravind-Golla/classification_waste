# 🌍 AI-Powered Waste Classification System
**Intelligent Waste Management with Deep Learning**

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-green.svg)](https://flask.palletsprojects.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15-orange.svg)](https://www.tensorflow.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Overview

An end-to-end AI-powered web application that classifies waste materials into 12 categories using deep learning. Built with a modern React frontend and Flask REST API backend, featuring in-memory image processing for optimal performance and security.

**Live Demo:** [waste-classifier.vercel.app](https://waste-classifier.vercel.app)  
**API Endpoint:** `http://13.233.149.179:5000`

### 🎯 Key Features

- ✅ **12 Waste Categories:** Battery, Biological, Brown/Green/White Glass, Cardboard, Clothes, Footwear, Metal, Paper, Plastic, Trash
- 🚀 **Real-Time Classification:** Instant AI predictions with confidence scores
- 📱 **Fully Responsive:** Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI/UX:** Gradient design with smooth animations
- 🔒 **In-Memory Processing:** No files saved - secure and fast
- ♻️ **Disposal Guidance:** Smart recycling tips for each category
- 📊 **Backend Status:** Live connection indicator
- 🌐 **Production Ready:** Deployed on Vercel + AWS EC2

---

## 🏗️ Architecture

```
Frontend (Vercel)          Backend (AWS EC2)
   React App      →  API    →  Flask + TensorFlow
   Port 3000          Gateway    Port 5000
                                 ↓
                           MobileNet Model
                         (In-Memory Processing)
```

### Technology Stack

**Frontend:**
- React 18.2 with Hooks
- CSS3 with custom animations
- Modern gradient design system
- Responsive breakpoints

**Backend:**
- Flask 3.0 REST API
- TensorFlow 2.15 + MobileNetV2
- In-memory image processing (PIL)
- PM2 process manager
- Gunicorn WSGI server

**ML Model:**
- Architecture: MobileNetV2 (Transfer Learning)
- Input: 224x224 RGB images
- Output: 12 waste categories
- Inference: ~100-500ms on CPU

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/waste-management-app.git
   cd waste-management-app
Create and activate a virtual environment:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate       # On Windows: venv\Scripts\activate
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Place the trained model file waste_classifier_model.h5 in the project root.

Create the uploads folder:

bash
Copy
Edit
mkdir -p static/uploads
Usage
Run the Flask app:

bash
Copy
Edit
python app.py
Open your browser and go to:

cpp
Copy
Edit
http://127.0.0.1:5000/
Upload an image of waste via the form and submit.

View the predicted waste category, recyclability, degradability, and confidence score.

Project Structure
bash
Copy
Edit
/project-root
├── app.py                      # Flask app & TensorFlow model loading
├── waste_classifier_model.h5   # Trained TensorFlow model file
├── requirements.txt            # Python dependencies
├── /templates
│    └── index.html             # HTML template for web interface
└── /static
     └── /uploads               # Folder to save uploaded images
How It Works
Flask handles routing, file upload, and rendering.

Uploaded images are saved to static/uploads.

The TensorFlow model predicts the waste category and confidence.

The app maps predictions to environmental labels.

Results and image preview are shown on the webpage.

Environmental Labels
Waste Type	Recyclability	Degradability
cardboard	♻️ Recyclable	🌱 Degradable
glass	♻️ Recyclable	❌ Non-Degradable
metal	♻️ Recyclable	❌ Non-Degradable
paper	♻️ Recyclable	🌱 Degradable
plastic	♻️ Recyclable	❌ Non-Degradable
trash	❌ Not Recyclable	❌ Non-Degradable

Model Training (Optional)
Transfer learning with MobileNetV2.

Data augmentation applied during training.

Save model as waste_classifier_model.h5 after training.

Future Enhancements
Drag-and-drop uploads.

Batch image processing.

User submission tracking with a database.

Cloud deployment for scalability.

Multi-language support.