import React from "react";
import { observer } from "mobx-react";
import AddRepoButton from "./AddRepoButton";

import ToolbarStore from "../../../../stores/ToolbarStore";

import "./RepoList.css";

type Props = {
    toolbarStore: ToolbarStore;
};

@observer
class RepoList extends React.Component<Props> {
    render() {
        return (
            <div
                className="repository-list"
                style={{
                    display: this.props.toolbarStore.repoListVisible
                        ? "block"
                        : "none"
                }}
            >
                <AddRepoButton />
            </div>
        );
    }
}

export default RepoList;
