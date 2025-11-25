/** @format */

// modelLoader.ts - Singleton model manager
// Import from CDN - browser will cache after first load
import {
	pipeline,
	env,
} from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0";

// Pipeline type from transformers library
type Pipeline = any;
class ModelLoader {
	private static instance: ModelLoader | null = null;
	private modelPromise: Promise<Pipeline> | null = null;
	private loadedModel: Pipeline | null = null;

	private constructor() {}

	static getInstance(): ModelLoader {
		if (!ModelLoader.instance) {
			ModelLoader.instance = new ModelLoader();
		}
		return ModelLoader.instance;
	}

	/**
	 * Load the image captioning model (loads only once)
	 */
	async loadModel(): Promise<Pipeline> {
		// Return cached model if already loaded
		if (this.loadedModel) {
			return this.loadedModel;
		}

		// Return existing promise if already loading
		if (this.modelPromise) {
			return this.modelPromise;
		}

		// Start loading the model
		console.log("🚀 Starting model load...");
		this.modelPromise = pipeline(
			"image-to-text",
			"Xenova/vit-gpt2-image-captioning",
			{ quantized: true }
		)
			.then((model: Pipeline) => {
				console.log("✅ Model loaded successfully!");
				this.loadedModel = model;
				return model;
			})
			.catch((err: Error) => {
				console.error("❌ Model loading failed:", err);
				// Reset promise so we can retry
				this.modelPromise = null;
				throw err;
			});

		return this.modelPromise!; // Non-null assertion: we just assigned it above
	}

	/**
	 * Get the loaded model (returns null if not loaded yet)
	 */
	getModel(): Pipeline | null {
		return this.loadedModel;
	}

	/**
	 * Check if model is loaded
	 */
	isLoaded(): boolean {
		return this.loadedModel !== null;
	}

	/**
	 * Generate caption for an image
	 */
	async generateCaption(
		imageSrc: string,
		language: string = "french"
	): Promise<string> {
		const model = await this.loadModel();
		const result = await model(imageSrc, { language });
		return result[0].generated_text;
	}

	/**
	 * Generate captions for multiple images in parallel (FASTER!)
	 */
	async generateCaptions(
		images: Array<{ src: string; language?: string }>,
		defaultLanguage: string = "french"
	): Promise<string[]> {
		const model = await this.loadModel();

		// Process all images in parallel
		const captionPromises = images.map(async (img) => {
			const result = await model(img.src, {
				language: img.language || defaultLanguage,
			});
			return result[0].generated_text;
		});

		return Promise.all(captionPromises);
	}
}

// Export singleton instance
export const modelLoader = ModelLoader.getInstance();
