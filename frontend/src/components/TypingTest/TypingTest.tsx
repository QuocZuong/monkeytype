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

import UserInput from "../UserInput";
import { fakerGeneratorCustom } from "@/util/generateWords";

const cx = classNames.bind(styles);

const TypingTest = () => {
    const [hasPunctuation] = useGlobalState("hasPunctuation");
    const [hasNumber] = useGlobalState("hasNumber");
    const [length] = useGlobalState("length");
    const [isReload, setReload] = useState<boolean>(false);

    const randomWords = fakerGeneratorCustom(length, hasPunctuation, hasNumber);

    const punctuationClasses = cx("text-btn", hasPunctuation && "active");
    const numberClasses = cx("text-btn", hasNumber && "active");

    const handleReload = () => {
        setReload(!isReload);
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
                    <button className={cx("text-btn")}>
                        <i>
                            <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                        </i>
                        time
                    </button>
                    <button className={cx("text-btn")}>
                        <i>
                            <FontAwesomeIcon icon={faFont}></FontAwesomeIcon>
                        </i>
                        words
                    </button>
                    <button className={cx("text-btn")}>
                        <i>
                            <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon>
                        </i>
                        quote
                    </button>
                    <button className={cx("text-btn")}>
                        <i>
                            <FontAwesomeIcon icon={faMountain}></FontAwesomeIcon>
                        </i>
                        zen
                    </button>
                    <button className={cx("text-btn")}>
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
                <button className={cx("change-source-btn")}>
                    <i>
                        <FontAwesomeIcon icon={faEarthAsia} size="xl"></FontAwesomeIcon>
                    </i>
                    <span>english</span>
                </button>
                <div className={cx("main")}>
                    <GenerateWords words={randomWords}></GenerateWords>
                    <UserInput words={randomWords}></UserInput>
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
