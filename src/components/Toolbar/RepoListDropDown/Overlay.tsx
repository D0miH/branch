import React from "react";
import { observer } from "mobx-react";

import ToolbarStore from "../../../stores/ToolbarStore";

type Props = {
    toolbarStore: ToolbarStore;
};

@observer
class Overlay extends React.Component<Props> {
    hideOverlay = () => {
        this.props.toolbarStore.repoListVisible = false;
    };

    render() {
        return this.props.toolbarStore.repoListVisible ? (
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
