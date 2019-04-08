import { autorun, observable, toJS } from "mobx";
import { IGitRepoListItem } from "../typings/git-types";

export class LocalStorage {
    @observable repoList: Array<{ repoName: string; repoPath: string }> = [];
    reactToRepoListChange = autorun(() => {
        const storedListString = window.localStorage.getItem("repo-list");

        if (storedListString === null) {
            // if the item does not exist in the storage, add the item
            window.localStorage.setItem("repo-list", JSON.stringify(toJS(this.repoList)));
        } else {
            // if the item does exist, update the list
            const storedList = JSON.parse(storedListString) as Array<{ repoName: string; repoPath: string }>;

            // check if the list item is already saved
            const itemsToBeSaved = this.repoList.filter(item => {
                const filteredList = storedList.filter(storedItem => storedItem.repoPath === item.repoPath);
                return filteredList.length === 0;
            });

            // if there are now items that need to be saved we can return
            if (itemsToBeSaved.length === 0) {
                return;
            }

            // add the not included items to the stored list and save it in the local storage
            const result = storedList.concat(toJS(itemsToBeSaved));

            window.localStorage.setItem("repo-list", JSON.stringify(result));
        }
    });

    @observable lastOpenedRepo: { repoName: string; repoPath: string } = this.loadLastOpenedRepo();
    reactToLastOpenedRepoChange = autorun(() => {
        // set the last opened repo in the local storage
        window.localStorage.setItem("last-opened-repo", JSON.stringify(toJS(this.lastOpenedRepo)));
    });

    loadRepoList(): IGitRepoListItem[] {
        const storedListString = window.localStorage.getItem("repo-list");

        if (storedListString === null) {
            return [];
        }

        return JSON.parse(storedListString);
    }

    /**
     * Returns the last opened repo. If there is no repository which was opened the name and the path are an empty string.
     */
    loadLastOpenedRepo(): { repoName: string; repoPath: string } {
        const lastOpenedRepoString = window.localStorage.getItem("last-opened-repo");

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
