<!-- @format -->

# 📥 How to Download Transformers Locally

## Option 1: Download via Browser (Easiest)

1. **Download the main library file:**

   - Visit: https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0/dist/transformers.min.js
   - Right-click → Save as → `public/lib/transformers.min.js`

2. **Download the source map (optional, for debugging):**
   - Visit: https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0/dist/transformers.min.js.map
   - Right-click → Save as → `public/lib/transformers.min.js.map`

## Option 2: Download via PowerShell

Run these commands in your terminal:

```powershell
# Navigate to your project
cd F:\WebComponentTS\wasm-image-descriptor

# Create lib directory (already done)
New-Item -ItemType Directory -Force -Path public/lib

# Download main library
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0/dist/transformers.min.js" -OutFile "public/lib/transformers.min.js"

# Download source map (optional)
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0/dist/transformers.min.js.map" -OutFile "public/lib/transformers.min.js.map"
```

## Option 3: Download via npm (then copy)

```powershell
# Install temporarily in a temp folder
cd /tmp
npm install @xenova/transformers@2.6.0

# Copy the dist files to your project
Copy-Item "./node_modules/@xenova/transformers/dist/*" "F:/WebComponentTS/wasm-image-descriptor/public/lib/"
```

## ✅ After Download

Your folder structure should look like:

```
wasm-image-descriptor/
├── public/
│   └── lib/
│       ├── transformers.min.js      ← Main library
│       └── transformers.min.js.map  ← Source map (optional)
```

## 📝 File Sizes

- `transformers.min.js` - ~450 KB (minified JavaScript)
- `transformers.min.js.map` - ~1.5 MB (debugging info)

**Note**: The model files (ONNX models) are separate and will still be downloaded from Hugging Face on first use. This is normal and expected.
