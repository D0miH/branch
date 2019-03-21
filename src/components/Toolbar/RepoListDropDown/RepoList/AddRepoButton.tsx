import React from "react";
import { Add } from "@material-ui/icons";
import "./AddRepoButton.css";
import { inject, observer } from "mobx-react";
import { RepositoryStore, ToolbarStore, BranchStore } from "../../../../stores";

interface ExternalProps {}

interface InjectedProps extends ExternalProps {
    repoStore: RepositoryStore;
    toolbarStore: ToolbarStore;
    branchStore: BranchStore;
}

@inject(({ stores }) => ({
    repoStore: stores.repoStore,
    toolbarStore: stores.toolbarStore,
    branchStore: stores.branchStore
}))
@observer
class AddRepoButton extends React.Component {
    get injected() {
        return this.props as InjectedProps;
    }

    buttonClicked = () => {
        // open the repo and update the name
        let repoPath = window.ipcRenderer.sendSync("open-file-dialog");

        // only open the repository if the repo path is not null (this is the case if the user cancelled the dialog).
        if (repoPath !== null) {
            this.injected.repoStore.openRepo(repoPath);

            // get the currently checked out branch
            this.injected.branchStore.getCheckedOutBranch();

            // close the repo list after opening the repo
            this.injected.toolbarStore.repoListVisible = false;
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
