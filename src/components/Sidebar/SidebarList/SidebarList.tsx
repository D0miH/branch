import React from "react";
import Octicon, { Icon, ChevronDown, ChevronLeft } from "@githubprimer/octicons-react";
import classnames from "classnames";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import "./SidebarList.css";
import ListItem from "./SidebarListItem";

type IconType = Icon | React.ComponentType<SvgIconProps>;

type Props = {
    icon: IconType;
    text: String;
    listItems: string[];
    highlightedItem?: string;
    onItemDoubleClick?: () => void;
};

type State = {
    listIsCollapsed: boolean;
};

class SidebarList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { listIsCollapsed: true };
    }

    isOcticon(givenIcon: IconType): givenIcon is Icon {
        return (givenIcon as Icon).size !== undefined;
    }

    chevronClicked() {
        this.setState({ listIsCollapsed: !this.state.listIsCollapsed });
    }

    renderList() {
        return this.props.listItems.map(listItem => {
            return (
                <ListItem
                    label={listItem}
                    key={listItem}
                    onItemDoubleClick={this.props.onItemDoubleClick}
                    itemHighlighted={this.props.highlightedItem === listItem ? true : false}
                />
            );
        });
    }

    render() {
        return (
            <div className="list">
                <div className="heading" onClick={() => this.chevronClicked()}>
                    <div className="heading-title">
                        {this.isOcticon(this.props.icon) ? (
                            <Octicon icon={this.props.icon} />
                        ) : (
                            <this.props.icon
                                style={{
                                    height: 16,
                                    width: 16,
                                    marginRight: "5px"
                                }}
                            />
                        )}
                        {this.props.text}
                    </div>
                    <div className="right-heading">
                        {this.props.listItems.length}/{this.props.listItems.length}
                        <Octicon icon={this.state.listIsCollapsed ? ChevronLeft : ChevronDown} />
                    </div>
                </div>

                <div
                    className={classnames({
                        "list-content-collapsed": this.state.listIsCollapsed,
                        "list-content": !this.state.listIsCollapsed
                    })}
                >
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

export default SidebarList;
