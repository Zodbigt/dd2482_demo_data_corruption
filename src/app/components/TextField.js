import React, { Component } from "react";
import {
    BORDER_COLOR_1,
    FONT_BODY_COLOR,
} from "../assets/styles.js";
import MdTextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import {isEmptyEvaluator} from "../logic/Utility";

const CustomColorTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: BORDER_COLOR_1,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: BORDER_COLOR_1,
        },
    },

})(MdTextField);

class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        let startValue= this.props.startValue;
        if (!isEmptyEvaluator(startValue)) {
            let input = document.getElementById("id1"); 
            input.value = startValue;
        }
    }  

    render() {
        let style = this.props.style;
        let label = this.props.label;
        let type = this.props.type;
        let onChangeFunc = this.props.onChange;
        let value = this.props.value;
        return (
            <CustomColorTextField
                id={"id1"}
                style={style}
                inputProps={{ style: {color: FONT_BODY_COLOR}}}
                label={label}
                type={type}
                fullWidth={false}
                onChange={(event) => onChangeFunc(event)}
                value={value}
            />
        );
    }
}

export default TextField;