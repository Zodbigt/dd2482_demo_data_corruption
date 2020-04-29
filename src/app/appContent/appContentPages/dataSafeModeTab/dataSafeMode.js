import React, { Component } from 'react';
import {
    BACKGROUND_COLOR,
    MARGIN_TOP,
    FONT_HEADER_COLOR,
    FONT_HEADER_SIZE,
    FONT_WEIGHT_NORMAL,
} from "../../../assets/styles";
import {extractData} from "../../../logic/Utility";
import {dataSafeListParser} from "../../../logic/DataSafeParser";
import firebase from "firebase";
import Loading from "../../../components/Loading";
import EventCardList from "../../../components/EventCardList";
import { getCookie } from "../../../logic/Cookie";

class DataSafeMode extends React.Component {
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
        let ref = firebase.database().ref("event/"+getCookie("id"));
        ref.orderByValue().on("value", data => {
            this.setState({ data: data, loading: false });
        });
    }

    renderHeader(label){
        return(
            <div style={s.headerText}>
                {label}
            </div>
        );
    }

    renderLoading() {
        return (
            <div style={s.loadingContainer}>
                <Loading />
            </div>
        );
    }

    render() {
        let loading = this.state.loading;
        if (loading) {
            return this.renderLoading();
        }
        let data = this.state.data;
        let dataList = extractData(data);
        let dataSafeList = dataSafeListParser(dataList);
        return (
            <div style={s.container}>
                {this.renderHeader("Safe Site")}
                <div style={{marginTop: MARGIN_TOP}}/>
                <EventCardList dataList={dataSafeList}/>
            </div>
        );
    }
}

export default DataSafeMode;

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
        marginTop: 100,
        marginBottom: 100,
        color: FONT_HEADER_COLOR,
        fontSize: FONT_HEADER_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
};