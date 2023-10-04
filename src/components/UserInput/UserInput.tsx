import React from "react";
import classNames from "classnames/bind";

import styles from "./UserInput.module.scss";

const cx = classNames.bind(styles);
const UserInput = ({ setUserInput }: { setUserInput: (userInput: string) => void }) => {
    return (
        <textarea
            onChange={(event) => {
                setUserInput(event.target.value);
            }}
            className={cx("user-typing")}
        ></textarea>
    );
};

export default UserInput;
