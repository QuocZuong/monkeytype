import React, { memo } from "react";
import classNames from "classnames/bind";
import styles from "./GenerateWords.module.scss";

const cx = classNames.bind(styles);

const GenerateWords = ({ words }: { words: string }) => {
    return <div className={cx("wrapper")}>{words}</div>;
};

export default memo(GenerateWords);
