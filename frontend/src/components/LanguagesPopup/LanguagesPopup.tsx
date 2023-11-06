/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./LanguagesPopup.scss";

const LanguagesPopup = ({
    show,
    onHide,
    handleSetLanguage,
}: {
    show: boolean;
    onHide: () => void;
    handleSetLanguage: (language: string) => void;
}) => {
    const handleOnClick = (language: string) => {
        onHide();
        handleSetLanguage(language);
    };

    return (
        <Modal show={show} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <div>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
                    <Button onClick={onHide}>X</Button>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <button onClick={() => handleOnClick("en")} className="entry">
                            english
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handleOnClick("vi")} className="entry">
                            vietnamese
                        </button>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default LanguagesPopup;
