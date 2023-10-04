import React from "react";
import classNames from "classnames/bind";
import styles from "./GenerateWords.module.scss";
import { faker } from "@faker-js/faker";

import Character from "../Character";
import Caret from "../Caret";
const cx = classNames.bind(styles);

// using FakerJS to generate random words
const words = Array.from({ length: 25 }, () => faker.random.word()).join(" ");

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

/**
 * This will get user typing and compare it with random word generate from FakerJS
 * @param {string}userInput input from user in UserInput component
 * @returns {ReactNode} return a component
 */
const GenerateWords = ({ userInput }: { userInput: string }) => {
    const typedCharacter = userInput.split("");
    const output = generateCharacters(typedCharacter);
    console.log(typedCharacter);
    return (
        <div className={cx("wrapper")}>
            {words} {output}
        </div>
    );
};

export default GenerateWords;
