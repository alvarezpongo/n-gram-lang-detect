"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLanguage = void 0;
const triagram_generator_1 = require("./triagram_generator");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function detectLanguage(textToDetect) {
    const perfilesPath = path_1.default.join(__dirname, '../lang_profile.json');
    const languageProfiles = JSON.parse(fs_1.default.readFileSync(perfilesPath, 'utf-8'));
    const detectedTrigrams = (0, triagram_generator_1.triagramGenerator)(textToDetect);
    const normalizedFrequencies = (0, triagram_generator_1.normalizeFrecuency)(detectedTrigrams);
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
exports.detectLanguage = detectLanguage;
//# sourceMappingURL=detect_languaje.js.map