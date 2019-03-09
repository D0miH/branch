import React from "react";
import { observer } from "mobx-react";
import { IToolbarStore } from "../../../stores/stores";
import "./RepoList.css";

type Props = {
    toolbarStore: IToolbarStore;
};

@observer
class RepoList extends React.Component<Props> {
    render() {
        return (
            <div
                className="RepositoryList"
                style={{
                    height: this.props.toolbarStore.repoListVisible ? "100%" : 0
                }}
            />
        );
    }
}

export default RepoList;
