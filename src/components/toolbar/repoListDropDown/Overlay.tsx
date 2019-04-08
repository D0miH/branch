import { inject, observer } from "mobx-react";
import React from "react";

import ToolbarStore from "../../../stores/ToolbarStore";

interface IExternalProps {}

interface IInjectedProps extends IExternalProps {
    toolbarStore: ToolbarStore;
}

@inject(({ stores }) => ({
    toolbarStore: stores.toolbarStore
}))
@observer
class Overlay extends React.Component<IExternalProps> {
    get injected() {
        return this.props as IInjectedProps;
    }

    hideOverlay = () => {
        this.injected.toolbarStore.repoListVisible = false;
    };

    render() {
        return this.injected.toolbarStore.repoListVisible ? (
            <div
                className="overlay"
                style={{
                    backgroundColor: "black",
                    height: "100%",
                    left: "0px",
                    opacity: 0.5,
                    position: "fixed",
                    top: "20px",
                    width: "100%",
                    zIndex: 1
                }}
                onClick={this.hideOverlay}
            />
        ) : null;
    }
}

export default Overlay;
