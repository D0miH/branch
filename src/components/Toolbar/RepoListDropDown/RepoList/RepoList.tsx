import React from "react";
import { observer } from "mobx-react";
import { IToolbarStore } from "../../../../stores/stores";
import AddRepoButton from "./AddRepoButton";
import "./RepoList.css";

type Props = {
    toolbarStore: IToolbarStore;
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
