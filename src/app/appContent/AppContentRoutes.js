import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
    BACKGROUND_COLOR,
    NAV_BAR_HEIGHT,
} from "../assets/styles"
import NavBar from "../components/NavBar";
import Background from "./appContentPages/backgroundTab/Background";
import Home from "./appContentPages/homeTab/Home";
import DataGenerator from "./appContentPages/dataGeneratorTab/DataGenerator";
import DataSafeMode from "./appContentPages/dataSafeModeTab/dataSafeMode";
import RegularMode from "./appContentPages/regularModeTab/regularMode";
import QuarantinedEvents from "./appContentPages/quarantinedEventsTab/QuarantinedEvents";

import MissingPage from "../MissingPage";

class AppContentRogutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderNavbar(){
        return(
            <div style={s.navbarContainer}>
                <NavBar />
            </div>
        );
    }

    render() {
        return (
            <div style={s.appContainer}>
                <BrowserRouter>
                <div style={{marginTop: NAV_BAR_HEIGHT}}/>
                    <div style={s.container}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/background" component={Background} />
                            <Route path="/datagenerator" component={DataGenerator} />
                            <Route path="/safe" component={DataSafeMode} />
                            <Route path="/regular" component={RegularMode} />
                            <Route path="/quarantinedevents" component={QuarantinedEvents} />
                            <Route component={MissingPage} />
                        </Switch>
                    </div>
					{this.renderNavbar()}
                </BrowserRouter>
            </div>
        );
    }
}

export default AppContentRogutes;

const s = {
    appContainer: {
    },
    container: {
        display: "flex",
        flex: 1,
        //flexDirection: "column",
        minHeight: "calc(100vh - " + NAV_BAR_HEIGHT + "px)",
        backgroundColor: BACKGROUND_COLOR,
    },
    navbarContainer: {
        position: "fixed", top: 0, right: 0, left: 0,
    },
};