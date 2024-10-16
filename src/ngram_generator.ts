/**
 * Cleans the text of unwanted characters and converts it to lowercase
 * @param text
 * @returns 
 */
function cleanText(text: string): string {
    return text
        .toLowerCase()
        .replace(/[0-9]/g, '') // Remove numbers
        .replace(/[^\p{L}\s]|_/gu, '') // Remove punctuation but keep all letters, including accented
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .trim(); // Remove trailing spaces
}

/**
 * Generates n-grams (uni-grams, bi-grams, tri-grams) from the text
 * @param text
 * @param n
 * @returns 
 */
function generateNGrams(text: string, n: number): Record<string, number> {
    const ngrams: Record<string, number> = {};
    for (let i = 0; i <= text.length - n; i++) {
        const ngram = text.substring(i, i + n);
        if (ngrams[ngram]) {
            ngrams[ngram] += 1;  // Increment if it already exists
        } else {
            ngrams[ngram] = 1;  // Initialize the count if it doesn't exist
        }
    }
    return ngrams;
}

/**
 * Generates uni-grams, bi-grams, and tri-grams from the text
 * @param text
 * @returns 
 */
function ngramGenerator(text: string): Record<string, number> {
    const sanitizedText = cleanText(text);  // Clean the text for consistency
    const bigrams = generateNGrams(sanitizedText, 2);
    const trigrams = generateNGrams(sanitizedText, 3);

     // Assign weights to n-grams
     const weightedNGrams: Record<string, number> = {};

     for (const [ngram, count] of Object.entries(bigrams)) {
         weightedNGrams[ngram] = (weightedNGrams[ngram] || 0) + count * 2;  // Weight for bi-grams
     }
 
     for (const [ngram, count] of Object.entries(trigrams)) {
         weightedNGrams[ngram] = (weightedNGrams[ngram] || 0) + count * 3;  // Weight for tri-grams
     }
 
     return weightedNGrams;
}

/**
 * Normalizes the frequency of trigrams 
 * @param trigramas
 * @returns 
 */
function normalizeFrecuency(ngrams: Record<string, number>): Record<string, number> {
    const total = Object.values(ngrams).reduce((sum, count) => sum + count, 0);  // Sum all frequencies
    const normalizedProfile: Record<string, number> = {};

    for (const [ngram, count] of Object.entries(ngrams)) {
        normalizedProfile[ngram] = count / total;  // Normalize the frequency
    }

    return normalizedProfile;
}

export { cleanText, ngramGenerator, normalizeFrecuency };