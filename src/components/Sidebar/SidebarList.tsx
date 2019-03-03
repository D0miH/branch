import React from "react";
import Octicon, { Icon, ChevronDown } from "@githubprimer/octicons-react";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import "./SidebarList.css";

type IconType = Icon | React.ComponentType<SvgIconProps>;

type Props = {
    icon: IconType;
    text: String;
    counter: number;
};

class SidebarList extends React.Component<Props> {
    isOcticon(givenIcon: IconType): givenIcon is Icon {
        return (givenIcon as Icon).size !== undefined;
    }

    render() {
        return (
            <div className="List">
                <div className="Heading">
                    <div className="HeadingTitle">
                        {this.isOcticon(this.props.icon) ? (
                            <Octicon icon={this.props.icon} />
                        ) : (
                            <this.props.icon style={{ height: 16 }} />
                        )}
                        {this.props.text}
                    </div>
                    <div className="RightHeading">
                        {this.props.counter}/0
                        <Octicon icon={ChevronDown} />
                    </div>
                </div>
            </div>
        );
    }
}

export default SidebarList;
