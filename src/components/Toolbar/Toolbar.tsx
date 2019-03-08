import React from "react";
import { observer } from "mobx-react";
import RepoListButton from "./RepoList/RepoListButton";
import PushButton from "./ToolButtons/PushButton";
import { IToolbarStore } from "../../stores/stores";

import "./Toolbar.css";

type Props = {
    toolbarStore: IToolbarStore;
};

@observer
class Toolbar extends React.Component<Props> {
    render() {
        return (
            <div className="Toolbar">
                <RepoListButton
                    repoName="Open Repository"
                    toolbarStore={this.props.toolbarStore}
                />
                <div className="Tools">
                    <PushButton />
                </div>
            </div>
        );
    }
}

export default Toolbar;
