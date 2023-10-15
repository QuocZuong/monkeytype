import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ModalHeader, ModalBody, Form, FormGroup, Modal } from "react-bootstrap";
import styles from "./ChangeTheme.module.scss";
import Search from "../Search";

const cx = classNames.bind(styles);

const ChangeTheme = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const modalRef = useRef<HTMLDivElement | null>(null);

    const selectedOptionRef = useRef<HTMLButtonElement | null>(null);

    const handleButtonClick = () => {
        setIsModalOpen(true);

        if (modalRef.current) {
            const searchInput = modalRef.current.querySelector<HTMLInputElement>(".search-input");
            if (searchInput) {
                searchInput.focus();
            }
        }
    };

    const handleOutsideClick = (event: Event) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        if (!isModalOpen) {
            document.addEventListener("click", handleOutsideClick);
        } else {
            document.removeEventListener("click", handleOutsideClick);
        }
        if (isModalOpen && selectedOptionRef.current) {
            selectedOptionRef.current.scrollIntoView({
                behavior: "auto",
                block: "center",
                inline: "center",
            });
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isModalOpen, selectedOption]);

    const options: string[] = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6", "Option 7", "Option 8", "Option 9", "Option 10",
        "Option 11", "Option 12", "Option 13", "Option 14", "serika dark", "Option 16", "Option 17", "Option 18", "Option 19", "Option 20", "Option 21", "Option 22",
        "Option 23", "Option 24", "Option 25", "Option 26", "Option 27", "Option 28",];

    const getTextColor = (backgroundColor: string) => {
        const r = parseInt(backgroundColor.slice(1, 3), 16);
        const g = parseInt(backgroundColor.slice(3, 5), 16);
        const b = parseInt(backgroundColor.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? "#000000" : "#ffffff";
    };

    return (
        <div className={cx("theme-wrapper")}>
            <div className={cx("theme-btn")}>
                <button className={cx("text-btn")} title="changetheme" onClick={handleButtonClick}>
                    <i>
                        <FontAwesomeIcon icon={faPalette} size="lg" style={{ marginRight: "7px" }} />
                        {selectedOption ? selectedOption : "serika dark"}
                    </i>
                </button>
            </div>

            <Modal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
                className={cx("modal-fade")}
                id="popuptheme"
                animation={false}
            >
                <div className={cx("modal-content")} style={{ maxHeight: "80vh" }}>
                    <ModalHeader className={cx("modal-head")}>
                        <Search onSearchChange={handleSearchChange} />
                    </ModalHeader>
                    <ModalBody className={cx("modal-body")} style={{ maxHeight: "70vh", overflowY: "auto" }}>
                        <Form className="form-popup">
                            <FormGroup className={cx("form-content")}>
                                {options.filter(option => option.toLowerCase().includes(searchQuery.toLowerCase())) // Filter based on search query
                                    .map((option, index) => (
                                        <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                            {selectedOption === option && (
                                                <FontAwesomeIcon icon={faCheck} style={{ marginRight: "0.5rem" }} />
                                            )}
                                            <button
                                                className={cx("theme")}
                                                style={{
                                                    border: "none",
                                                    backgroundColor: selectedOption === option ? "#e0f7fa" : "transparent",
                                                    color: selectedOption === option
                                                        ? getTextColor("#e0f7fa")
                                                        : getTextColor("transparent")
                                                }}
                                                onClick={() => {
                                                    handleOptionClick(option);
                                                    setIsModalOpen(false);
                                                }}

                                                ref={(ref) => {
                                                    if (selectedOption === option) {
                                                        selectedOptionRef.current = ref;
                                                    }
                                                }}

                                            >
                                                {option}
                                            </button>
                                        </div>
                                    ))}
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </div>
            </Modal >

        </div >
    );
};

export default ChangeTheme;


