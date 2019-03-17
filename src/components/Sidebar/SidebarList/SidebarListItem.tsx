import React from "react";
import "./SidebarListItem.css";

interface Props {
    label: string;
}

class SidebarListItem extends React.Component<Props> {
    render() {
        return (
            <div className="sidebar-list-item">
                <div className="sidebar-list-button">
                    <span>{this.props.label}</span>
                </div>
            </div>
        );
    }
}

export default SidebarListItem;
