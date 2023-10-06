import React from "react";
import classNames from "classnames/bind";

import styles from "./Template.module.scss";

const cx = classNames.bind(styles);

const Template = () => {
    return <div className={cx("test-class")}>Template</div>;
};

export default Template;
