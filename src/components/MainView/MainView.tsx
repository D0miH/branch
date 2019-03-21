import React from "react";
import "./MainView.css";
import { RepositoryStore } from "../../stores";
import { inject, observer } from "mobx-react";

interface InjectedProps {
    repoStore: RepositoryStore;
}

@inject(({ stores }) => ({
    repoStore: stores.repoStore
}))
@observer
class MainView extends React.Component {
    get injected() {
        return this.props as InjectedProps;
    }

    render() {
        return <div className="main-view" />;
    }
}

export default MainView;
