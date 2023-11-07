/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { KeyboardEvent, memo, useEffect } from "react";
import classNames from "classnames/bind";

import { setGlobalState, useGlobalState } from "@/globalState";
import textRuler from "../../util/textRuler";
import Caret from "../Caret";
import styles from "./GenerateWords.module.scss";
import Mode from "../../Models/TypingModes";
import { isLineBreak } from "typescript/lib/tsserverlibrary";

const cx = classNames.bind(styles);

const NEW_LINE_PADDING_CARRET_TOP = 53.5;
const CONTAINER_WIDTH = 1200;
const CHARACTER_WITDH = 21.61;

interface CaretPosision {
    top: number;
    left: number;
}

const caretPosition: { current: CaretPosision; history: CaretPosision[] } = {
    current: {
        top: 10,
        left: 0,
    },
    history: [],
};

/**
 * Move the caret to a new line.
 * @param {Number} pos The current caret's position.
 * @returns {CaretPosision} The new caret's position after moved to the new line.
 */
function moveToNewLine(pos: CaretPosision): CaretPosision {
    const newPos: CaretPosision = {
        top: pos.top + NEW_LINE_PADDING_CARRET_TOP,
        left: 10,
    };
    console.log("newPos: ", newPos);
    return newPos;
}

/**
 * Initialize the caret's position.
 * @param {CaretPosision} pos The current caret's position.
 * @param {Number} charNum The number of characters that user has typed.
 * @param {Number[]} breakingIndices The indices of breaking spaces.
 * @returns {CaretPosision} The new caret's position after initialized.
 */
function initCaretPosition(pos: CaretPosision, charNum: number, breakingIndices: number[]): CaretPosision {
    /** The current user typing text's index. */
    const textIndex = charNum - 1;
    /** The nearest point that make the line breaking. */
    const nearestBreakingPoint = Math.max(...breakingIndices.filter((val) => val <= textIndex), 0);
    /** The number of word on the current line. */
    const wordNumOnLine = nearestBreakingPoint == 0 ? charNum : textIndex % nearestBreakingPoint;

    console.log(breakingIndices);
    console.log(`textIndex: ${textIndex} - wordNumOnLine: ${wordNumOnLine} - charNum: ${charNum}`);
    console.log(`nearestBreakingPoint: ${nearestBreakingPoint}`);

    const newPos: CaretPosision = {
        ...pos,
        left: wordNumOnLine * CHARACTER_WITDH,
    };

    console.log(newPos);
    return newPos;
}

const GenerateWords = ({ words, mode, isReload }: { words: string; mode: Mode; isReload: boolean }) => {
    const [userInput] = useGlobalState("userInput");
    const characterFromUserInput = userInput.split("");
    const breakingIndices = textRuler.getBreakingSpaceIndices(words, CHARACTER_WITDH, CONTAINER_WIDTH);

    caretPosition.current = isReload
        ? { top: 10, left: 0 }
        : initCaretPosition(caretPosition.current, characterFromUserInput.length, breakingIndices);
    caretPosition.current = isReload
        ? { top: 10, left: 0 }
        : initCaretPosition(caretPosition.current, characterFromUserInput.length, breakingIndices);
    caretPosition.history.push({ top: caretPosition.current.top, left: caretPosition.current.left });

    const hanldeLineChange = () => {
        caretPosition["current"] = moveToNewLine(caretPosition.current);

        caretPosition.history.pop();

        console.log(caretPosition);
        console.log("moved to new line");
    };

    const handleDelete = (event: globalThis.KeyboardEvent) => {
        const key = event.key;

        console.log(caretPosition);
        if (key === "Backspace" || key == "Delete") {
            caretPosition.history.pop();

            const previousPosition: CaretPosision = caretPosition.history.pop() || { top: 10, left: 0 };

            console.log(previousPosition);

            if (previousPosition) {
                caretPosition.current = { ...previousPosition };
            }
        }
    };

    useEffect(() => {
        breakingIndices.forEach((index) => {
            if (index === userInput.length) {
                console.log("line changed");
                hanldeLineChange();
            }
        });

        window.addEventListener("keydown", (event) => handleDelete(event));

        return () => {
            window.removeEventListener("keydown", handleDelete);
        };
    }, [userInput]);
    let currentIndex = 0;

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
                    if (currentIndex === index) {
                        return (
                            <span key={index} className={cx("letter", "active")}>
                                {character}
                            </span>
                        );
                    } else {
                        return (
                            <span key={index} className={cx("letter")}>
                                {character}
                            </span>
                        );
                    }
                } else if (character === characterFromUserInput[index]) {
                    currentIndex = index + 1;
                    return (
                        <span key={index} className={cx("letter", "correct")}>
                            {character}
                        </span>
                    );
                } else if (character !== characterFromUserInput[index]) {
                    currentIndex = index + 1;
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
            {wordsToRender}
            {/* <Caret top={caretPosition.current.top} left={caretPosition.current.left}></Caret>  */}
        </div>
    );
};

export default memo(GenerateWords);
