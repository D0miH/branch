import React from "react";
import { observer } from "mobx-react";
import RepoListDropDown from "./RepoListDropDown/RepoListDropDown";
import PushButton from "./ToolButtons/PushButton";
import Overlay from "./RepoListDropDown/Overlay";
import RepoList from "./RepoListDropDown/RepoList/RepoList";
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
                <div className="ToolbarContent">
                    <RepoListDropDown
                        repoName="Open Repository"
                        toolbarStore={this.props.toolbarStore}
                    />
                    <div className="Tools">
                        <PushButton />
                    </div>
                </div>
                <RepoList toolbarStore={this.props.toolbarStore} />
                <Overlay toolbarStore={this.props.toolbarStore} />
            </div>
        );
    }
}

export default Toolbar;
