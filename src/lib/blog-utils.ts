const WORDS_PER_MINUTE = 200;

/**
 * Estimated read time in minutes from word count. Safe to use on server and client.
 */
export function getMinRead(wordCount: number): number {
  if (wordCount <= 0) return 1;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
