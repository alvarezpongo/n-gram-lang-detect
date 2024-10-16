import { ngramGenerator, normalizeFrecuency } from './ngram_generator';
import fs from 'fs';
import path from 'path';

function generateCharacterFrequencies(text: string): Record<string, number> {
    const frequencies: Record<string, number> = {};
    for (const char of text) {
        if (frequencies[char]) {
            frequencies[char] += 1;
        } else {
            frequencies[char] = 1;
        }
    }
    return frequencies;
}
/**
 * Detects the language of a given text based on language profiles
 * @param textToDetect - The text to detect the language of
 * @param similarityThreshold - The threshold for similarity score to consider a language match
 * @returns An object containing the detected language and its similarity score
 */
function detectLanguage(
    textToDetect: string, 
    similarityThreshold: number = 0.004,
    customTerminology?: Array<{ term: string, mappedTerm: string, locale: string }>
): { detectedLanguage: string; similarityScore: number } {
    const perfilesPath = path.join(__dirname, '../lang_profile.json');
    const customTerminologyPath = path.join(__dirname, '../custom_terminology.json');

    let languageProfiles: Record<string, Record<string, number>>;

    // Error handling for file reading and JSON parsing
    try {
        // Read language profiles
        const fileContent = fs.readFileSync(perfilesPath, 'utf-8');
        languageProfiles = JSON.parse(fileContent);

        if (!customTerminology) {
            const terminologyContent = fs.readFileSync(customTerminologyPath, 'utf-8');
            customTerminology = JSON.parse(terminologyContent);
        }

    } catch (error) {
        console.error('Error reading or parsing language profiles:', error);
        return { detectedLanguage: 'unknown', similarityScore: 0 };
    }

    // Apply locale-specific term mapping based on custom terminology
    let detectedLocale = '';
    customTerminology!.forEach(({ term, mappedTerm, locale }) => {
        const regex = new RegExp(term, 'gi');  // Match the local term (case-insensitive)
        if (regex.test(textToDetect)) {
            textToDetect = textToDetect.replace(regex, mappedTerm);  // Replace with the standardized term
            detectedLocale = locale;  // Capture the locale for use in detection
        }
    });

    const detectedTrigrams = ngramGenerator(textToDetect);  // Generar trigramas del texto
    const normalizedFrequencies = normalizeFrecuency(detectedTrigrams);  // Normalizar frecuencias del texto
    const charFrequencies = generateCharacterFrequencies(textToDetect);  // Generate character frequencies

    let bestSimilarity = -1;
    let bestLanguage = '';

    for (const [language, languageProfile] of Object.entries(languageProfiles)) {
        let similarityScore = 0;

        for (const [ngram, ngramFrequency] of Object.entries(normalizedFrequencies)) {
            if (languageProfile[ngram]) {
                similarityScore += Math.min(ngramFrequency, languageProfile[ngram]);
            }
        }

        for (const [char, charFrequency] of Object.entries(charFrequencies)) {
            if (languageProfile[char]) {
                similarityScore += Math.min(charFrequency, languageProfile[char]);
            }
        }

        if (similarityScore > bestSimilarity) {
            bestSimilarity = similarityScore;
            bestLanguage = language;
        }
    }

    // If a locale was detected from custom terminology, give that locale instead the detected language
    if (detectedLocale && bestLanguage !== 'unknown' && bestSimilarity < similarityThreshold) {
        bestLanguage = detectedLocale;
    }

    if (bestSimilarity < similarityThreshold) {
        return {
            detectedLanguage: 'unknown',
            similarityScore: bestSimilarity
        };
    }

    return {
        detectedLanguage: bestLanguage,
        similarityScore: bestSimilarity
    };
}

export { detectLanguage };