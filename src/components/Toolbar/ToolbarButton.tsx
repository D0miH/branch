import React from "react";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import "./ToolbarButton.css";
import Octicon, { Icon } from "@githubprimer/octicons-react";

type IconType = React.ComponentType<SvgIconProps> | Icon;

type Props = {
    icon: IconType,
    label: string
};

class ToolbarButton extends React.Component<Props> {
    isOcticon(givenIcon: IconType): givenIcon is Icon {
        return (givenIcon as Icon).size !== undefined;
    }

    onClick() {
        console.log(this.props.label + " button was pressed");
    }

    render() {
        return (
            <div className="push-button" onClick={() => this.onClick()}>
                <div className="button-component">
                    {this.isOcticon(this.props.icon) ? (
                        <Octicon icon={this.props.icon} size={24} />
                    ) : (
                        <this.props.icon />
                    )}
                    <span>{this.props.label}</span>
                </div>
            </div>
        );
    }
}

export default ToolbarButton;
