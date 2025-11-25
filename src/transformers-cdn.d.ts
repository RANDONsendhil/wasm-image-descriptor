/** @format */

// Type declarations for @xenova/transformers from CDN
declare module "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0" {
	export function pipeline(
		task: string,
		model?: string,
		options?: any
	): Promise<any>;

	export const env: {
		allowLocalModels: boolean;
		allowRemoteModels: boolean;
		useBrowserCache: boolean;
		localModelPath?: string;
	};
}
