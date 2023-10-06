import React from "react";
import classNames from "classnames/bind";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const Footer = () => {
    return <h2 className={cx("test-class")}>Footer</h2>;
};

export default Footer;
