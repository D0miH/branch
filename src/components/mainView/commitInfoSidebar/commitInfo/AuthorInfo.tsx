import Identicon from "identicon.js";
import jsSHA from "jssha";
import React from "react";

import "./AuthorInfo.css";

interface IProps {
    commitAuthor: string;
    authorDate: string;
}

class AuthorInfo extends React.Component<IProps> {
    generateAvatar(): string {
        const hashObject = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
        hashObject.update(this.props.commitAuthor + 0);
        const hash = hashObject.getHash("HEX");
        const imgData = new Identicon(hash, 30).toString();
        return "data:/image/png;base64," + imgData;
    }

    render() {
        return (
            <div className="author-section">
                <img className="commit-avatar" src={this.generateAvatar()} draggable={false} />
                <div className="author-info">
                    <span>{this.props.commitAuthor}</span>
                    <span>{"authored " + this.props.authorDate}</span>
                </div>
            </div>
        );
    }
}

export default AuthorInfo;
