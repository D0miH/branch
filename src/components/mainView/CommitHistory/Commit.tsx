import React from "react";

import "./Commit.css";

type Props = {
    title: string;
    onClick: () => void;
};

class Commit extends React.Component<Props> {
    render() {
        return (
            <div className="commit" onClick={this.props.onClick}>
                <div className="commit-content">{this.props.title}</div>
            </div>
        );
    }
}

export default Commit;
