import * as fs from 'fs';
import * as path from 'path';
import { triagramGenerator, normalizeFrecuency } from './triagram_generator';

function generateLangProfile(datasetFolder: string, outputFile: string): void {
    const files = fs.readdirSync(datasetFolder);
    const langProfile: Record<string, Record<string, number>> = {};

    files.forEach(file => {
        const filePath = path.join(datasetFolder, file);
        const text = fs.readFileSync(filePath, 'utf-8');
        const triagrams = triagramGenerator(text);
        const normalizedTriagrams = normalizeFrecuency(triagrams);
        const fileNameWithoutExtension = path.basename(file, '.txt');
        langProfile[fileNameWithoutExtension] = normalizedTriagrams;
    });
    
    fs.writeFileSync(outputFile, JSON.stringify(langProfile, null, 2), 'utf-8');
}

// Example usage
generateLangProfile('./datasets', './lang_profile.json');