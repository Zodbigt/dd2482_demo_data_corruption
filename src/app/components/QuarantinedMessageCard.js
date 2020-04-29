import React, { Component } from "react";
import {
    BACKGROUND_COLOR,
    BORDER_COLOR_2,
    FONT_HEADER_COLOR,
    FONT_HEADER_SIZE,
    FONT_HIGHLIGHT_COLOR,
    FONT_BODY_COLOR,
    FONT_BODY_COLOR_UNSELECTED,
    FONT_BODY_SIZE,
    FONT_DATE_SIZE,
    FONT_WEIGHT_NORMAL,
    FONT_WEIGHT_BOLD,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    MARGIN_TOP,
    MARGIN_BOTTOM,
} from "../assets/styles.js";

class QuarantinedMessageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderEventLogo(eventImgUrl) {
        return (
            <div style={s.logloContainer}>
                <img style={s.logo} src={eventImgUrl} />
            </div>
        );
    }

    renderEventId(eventId) {
        return (
            <div style={s.eventId}>
                {eventId}
            </div>
        );
    }

    renderQuarantineMessage(quarantineMessage) {
        let quarantineMessageStart = "The following data fileds created an ERROR and put the event in Quarantine:\n\n";
        return (
            <div style={s.quarantineMessage}>
                {quarantineMessageStart}
                {this.renderQuarantineMessageHelperList(quarantineMessage)}
            </div>
        );
    }

    renderQuarantineMessageHelperList(quarantineMessage) {
        return (
            <div>
                {quarantineMessage.map((info) => (
                    <div key={info.keyValue}>
                        {this.renderQuarantineMessageHelper(info.label, info.message)}
                    </div>
                ))}
            </div>
        );
    }

    renderQuarantineMessageHelper(label, info) {
        return (
            <div style={s.quarantineMessageHelperContainer}>
                <div style={s.quarantineMessageHelperLabel}>
                    {label}
                </div>
                <div style={s.quarantineMessageHelperInfo}>
                    {info}
                </div>
            </div>
        );
    }

    render() {
        let data = this.props.data;
        return (
            <div style={s.cardContainer}>
                {this.renderEventId(data.eventId)}
                <div style={{ border: "" + 1 + "px solid " + BORDER_COLOR_2, }} />
                {this.renderQuarantineMessage(data.quarantineMessage)}
            </div>
        );
    }
}

export default QuarantinedMessageCard;

const s = {
    cardContainer: {
        width: 400,
        //height: 300,
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        border: "" + 1 + "px solid " + BORDER_COLOR_2,
        boxShadow: "1px 1px 5px #888888",
        overflow: "hidden",
        backgroundColor: BACKGROUND_COLOR,
    },
    eventId: {
        marginLeft: MARGIN_LEFT,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE * 1.2,
        fontWeight: FONT_WEIGHT_BOLD,
    },
    quarantineMessage: {
        display: "flex",
        flexDirection: "column",
        marginTop: MARGIN_TOP,
        marginLeft: MARGIN_LEFT,
        marginRight: MARGIN_RIGHT,
        marginBottom: MARGIN_BOTTOM,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
    },
    quarantineMessageHelperContainer: {
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
    },
    quarantineMessageHelperLabel: {
        display: "flex",
        flex: 0.5,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,

    },
    quarantineMessageHelperInfo: {
        display: "flex",
        flex: 0.5,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
};