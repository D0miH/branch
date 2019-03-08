import React from "react";
import { ArrowUpward } from "@material-ui/icons";
import "./PushButton.css";

class PushButton extends React.Component {
    onClick() {
        console.log("Push button was pressed");
    }

    render() {
        return (
            <div className="PushButton" onClick={() => this.onClick()}>
                <div className="ButtonComponent">
                    <ArrowUpward className="ArrowIcon" />
                    <span>Push</span>
                </div>
            </div>
        );
    }
}

export default PushButton;
