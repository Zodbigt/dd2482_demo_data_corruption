import React, { Component } from 'react';
import {
    BACKGROUND_COLOR,
    FONT_HEADER_COLOR,
    FONT_HEADER_SIZE,
    FONT_WEIGHT_NORMAL,
    FONT_BODY_SIZE,
    FONT_BODY_COLOR,
    FONT_WEIGHT_BOLD,
} from "../../../assets/styles";
import Button from "../../../components/Button";
import firebase from "firebase";
import { getCookie } from "../../../logic/Cookie";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            langData: null,
            data: null,
        };
    }

    componentDidMount() {
        this.getHomeText();
    }

    getHomeText() {
        let url = "https://dd2482-demo-data-corruption.firebaseio.com/language/en/home.json";
        fetch(url).then(response => {
            response.json().then(data => {
                this.setState({ langData: data, loading: false });
            });
        });
    }

    changeScreen(path) {
        this.props.history.push(path);
    }

    clearDatabase() {
        let ref = firebase.database().ref("event/" + getCookie("id"));
        ref.remove();
    }

    renderHeader(label) {
        return (
            <div style={s.headerText}>
                {label}
            </div>
        );
    }

    renderButtonChoices() {
        return (
            <div style={s.buttonContainer}>
                <Button label={"Clear the database"} onClick={() => this.clearDatabase()} />
            </div>
        );
    }

    renderHelpText(langData) {
        let guideText = langData.guide.text;
        return (
            <div style={s.guideContainer}>
                <div style={s.guideHeader}>
                    {langData.guide.header}
                </div>
                <div style={s.guideText}>
                   {langData.guide.text}
                </div>
            </div>
        );
    }

    render() {
        let loading = this.state.loading;
        if (loading) {
            return (
                <div />
            );
        }
        let langData = this.state.langData;
        return (
            <div style={s.container}>
                {this.renderHeader("Data Corruption Demo by Tommy & Stina")}
                {this.renderButtonChoices()}
                {this.renderHelpText(langData)}
            </div>
        );
    }
}

export default Home;

const s = {
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: BACKGROUND_COLOR,
    },
    loadingContainer: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BACKGROUND_COLOR,
    },
    headerText: {
        marginTop: 200,
        marginBottom: 100,
        color: FONT_HEADER_COLOR,
        fontSize: FONT_HEADER_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
    buttonContainer: {
        width: 400,
    },
    guideContainer: {
        width: 700,
    },
    guideHeader: {
        marginTop: 50,
        color: FONT_HEADER_COLOR,
        fontSize: FONT_HEADER_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
    },
    guideText: {
        lineHeight: 1.6,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE+2,
        fontWeight: FONT_WEIGHT_NORMAL,
        whiteSpace: "pre-wrap",
    },
};