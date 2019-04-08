import Octicon, { Icon } from "@githubprimer/octicons-react";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import React from "react";

import "./ToolbarButton.css";

type IconType = React.ComponentType<SvgIconProps> | Icon;

interface IProps {
    icon: IconType;
    label: string;
    onClick: () => void;
}

class ToolbarButton extends React.Component<IProps> {
    isOcticon(givenIcon: IconType): givenIcon is Icon {
        return (givenIcon as Icon).size !== undefined;
    }

    render() {
        return (
            <div className="push-button" onClick={this.props.onClick}>
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
