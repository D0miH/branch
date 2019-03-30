import { observable, autorun, toJS } from "mobx";
import { GitRepoListItem } from "../typings/git-types";

export class LocalStorage {
    @observable repoList: { repoName: string; repoPath: string }[] = [];
    reactToRepoListChange = autorun(() => {
        let storedListString = window.localStorage.getItem("repo-list");

        if (storedListString === null) {
            // if the item does not exist in the storage, add the item
            window.localStorage.setItem("repo-list", JSON.stringify(toJS(this.repoList)));
        } else {
            // if the item does exist, update the list
            let storedList = JSON.parse(storedListString) as { repoName: string; repoPath: string }[];

            // check if the list item is already saved
            let itemsToBeSaved = this.repoList.filter(item => {
                let filteredList = storedList.filter(storedItem => storedItem.repoPath === item.repoPath);
                return filteredList.length === 0;
            });

            // if there are now items that need to be saved we can return
            if (itemsToBeSaved.length === 0) {
                return;
            }

            // add the not included items to the stored list and save it in the local storage
            let result = storedList.concat(toJS(itemsToBeSaved));

            window.localStorage.setItem("repo-list", JSON.stringify(result));
        }
    });

    @observable lastOpenedRepo: { repoName: string; repoPath: string } = this.loadLastOpenedRepo();
    reactToLastOpenedRepoChange = autorun(() => {
        // set the last opened repo in the local storage
        window.localStorage.setItem("last-opened-repo", JSON.stringify(toJS(this.lastOpenedRepo)));
    });

    loadRepoList(): GitRepoListItem[] {
        let storedListString = window.localStorage.getItem("repo-list");

        if (storedListString === null) {
            return [];
        }

        return JSON.parse(storedListString);
    }

    /**
     * Returns the last opened repo. If there is no repository which was opened the name and the path are an empty string.
     */
    loadLastOpenedRepo(): { repoName: string; repoPath: string } {
        let lastOpenedRepoString = window.localStorage.getItem("last-opened-repo");

        if (lastOpenedRepoString === null) {
            return { repoName: "", repoPath: "" };
        }

        return JSON.parse(lastOpenedRepoString);
    }
}

const localStorage = new LocalStorage();

export default function getLocalStorageInstance() {
    return localStorage;
}
