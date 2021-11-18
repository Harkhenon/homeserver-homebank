import traduction from './traduction.json';

export const traduceTo = (lang, word) => {
    return traduction[lang][word] !== undefined ? word.replace(word, traduction[lang][word]) : word;
}