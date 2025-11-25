/** @format */

// batchProcessor.ts - Process all images together for better performance
import { modelLoader } from "./modelLoader";

interface ImageTask {
	element: HTMLElement;
	src: string;
	language: string;
}

class BatchProcessor {
	private static instance: BatchProcessor | null = null;
	private pendingTasks: ImageTask[] = [];
	private processingTimer: number | null = null;
	private readonly BATCH_DELAY = 100; // Wait 100ms to collect all images

	private constructor() {}

	static getInstance(): BatchProcessor {
		if (!BatchProcessor.instance) {
			BatchProcessor.instance = new BatchProcessor();
		}
		return BatchProcessor.instance;
	}

	/**
	 * Add an image to the batch queue
	 */
	addTask(
		element: HTMLElement,
		src: string,
		language: string = "french"
	): void {
		this.pendingTasks.push({ element, src, language });

		// Clear existing timer
		if (this.processingTimer !== null) {
			clearTimeout(this.processingTimer);
		}

		// Schedule batch processing after delay
		this.processingTimer = window.setTimeout(() => {
			this.processBatch();
		}, this.BATCH_DELAY);
	}

	/**
	 * Process all pending images in parallel
	 */
	private async processBatch(): Promise<void> {
		if (this.pendingTasks.length === 0) return;

		console.log(
			`🚀 Processing ${this.pendingTasks.length} images in parallel...`
		);
		const startTime = performance.now();

		// Copy and clear the queue
		const tasks = [...this.pendingTasks];
		this.pendingTasks = [];
		this.processingTimer = null;

		try {
			// Update all elements to show loading
			tasks.forEach((task, index) => {
				const shadow = task.element.shadowRoot;
				if (shadow) {
					if (index === 0 && !modelLoader.isLoaded()) {
						shadow.innerHTML = `<p>⏳ Loading AI model (30-60s)...</p>`;
					} else {
						shadow.innerHTML = `<p>⏳ Generating description...</p>`;
					}
				}
			});

			// Generate all captions in parallel
			const images = tasks.map((t) => ({ src: t.src, language: t.language }));
			const captions = await modelLoader.generateCaptions(images);

			// Update all elements with results
			tasks.forEach((task, index) => {
				const shadow = task.element.shadowRoot;
				if (shadow && captions[index]) {
					shadow.innerHTML = `<p>✅ ${captions[index]}</p>`;
				}
			});

			const duration = ((performance.now() - startTime) / 1000).toFixed(2);
			console.log(
				`✅ Processed ${tasks.length} images in ${duration}s (${(
					parseFloat(duration) / tasks.length
				).toFixed(2)}s per image)`
			);
		} catch (err) {
			console.error("❌ Batch processing failed:", err);

			// Show error on all pending elements
			tasks.forEach((task) => {
				const shadow = task.element.shadowRoot;
				if (shadow) {
					shadow.innerHTML = `<p>❌ Failed: ${
						err instanceof Error ? err.message : String(err)
					}</p>`;
				}
			});
		}
	}

	/**
	 * Get current queue size
	 */
	getQueueSize(): number {
		return this.pendingTasks.length;
	}
}

export const batchProcessor = BatchProcessor.getInstance();
