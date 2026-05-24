function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Seed/fallback: plain paragraphs → HTML for CKEditor fields. */
export function paragraphsToHtml(paragraphs: string[]): string {
  return paragraphs
    .map((text) => `<p>${escapeHtml(text)}</p>`)
    .join('');
}
