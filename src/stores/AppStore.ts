import ToolbarStore from "./ToolbarStore";
import { IAppStore, IToolbarStore } from "./store-types";

class AppStore implements IAppStore {
    toolbarStore: IToolbarStore = new ToolbarStore();
}

export default AppStore;
