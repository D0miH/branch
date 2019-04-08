import React from "react";

import "./Commit.css";

interface IProps {
    title: string;
    onClick: () => void;
}

class Commit extends React.Component<IProps> {
    render() {
        return (
            <div className="commit" onClick={this.props.onClick}>
                <div className="commit-content">{this.props.title}</div>
            </div>
        );
    }
}

export default Commit;
