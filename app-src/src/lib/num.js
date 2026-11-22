const D = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
/** Latin digits → Arabic-Indic digits (the قدرات guide's numerals). */
export const ar = (v) => String(v).replace(/[0-9]/g, (d) => D[+d]);
export const pct = (v) => ar(v) + '٪';
