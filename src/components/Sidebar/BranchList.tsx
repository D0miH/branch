import React from "react";
import Octicon, { GitBranch, ChevronDown } from "@githubprimer/octicons-react";
import "./BranchList.css";

class BranchList extends React.Component {
    render() {
        return (
            <div className="BranchList">
                <div className="Heading">
                    <div className="HeadingTitle">
                        <Octicon icon={GitBranch} />
                        Branches
                    </div>
                    <div className="RightHeading">
                        0/0
                        <Octicon icon={ChevronDown} />
                    </div>
                </div>
            </div>
        );
    }
}

export default BranchList;
