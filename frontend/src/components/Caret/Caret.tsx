import React from "react";
import classNames from "classnames/bind";

import styles from "./Caret.module.scss";

const cx = classNames.bind(styles);

const Caret = ({ top, left }: { top: number; left: number }) => {
    return <div className={cx("caret")} style={{ top, left }}></div>;
};

export default Caret;
