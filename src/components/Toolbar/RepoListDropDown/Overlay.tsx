import React from "react";
import { observer } from "mobx-react";
import { IToolbarStore } from "../../../stores/stores";

type Props = {
    toolbarStore: IToolbarStore;
};

@observer
class Overlay extends React.Component<Props> {
    hideOverlay = () => {
        this.props.toolbarStore.repoListVisible = false;
    };

    render() {
        return this.props.toolbarStore.repoListVisible ? (
            <div
                className="Overlay"
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
