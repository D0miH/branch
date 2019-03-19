import React from "react";
import ReactTooltip from "react-tooltip";
import "./SidebarListItem.css";

interface Props {
    label: string;
}

class SidebarListItem extends React.Component<Props> {
    render() {
        return (
            <div className="sidebar-list-item">
                <div className="sidebar-list-button" data-tip={this.props.label}>
                    <span>{this.props.label}</span>
                </div>
                <ReactTooltip place="bottom" effect="solid" delayShow={1500} />
            </div>
        );
    }
}

export default SidebarListItem;
