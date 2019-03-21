import React from "react";
import ReactTooltip from "react-tooltip";
import Octicon, { Check } from "@githubprimer/octicons-react";
import "./SidebarListItem.css";

interface Props {
    label: string;
    itemHighlighted?: boolean;
    onItemDoubleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

class SidebarListItem extends React.Component<Props> {
    render() {
        return (
            <div className="sidebar-list-item">
                <div
                    className="sidebar-list-button"
                    data-tip={this.props.label}
                    onDoubleClick={this.props.onItemDoubleClick}
                >
                    {this.props.itemHighlighted ? <Octicon icon={Check} /> : null}
                    <span>{this.props.label}</span>
                </div>
                <ReactTooltip place="bottom" effect="solid" delayShow={1500} />
            </div>
        );
    }
}

export default SidebarListItem;
