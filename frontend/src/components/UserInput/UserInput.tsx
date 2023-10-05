import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./UserInput.module.scss";
import Caret from "../Caret";
import Character from "../Character";

const cx = classNames.bind(styles);

/**
 * This function get input from user and convert to Character (span tag)
 * @param {Array[]} userInput get a array of character
 * @param {string} words get words from
 * @returns {ReactNode} return an output which create effect typing for web
 */
const generateCharacters = (userInput: Array<string>, words: string) => {
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

const UserInput = ({ words }: { words: string }) => {
    const [userInput, setUserInput] = useState<string>("");

    const typedCharacter = userInput.split("");
    const output = generateCharacters(typedCharacter, words);

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const onClickKeyboard = () => textAreaRef?.current?.focus();

        window.addEventListener("keypress", onClickKeyboard);

        return () => {
            window.removeEventListener("keypress", onClickKeyboard);
        };
    });

    return (
        <>
            <textarea
                ref={textAreaRef}
                onChange={(event) => {
                    setUserInput(event.target.value);
                }}
                className={cx("user-typing")}
            ></textarea>
            <div className={cx("output")}>{output}</div>
        </>
    );
};

export default UserInput;
