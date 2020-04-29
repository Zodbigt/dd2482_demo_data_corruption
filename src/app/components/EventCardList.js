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
import EventCard from "../components/EventCard"

class EventCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderEventCardList(dataList){
        return(
            <div>
                {dataList.map((info) => (
                    <div key={info.keyValue}>
                        <EventCard data={info} />
                        <div style={{marginBottom: MARGIN_BOTTOM}}/>
                    </div>
                ))}
            </div>
        );
    }

    render() {
        let dataList = this.props.dataList;
        return (
            <div style={s.container}>
                {this.renderEventCardList(dataList)}
            </div>
        );
    }
}

export default EventCardList;

const s = {
    container: {
    },
};