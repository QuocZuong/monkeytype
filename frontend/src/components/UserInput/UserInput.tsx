/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./UserInput.module.scss";
import Caret from "../Caret";
import Character from "../Character";
import { setGlobalState, useGlobalState } from "@/globalState";
import TextRuler from "../../util/textRuler";
import Header from "../Header";

const cx = classNames.bind(styles);

/**
 * This function get input from user and convert to Character (span tag)
 * @param {Array[]} userInput get a array of character
 * @param {string} words get words from
 * @returns {ReactNode} return an output which create effect typing for web
 */
// const generateCharacters = (userInput: Array<string>, words: string) => {
//     return (
//         <div className={cx("output")}>
//             {userInput.map((char, index) => {
//                 return (
//                     <Character key={char + "_" + index} userInput={char} expectInput={words[index]}>
//                         {words[index]}
//                     </Character>
//                 );
//             })}
//             <Caret></Caret>
//         </div>
//     );
// };

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
    // const output = generateCharacters(typedCharacter, words);

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const preventedKeys = ["Backspace", "c", "v", "x", "a"];

        if (event.ctrlKey || event.metaKey) {
            preventedKeys.forEach((key) => {
                if (event.key === key) {
                    event.preventDefault();
                }
            });
        }
    };

    useEffect(() => {
        const onClickKeyboard = () => textAreaRef?.current?.focus();

        window.addEventListener("keypress", onClickKeyboard);

        return () => {
            window.removeEventListener("keypress", onClickKeyboard);
        };
    });

    type Line = {
        line: number;
        content: string;
        lineBreakIndex: number;
        width?: number;
    };

    useEffect(() => {
        const font = "3.6rem 'Roboto Mono', monospace";
        const divWidth = 1200;
        const spaceWidth = TextRuler.getTextWidth(" ", font);
        const totalTextWidth = TextRuler.getTextWidth(words, font);

        const lines: [Line] = [{ line: 0, content: "", lineBreakIndex: 0 }];

        lines.pop();

        // Get all the breaking points
        for (let i = 1; i < Math.ceil(totalTextWidth / divWidth); i++) {
            for (let j = 0; j < words.length; j++) {
                // Set up buffer
                let buffer: string = "";
                let bufferWidth: number = 0;

                for (let z = 0; z <= j; z++) {
                    buffer += words[z];
                }

                bufferWidth = TextRuler.getTextWidth(buffer, font);

                let nextWordWidth = 0;
                let nextWord = "";

                // Get the next word and its width
                if (words[j + 1] === " ") {
                    // When the current character is a space, get the next word after this space
                    for (let z = j + 2; z < words.length; z++) {
                        nextWord += words[z];

                        if (words[z + 1] === " ") {
                            break;
                        }
                    }
                } else {
                    continue;

                    // When the next character is not a space, wait until the next space then get the next word
                    for (let z = j + 1, spaceCount = 0; spaceCount < 2 && z < words.length; z++) {
                        if (spaceCount === 1 && words[z] !== " ") {
                            nextWord += words[z];
                        }

                        if (words[z] === " ") {
                            spaceCount++;
                        }
                    }
                }

                nextWordWidth = TextRuler.getTextWidth(nextWord, font);

                // Logger
                // console.log({
                //     bufferWidth: bufferWidth,
                //     currentIndex: j,
                //     currentChar: words[j],
                //     buffer: buffer,
                //     nextWordWidth: nextWordWidth,
                //     nextWord: nextWord,
                //     totalWidthPlusNextWord: bufferWidth + spaceWidth + nextWordWidth,
                // });

                // Check if the next word width is bigger than the div width
                if (bufferWidth + spaceWidth + nextWordWidth > divWidth * i) {
                    // console.log(`Added this index!: ${j}`);
                    lines.push({ line: i, content: buffer, lineBreakIndex: j, width: bufferWidth });
                    break;
                }
            }
        }

        // console.log(lines);

        // lines.forEach((line) => {
        // console.log(`test #${line.line} string width: ${TextRuler.getTextWidth(line.content, font)}`);
        // });
    }, []);

    useEffect(() => {
        if (textAreaRef.current) {
            const font = "3.6rem 'Roboto Mono', monospace";

            const inputString = textAreaRef.current.value.toString();
            // console.log(`Num of characters: ${inputString.length}`);

            const length = TextRuler.getTextWidth(inputString, font);
            // console.log(length);
        }
    }, [userInput]);

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
            {/* <div className={cx("output")} style={{ width: "100%" }}> */}
            {/* {output} */}
            {/* </div> */}
        </>
    );
};

export default UserInput;
