import { Add } from "@material-ui/icons";
import { inject, observer } from "mobx-react";
import React from "react";
import { ToolbarStore } from "../../../../stores";
import { BranchStore, RepositoryStore } from "../../../../stores/git";

import "./AddRepoButton.css";

interface IExternalProps {}

interface IInjectedProps extends IExternalProps {
    repoStore: RepositoryStore;
    toolbarStore: ToolbarStore;
    branchStore: BranchStore;
}

@inject(({ stores }) => ({
    branchStore: stores.branchStore,
    repoStore: stores.repoStore,
    toolbarStore: stores.toolbarStore
}))
@observer
class AddRepoButton extends React.Component {
    get injected() {
        return this.props as IInjectedProps;
    }

    buttonClicked = () => {
        // open the repo and update the name
        const repoPath = window.ipcRenderer.sendSync("open-file-dialog");

        // only open the repository if the repo path is not null (this is the case if the user cancelled the dialog).
        if (repoPath !== null) {
            this.injected.repoStore.openRepo(repoPath);

            // close the repo list after opening the repo
            this.injected.toolbarStore.repoListVisible = false;
            this.injected.toolbarStore.addRepoToList(this.injected.repoStore.currentRepoName, repoPath);
        }
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
