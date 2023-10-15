import React, { useState } from "react";

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
    faTools,
    faWrench,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./TypingTest.module.scss";
import GenerateWords from "../GenerateWords";
import Mode from "../../Models/TypingModes";

import UserInput from "../UserInput";
import { fakerGeneratorCustom } from "@/util/generateWords";

const cx = classNames.bind(styles);

const TypingTest = () => {
    const [length] = useGlobalState("length");
    const [hasNumber] = useGlobalState("hasNumber");
    const [hasPunctuation] = useGlobalState("hasPunctuation");

    const [mode] = useGlobalState("mode");

    const [isReload, setReload] = useState<boolean>(false);

    const randomWords = fakerGeneratorCustom(length, hasPunctuation, hasNumber);

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
                    <button
                        className={timeClasses}
                        onClick={() => {
                            toggleMode(Mode.time);
                        }}
                    >
                        <i>
                            <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                        </i>
                        time
                    </button>
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
                    <button
                        className={quoteClasses}
                        onClick={() => {
                            toggleMode(Mode.quote);
                        }}
                    >
                        <i>
                            <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon>
                        </i>
                        quote
                    </button>
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
                    <button
                        className={customClasses}
                        onClick={() => {
                            toggleMode(Mode.custom);
                        }}
                    >
                        <i>
                            <FontAwesomeIcon icon={faWrench}></FontAwesomeIcon>
                        </i>
                        custom
                    </button>
                </Col>
                <Col xs sm={3} className={cx("col")}>
                    <div className={cx("right-spacer")}></div>
                    <button className={cx("text-btn")}>15</button>
                    <button className={cx("text-btn")}>30</button>
                    <button className={cx("text-btn")}>60</button>
                    <button className={cx("text-btn")}>120</button>
                    <button className={cx("text-btn")}>
                        <i>
                            <FontAwesomeIcon icon={faTools}></FontAwesomeIcon>
                        </i>
                    </button>
                </Col>
            </Row>
            <Row className={cx("test-typing")}>
                {!(mode === Mode.zen) && (
                    <button className={cx("change-source-btn")}>
                        <i>
                            <FontAwesomeIcon icon={faEarthAsia} size="xl"></FontAwesomeIcon>
                        </i>
                        <span>english</span>
                    </button>
                )}
                <div className={cx("main")}>
                    <GenerateWords words={randomWords} mode={mode}></GenerateWords>
                    <UserInput words={randomWords} isReload={isReload} setReload={setReload}></UserInput>
                </div>
                <button className={cx("reload-btn")} onClick={handleReload}>
                    <FontAwesomeIcon icon={faRedo} size="xl"></FontAwesomeIcon>
                </button>
            </Row>
            <Row></Row>
            <Row></Row>
        </div>
    );
};

export default TypingTest;
