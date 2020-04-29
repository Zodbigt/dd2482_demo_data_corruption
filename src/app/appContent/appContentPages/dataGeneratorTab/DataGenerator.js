import React, { Component } from 'react';
import {
    BACKGROUND_COLOR,
    FONT_HEADER_COLOR,
    FONT_HEADER_SIZE,
    FONT_WEIGHT_BOLD,
    FONT_BODY_COLOR,
    FONT_BODY_SIZE,
    FONT_WEIGHT_NORMAL,
    BORDER_COLOR_2,
    NAV_BAR_BACKGROUND_COLOR,
    MARGIN_BOTTOM,
} from "../../../assets/styles";
import firebase from "firebase";
import Loading from "../../../components/Loading";
import Button from "../../../components/Button";
import TextField from "../../../components/TextField";
import SuccessBar from "../../../components/SuccessBar";
import DataTypeChooser from "../../../components/DataTypeChooser";
import { PRE_SET_LIST } from "./DataPreSet";
import { extractTitleHeaderData } from "../../../logic/Utility";
import { getCookie } from "../../../logic/Cookie";
let timmer;

class DataGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
            eventName: "",
            eventNameType: "string",
            eventImgUrl: "",
            eventImgUrlType: "string",
            eventDate: "",
            eventDateType: "string",
            eventPrice: "",
            eventPriceType: "string",
            eventDescription: "",
            eventDescriptionType: "string",
            eventTags: "",
            eventTagsType: "string",
            eventTickets: "",
            eventTicketsType: "string",
            showBar: false,
        };
    }

    componentDidMount() {
        this.dataBaseListner();
    }

    dataBaseListner() {
        let ref = firebase.database().ref("language/en/dataGenerator/");
        ref.orderByValue().on("value", data => {
            this.setState({ data: data, loading: false });
        });
    }

    changeScreen(path) {
        this.props.history.push(path);
    }

    clearFields() {
        this.setState({
            eventName: "",
            eventNameType: "string",
            eventImgUrl: "",
            eventImgUrlType: "string",
            eventDate: "",
            eventDateType: "string",
            eventPrice: "",
            eventPriceType: "string",
            eventDescription: "",
            eventDescriptionType: "string",
            eventTags: "",
            eventTagsType: "string",
            eventTickets: "",
            eventTicketsType: "string",
            showBar: true,
        });
        this.hideBar();
    }

    typeSeter(evntPara, evenType) {
        if (evenType === "string") {
            return evntPara;
        }
        else if (evenType === "int") {
            let evntParaInt = parseInt(evntPara, 10);
            if (isNaN(evntParaInt)) {
                return 1;
            }
            return evntParaInt;
        }
        else if (evenType === "null") {
            return evenType;
        }
        else if (evenType === "undefined") {
            return evenType;
        }
    }

    createDataWithPreSet(data) {
        let eventName = data.eventName;
        let eventImgUrl = data.eventImgUrl;
        let eventDate = data.eventDate;
        let formatedEventDate = this.dateHelper(eventDate);
        let eventPrice = data.eventPrice;
        let eventDescription = data.eventDescription;
        let eventTags = data.eventTags;
        let eventTickets = data.eventTickets;

        let eventNameType = data.eventNameType;
        let eventImgUrlType = data.eventImgUrlType;
        let eventDateType = data.eventDateType;
        let eventPriceType = data.eventPriceType;
        let eventDescriptionType = data.eventDescriptionType;
        let eventTagsType = data.eventTagsType;
        let eventTicketsType = data.eventTicketsType;


        let ref = firebase.database().ref("event/" + getCookie("id"));
        ref.push({
            eventName: this.typeSeter(eventName, eventNameType),
            eventImgUrl: this.typeSeter(eventImgUrl, eventImgUrlType),
            eventDate: this.typeSeter(formatedEventDate, eventDateType),
            eventPrice: this.typeSeter(eventPrice, eventPriceType),
            eventDescription: this.typeSeter(eventDescription, eventDescriptionType),
            eventTags: this.typeSeter(eventTags, eventTagsType),
            eventTickets: this.typeSeter(eventTickets, eventTicketsType),
            quarantineStatus: false,
            quarantineMessage: "",
            submitDate: Date.parse(new Date),
        });
        this.clearFields();
    }

    createData() {
        let eventName = this.state.eventName;
        if(eventName === "DevOps") {
            alert("So you like DevOps! Then check out this site!");
            window.location.replace("https://github.com/KTH/devops-course");
        }
        let eventImgUrl = this.state.eventImgUrl;
        let eventDate = this.state.eventDate;
        let formatedEventDate = this.dateHelper(eventDate);
        let eventPrice = this.state.eventPrice;
        let eventDescription = this.state.eventDescription;
        let eventTags = this.state.eventTags;
        let eventTickets = this.state.eventTickets;

        let eventNameType = this.state.eventNameType;
        let eventImgUrlType = this.state.eventImgUrlType;
        let eventDateType = this.state.eventDateType;
        let eventPriceType = this.state.eventPriceType;
        let eventDescriptionType = this.state.eventDescriptionType;
        let eventTagsType = this.state.eventTagsType;
        let eventTicketsType = this.state.eventTicketsType;


        let ref = firebase.database().ref("event/" + getCookie("id"));
        ref.push({
            eventName: this.typeSeter(eventName, eventNameType),
            eventImgUrl: this.typeSeter(eventImgUrl, eventImgUrlType),
            eventDate: this.typeSeter(formatedEventDate, eventDateType),
            eventPrice: this.typeSeter(eventPrice, eventPriceType),
            eventDescription: this.typeSeter(eventDescription, eventDescriptionType),
            eventTags: this.typeSeter(eventTags, eventTagsType),
            eventTickets: this.typeSeter(eventTickets, eventTicketsType),
            quarantineStatus: false,
            quarantineMessage: "",
            submitDate: Date.parse(new Date),
        });
        this.clearFields();
    }

    dateHelper(date) {
        let formatedDate = new Date(date);
        let dateInt = Date.parse(formatedDate);
        if (isNaN(dateInt)) {
            return 0;
        }
        return dateInt;
    }

    hideBar() {
        clearTimeout(timmer);
        timmer = setTimeout(() => {
            this.setState({ showBar: false });
        }, 2500)
    }

    renderHeader(data) {
        return (
            <div>
                <div style={s.infoTitle}>
                    {data.header}
                </div>
                <div style={s.infoText}>
                    {data.text}
                </div>
            </div>
        );
    }

    renderInputContainer() {
        return (
            <div style={s.inputContainer}>
                <div style={s.inputRow}>
                    {this.renderInput("Name", "eventName", "text")}
                    {this.renderDataTypeChooser("eventNameType")}
                </div>
                <div style={s.inputRow}>
                    {this.renderInput("Img", "eventImgUrl", "text")}
                    {this.renderDataTypeChooser("eventImgUrlType")}
                </div>
                <div style={s.inputRow}>
                    {this.renderInput("Date", "eventDate", "text")}
                    {this.renderDataTypeChooser("eventDateType")}
                </div>
                <div style={s.inputRow}>
                    {this.renderInput("Price", "eventPrice", "text")}
                    {this.renderDataTypeChooser("eventPriceType")}
                </div>
                <div style={s.inputRow}>
                    {this.renderInput("Description", "eventDescription", "text")}
                    {this.renderDataTypeChooser("eventDescriptionType")}
                </div>
                <div style={s.inputRow}>
                    {this.renderInput("Tags", "eventTags", "text")}
                    {this.renderDataTypeChooser("eventTagsType")}
                </div>
                <div style={s.inputRow}>
                    {this.renderInput("Tickets", "eventTickets", "text")}
                    {this.renderDataTypeChooser("eventTicketsType")}
                </div>
                {this.renderButton()}
            </div>
        );
    }

    renderInput(label, bindning, type) {
        return (
            <TextField
                style={{ width: 400 }}
                label={label}
                type={type}
                onChange={(event) => this.setState({ [bindning]: event.target.value })}
                value={this.state[bindning]}
            />
        );
    }

    renderDataTypeChooser(bindning) {
        return (
            <DataTypeChooser
                onChange={(choice) => this.setState({ [bindning]: choice })}
                value={this.state[bindning]}
            />
        );
    }

    renderButton() {
        return (
            <div style={s.buttonContainer}>
                <Button label={"Submit data"} onClick={() => this.createData()} />
            </div>

        );
    }


    renderPreSetDataButtons(dataList) {
        let label = "Pre-sets of data to use"
        return (
            <div>
                <div style={s.preSetsButtonLabel}>
                    {label}
                </div>
                {dataList.map((info) => (
                    <div key={info.keyValue}>
                        <Button label={info.btnLabel} onClick={() => this.createDataWithPreSet(info.eventData)} />
                        <div style={{ marginBottom: MARGIN_BOTTOM }} />
                    </div>
                ))}
            </div>
        );
    }

    renderSuccessBar() {
        return (
            <div style={s.successBarContainer}>
                <SuccessBar trigger={this.state.showBar} message={"Your event was added successfully!"} />
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
        let extractedData = extractTitleHeaderData(data);
        return (
            <div style={s.container}>
                {this.renderHeader(extractedData)}
                {this.renderInputContainer()}
                {this.renderPreSetDataButtons(PRE_SET_LIST)}
                {this.renderSuccessBar()}
            </div>
        );
    }
}

export default DataGenerator;

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
    infoTitle: {
        width: 400,
        marginTop: 200,
        marginBottom: 20,
        color: FONT_HEADER_COLOR,
        fontSize: FONT_HEADER_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
    },
    infoText: {
        width: 800,
        marginBottom: 20,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
        whiteSpace: "pre-wrap",
    },
    inputContainer: {
        width: 800,
        //marginBottom: 200,
        padding: 18,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 8,
        border: "" + 1 + "px solid " + BORDER_COLOR_2,
        backgroundColor: NAV_BAR_BACKGROUND_COLOR,
    },
    inputRow: {
        marginTop: 20,
        padding: 18,
        display: "flex",
        flexDirection: "row",
        border: "" + 1 + "px solid " + BORDER_COLOR_2,
        justifyContent: "space-evenly",
        borderRadius: 8,
        backgroundColor: BACKGROUND_COLOR,
    },
    buttonContainer: {
        marginTop: 100,
        display: "flex",
        width: 400,
    },
    preSetsButtonLabel: {
        width: 400,
        marginTop: 60,
        marginBottom: 20,
        color: FONT_HEADER_COLOR,
        fontSize: FONT_HEADER_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
    },
    successBarContainer: {
        display: "flex",
        width: 400,
        position: "fixed", top: 420,
    }
};