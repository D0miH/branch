import React from "react";
import { Add } from "@material-ui/icons";
import "./AddRepoButton.css";
import { inject, observer } from "mobx-react";
import { RepositoryStore, ToolbarStore } from "../../../../stores";

interface ExternalProps {}

interface InjectedProps extends ExternalProps {
    repoStore: RepositoryStore;
    toolbarStore: ToolbarStore;
}

@inject(({ stores }) => ({
    repoStore: stores.repoStore,
    toolbarStore: stores.toolbarStore
}))
@observer
class AddRepoButton extends React.Component {
    get injected() {
        return this.props as InjectedProps;
    }

    buttonClicked = () => {
        // open the repo and update the name
        let repoPath = window.ipcRenderer.sendSync("open-file-dialog");
        let repoName = window.ipcRenderer.sendSync("open-repo", repoPath);
        this.injected.repoStore.currentRepoName = repoName;

        // close the repo list after opening the repo
        this.injected.toolbarStore.repoListVisible = false;
    };

    render() {
        return (
            <div className="add-repo-button" onClick={this.buttonClicked}>
                <div className="button">
                    <Add />
                    <span>Add Repository</span>
                </div>
            </div>
        );
    }
}

export default AddRepoButton;
