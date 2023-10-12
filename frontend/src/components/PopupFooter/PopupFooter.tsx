import React, { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faBug,
    faCommentDots,
    faEllipsis,
    faQuestionCircle,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./PopupFooter.module.scss";

const cx = classNames.bind(styles);

const PopupFooter = () => {
    const [modal, setModal] = useState(true);

    const toggleModal = () => {
        setModal(!modal);
    };
    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    return (
        <>
            <button onClick={toggleModal} className={cx("btn-modal")}>
                Contact
            </button>
            {modal && (
                <div className={cx("modal")}>
                    <div onClick={toggleModal} className={cx("overlay")}></div>
                    <div className={cx("modal-content")}>
                        <div id="contactPopupWrapper" className={cx("popupWrapper hidden")}>
                            <div id="contactPopup">
                                <div className={cx("title")}>Contact</div>
                                <div className={cx("text-content")}>
                                    Feel free to send an email to contact@monkeytype.com. For business inquiries, email
                                    jack@monkeytype.com (the buttons below will open the default mail client).
                                    <br />
                                    <br />
                                    Please
                                    <span> do not send </span>
                                    requests to delete account, update email, update name or clear personal bests - you
                                    can do that in the settings page.
                                </div>
                                <div className={cx("buttons")}>
                                    <a
                                        className={cx("button")}
                                        target="_blank"
                                        href="mailto:contact@monkeytype.com?subject=[Question] "
                                        rel="noreferrer"
                                    >
                                        <div className={cx("icon")}>
                                            <i>
                                                <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
                                            </i>
                                        </div>
                                        <div className={cx("textGroup")}>
                                            <div className={cx("text")}>Question</div>
                                            {/* <!-- <div className="subtext">Confused about something?</div> --> */}
                                        </div>
                                    </a>
                                    <a
                                        className={cx("button")}
                                        target="_blank"
                                        href="mailto:contact@monkeytype.com?subject=[Feedback] "
                                        rel="noreferrer"
                                    >
                                        <div className={cx("icon")}>
                                            <i>
                                                <FontAwesomeIcon icon={faCommentDots} size="lg" />
                                            </i>
                                        </div>
                                        <div className={cx("textGroup")}>
                                            <div className={cx("text")}>Feedback</div>
                                            {/* <div className="subtext">Feel like the website could be improved?</div> */}
                                        </div>
                                    </a>
                                    <a
                                        className={cx("button")}
                                        target="_blank"
                                        href="mailto:support@monkeytype.com?subject=[Bug] "
                                        rel="noreferrer"
                                    >
                                        <div className={cx("icon")}>
                                            <i>
                                                <FontAwesomeIcon icon={faBug} size="lg" />
                                            </i>
                                        </div>
                                        <div className={cx("textGroup")}>
                                            <div className={cx("text")}>Bug Report</div>
                                            {/* <!-- <div className="subtext">Report any bugs you found. You can also open a new issue on GitHub.</div> --> */}
                                        </div>
                                    </a>
                                    <a
                                        className={cx("button")}
                                        target="_blank"
                                        href="mailto:support@monkeytype.com?subject=[Account] "
                                        rel="noreferrer"
                                    >
                                        <div className={cx("icon")}>
                                            <i>
                                                <FontAwesomeIcon icon={faUserCircle} size="lg" />
                                            </i>
                                        </div>
                                        <div className={cx("textGroup")}>
                                            <div className={cx("text")}>Account Help</div>
                                            {/* <!-- <div className="subtext">Report any problems with your account like login issues.</div> --> */}
                                        </div>
                                    </a>
                                    <a
                                        className={cx("button")}
                                        target="_blank"
                                        href="mailto:jack@monkeytype.com?subject=[Business] "
                                        rel="noreferrer"
                                    >
                                        <div className={cx("icon")}>
                                            <i>
                                                <FontAwesomeIcon icon={faBriefcase} size="lg" />
                                            </i>
                                        </div>
                                        <div className={cx("textGroup")}>
                                            <div className={cx("text")}>Business Inquiry</div>
                                            {/* <!-- <div className="subtext">Let's work together.</div> --> */}
                                        </div>
                                    </a>
                                    <a
                                        className={cx("button")}
                                        target="_blank"
                                        href="mailto:contact@monkeytype.com?subject=[Other] "
                                        rel="noreferrer"
                                    >
                                        <div className={cx("icon")}>
                                            <i>
                                                <FontAwesomeIcon icon={faEllipsis} size="lg" />
                                            </i>
                                        </div>
                                        <div className={cx("textGroup")}>
                                            <div className={cx("text")}>Other</div>
                                            {/* <!-- <div className="subtext">We will try to help.</div> --> */}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PopupFooter;
