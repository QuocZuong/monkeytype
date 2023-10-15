import React from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAd, faDonate, faHeart, faTShirt } from "@fortawesome/free-solid-svg-icons";
import { faPatreon } from "@fortawesome/free-brands-svg-icons";

import styles from "./SupportPopup.module.scss";
const cx = classNames.bind(styles);

/**
 *
 * @returns {description} support popup
 */
function SupportPopup({ closeModal }: { closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className={cx("modal")}>
            <div className={cx("overlay")}>
                <div className={cx("modal-content")}>
                    <div id="supportMeWrapper" className={cx("popupWrapper")}>
                        <div id="supportMe">
                            <div className={cx("title")}>
                                Support Monkeytype
                                <button onClick={() => closeModal(false)} className={cx("close")}>
                                    &times;
                                </button>
                            </div>
                            <div className={cx("text")}>
                                Thank you so much for thinking about supporting this project. It would not be possible
                                without you and your continued support.
                                <i>
                                    <FontAwesomeIcon icon={faHeart} size="lg" />
                                </i>
                            </div>
                            <div className={cx("buttons")}>
                                <div className={cx("button")}>
                                    <div className={cx("icon")}>
                                        <i>
                                            <FontAwesomeIcon icon={faAd} size="lg" />
                                        </i>
                                    </div>
                                    <div className={cx("subtext")}>Enable Ads</div>
                                </div>
                                <div className={cx("button")}>
                                    <div className={cx("icon")}>
                                        <i>
                                            <FontAwesomeIcon icon={faAd} size="lg" />
                                        </i>
                                    </div>
                                    <div className={cx("textGroup")}>
                                        <div className={cx("subtext")}>
                                            Watch
                                            <br />a Video Ad
                                        </div>
                                    </div>
                                </div>
                                <a
                                    className={cx("button")}
                                    href="https://ko-fi.com/monkeytype"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <div className={cx("link")}>
                                        <i>
                                            <FontAwesomeIcon icon={faDonate} size="lg" />
                                        </i>
                                    </div>
                                    <div className="subText">Donate</div>
                                </a>
                                <a
                                    className={cx("button")}
                                    href="https://www.patreon.com/monkeytype"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <div className={cx("link")}>
                                        <i>
                                            <FontAwesomeIcon icon={faPatreon} size="lg" />
                                        </i>
                                    </div>
                                    <div className="subText">
                                        Become
                                        <br />a Patron
                                    </div>
                                </a>
                                <a
                                    className={cx("button")}
                                    href="https://monkeytype.store"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <div className={cx("link")}>
                                        <i>
                                            <FontAwesomeIcon icon={faTShirt} size="lg" />
                                        </i>
                                    </div>
                                    <div className="subText">Buy Merch</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupportPopup;
