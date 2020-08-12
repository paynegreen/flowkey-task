import React from "react";

function Song(props) {
    const { play } = props;
    return (
        <div className="Container">
            <button className="PlayButton" onClick={play}>
                play
            </button>
            <span className="Label">Beautiful Song I recorded</span>
        </div>
    );
}

export default Song;
