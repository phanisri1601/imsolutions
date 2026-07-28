/** Public assets in `/public/aboutus` (filenames may contain spaces). */
export function aboutImage(fileName: string): string {
  return `/aboutus/${encodeURIComponent(fileName)}`;
}
