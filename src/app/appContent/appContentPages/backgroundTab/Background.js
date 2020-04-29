import React, { Component } from 'react';
import {
    BACKGROUND_COLOR,
    FONT_HEADER_COLOR,
    FONT_HEADER_SIZE,
    FONT_WEIGHT_BOLD,
    FONT_BODY_COLOR,
    FONT_BODY_SIZE,
    FONT_WEIGHT_NORMAL,
} from "../../../assets/styles";
import Button from "../../../components/Button";
import firebase from "firebase";
import Loading from "../../../components/Loading";
import {extractTitleHeaderData} from "../../../logic/Utility";
import Paper from "@material-ui/core/Paper";


class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
        };
    }

    componentDidMount() {
        this.dataBaseListner();
    }

    changeScreen(path) {
        this.props.history.push(path);
    }

    dataBaseListner() {
        let ref = firebase.database().ref("language/en/background/");
        ref.orderByValue().on("value", data => {
            this.setState({ data: data, loading: false });
        });
    }

    renderLoading() {
        return (
            <div style={s.loadingContainer}>
                <Loading />
            </div>
        );
    }

    renderBackgroundInfo(data) {
        return (
            <div style={s.backgroundInfoContainer}>
                <Paper style={s.backgroundInfoPaper}>
                    <div style={s.backgroundInfoTitle}>
                        {data.header}
                    </div>
                    <div style={s.backgroundInfoText}>
                        {data.text}
                    </div>
                </Paper>
            </div>
        );
    }

    render() {
        let loading = this.state.loading;
        if (loading) {
            return this.renderLoading();
        }
        let data = this.state.data;
        let extractedData = extractTitleHeaderData(data);
        return (
            <div style={s.container}>
                {this.renderBackgroundInfo(extractedData)}
            </div>
        );
    }
}

export default Background;

const s = {
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#E0E0E0",
    },
    loadingContainer: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BACKGROUND_COLOR,
    },
    backgroundInfoContainer: {
        marginTop: 200,
        width: 1000,
    },
    backgroundInfoPaper: {
        padding: 50,
    },
    backgroundInfoTitle: {
        marginBottom: 20,
        color: FONT_HEADER_COLOR,
        fontSize: FONT_HEADER_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
    },
    backgroundInfoText: {
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
        whiteSpace: "pre-wrap",
    },
};