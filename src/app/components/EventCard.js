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
import {formatPrice, formatDate} from "../logic/Utility";

class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderEventLogo(eventImgUrl){
        return(
            <div style={s.logloContainer}>
                <img style={s.logo} src={eventImgUrl} />
            </div>
        );
    }

    renderEventName(label){
        return(
            <div style={s.eventName}>
                {label}
            </div>
        );
    }

    renderEventDate(unformattedDate){
        let formatedPrice = formatDate(unformattedDate);
        return(
            <div style={s.eventDate}>
                {formatedPrice}
            </div>
        );
    }

    renderEventPrice(unformattedPrice){
        let formatedPrice = formatPrice(unformattedPrice, false, "sv")
        return(
            <div style={s.eventPrice}>
                {formatedPrice} SEK
            </div>
        );
    }

    renderEventTags(tags){
        let tagsArray = tags.split(",")
        return(
            <div>
                <div style={s.eventTags}>
                    {tagsArray}
                </div>
            </div>
        );
    }

    renderEventTickets(tickets){
        let ticketsLine = "Available tickets: " + tickets;
        return(
            <div style={s.eventTickets}>
                {ticketsLine}
            </div>
        );
    }

    renderEventDescription(description){
        return(
            <div style={s.eventDescription}>
                {description}
            </div>
        );
    }

    render() {
        let data = this.props.data;
        return (
            <div style={s.cardContainer}>
                {this.renderEventName(data.eventName)}
                {this.renderEventDate(data.eventDate)}
                {this.renderEventLogo(data.eventImgUrl)}
                {this.renderEventTags(data.eventTags)}
                {this.renderEventPrice(data.eventPrice)}
                {this.renderEventTickets(data.eventTickets)}
                <div style={{border: "" + 1 + "px solid " + BORDER_COLOR_2,}}/>
                {this.renderEventDescription(data.eventDescription)}
            </div>
        );
    }
}

export default EventCard;

const s = {
    cardContainer: {
        width: 300,
        //height: 300,
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        border: "" + 1 + "px solid " + BORDER_COLOR_2,
        boxShadow: "1px 1px 5px #888888",
        overflow: "hidden",
        backgroundColor: BACKGROUND_COLOR,
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    logo: {
        //height: 300,
        width: 300,
        overflow: "hidden",
        objectFit: "cover",
    },
    eventName: {
        marginLeft: MARGIN_LEFT,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE*1.2,
        fontWeight: FONT_WEIGHT_BOLD,
    },
    eventDate: {
        marginLeft: MARGIN_LEFT,
        color: FONT_BODY_COLOR_UNSELECTED,
        fontSize: FONT_DATE_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
    },
    eventTags: {
        marginLeft: MARGIN_LEFT,
        color: FONT_HIGHLIGHT_COLOR,
        fontSize: FONT_DATE_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
    },
    eventPrice: {
        marginLeft: MARGIN_LEFT,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
    },
    eventTickets: {
        marginBottom: MARGIN_BOTTOM,
        marginLeft: MARGIN_LEFT,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
    eventDescription: {
        marginTop: MARGIN_TOP,
        marginLeft: MARGIN_LEFT,
        marginRight: MARGIN_RIGHT,
        marginBottom: MARGIN_BOTTOM,
        color: FONT_BODY_COLOR,
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_NORMAL,
    },
};