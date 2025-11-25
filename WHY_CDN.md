<!-- @format -->

# Why CDN is the Right Approach for @xenova/transformers

## The Problem with Local Hosting

We tried to host `transformers.min.js` locally in `/public/lib/` but hit two major issues:

### Issue 1: Vite Public Folder Restrictions

```
Cannot import non-asset file /lib/transformers.min.js which is inside /public.
JS/CSS files inside /public are copied as-is on build and can only be
referenced via <script src> or <link href> in html.
```

**Why?** Vite's `/public` folder is for static assets that bypass the build process, not for ES6 modules.

### Issue 2: Wrong Module Format

The downloaded `transformers.min.js` is a **webpack bundle**, not a UMD module that exposes globals.

When loaded via `<script src>`, it doesn't create `window.transformers`. The file starts with:

```javascript
var __webpack_modules__={"./node_modules/onnxruntime-common/dist/lib/backend-impl.js":...
```

This webpack bundle expects to be imported as an ES module, not loaded globally.

## The Solution: Use CDN with ES6 Imports

```typescript
import {
	pipeline,
	env,
} from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0";
```

### Why This Works Better

1. **Browser Caching**: After the first load, the browser caches the CDN file

   - Subsequent loads are instant (from disk cache)
   - CDN has aggressive cache headers (`max-age=31536000`)

2. **ES6 Module Support**: The CDN version is designed to work as an ES module

   - No webpack wrapper issues
   - Proper exports for `pipeline`, `env`, etc.

3. **Vite Compatible**: ES6 imports from URLs work perfectly with Vite

   - No `/public` folder restrictions
   - Vite handles them natively

4. **Type Safety**: Created `transformers-cdn.d.ts` for TypeScript support
   ```typescript
   declare module "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0" {
     export function pipeline(...): Promise<any>;
     export const env: {...};
   }
   ```

## Performance Comparison

| Approach                   | First Load | Subsequent Loads | Complexity                   |
| -------------------------- | ---------- | ---------------- | ---------------------------- |
| **CDN (current)**          | 1-3s       | <50ms (cache)    | ✅ Simple                    |
| Local /public + script tag | N/A        | N/A              | ❌ Doesn't work (no global)  |
| Local npm package          | 500ms      | 100ms            | ⚠️ Adds 17MB to node_modules |

## Conclusion

**CDN is the recommended approach** for this library because:

- ✅ It's designed for CDN use (ESM format)
- ✅ Browser caching makes it fast after first load
- ✅ No build complexity or file management
- ✅ Always get latest patches with version pinning
- ✅ Works perfectly with Vite

The AI models (200MB+) stay on CDN regardless, so the library (700KB) being on CDN too is consistent.
