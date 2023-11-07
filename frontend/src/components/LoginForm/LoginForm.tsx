/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import classNames from "classnames/bind";

import styles from "./LoginForm.module.scss";
import config from "@/config";
import { setGlobalState, useGlobalState } from "@/globalState";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const LoginForm = () => {
    const navigator = useNavigate();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        const form = new FormData(event.currentTarget);

        const user = {
            username: form.get("username"),
            password: form.get("password"),
        };

        fetch(config.apiUrl + "/users/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setGlobalState("isLoggedIn", data.result);

                if (data.result) {
                    setGlobalState("user", data);
                    navigator(config.routeLinks.home);
                }
            })
            .catch((err) => alert(err.message));

        event.preventDefault();
    };

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h2 className="text-center">Login</h2>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={2}>
                    <Form className={cx("login-form")} onSubmit={(event) => handleLogin(event)}>
                        <Row>
                            <Form.Control
                                type="text"
                                name="username"
                                className={cx("control")}
                                placeholder="username"
                            ></Form.Control>
                        </Row>
                        <Row>
                            <Form.Control
                                type="password"
                                name="password"
                                className={cx("control")}
                                placeholder="password"
                            ></Form.Control>
                        </Row>
                        <Row>
                            <Button type="submit" className={cx("submit-btn")}>
                                <span className="fa fa-sign-out"></span> Sign In
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
