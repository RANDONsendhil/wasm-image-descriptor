/** @format */

// preloadModel.ts - Optional script to preload the model
import { modelLoader } from "./modelLoader";

/**
 * Preload the AI model before any components are rendered
 * Call this early in your application lifecycle
 */
export async function preloadModel(): Promise<void> {
	console.log("🔄 Preloading AI model...");
	const startTime = performance.now();

	try {
		await modelLoader.loadModel();
		const duration = ((performance.now() - startTime) / 1000).toFixed(2);
		console.log(`✅ Model preloaded and ready in ${duration}s!`);
	} catch (err) {
		console.error("❌ Failed to preload model:", err);
		throw err;
	}
}

// Auto-preload if this module is imported
preloadModel().catch(console.error);
