declare function cleanText(text: string): string;
declare function triagramGenerator(text: string): Record<string, number>;
declare function normalizeFrecuency(trigramas: Record<string, number>): Record<string, number>;
export { cleanText, triagramGenerator, normalizeFrecuency };
