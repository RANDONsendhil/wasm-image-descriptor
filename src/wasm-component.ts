/** @format */

// image-describer.ts
// Import from CDN to avoid Vite bundling issues
import { pipeline, Pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0";

class ImageDescriber extends HTMLElement {
	private shadow: ShadowRoot;
	private static modelLoading: Promise<Pipeline> | null = null;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
	}
	async connectedCallback() {
		this.shadow.innerHTML = `<p>Loading description...</p>`;
		const imgSrc = this.getAttribute("src");

		if (!imgSrc) {
			this.shadow.innerHTML = `<p>No image source provided.</p>`;
			return;
		}

		// Load pipeline (shared across all instances)
		let captioner: Pipeline;
		try {
			this.shadow.innerHTML = `<p>Loading AI model (first load may take 30-60 seconds)...</p>`;

			// Reuse the same model instance across all image-describer elements
			if (!ImageDescriber.modelLoading) {
				ImageDescriber.modelLoading = pipeline(
					"image-to-text",
					"Xenova/vit-gpt2-image-captioning",
					{ quantized: true } // Use quantized model for faster loading
				);
			}

			captioner = await ImageDescriber.modelLoading;
		} catch (err) {
			console.error("Error loading pipeline:", err);
			this.shadow.innerHTML = `<p>Failed to load model: ${
				err instanceof Error ? err.message : String(err)
			}</p>`;
			return;
		}

		// Generate caption
		try {
			this.shadow.innerHTML = `<p>Generating description...</p>`;
			const caption = await captioner(imgSrc);
			this.shadow.innerHTML = `<p>${caption[0].generated_text}</p>`;
		} catch (err) {
			console.error("Error generating caption:", err);
			this.shadow.innerHTML = `<p>Failed to generate description: ${
				err instanceof Error ? err.message : String(err)
			}</p>`;
		}
	}
}

customElements.define("image-describer", ImageDescriber);
