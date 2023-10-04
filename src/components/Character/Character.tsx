import React from "react";
import classNames from "classnames/bind";

import styles from "./Character.module.scss";
import { CharacterProps } from "@/Models/CharacterProps";

const cx = classNames.bind(styles);

const Character = ({ key, children, userInput, expectInput }: CharacterProps) => {
    let status = userInput !== expectInput ? "wrong" : "correct";

    if (userInput !== " " && expectInput === " ") {
        status = "wrong-space";
    }

    console.log("status: " + status);

    const classes = cx("character", status);
    return (
        <span className={classes} key={key}>
            {children}
        </span>
    );
};

export default Character;
