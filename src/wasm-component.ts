/** @format */

// image-describer.ts
// Import the batch processor for parallel processing
import { batchProcessor } from "./batchProcessor";

class ImageDescriber extends HTMLElement {
	private shadow: ShadowRoot;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
	}

	async connectedCallback() {
		const imgSrc = this.getAttribute("src");
		const language = this.getAttribute("language") || "french";

		if (!imgSrc) {
			this.shadow.innerHTML = `<p>No image source provided.</p>`;
			return;
		}

		// Show initial loading state
		this.shadow.innerHTML = `<p>⏳ Queued for processing...</p>`;

		// Add to batch queue - will be processed with other images
		batchProcessor.addTask(this, imgSrc, language);
	}
}

customElements.define("image-describer", ImageDescriber);
