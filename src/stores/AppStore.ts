import ToolbarStore from "./ToolbarStore";
import { IAppStore, IToolbarStore } from "./stores";

class AppStore implements IAppStore {
    toolbarStore: IToolbarStore = new ToolbarStore();
}

export default AppStore;
