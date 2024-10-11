/**
 * Cleans the text of unwanted characters and converts it to lowercase
 * @param text
 * @returns 
 */
function cleanText(text: string): string {
    return text
        .toLowerCase()
        // .replace(/\.\s*/g, '_') // Replace periods with underscore
        .replace(/[0-9]/g, '') // Remove numbers
        .replace(/[^\w\s]|_/g, '') // Remove punctuation
        // .replace(/[&\/\\#,+()$~%.":*?<>{}]/g,'') // Remove special characters
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .trim(); // Remove trailing spaces
}

/**
 * Generates trigrams from the text
 * @param text
 * @returns 
 */
function triagramGenerator(text: string): Record<string, number> {
    const triagrams: Record<string, number> = {};
    const sanitizeText = cleanText(text);  // Convertir a minúsculas para consistencia

    for (let i = 0; i < sanitizeText.length - 2; i++) {
        const trigrama = sanitizeText.substring(i, i + 3);  // Extraer trigramas de 3 caracteres
        if (triagrams[trigrama]) {
            triagrams[trigrama] += 1;  // Incrementar si ya existe
        } else {
            triagrams[trigrama] = 1;  // Iniciar el conteo si no existe
        }
    }
    return triagrams;
}

/**
 * Normalizes the frequency of trigrams 
 * @param trigramas
 * @returns 
 */
function normalizeFrecuency(trigramas: Record<string, number>): Record<string, number> {
    const total = Object.values(trigramas).reduce((sum, count) => sum + count, 0);  // Sumar todas las frecuencias
    const perfilLenguaje: Record<string, number> = {};

    for (const [trigrama, cuenta] of Object.entries(trigramas)) {
        perfilLenguaje[trigrama] = cuenta / total;  // Calcular frecuencia relativa
    }

    return perfilLenguaje;
}

export { cleanText, triagramGenerator, normalizeFrecuency };