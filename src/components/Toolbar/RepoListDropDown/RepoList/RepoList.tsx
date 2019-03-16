import React from "react";
import { observer, inject } from "mobx-react";
import AddRepoButton from "./AddRepoButton";

import ToolbarStore from "../../../../stores/ToolbarStore";

import "./RepoList.css";

interface ExternalProps {}

interface InjectedProps extends ExternalProps {
    toolbarStore: ToolbarStore;
}

@inject(({ stores }) => ({
    toolbarStore: stores.toolbarStore
}))
@observer
class RepoList extends React.Component<ExternalProps> {
    get injected() {
        return this.props as InjectedProps;
    }

    render() {
        return (
            <div
                className="repository-list"
                style={{
                    display: this.injected.toolbarStore.repoListVisible
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
