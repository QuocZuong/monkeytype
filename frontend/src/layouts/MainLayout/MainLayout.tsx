import React from "react";
import classNames from "classnames/bind";

import Header from "@/components/Header";
import styles from "./MainLayout.module.scss";

import { ComponentProps } from "@/Models/ComponentProps";

const cx = classNames.bind(styles);
const MainLayout: React.FC<ComponentProps> = ({ children }) => {
    return (
        <div className={cx("main-wrapper")}>
            <Header></Header>
            <div className={cx("container")}>{children}</div>
        </div>
    );
};

export default MainLayout;
