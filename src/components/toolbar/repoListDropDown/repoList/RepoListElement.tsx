import React from "react";

import "./RepoListElement.css";

interface IProps {
    label: string;
    onClick: () => void;
}

class RepoListElement extends React.Component<IProps> {
    render() {
        return (
            <div className="repo-list-element">
                <div className="repo-list-element-button" onClick={this.props.onClick}>
                    <span>{this.props.label}</span>
                </div>
            </div>
        );
    }
}

export default RepoListElement;
