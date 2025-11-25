<!-- @format -->

# Model Loading Architecture

## 📋 Overview

The AI model now loads **only once** and is shared across all `<image-describer>` components.

## 🏗️ Architecture

### 1. **ModelLoader** (Singleton Pattern)

- **File**: `src/modelLoader.ts`
- **Purpose**: Manages the AI model lifecycle
- **Features**:
  - Loads model only once (singleton)
  - Caches the loaded model
  - Prevents duplicate loading attempts
  - Provides status checking (`isLoaded()`)
  - Handles caption generation

### 2. **PreloadModel** (Optional)

- **File**: `src/preloadModel.ts`
- **Purpose**: Preload model before components render
- **Benefit**: Model is ready when first component appears

### 3. **ImageDescriber Component**

- **File**: `src/wasm-component.ts`
- **Purpose**: Web component for image descriptions
- **Behavior**:
  - Injects into shared model (doesn't load it)
  - Shows appropriate loading messages
  - Supports custom language attribute

## 🚀 Usage

### HTML

```html
<!-- Model preloads automatically from preloadModel.ts -->
<image-describer src="images/dog.jpg"></image-describer>
<image-describer src="images/cat.jpg"></image-describer>
<image-describer
	src="images/car.jpg"
	language="english"></image-describer>
```

### Attributes

- `src` (required): Image path
- `language` (optional): Caption language (default: "french")

## 🔄 Loading Flow

1. **Page loads** → `preloadModel.ts` starts loading model
2. **Components render** → Each component checks if model is loaded
3. **First component**:
   - Shows: "Loading AI model (first load may take 30-60 seconds)..."
   - Waits for model
   - Generates caption
4. **Subsequent components**:
   - Model already loaded
   - Shows: "Generating description..."
   - Generates caption immediately

## ✅ Benefits

✨ **Single Model Load**: Model loads once, saving memory and time
⚡ **Fast Subsequent Captions**: No reload delay for additional images
🔧 **Separation of Concerns**: Model management separate from UI components
🎯 **Preloading**: Optional early model loading for instant first caption
🌍 **Flexible Language**: Each component can specify its own language

## 🛠️ Manual Preloading (Alternative)

If you want to control when the model loads:

```typescript
import { modelLoader } from "./src/modelLoader";

// Preload on button click
button.addEventListener("click", async () => {
	await modelLoader.loadModel();
	console.log("Model ready!");
});
```

## 📊 Console Output

```
🔄 Preloading AI model...
🚀 Starting model load...
✅ Model loaded successfully!
✅ Model preloaded and ready!
```
