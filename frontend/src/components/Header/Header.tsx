import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCrown, faGear, faInfo, faKeyboard, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";

import config from "@/config";
import images from "@/assets/images";
import styles from "./Header.module.scss";
import { setGlobalState, useGlobalState } from "@/globalState";

const cx = classNames.bind(styles);

/**
 * The user section component.
 * @returns {ReactNode} return a user section component.
 */
const UserSection = () => {
    const [isLoggedIn] = useGlobalState("isLoggedIn");
    const [user] = useGlobalState("user");
    const nagivator = useNavigate();
    const level = 1;


    const handleSignout = () => {
        alert("Signing out");
        setGlobalState("isLoggedIn", false);
        nagivator(config.routeLinks.home);
    };

    if (isLoggedIn) {
        return (
            <>
                <Col md={2}>
                    <Link to={config.routeLinks.profile} className={cx("user-info")}>
                        <i>
                            <FontAwesomeIcon icon={faUser} size="lg" />
                        </i>
                        <div className={cx("username")}>{user.username}</div>
                        <div className={cx("level")}>{level}</div>
                    </Link>
                </Col>
                <Col md={1}>
                    <button className={cx("link")}>
                        <i>
                            <FontAwesomeIcon icon={faBell} size="lg" />
                        </i>
                    </button>
                </Col>
                <Col md={1}>
                    <button className={cx("link")} onClick={() => handleSignout()}>
                        <i>
                            <FontAwesomeIcon icon={faSignOut} size="lg" />
                        </i>
                    </button>
                </Col>
            </>
        );
    }

    return (
        <>
            <Col md={1}>
                <button className={cx("link")}>
                    <i>
                        <FontAwesomeIcon icon={faBell} size="lg" />
                    </i>
                </button>
            </Col>
            <Col md={1}>
                <Link to={config.routeLinks.login} className={cx("user-info")}>
                    <i>
                        <FontAwesomeIcon icon={faUser} size="lg" />
                    </i>
                </Link>
            </Col>
        </>
    );
};

/**
 * The header component.
 *
 * @returns {ReactNode} return a header component apply for almost all pages.
 */
const Header = () => {
    return (
        <Container fluid className={cx("wrapper")}>
            <Row className={cx("row")}>
                <Col className={cx("left")}>
                    <div className={cx("col-wrapper")}>
                        <Link to={config.routeLinks.home} className={cx("logo-link")}>
                            <img src={images.mtfulllogo} alt="logo" />
                        </Link>
                        <Link title="start test" to={config.routeLinks.home} className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faKeyboard} size="lg" />
                            </i>
                        </Link>
                        <button title="leaderboard" className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faCrown} size="lg" />
                            </i>
                        </button>
                        <Link title="about" to={config.routeLinks.about} className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faInfo} size="lg" />
                            </i>
                        </Link>
                        <Link title="settings" to={config.routeLinks.setting} className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faGear} size="lg" />
                            </i>
                        </Link>
                    </div>
                </Col>
                <Col className={cx("right")}>
                    <div className={cx("col-wrapper")}>
                        <UserSection />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;
