/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import classNames from "classnames/bind";

import styles from "./LoginForm.module.scss";
import config from "@/config";
import { useGlobalState } from "@/globalState";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const LoginForm = () => {
    const [isLoggedIn, setLoggedIn] = useGlobalState("isLoggedIn");
    const navigator = useNavigate();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        const form = new FormData(event.currentTarget);

        const user = {
            username: form.get("username"),
            password: form.get("password"),
        };

        alert("Trying to login:\n" + JSON.stringify(user));

        fetch(config.apiUrl + "/users/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {  
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Login status: " + data.result);
                setLoggedIn(data.result);
                if (data.result) {
                    navigator(config.routeLinks.home);
                }
            })
            .catch((err) => alert(err.message));

        event.preventDefault();
    };

    return (
        <Container fluid>
            <h2 className="text-center">Login</h2>

            <Form className={cx("login-form")} onSubmit={(event) => handleLogin(event)}>
                <Row>
                    <Form.Control name="username" className={cx("control")} placeholder="username"></Form.Control>
                </Row>
                <Row>
                    <Form.Control name="password" className={cx("control")} placeholder="password"></Form.Control>
                </Row>
                <Row>
                    <Button type="submit" className={cx("submit-btn")}>
                        <span className="fa fa-sign-out"></span> Sign In
                    </Button>
                </Row>
            </Form>
        </Container>
    );
};

export default LoginForm;
