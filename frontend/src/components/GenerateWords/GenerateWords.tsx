/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { KeyboardEvent, memo, useEffect } from "react";
import classNames from "classnames/bind";

import { setGlobalState, useGlobalState } from "@/typingState";
import textRuler from "../../util/textRuler";
import Caret from "../Caret";
import styles from "./GenerateWords.module.scss";
import Mode from "../../Models/TypingModes";

const cx = classNames.bind(styles);

const positionHistory: { top: number }[] = [];
const caretPosition = {
    top: 10,
    left: 0,
};
const GenerateWords = ({ words, mode }: { words: string; mode: Mode }) => {
    const [userInput] = useGlobalState("userInput");
    const characterFromUserInput = userInput.split("");
    const width = textRuler.getNumberOfLetter(words, 21.61, 1200);

    caretPosition.left = characterFromUserInput.length * 21.61;
    positionHistory.push({ top: caretPosition.top });
    width.forEach((width) => {
        if (width === userInput.length) {
            const updateUserInput = userInput + "\n";
            setGlobalState("userInput", updateUserInput);
            caretPosition.top += 53.5;
            caretPosition.left = 0;
        }
    });

    useEffect(() => {
        const handleDelete = (event: globalThis.KeyboardEvent) => {
            const key = event.keyCode || event.charCode;

            if (key == 8 || key == 46) {
                const previousPosition = { top: caretPosition.top };
                positionHistory.push(previousPosition);
                console.log("previousPosition: ", previousPosition);
                console.log("all" + positionHistory);

                if (previousPosition) {
                    caretPosition.top = previousPosition.top;
                }
            }
        };

        window.addEventListener("keydown", (event) => handleDelete(event));

        return () => {
            window.removeEventListener("keydown", handleDelete);
        };
    }, [positionHistory]);

    const wordsToRender = (mode == Mode.zen ? userInput : words).split("").map((character, index) => {
        switch (mode) {
            case Mode.zen: {
                if (character === " ") {
                    return (
                        <span key={index} className={cx("letter", "space")}>
                            {" "}
                        </span>
                    );
                } else {
                    return (
                        <span key={index} className={cx("letter", "correct")}>
                            {character}
                        </span>
                    );
                }
            }
            default: {
                if (
                    character === " " &&
                    characterFromUserInput[index] !== undefined &&
                    characterFromUserInput[index] !== character
                ) {
                    return (
                        <span key={index} className={cx("letter", "wrong-space")}>
                            {" "}
                        </span>
                    );
                } else if (character === " ") {
                    return (
                        <span key={index} className={cx("letter", "space")}>
                            {" "}
                        </span>
                    );
                } else if (characterFromUserInput[index] === undefined) {
                    return (
                        <span key={index} className={cx("letter")}>
                            {character}
                        </span>
                    );
                } else if (character === characterFromUserInput[index]) {
                    return (
                        <span key={index} className={cx("letter", "correct")}>
                            {character}
                        </span>
                    );
                } else if (character !== characterFromUserInput[index]) {
                    return (
                        <span key={index} className={cx("letter", "incorrect")}>
                            {character}
                        </span>
                    );
                }
            }
        }
    });

    return (
        <div className={cx("wrapper")}>
            {wordsToRender} <Caret top={caretPosition.top} left={caretPosition.left}></Caret>
        </div>
    );
};

export default memo(GenerateWords);
