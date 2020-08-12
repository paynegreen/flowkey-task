import React from "react";

function RecordButton(props) {
    return (
        <div className="Container">
            <button className="PlayButton" onClick={props.onPress}>
                Record
            </button>
            <span className="Label">00:00</span>
        </div>
    );
}

export default RecordButton;
