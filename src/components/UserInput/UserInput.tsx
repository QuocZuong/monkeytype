import React, { useRef, useEffect } from "react";
import classNames from "classnames/bind";

import styles from "./UserInput.module.scss";

const cx = classNames.bind(styles);

const UserInput = ({ setUserInput }: { setUserInput: (userInput: string) => void }) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const onClickKeyboard = () => textAreaRef?.current?.focus();

        window.addEventListener("keypress", onClickKeyboard);

        return () => {
            window.removeEventListener("keypress", onClickKeyboard);
        };
    }, []);

    return (
        <textarea
            ref={textAreaRef}
            onChange={(event) => {
                setUserInput(event.target.value);
            }}
            className={cx("user-typing")}
        ></textarea>
    );
};

export default UserInput;
