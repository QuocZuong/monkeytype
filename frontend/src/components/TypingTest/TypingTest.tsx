/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from "react";

import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";
import { setGlobalState, useGlobalState } from "@/typingState";
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
import useCountdownTimer from "@/hooks/useCountdownTimer";
import calculateWPM from "@/util/calculateWPM";
import calculateAcc from "@/util/calculateAcc";

const cx = classNames.bind(styles);

const TypingTest = () => {
    const [hasNumber] = useGlobalState("hasNumber");
    const [hasPunctuation] = useGlobalState("hasPunctuation");
    const [typingState] = useGlobalState("typingState");
    const [userInput] = useGlobalState("userInput");
    const [mode] = useGlobalState("mode");

    const [isReload, setReload] = useState<boolean>(false);
    const [indexActivatedButton, setIndexActivatedButton] = useState<number>(1);
    const [numberOfWords, setNumberOfWords] = useState(30);

    const { time, previousTime, startCountdown, resetCountdown } = useCountdownTimer();

    const randomWords = useMemo(() => {
        return fakerGeneratorCustom(numberOfWords, hasPunctuation, hasNumber);
    }, [isReload]);

    const punctuationClasses = cx("text-btn", hasPunctuation && "active");
    const numberClasses = cx("text-btn", hasNumber && "active");

    const timeClasses = cx("text-btn", mode === Mode.time && "active");
    const wordsClasses = cx("text-btn", mode === Mode.words && "active");
    const quoteClasses = cx("text-btn", mode === Mode.quote && "active");
    const zenClasses = cx("text-btn", mode === Mode.zen && "active");
    const customClasses = cx("text-btn", mode === Mode.custom && "active");

    const handleReload = () => {
        setReload(true);
        setGlobalState("typingState", TypingStates.pending);
    };

    const handleClickMode = (index: number) => {
        setIndexActivatedButton(index);
        if (index === 0) {
            setNumberOfWords(10);
        } else if (index === 1) {
            setNumberOfWords(30);
        } else if (index === 2) {
            setNumberOfWords(60);
        }
        setReload(true);
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
            {typingState === TypingStates.typing && <div className={cx("time-counter")}>{time}</div>}

            {typingState === TypingStates.pending && (
                <>
                    <Row className={cx("test-config")}>
                        <Col xs sm={3} className={cx("col")}>
                            <button
                                className={cx(punctuationClasses)}
                                onClick={() => {
                                    setGlobalState("hasPunctuation", !hasPunctuation);
                                    setReload(true);
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
                                    setReload(true);
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
                                    {mode === "time" ? 30 : 30}
                                </button>
                                <button
                                    className={cx("text-btn", indexActivatedButton === 2 ? "active" : "")}
                                    onClick={() => handleClickMode(2)}
                                >
                                    {mode === "time" ? 60 : 60}
                                </button>
                                {/* <button
                                    className={cx("text-btn", indexActivatedButton === 3 ? "active" : "")}
                                    onClick={() => handleClickMode(3)}
                                >
                                    {mode === "time" ? 120 : 100}
                                </button> */}
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
                        <GenerateWords words={randomWords} mode={mode}></GenerateWords>
                        <UserInput
                            words={randomWords}
                            isReload={isReload}
                            setReload={setReload}
                            startCountdown={startCountdown}
                            resetCountdown={resetCountdown}
                            numberOfWords={numberOfWords}
                        ></UserInput>
                    </div>
                    <button className={cx("reload-btn")} onClick={handleReload}>
                        <FontAwesomeIcon icon={faRedo} size="xl"></FontAwesomeIcon>
                    </button>
                </Row>
            )}

            {typingState === TypingStates.finished && (
                <TestResult
                    wpm={Math.round(calculateWPM(userInput.length, previousTime > 0 ? previousTime : 1))}
                    acc={calculateAcc(userInput, randomWords)}
                    handleReload={handleReload}
                ></TestResult>
            )}
        </div>
    );
};

export default TypingTest;
