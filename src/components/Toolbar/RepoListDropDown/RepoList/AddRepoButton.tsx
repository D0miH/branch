import React from "react";
import { Add } from "@material-ui/icons";
import "./AddRepoButton.css";

class AddRepoButton extends React.Component {
    buttonClicked = () => {
        console.log("Add Repo Button was clicked");
    };

    render() {
        return (
            <div className="add-repo-button" onClick={this.buttonClicked}>
                <div className="button">
                    <Add />
                    <span>Add Repository</span>
                </div>
            </div>
        );
    }
}

export default AddRepoButton;
