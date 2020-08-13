import React from "react";
import Button from "./Button";

function Song(props) {
    const { play, song } = props;
    return (
        <div className="Container">
            <Button onClick={() => play(song)}>
                <span>Play</span>
            </Button>
            <span className="Label">{song.title}</span>
        </div>
    );
}

export default Song;
