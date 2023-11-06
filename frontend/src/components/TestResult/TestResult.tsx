/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import classNames from "classnames/bind";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setGlobalState } from "@/typingState";
import { faChevronRight, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import styles from "./TestResult.module.scss";

const cx = classNames.bind(styles);

const TestResult = ({ wpm, acc, handleReload }: { wpm: number; acc: number; handleReload: () => void }) => {
    return (
        <div className={cx("wrapper")}>
            <Row className={cx("top")}>
                <Col className={cx("left")}>
                    <div className={cx("tittle")}>wpm</div>
                    <div className={cx("text-result")}>{wpm}</div>
                </Col>
                <Col className={cx("right")}>
                    <div className={cx("tittle")}>acc</div>
                    <div className={cx("text-result")}>{acc}%</div>
                </Col>
            </Row>
            <div className={cx("bottom")}>
                <button className={cx("btn-bottom")} onClick={handleReload}>
                    <i>
                        <FontAwesomeIcon icon={faChevronRight} size="xl"></FontAwesomeIcon>
                    </i>
                </button>
            </div>
        </div>
    );
};

export default TestResult;
