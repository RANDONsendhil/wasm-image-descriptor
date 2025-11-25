<!-- @format -->

# Vite Public Folder Import Fix

## Problem

Vite prevents ES6 `import` statements from files inside `/public`. This error occurred:

```
Cannot import non-asset file /lib/transformers.min.js which is inside /public.
JS/CSS files inside /public are copied as-is on build and can only be
referenced via <script src> or <link href> in html.
```

## Why This Happens

- Files in `/public` are meant to be **static assets** served as-is
- Vite doesn't process/bundle them during development
- ES6 imports need to go through Vite's module resolution system
- `/public` files bypass that system intentionally

## Solution: Load as Global Script

### 1. Load library via `<script>` tag in `index.html`

```html
<!-- Load transformers as a global UMD script -->
<script src="/lib/transformers.min.js"></script>
```

### 2. Declare global types in TypeScript

```typescript
declare global {
	interface Window {
		transformers: {
			pipeline: (
				task: string,
				model?: string,
				options?: any
			) => Promise<Pipeline>;
			env: {
				/*...*/
			};
		};
	}
}
```

### 3. Access from window object

```typescript
const { pipeline, env } = window.transformers || {};
```

## Benefits

✅ Works with Vite's architecture  
✅ Library loads from local `/public/lib` folder  
✅ No CDN dependency  
✅ Fast loading (single script tag, no bundling overhead)  
✅ Type-safe with TypeScript declarations

## File Changes

- **index.html**: Changed module import to regular `<script src>`
- **modelLoader.ts**: Uses `window.transformers` instead of ES6 import
- **vite.config.ts**: Removed alias (no longer needed)
- **transformers.d.ts**: Deleted (global declarations inline now)

## Alternative Approaches (Not Used)

1. **CDN**: Could go back to CDN, but wanted local hosting
2. **Move to node_modules**: Could install via npm, but wanted to serve pre-built UMD
3. **Custom Vite plugin**: Overly complex for this use case

## Result

The transformers library now loads properly from `/public/lib/transformers.min.js` as a global script, avoiding Vite's module resolution restrictions.
