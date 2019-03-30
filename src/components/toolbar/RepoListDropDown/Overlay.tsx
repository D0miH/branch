import React from "react";
import { observer, inject } from "mobx-react";

import ToolbarStore from "../../../stores/ToolbarStore";

interface ExternalProps {}

interface InjectedProps extends ExternalProps {
    toolbarStore: ToolbarStore;
}

@inject(({ stores }) => ({
    toolbarStore: stores.toolbarStore
}))
@observer
class Overlay extends React.Component<ExternalProps> {
    get injected() {
        return this.props as InjectedProps;
    }

    hideOverlay = () => {
        this.injected.toolbarStore.repoListVisible = false;
    };

    render() {
        return this.injected.toolbarStore.repoListVisible ? (
            <div
                className="overlay"
                style={{
                    position: "fixed",
                    backgroundColor: "black",
                    opacity: 0.5,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    top: "20px",
                    left: "0px"
                }}
                onClick={this.hideOverlay}
            />
        ) : null;
    }
}

export default Overlay;
