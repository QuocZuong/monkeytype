import React from "react";
import classNames from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    // faBell,
    faCode,
    faCodeBranch,
    faDonate,
    faEnvelope,
    faFileContract,
    faLock,
    faPallet,
    faShieldAlt,
    // faUser,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);
const Footer = () => {
    return (
        <Container fluid className={cx("wrapper")}>
            <Row className={cx("row")}>
                <Col className={cx("left")}>
                    <div className={cx("col-wrapper")}>
                        <button title="leaderboard" className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faEnvelope} size="lg" /> Contact
                            </i>
                        </button>
                        <button title="leaderboard" className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faEnvelope} size="lg" /> Twitter
                            </i>
                        </button>
                        <button title="leaderboard" className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faDonate} size="lg" /> Support
                            </i>
                        </button>
                        <button title="leaderboard" className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faFileContract} size="lg" /> Term
                            </i>
                        </button>
                        <button title="leaderboard" className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faCode} size="lg" /> GitHub
                            </i>
                        </button>
                        <button title="leaderboard" className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faShieldAlt} size="lg" /> Security
                            </i>
                        </button>
                        <button title="leaderboard" className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faDiscord} style={{ color: "#000000" }} />
                                Discord
                            </i>
                        </button>
                        <button title="leaderboard" className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faLock} size="lg" /> Privatcy
                            </i>
                        </button>
                    </div>
                </Col>
                <Col className={cx("right")}>
                    <div className={cx("col-wrapper")}>
                        <button title="leaderboard" className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faPallet} size="lg" />
                                serika dark
                            </i>
                        </button>
                        <button className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faCodeBranch} size="lg" />
                                v23.40.1
                            </i>
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;
