import React from "react";

import LinkedinLogo from "../../sm_icons/linkedin.png";
import FacebookLogo from "../../sm_icons/facebook.png";
import TwitterLogo from "../../sm_icons/twitter.png";

const Footer = () => {
    return (
        <footer
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                padding: "0.5rem 12rem",
                background: "hsl(228, 39%, 23%)",
                color: "white",
            }}
        >
            <div />
            <div>
                <p id="copyright_notice">Copyright Crypto Tracker</p>
            </div>
            <div id="sm_links">
                <a href="https://skillreactor.io">
                    <img
                        src={LinkedinLogo}
                        alt="Linkedin"
                        style={{ height: "2rem", marginRight: "0.5rem" }}
                        id="sm_linkedin"
                    />
                </a>

                <a href="https://skillreactor.io">
                    <img
                        src={FacebookLogo}
                        alt="Facebook"
                        style={{ height: "2rem", marginRight: "0.5rem" }}
                        id="sm_facebook"
                    />
                </a>

                <a href="https://skillreactor.io">
                    <img
                        src={TwitterLogo}
                        alt="Twitter"
                        style={{ height: "2rem", marginRight: "0.5rem" }}
                        id="sm_twitter"
                    />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
