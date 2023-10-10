/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./UserInput.module.scss";
import Caret from "../Caret";
import Character from "../Character";
import { setGlobalState, useGlobalState } from "@/typingState";

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

const UserInput = ({
    words,
    isReload,
    setReload,
}: {
    words: string;
    isReload: boolean;
    setReload: (isReload: boolean) => void;
}) => {
    const [userInput, setUserInput] = useState<string>("");

    const typedCharacter = userInput.split("");
    const output = generateCharacters(typedCharacter, words);

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.ctrlKey || event.metaKey) {
            if (event.key === "c" || event.key === "v" || event.key === "x" || event.key === "a") {
                event.preventDefault();
            }
        }
    };

    useEffect(() => {
        const onClickKeyboard = () => textAreaRef?.current?.focus();

        window.addEventListener("keypress", onClickKeyboard);

        return () => {
            window.removeEventListener("keypress", onClickKeyboard);
        };
    });

    useEffect(() => {
        if (isReload) {
            setUserInput("");
            setGlobalState("userInput", "");
            setReload(false);
            if (textAreaRef.current) {
                textAreaRef.current.value = "";
            }
        }
    }, [isReload, setReload]);

    return (
        <>
            <textarea
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                ref={textAreaRef}
                onChange={(event) => {
                    setUserInput(event.target.value);
                    setGlobalState("userInput", event.target.value);
                }}
                onKeyDown={handleKeyDown}
                className={cx("user-typing")}
            ></textarea>
            <div className={cx("output")} style={{ width: 1100 }}>
                {output}
            </div>
        </>
    );
};

export default UserInput;
