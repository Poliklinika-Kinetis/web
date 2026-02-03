/**
 * Prepends the basePath to asset URLs for proper loading in different deployment environments
 * @param path - The asset path (e.g., "/assets/logo.svg")
 * @returns The full path with basePath prepended if needed
 */
export function assetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}`;
}
