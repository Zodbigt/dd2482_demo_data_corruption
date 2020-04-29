import React, { Component } from "react";
import {
    BUTTON_HEIGHT,
    BUTTON_BORDER_RADIUS,
    BUTTON_BACKGROUND_COLOR,
    BUTTON_TEXT_COLOR,
    FONT_BODY_SIZE,
} from "../assets/styles.js";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class DataTypeChooser extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let value = this.props.value;
        let onChangeFunc = this.props.onChange;
        return (
            <RadioGroup row aria-label="position" name="position" value={value} onChange={(event) => onChangeFunc(event.target.value)}>
                <FormControlLabel
                    value={"string"}
                    control={<Radio color="primary" />}
                    label={"String"}
                    labelPlacement={"bottom"}
                />
                <FormControlLabel
                    value={"int"}
                    control={<Radio color="primary" />}
                    label={"Int"}
                    labelPlacement={"bottom"}
                />
                <FormControlLabel
                    value={"null"}
                    control={<Radio color="primary" />}
                    label={"Null"}
                    labelPlacement={"bottom"}
                />
                <FormControlLabel
                    value={"undefined"}
                    control={<Radio color="primary" />}
                    label={"Undefined"}
                    labelPlacement={"bottom"}
                />
            </RadioGroup>
        );
    }
}

export default DataTypeChooser;

const s = {
    container: {
        height: BUTTON_HEIGHT,
        width: "100%",
        backgroundColor: BUTTON_BACKGROUND_COLOR,
        borderRadius: BUTTON_BORDER_RADIUS,
    },
    buttonLabel: {
        fontSize: FONT_BODY_SIZE,
        fontWeight: "bold",
        color: BUTTON_TEXT_COLOR,
    },
};