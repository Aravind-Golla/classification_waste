# Waste Classifier Backend API

Flask-based REST API for AI-powered waste classification using TensorFlow/Keras.

## Features

✅ **In-Memory Processing** - No files saved to disk or cloud storage  
✅ **Fast & Secure** - All image processing happens in RAM  
✅ **Simple Deployment** - No external storage dependencies (S3, etc.)  
✅ **CORS Enabled** - Works with frontend from any origin  
✅ **Mock Mode** - Returns mock predictions when model not loaded (for testing)  

## API Endpoints

### `GET /api/health`
Check backend health and model status.

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "classes_loaded": 12,
  "processing": "in-memory"
}
```

### `GET /api/classes`
Get list of waste classification categories.

**Response:**
```json
{
  "classes": ["battery", "biological", "brown-glass", ...],
  "total": 12
}
```

### `POST /api/predict`
Classify uploaded waste image (in-memory processing).

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `image` field containing the image file

**Example (curl):**
```bash
curl -X POST http://localhost:5000/api/predict \
  -F "image=@waste_photo.jpg"
```

**Response:**
```json
{
  "predicted_class": "plastic",
  "confidence": 0.92,
  "confidence_percentage": 92.5,
  "category": "Plastic",
  "degradable": false,
  "risk_level": "low",
  "disposal_tip": "Check the recycling number. Clean and dry before recycling."
}
```

## Installation

### 1. Install Dependencies

```bash
cd backend
pip install -r ../requirements.txt
```

### 2. Setup Model Files

Ensure these files exist in the `backend/` directory:
- `waste_classifier_mobilenet.h5` - Trained Keras model
- `class_names.json` - Class index to name mapping

### 3. Run the Server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

**Note:** The backend uses environment variables for configuration:
- `PORT` (default: 5000) - Server port
- `FLASK_DEBUG` (default: False) - Debug mode

For PM2 deployment, these are configured in `ecosystem.config.js`

## In-Memory Processing

This backend uses **100% in-memory processing**:

1. **Image Upload** → Read directly into memory (no temp files)
2. **Preprocessing** → PIL processes bytes in RAM
3. **Prediction** → TensorFlow/Keras runs inference in memory
4. **Response** → JSON returned immediately

### Benefits:

- **🚀 Faster**: No disk I/O overhead
- **🔒 More Secure**: Images never touch filesystem
- **💰 Cost Effective**: No cloud storage costs (S3, etc.)
- **🎯 Simpler**: Fewer dependencies and configuration
- **♻️ Cleaner**: Automatic cleanup (garbage collection)

### Memory Usage:

- Each request typically uses < 50MB RAM
- Images are discarded after prediction
- Safe for concurrent requests

## Model Information

The backend uses MobileNet-based architecture for efficient inference:

- **Input Size**: 224x224 pixels (RGB)
- **Preprocessing**: Normalization (0-1 scale)
- **Output**: 12 waste categories
- **Inference Time**: ~100-500ms (CPU)

## Development

### Mock Mode

If the model fails to load, the API automatically returns mock predictions:

```json
{
  "predicted_class": "plastic",
  "confidence": 0.85,
  ...
}
```

This allows frontend development without a working ML model.

### Debug Mode

Enable debug mode by setting environment variable:

```bash
FLASK_DEBUG=True python app.py
```

**⚠️ Never use debug mode in production!**

For PM2, configure in `ecosystem.config.js`.

## Troubleshooting

### Model Not Loading

**Error:** `ValueError: numpy.dtype size changed`

**Solution:**
```bash
pip install --upgrade numpy tensorflow
```

### CORS Issues

The backend has CORS enabled for all origins. If you still face issues:

1. Check that flask-cors is installed: `pip install flask-cors`
2. Restart the backend after any changes

### Port Already in Use

Change the port using environment variable:
```bash
PORT=5001 python app.py
```

## Production Deployment

### Recommended Setup:

```bash
# Use Gunicorn for production
pip install gunicorn

# Run with multiple workers
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Environment Variables:

```env
FLASK_DEBUG=False
PORT=5000
```

### Performance Tips:

- Use **4-8 workers** for CPU-bound inference
- Enable **HTTP/2** for faster uploads
- Consider **GPU** for high traffic (TensorFlow GPU support)
- Add **load balancer** for scaling horizontally

## Architecture

```
┌─────────────────┐
│   Frontend      │
│  (React App)    │
└────────┬────────┘
         │ HTTP POST /api/predict
         ↓
┌─────────────────────────────┐
│   Flask API (app.py)        │
│  ┌─────────────────────┐    │
│  │  Image Upload       │    │
│  │  (multipart/form)   │    │
│  └──────────┬──────────┘    │
│             ↓                │
│  ┌─────────────────────┐    │
│  │  In-Memory Buffer   │    │
│  │  (io.BytesIO)       │    │
│  └──────────┬──────────┘    │
│             ↓                │
│  ┌─────────────────────┐    │
│  │  PIL Image Processing│   │
│  │  (RGB, Resize)      │    │
│  └──────────┬──────────┘    │
│             ↓                │
│  ┌─────────────────────┐    │
│  │  TensorFlow/Keras   │    │
│  │  (MobileNet Model)  │    │
│  └──────────┬──────────┘    │
│             ↓                │
│  ┌─────────────────────┐    │
│  │  Classification     │    │
│  │  Results + Tips     │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
         │
         ↓ JSON Response
┌─────────────────┐
│   Frontend      │
│ (Results View)  │
└─────────────────┘
```

## Technology Stack

- **Flask 3.0** - Web framework
- **TensorFlow 2.15** - ML inference
- **PIL/Pillow** - Image processing
- **NumPy** - Array operations
- **Flask-CORS** - Cross-origin support

## License

Part of the Waste Classifier project.
