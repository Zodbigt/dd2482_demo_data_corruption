import React, { Component } from 'react';
import {
    BACKGROUND_COLOR,
    MARGIN_TOP,
    FONT_HEADER_COLOR,
    FONT_HEADER_SIZE,
    FONT_WEIGHT_NORMAL,
    MARGIN_BOTTOM,
    LOADING_CIRCLE_BACKGROUND_COLOR,
} from "../../../assets/styles";
import { extractQuarantinedData, extractTitleHeaderData } from "../../../logic/Utility";
import firebase from "firebase";
import Loading from "../../../components/Loading";
import QuarantinedMessageCardList from "../../../components/QuarantinedMessageCardList";
import { getCookie } from "../../../logic/Cookie";

class QuarantinedEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
            info: null,
            loading2: true,
        };
    }

    componentDidMount() {
        this.dataBaseListner();
    }

    changeScreen(path) {
        this.props.history.push(path);
    }

    dataBaseListner() {
        let ref = firebase.database().ref("event/" + getCookie("id"));
        ref.orderByValue().on("value", data => {
            this.setState({ data: data, loading: false });
        });
        let info = firebase.database().ref("language/en/quarantined/quarantinedInfo/");
        info.orderByValue().on("value", data => {
            this.setState({ info: data, loading2: false });
        });
    }

    renderHeader(label) {
        return (
            <div style={s.headerText}>
                {label}
            </div>
        );
    }

    renderDescription(data) {
        return (
            <div>
                {this.renderHeader(data.header)}
                <div style={s.descriptionText}>
                    {data.text}
                </div>
            </div>
        )
    }

    renderLoading() {
        return (
            <div style={s.loadingContainer}>
                <Loading />
            </div>
        );
    }

    renderQuarantineMessages(dataList) {
        return (
            <div>
                {dataList.map((info) => (
                    <div key={info.keyValue}>
                        {info.quarantineMessage}
                        <div style={{ marginBottom: MARGIN_BOTTOM }} />
                    </div>
                ))}
            </div>
        );
    }

    render() {
        let loading = this.state.loading;
        let loading2 = this.state.loading2;
        if (loading || loading2) {
            return this.renderLoading();
        }
        let info = this.state.info;
        let extractedInfo = extractTitleHeaderData(info);
        let data = this.state.data;
        let dataList = extractQuarantinedData(data);
        return (
            <div style={s.container}>
                {this.renderDescription(extractedInfo)}
                <div style={{ marginTop: MARGIN_TOP }} />
                <QuarantinedMessageCardList dataList={dataList} />
            </div>
        );
    }
}

export default QuarantinedEvents;

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
        marginBottom: 10,
        color: FONT_HEADER_COLOR,
        fontSize: FONT_HEADER_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
    descriptionText: {
        marginTop: 10,
        marginBottom: 30,
        color: FONT_HEADER_COLOR,
        fontSize: 15,
        fontWeight: FONT_WEIGHT_NORMAL,
        width: 400,
        whiteSpace: "pre-wrap",
    },
    listStyle: {
        listStyleType: "circle",
    }
};