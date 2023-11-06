/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";
import { setGlobalState, useGlobalState } from "@/globalState";
import {
    faAt,
    faClock,
    faEarthAsia,
    faFont,
    faHashtag,
    faMountain,
    faQuoteLeft,
    faRedo,
    faWrench,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./TypingTest.module.scss";
import GenerateWords from "../GenerateWords";
import Mode from "../../Models/TypingModes";

import UserInput from "../UserInput";
import { fakerGeneratorCustom } from "@/util/generateWords";
import TestResult from "../TestResult/TestResult";
import TypingStates from "@/Models/TypingStates";
import TypingModes from "../../Models/TypingModes";

const cx = classNames.bind(styles);

const TypingTest = () => {
    const [length] = useGlobalState("length");
    const [hasNumber] = useGlobalState("hasNumber");
    const [hasPunctuation] = useGlobalState("hasPunctuation");
    const [typingState] = useGlobalState("typingState");
    const [mode] = useGlobalState("mode");

    const [isReload, setReload] = useState<boolean>(false);
    const [indexActivatedButton, setIndexActivatedButton] = useState<number>(2);
    const [numberOfWords, setNumberOfWords] = useState(50);

    const randomWords = fakerGeneratorCustom(numberOfWords, hasPunctuation, hasNumber);

    const punctuationClasses = cx("text-btn", hasPunctuation && "active");
    const numberClasses = cx("text-btn", hasNumber && "active");

    const timeClasses = cx("text-btn", mode === Mode.time && "active");
    const wordsClasses = cx("text-btn", mode === Mode.words && "active");
    const quoteClasses = cx("text-btn", mode === Mode.quote && "active");
    const zenClasses = cx("text-btn", mode === Mode.zen && "active");
    const customClasses = cx("text-btn", mode === Mode.custom && "active");

    const handleReload = () => {
        setReload(true);
    };

    const handleClickMode = (index: number) => {
        setIndexActivatedButton(index);
        if (index === 0) {
            setNumberOfWords(10);
        } else if (index === 1) {
            setNumberOfWords(25);
        } else if (index === 2) {
            setNumberOfWords(50);
        } else if (index === 3) {
            setNumberOfWords(100);
        }
    };

    /**
     * Turn on a mode then turn off all other modes
     * @param {string} mode the mode to toggle
     * @returns {void}
     */
    const toggleMode = (mode: Mode): void => {
        setGlobalState("mode", mode);
        setReload(true);
    };

    return (
        <div className={cx("wrapper")}>
            {typingState === TypingStates.typing && <div>60</div>}

            {typingState === TypingStates.pending && (
                <>
                    <Row className={cx("test-config")}>
                        <Col xs sm={3} className={cx("col")}>
                            <button
                                className={cx(punctuationClasses)}
                                onClick={() => {
                                    setGlobalState("hasPunctuation", !hasPunctuation);
                                }}
                            >
                                <i>
                                    <FontAwesomeIcon icon={faAt}></FontAwesomeIcon>
                                </i>
                                punctuation
                            </button>
                            <button
                                className={numberClasses}
                                onClick={() => {
                                    setGlobalState("hasNumber", !hasNumber);
                                }}
                            >
                                <i>
                                    <FontAwesomeIcon icon={faHashtag}></FontAwesomeIcon>
                                </i>
                                numbers
                            </button>
                            <div className={cx("left-spacer")}></div>
                        </Col>
                        <Col xs sm={6} className={cx("col")}>
                            {/* <button
                                className={timeClasses}
                                onClick={() => {
                                    toggleMode(Mode.time);
                                }}
                            >
                                <i>
                                    <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                </i>
                                time
                            </button> */}
                            <button
                                className={wordsClasses}
                                onClick={() => {
                                    toggleMode(Mode.words);
                                }}
                            >
                                <i>
                                    <FontAwesomeIcon icon={faFont}></FontAwesomeIcon>
                                </i>
                                words
                            </button>
                            {/* <button
                                className={quoteClasses}
                                onClick={() => {
                                    toggleMode(Mode.quote);
                                }}
                            >
                                <i>
                                    <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon>
                                </i>
                                quote
                            </button> */}
                            <button
                                className={zenClasses}
                                onClick={() => {
                                    toggleMode(Mode.zen);
                                }}
                            >
                                <i>
                                    <FontAwesomeIcon icon={faMountain}></FontAwesomeIcon>
                                </i>
                                zen
                            </button>
                            {/* <button
                                className={customClasses}
                                onClick={() => {
                                    toggleMode(Mode.custom);
                                }}
                            >
                                <i>
                                    <FontAwesomeIcon icon={faWrench}></FontAwesomeIcon>
                                </i>
                                custom
                            </button> */}
                        </Col>

                        {!(mode === Mode.zen) && typingState === TypingStates.pending && (
                            <Col xs sm={3} className={cx("col")}>
                                <div className={cx("right-spacer")}></div>
                                <button
                                    className={cx("text-btn", indexActivatedButton === 0 ? "active" : "")}
                                    onClick={() => handleClickMode(0)}
                                >
                                    {mode === "time" ? 15 : 10}
                                </button>
                                <button
                                    className={cx("text-btn", indexActivatedButton === 1 ? "active" : "")}
                                    onClick={() => handleClickMode(1)}
                                >
                                    {mode === "time" ? 30 : 25}
                                </button>
                                <button
                                    className={cx("text-btn", indexActivatedButton === 2 ? "active" : "")}
                                    onClick={() => handleClickMode(2)}
                                >
                                    {mode === "time" ? 60 : 50}
                                </button>
                                <button
                                    className={cx("text-btn", indexActivatedButton === 3 ? "active" : "")}
                                    onClick={() => handleClickMode(3)}
                                >
                                    {mode === "time" ? 120 : 100}
                                </button>
                            </Col>
                        )}
                    </Row>
                    <Row>
                        {!(mode === Mode.zen) && typingState === TypingStates.pending && (
                            <button className={cx("change-source-btn")}>
                                <i>
                                    <FontAwesomeIcon icon={faEarthAsia} size="xl"></FontAwesomeIcon>
                                </i>
                                <span>english</span>
                            </button>
                        )}
                    </Row>
                </>
            )}

            {!(typingState === TypingStates.finished) && (
                <Row className={cx("test-typing")}>
                    <div className={cx("main")}>
                        <GenerateWords words={randomWords} mode={mode} isReload={isReload}></GenerateWords>
                        <UserInput words={randomWords} isReload={isReload} setReload={setReload}></UserInput>
                    </div>
                    <button className={cx("reload-btn")} onClick={handleReload}>
                        <FontAwesomeIcon icon={faRedo} size="xl"></FontAwesomeIcon>
                    </button>
                </Row>
            )}

            {typingState === TypingStates.finished && <TestResult wpm={120} acc={100}></TestResult>}
        </div>
    );
};

export default TypingTest;
