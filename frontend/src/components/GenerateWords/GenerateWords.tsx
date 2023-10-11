/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./GenerateWords.module.scss";
import { useGlobalState } from "@/typingState";

const cx = classNames.bind(styles);

const GenerateWords = ({ words }: { words: string }) => {
    const [userInput] = useGlobalState("userInput");
    const characterFromUserInput = userInput.split("");

    const wordsToRender = words.split("").map((character, index) => {
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
    });

    return <div className={cx("wrapper")}>{wordsToRender}</div>;
};

export default memo(GenerateWords);
