import React from "react";
import Button from "./Button";

function RecordButton(props) {
    return (
        <Button onClick={props.onPress}>
            <span>Record</span>
        </Button>
    );
}

export default RecordButton;
