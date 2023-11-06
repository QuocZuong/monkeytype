import { faker } from "@faker-js/faker";
import generateWordsBySource from "./generateWordsBySource";

/**
 * using to add punctuation to string
 * @param {string} fakerString using faker to generate a string
 * @returns {string} return the string with punctuation
 */
function addPunctuation(fakerString: string) {
    const words = fakerString.split(" ");
    return words
        .map((word) => {
            if (Math.random() < 0.1) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            if (Math.random() < 0.07) {
                if (Math.random() < 0.5) {
                    return word + ",";
                } else {
                    return word + ".";
                }
            } else {
                return word;
            }
        })
        .join(" ");
}

/**
 * using to add number to string
 * @param {string} fakerString using faker to generate a string
 * @returns {string} return the string with number from 1 to 999
 */
function addNumber(fakerString: string) {
    const words = fakerString.split(" ");
    return words
        .map((word) => {
            if (Math.random() < 0.07) {
                const numbers = faker.number.int({ min: 1, max: 999 }).toString();
                return word + " " + numbers;
            } else {
                return word;
            }
        })
        .join(" ");
}

/**
 * using FakerJS to generate random words
 * @param {number} length length of word to generate
 * @param {boolean} hasPunctuation generate with punctuation (capitalize the first letter) with 7% probability of appearing
 * @param {boolean} hasNumber generate with number with 7% probability of appearing
 * @param {string} language language of word to generate
 * @returns {string} return a string generated from FakerJS
 */
export function fakerGeneratorCustom(length: number, hasPunctuation: boolean, hasNumber: boolean, language: string) {
    let result = "";
    let temp = "";

    if (language !== "en") {
        temp = generateWordsBySource(language, length);
    } else temp = faker.word.words(length || 30);

    if (hasPunctuation) {
        temp = addPunctuation(temp);
    }

    if (hasNumber) {
        temp = addNumber(temp);
    }

    result = temp;
    return result;
}
