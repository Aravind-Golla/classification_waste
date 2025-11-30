"""
Quick model retraining script with better configuration.
This fixes the issue where model only predicts "metal".
"""

import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
import os
import json

# Configuration
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 15  # Increased from 2 to 15 epochs
LEARNING_RATE = 0.0005
DATA_DIR = os.path.join(os.path.dirname(__file__), "garbage_classification", "train")
MODEL_SAVE_PATH = os.path.join(os.path.dirname(__file__), "waste_classifier_mobilenet.h5")
CLASS_NAMES_PATH = os.path.join(os.path.dirname(__file__), "class_names.json")

print("=" * 70)
print("RETRAINING WASTE CLASSIFICATION MODEL")
print("=" * 70)
print(f"\nConfiguration:")
print(f"  - Epochs: {EPOCHS} (was 2 - this was the problem!)")
print(f"  - Batch size: {BATCH_SIZE}")
print(f"  - Image size: {IMG_SIZE}")
print(f"  - Learning rate: {LEARNING_RATE}")
print(f"  - Data directory: {DATA_DIR}")

# Check GPU
gpus = tf.config.list_physical_devices('GPU')
print(f"\n🔍 GPU Status: {len(gpus)} GPU(s) available")
if gpus:
    print(f"   Using GPU: {gpus[0].name}")
else:
    print("   Using CPU (training will take longer)")

# Data augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=25,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.15,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest',
    validation_split=0.2
)

val_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

print(f"\n📂 Loading training data...")
train_generator = train_datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training',
    shuffle=True
)

validation_generator = val_datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation',
    shuffle=False
)

# Save class names
class_indices = train_generator.class_indices
class_names = {v: k for k, v in class_indices.items()}

print(f"\n✅ Dataset loaded:")
print(f"   Total classes: {len(class_names)}")
print(f"   Training samples: {train_generator.samples}")
print(f"   Validation samples: {validation_generator.samples}")
print(f"\n   Classes: {list(class_names.values())}")

with open(CLASS_NAMES_PATH, 'w') as f:
    json.dump(class_names, f, indent=2)
print(f"\n✅ Class names saved to: {CLASS_NAMES_PATH}")

# Build model
print(f"\n🏗️  Building MobileNetV2 model...")
base_model = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=IMG_SIZE + (3,)
)

# Important: Unfreeze the last 30 layers for better learning
base_model.trainable = True
for layer in base_model.layers[:-30]:
    layer.trainable = False

print(f"   Base model layers: {len(base_model.layers)}")
print(f"   Trainable layers: {sum([1 for l in base_model.layers if l.trainable])}")

# Add custom classification head
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.3)(x)
x = Dense(256, activation='relu')(x)
x = Dropout(0.2)(x)
predictions = Dense(len(class_names), activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# Compile model
model.compile(
    optimizer=Adam(learning_rate=LEARNING_RATE),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

print(f"   ✅ Model compiled")
print(f"   Total params: {model.count_params():,}")

# Train
print(f"\n🚀 Starting training for {EPOCHS} epochs...")
print("=" * 70)

history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // BATCH_SIZE,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // BATCH_SIZE,
    epochs=EPOCHS,
    verbose=1
)

# Save model
model.save(MODEL_SAVE_PATH)
print("\n" + "=" * 70)
print(f"✅ MODEL SAVED: {MODEL_SAVE_PATH}")
print("=" * 70)

# Final evaluation
print(f"\n📊 Final Results:")
results = model.evaluate(validation_generator, verbose=0)
print(f"   Validation Loss: {results[0]:.4f}")
print(f"   Validation Accuracy: {results[1]*100:.2f}%")

print(f"\n✨ Training complete!")
print(f"\n💡 Next steps:")
print(f"   1. Stop the Flask app (Ctrl+C)")
print(f"   2. Restart it: python app.py")
print(f"   3. Test predictions in the frontend")
