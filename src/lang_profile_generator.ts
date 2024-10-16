import * as fs from 'fs';
import * as path from 'path';
import { ngramGenerator, normalizeFrecuency } from './ngram_generator';

/**
 * Generates the language profile from the dataset
 * @param datasetFolder - The folder containing the dataset
 * @param outputFile - The output file to write the language profile to
 */
function generateLangProfile(datasetFolder: string, outputFile: string): void {
    let files: string[];
    try {
        files = fs.readdirSync(datasetFolder);
    } catch (error: any) {
        console.error(`Error reading dataset folder: ${error.message}`);
        return;
    }

    const langProfile: Record<string, Record<string, number>> = {};
    files.forEach(file => {
        const filePath = path.join(datasetFolder, file);
        let text: string;
        try {
            text = fs.readFileSync(filePath, 'utf-8');
            console.log(`Reading file ${file}... with ${text.length} characters`);
        } catch (error: any) {
            console.error(`Error reading file ${file}: ${error.message}`);
            return;
        }

        const ngrams = ngramGenerator(text);
        console.log(`Generated ${Object.keys(ngrams).length} n-grams for ${file}`);
        const normalizedTriagrams = normalizeFrecuency(ngrams);
        const fileNameWithoutExtension = path.basename(file, '.txt');
        langProfile[fileNameWithoutExtension] = normalizedTriagrams;
    });

    try {
        fs.writeFileSync(outputFile, JSON.stringify(langProfile, null, 2), 'utf-8');
        console.log(`Language profile successfully written to ${outputFile}`);
    } catch (error: any) {
        console.error(`Error writing output file: ${error.message}`);
    }
}

// Example usage
generateLangProfile('./datasets', './lang_profile.json');