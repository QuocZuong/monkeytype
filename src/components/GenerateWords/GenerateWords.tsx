import React from "react";
import classNames from "classnames/bind";
import styles from "./GenerateWords.module.scss";
import { faker } from "@faker-js/faker";

import Character from "../Character";
import Caret from "../Caret";
import { GenerateWordsProps } from "@/Models/GenerateWordsProps";
const cx = classNames.bind(styles);

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
 * @returns {string} return a string generated from FakerJS
 */
function fakerGeneratorCustom(length: number, hasPunctuation: boolean, hasNumber: boolean) {
    let result = "";
    let temp = "";

    temp = faker.word.words(length);

    if (hasPunctuation) {
        temp = addPunctuation(temp);
    }

    if (hasNumber) {
        temp = addNumber(temp);
    }

    result = temp;
    return result;
}

const GenerateWords: React.FC<GenerateWordsProps> = ({ userInput, length, hasPunctuation, hasNumber }) => {
    const words = fakerGeneratorCustom(length, hasPunctuation, hasNumber);

    /**
     * This function get input from user and convert to Character (span tag)
     * @param {Array[]} userInput get a array of character
     * @returns {ReactNode} return an output which create effect typing for web
     */
    const generateCharacters = (userInput: Array<string>) => {
        return (
            <div className={cx("output")}>
                {userInput.map((char, index) => {
                    return (
                        <Character key={char + "_" + index} userInput={char} expectInput={words[index]}>
                            {words[index]}
                        </Character>
                    );
                })}
                <Caret></Caret>
            </div>
        );
    };

    const typedCharacter = userInput.split("");
    const output = generateCharacters(typedCharacter);
    return (
        <div className={cx("wrapper")}>
            {words} {output}
        </div>
    );
};

export default GenerateWords;
