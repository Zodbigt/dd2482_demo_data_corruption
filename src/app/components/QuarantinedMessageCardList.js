import React, { Component } from "react";
import { 
    MARGIN_BOTTOM,
} from "../assets/styles.js";
import QuarantinedMessageCard from "../components/QuarantinedMessageCard";

class QuarantinedMessageCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderQuarantinedMessageCardList(dataList){
        return(
            <div>
                {dataList.map((info) => (
                    <div key={info.keyValue}>
                        <QuarantinedMessageCard data={info} />
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
                {this.renderQuarantinedMessageCardList(dataList)}
            </div>
        );
    }
}

export default QuarantinedMessageCardList;

const s = {
    container: {
    },
};