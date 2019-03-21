import React from "react";

import "./Commit.css";

type Props = {
    title: string;
};

class Commit extends React.Component<Props> {
    render() {
        return (
            <div className="commit">
                <div className="commit-content">{this.props.title}</div>
            </div>
        );
    }
}

export default Commit;
