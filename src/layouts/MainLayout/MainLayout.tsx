import classNames from "classnames/bind";

import styles from "./MainLayout.module.scss";

const cx = classNames.bind(styles);
import { ComponentProps } from "@/Models/ComponentProps";
import React from "react";

const MainLayout: React.FC<ComponentProps> = ({ children }) => {
    return (
        <div className={cx("wrapper")}>
            <div>Header</div>
            <div className={cx("container")}>{children}</div>
        </div>
    );
};

export default MainLayout;
