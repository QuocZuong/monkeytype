import React, { useRef, useEffect } from "react";

import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const Search = ({ onSearchChange }: { onSearchChange: (query: string) => void }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        onSearchChange(newQuery);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    return (
        <div className={cx("search-container")}>
            <i className={cx("search-button")}>
                <FontAwesomeIcon icon={faSearch} size="lg" />
            </i>
            <input
                type="text"
                placeholder="Type to search"
                className={cx("search-input")}
                onChange={handleInputChange}
                ref={inputRef}
            />
        </div>
    );
};

export default Search;
