import { SOURCES } from "@/shared/sources";

/**
 *
 * @param {string} language language of word to generate
 * @param {number} length length of string to generate
 * @returns {string} return a string generated
 */
function generateWordsBySource(language: string, length: number) {
    const content = SOURCES.find((source) => source.code === language);

    const words = content?.content.split(" ");
    if (words === undefined) return "";

    let randomWords = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        randomWords += `${word} `;
    }

    return randomWords;
}

export default generateWordsBySource;
