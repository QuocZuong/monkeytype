import React from "react";
import classNames from "classnames/bind";

import styles from "./Caret.module.scss";

const cx = classNames.bind(styles);

const Caret = () => {
    return <div className={cx("caret")}></div>;
};

export default Caret;
