# n-gram-lang-detect

`n-gram-lang-detect` is a Node.js package designed to detect the language of a given string using n-gram analysis. It supports generating language profiles from datasets. Currently, it supports Spanish (ES), English (EN), and Portuguese (PR) languages.

This package is trained using the [Universal Declaration of Human Rights](https://www.ohchr.org/EN/UDHR/Pages/SearchByLang.aspx) in the respective languages. It also generates text using localisms from Argentina, Uruguay, and Brazil.

## Installation

To install `n-gram-lang-detect` you can use npm:

```bash
npm install n-gram-lang-detect
```

## How to use

```javascript
const { detectLanguage } = require('n-gram-lang-detect');
```

``` typescript
import { detectLanguage } from 'n-gram-lang-detect';
```

## Detect language

```javascript
const text = 'Hola, ¿cómo estás?';
const detectedLanguage = detectLanguage(text);
console.log(detectedLanguage);  // { detectedLanguage: string; similarityScore: number }
```

``` typescript
const text = 'Hola, ¿cómo estás?';
const similarityThreshold = 0.004; // this is the default value
const detectedLanguage = detectLanguage(text, similarityThreshold);
console.log(detectedLanguage);  // { detectedLanguage: string; similarityScore: number }
```

``` typescript
const text = 'Hola, ¿cómo estás?';
const similarityThreshold = 0.004;
const customTerminology = [
    { "term": "championes", "mappedTerm": "zapatillas", "locale": "es" },
    { "term": "romanitas", "mappedTerm": "chancletas", "locale": "es" },
    { "term": "capacete de ciclismo", "mappedTerm": "Capacete de proteção", "locale": "pt" },
]
const detectedLanguage = detectLanguage(text, similarityThreshold,customTerminology);
console.log(detectedLanguage);  // { detectedLanguage: string; similarityScore: number }
```

### Parameters

- `text`: The text to detect the language.
- `similarityThreshold`: The minimum similarity score to consider a language detected. Default value is 0.004.
- `customTerminology`: A list of custom terminology to use in the detection. The recommended format is an array of objects with the following properties: term, mappedTerm, locale and the mappedTerm should be in the same language as the locale and should be a synonym of the term.
  