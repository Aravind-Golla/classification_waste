# Transforming Waste Management with Transfer Learning  
**An Intelligent Waste Classification Web Application Using TensorFlow and Flask**

---

## Overview

This project demonstrates an AI-powered web application that classifies waste images into categories such as cardboard, glass, metal, paper, plastic, and trash. It leverages transfer learning with MobileNetV2 to accurately identify waste types and provides useful environmental information including recyclability and degradability.

The app is built using TensorFlow for deep learning and Flask as the web framework, enabling users to upload waste images and get instant predictions with confidence scores.

---

## Features

- **Image Upload:** Simple web form to upload images of waste.
- **Waste Classification:** Classifies images into 6 waste categories using a fine-tuned MobileNetV2 model.
- **Environmental Labels:** Displays if waste is recyclable or non-recyclable and degradable or non-degradable.
- **Confidence Scores:** Shows prediction certainty as a percentage.
- **Image Preview:** Displays the uploaded image for verification.
- **User-Friendly Interface:** Clean, centered layout for ease of use.

---

## Technologies Used

- TensorFlow 2.x
- MobileNetV2 (Transfer Learning)
- Flask
- NumPy
- scikit-learn (optional)
- Matplotlib (optional)

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

