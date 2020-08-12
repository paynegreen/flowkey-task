import React from "react";
import Button from "./Button";

const StopButton = props => {
    return (
        <Button onClick={props.onPress}>
            <span>Stop</span>
        </Button>
    );
};

export default StopButton;
