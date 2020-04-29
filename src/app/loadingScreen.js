import React, { Component } from 'react';
import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";
import { CONFIG_FIREBASE } from "./assets/firebaseConfig";
import firebase from "firebase";
import {getCookie, setCookie} from "./logic/Cookie";
import {isEmptyCookie} from "./logic/Utility";
import AppContentHolder from "./appContent/AppContentRoutes";


class LoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false,
            loading: true,
            page: "home",
        };
        this.initFirebase();
        this.createAnonymousSession();
    }

    initFirebase() {
        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG_FIREBASE);
        }
        this.setState({page: "home"})
    }

    createAnonymousSession(){
        let id = getCookie("id");
        if(isEmptyCookie(id)) {
            let id = Math.random().toString(36).substr(2, 11);
            setCookie("id", id, 365);
        }
    }

    render() {
        if (this.state.page === "loading") {
            return (<div />);
        }
        else if (this.state.page === "home") {
            return (<AppContentHolder />);
        }
    }
}

export default LoadingScreen;