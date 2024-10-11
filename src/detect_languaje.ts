import { triagramGenerator, normalizeFrecuency } from './triagram_generator';
import fs from 'fs';
import path from 'path';

/**
 * Detects the language of a given text
 * @param textToDetect 
 * @returns 
 */
function detectLanguage(textToDetect: string): { detectedLanguage: string; similarityScore: number } {
    const perfilesPath = path.join(__dirname, '../lang_profile.json');
    const languageProfiles: Record<string, Record<string, number>> = JSON.parse(fs.readFileSync(perfilesPath, 'utf-8'));

    const detectedTrigrams = triagramGenerator(textToDetect);  // Generar trigramas del texto
    const normalizedFrequencies = normalizeFrecuency(detectedTrigrams);  // Normalizar frecuencias del texto

    let bestSimilarity = -1;
    let bestLanguage = '';

    for (const [language, languageProfile] of Object.entries(languageProfiles)) {
        let similarityScore = 0;
        for (const [trigram, trigramFrequency] of Object.entries(normalizedFrequencies)) {
            if (languageProfile[trigram]) {
                similarityScore += Math.min(trigramFrequency, languageProfile[trigram]);
            }
        }
        if (similarityScore > bestSimilarity) {
            bestSimilarity = similarityScore;
            bestLanguage = language;
        }
    }
    return {
        detectedLanguage: bestLanguage,
        similarityScore: bestSimilarity
    };
}

export { detectLanguage };