"""
app.py
------
Flask web app to classify waste images using MobileNetV2 Deep Learning model.
"""

from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import json

app = Flask(__name__, template_folder="../frontend/templates", static_folder="../frontend/static")
# ensure uploads folder
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend", "static", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# -----------------------------
# Load Model & Class Names
# -----------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "waste_classifier_mobilenet.h5")
CLASS_NAMES_JSON = os.path.join(os.path.dirname(__file__), "class_names.json")

# Load model lazily to avoid issues if file doesn't exist yet
model = None
class_names = {}

def load_resources():
    global model, class_names
    if os.path.exists(MODEL_PATH):
        print("Loading model...")
        model = load_model(MODEL_PATH)
        print("Model loaded.")
    else:
        print("Model file not found. Please train the model first.")
    
    if os.path.exists(CLASS_NAMES_JSON):
        with open(CLASS_NAMES_JSON, "r") as f:
            class_names = json.load(f)
    else:
        print("Class names file not found.")

# Initial load
load_resources()

IMG_SIZE = (224, 224)

# -----------------------------
# Prediction Function
# -----------------------------
def predict_image(image_path):
    if model is None:
        return None, 0.0

    img = image.load_img(image_path, target_size=IMG_SIZE)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Rescale to match training

    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])
    
    predicted_class_index = np.argmax(predictions[0])
    confidence = np.max(predictions[0]) * 100
    
    # Map index to class name
    # class_names is a dict { "class_name": index } -> invert it or use keys
    # Actually, my training script saved it as { "class_name": index }
    # Wait, let's check how I saved it. 
    # class_indices = train_generator.class_indices (name -> index)
    # class_names = {v: k for k, v in class_indices.items()} (index -> name)
    # So class_names is { "0": "battery", "1": "biological", ... }
    
    predicted_label = class_names.get(str(predicted_class_index), "Unknown")
    
    return predicted_label, confidence

# -----------------------------
# Routes
# -----------------------------
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # Reload resources in case training just finished
        if model is None:
            load_resources()

        file = request.files.get("image")
        if not file or file.filename == "":
            return render_template("index.html", filename=None)

        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_DIR, filename)
        file.save(filepath)

        # Predict
        predicted_label, confidence = predict_image(filepath)

        # Map predicted label to bin category & degradability
        def get_bin_info(label):
            l = label.lower()
            if 'paper' in l or 'cardboard' in l:
                return 'Paper', 'Degradable'
            if 'plastic' in l:
                return 'Plastic', 'Non-degradable'
            if 'glass' in l:
                return 'Glass', 'Non-degradable'
            if 'metal' in l or 'can' in l or 'battery' in l:
                return 'Metal', 'Non-degradable'
            if any(k in l for k in ('bio', 'organic', 'food', 'compost', 'trash')):
                return 'Organic', 'Degradable' # Assuming trash is mostly organic or mixed
            if 'clothes' in l or 'footwear' in l:
                return 'Textile', 'Recyclable'
            return 'Unknown', 'Unknown'

        category, degradable = get_bin_info(predicted_label)

        return render_template(
            "index.html",
            filename=filename,
            predicted_class=predicted_label,
            category=category,
            degradable=degradable,
            confidence=confidence
        )

    return render_template("index.html", filename=None)

# -----------------------------
# Run App
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)
