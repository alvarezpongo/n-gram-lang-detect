"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeFrecuency = exports.triagramGenerator = exports.cleanText = void 0;
function cleanText(text) {
    return text
        .toLowerCase()
        .replace(/[0-9]/g, '')
        .replace(/[^\w\s]|_/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}
exports.cleanText = cleanText;
function triagramGenerator(text) {
    const triagrams = {};
    const sanitizeText = cleanText(text);
    for (let i = 0; i < sanitizeText.length - 2; i++) {
        const trigrama = sanitizeText.substring(i, i + 3);
        if (triagrams[trigrama]) {
            triagrams[trigrama] += 1;
        }
        else {
            triagrams[trigrama] = 1;
        }
    }
    return triagrams;
}
exports.triagramGenerator = triagramGenerator;
function normalizeFrecuency(trigramas) {
    const total = Object.values(trigramas).reduce((sum, count) => sum + count, 0);
    const perfilLenguaje = {};
    for (const [trigrama, cuenta] of Object.entries(trigramas)) {
        perfilLenguaje[trigrama] = cuenta / total;
    }
    return perfilLenguaje;
}
exports.normalizeFrecuency = normalizeFrecuency;
//# sourceMappingURL=triagram_generator.js.map