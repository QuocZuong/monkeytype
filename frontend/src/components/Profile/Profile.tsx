/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import classNames from "classnames/bind";

import styles from "./Profile.module.scss";
import config from "@/config";
import { useGlobalState } from "@/globalState";
import { useNavigate } from "react-router-dom";
import User from "@/Models/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const GeneralInfo = ({ user }: { user: User }) => {
    const formatedTimeJonined = user.timeJoined.split("T")[0];

    return (
        <Row className="justify-content-center align-items-center">
            <Col md={3}>
                <Row className={cx("small-row")}>
                    <Col md={3} className={cx("avatar")}>
                        <i className="user-icon">
                            <FontAwesomeIcon icon={faUser} size="2xl" className={cx("icon")} />
                        </i>
                    </Col>
                    <Col md={7} className="ms-4">
                        <div>
                            <h2 className={cx("username")}>{user.username}</h2>
                            <p>Joined {formatedTimeJonined}</p>
                        </div>
                    </Col>
                </Row>
                <Row className={cx("small-row")}>
                    <Col md={1}>{user.level}</Col>
                    <Col md={8} className="row align-items-center justify-content-center">
                        <div className={cx("level-bar", "ms-5")}>
                            <div className={cx("xp-indicator")}></div>
                        </div>
                        <div className="col-2 ms-4">
                            <span>
                                {user.xp}/{user.xp * 2}
                            </span>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

const Profile = () => {
    const user = useGlobalState("user")[0];

    return (
        <Container fluid className={cx("wrapper")}>
            <GeneralInfo user={user} />
        </Container>
    );
};

export default Profile;
