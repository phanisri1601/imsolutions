/** Public assets in `/public/home` (filenames may contain spaces). */
export function homeImage(fileName: string): string {
  return `/home/${encodeURIComponent(fileName)}`;
}
