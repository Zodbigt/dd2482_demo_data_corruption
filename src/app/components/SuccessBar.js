import React, { Component } from "react";
import { 
    FONT_BODY_SIZE,
    FONT_WEIGHT_BOLD,
} from "../assets/styles.js";

class SuccessBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBar: false,
        }
    }

    render() {
        let trigger = this.props.trigger;
        let message = this.props.message;
        if (!trigger){
            return <div/>;
        }
        else{
            return (
                <div style={s.container}>
                    <div style={s.text}>
                        {message}
                    </div>
                </div>
            );
        }

    }
}

export default SuccessBar;

const s = {
    container: {
        display: "flex",
        height: 50,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        boxShadow: "1px 1px 5px #888888",
        overflow: "hidden",
        backgroundColor: "#4CAF50",
        opacity: 0.8,
    },
    text: {
        color: "#FFFFFF",
        fontSize: FONT_BODY_SIZE,
        fontWeight: FONT_WEIGHT_BOLD,
    }
};