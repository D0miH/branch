import React from "react";
import Identicon from "identicon.js";
import jsSHA from "jssha";

import "./AuthorInfo.css";

type Props = {
    commitAuthor: string;
    authorDate: string;
};

class AuthorInfo extends React.Component<Props> {
    generateAvatar(): string {
        let hashObject = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
        hashObject.update(this.props.commitAuthor + 0);
        let hash = hashObject.getHash("HEX");
        let imgData = new Identicon(hash, 30).toString();
        return "data:/image/png;base64," + imgData;
    }

    render() {
        return (
            <div className="author-section">
                <img className="commit-avatar" src={this.generateAvatar()} />
                <div className="author-info">
                    <span>{this.props.commitAuthor}</span>
                    <span>{"authored " + this.props.authorDate}</span>
                </div>
            </div>
        );
    }
}

export default AuthorInfo;
