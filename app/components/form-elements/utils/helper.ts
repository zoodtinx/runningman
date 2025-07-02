export function toSentenceCase(str: string) {
   return str.replace(/-/g, " ").replace(/^./, (s) => s.toUpperCase());
}
