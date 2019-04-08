import Octicon, { ChevronDown, ChevronLeft, Icon } from "@githubprimer/octicons-react";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import classnames from "classnames";
import React from "react";
import ListItem from "./SidebarListItem";

import "./SidebarList.css";

type IconType = Icon | React.ComponentType<SvgIconProps>;

interface IProps {
    icon: IconType;
    text: string;
    listItems: string[];
    highlightedItem?: string;
    onItemDoubleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

interface IState {
    listIsCollapsed: boolean;
}

class SidebarList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
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
                <div className="heading">
                    <div className="heading-button" onClick={() => this.chevronClicked()}>
                        <div className="heading-title">
                            {this.isOcticon(this.props.icon) ? (
                                <Octicon icon={this.props.icon} />
                            ) : (
                                <this.props.icon
                                    style={{
                                        height: 16,
                                        marginRight: "5px",
                                        width: 16
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
                </div>

                <div
                    className={classnames({
                        "list-content": !this.state.listIsCollapsed,
                        "list-content-collapsed": this.state.listIsCollapsed
                    })}
                >
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

export default SidebarList;
