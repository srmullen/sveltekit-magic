/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	user?: {
		issuer: string;
		publicAddress: string;
		email: string;
	};
}
