import React from "react";
import { observer } from "mobx-react";

type Props = {
    overlayVisible: boolean;
};

@observer
class Overlay extends React.Component<Props> {
    render() {
        return this.props.overlayVisible ? (
            <div
                className="Overlay"
                style={{
                    position: "fixed",
                    backgroundColor: "black",
                    opacity: 0.5,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                    top: "20px",
                    left: "0px"
                }}
            />
        ) : null;
    }
}

export default Overlay;
