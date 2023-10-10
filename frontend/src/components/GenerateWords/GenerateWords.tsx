/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo } from "react";
import classNames from "classnames/bind";
import styles from "./GenerateWords.module.scss";
import { useGlobalState } from "@/typingState";

const cx = classNames.bind(styles);

const GenerateWords = ({ words }: { words: string }) => {
    const [userInput] = useGlobalState("userInput");
    const wordFromUserInput = userInput.split(" ");
    const characterFromUserInput = wordFromUserInput.toString().split("");
    const wordsToRender = words.split(" ").map((word, index) => {
        return (
            <div key={word + index} className={cx("word")}>
                {word.split("").map((letter, letterIndex) => {
                    return (
                        <span key={letter + letterIndex} className={cx("letter")}>
                            {letter}
                        </span>
                    );
                })}
            </div>
        );
    });

    return <div className={cx("wrapper")}>{wordsToRender}</div>;
};

export default memo(GenerateWords);
