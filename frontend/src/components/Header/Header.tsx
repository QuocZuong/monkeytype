import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCrown, faGear, faInfo, faKeyboard, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";

import config from "@/config";
import images from "@/assets/images";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

/**
 *
 * @returns {ReactNode} return a header component apply for almost all pages
 */
const Header = () => {
    const isLogged = true;

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
                        <Link to={config.routeLinks.profile} className={cx("user-info")}>
                            <i>
                                <FontAwesomeIcon icon={faUser} size="lg" />
                            </i>

                            {/* Check if user logged or not to show icon*/}
                            {isLogged && (
                                <>
                                    <div className={cx("username")}>quoczuong</div>
                                    <div className={cx("level")}>107</div>
                                </>
                            )}
                        </Link>
                        <button className={cx("link")}>
                            <i>
                                <FontAwesomeIcon icon={faBell} size="lg" />
                            </i>
                        </button>

                        {/* Check if user logged or not to show icon*/}
                        {isLogged && (
                            <button className={cx("link")}>
                                <i>
                                    <FontAwesomeIcon icon={faSignOut} size="lg" />
                                </i>
                            </button>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;
