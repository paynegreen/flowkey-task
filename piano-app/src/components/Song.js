import React from "react";
import { Button } from "reactstrap";
import formatTime from "../utils/formatTime";
import { FaPlay } from "react-icons/fa";

function Song(props) {
    const { replaySong, song, mode } = props;
    return (
        <tr>
            <td>
                <Button
                    disabled={mode !== "IDLE"}
                    onClick={() => replaySong(song)}
                    className="mr-4"
                >
                    <FaPlay />
                </Button>
                {song.title}
            </td>
            <td>{formatTime(song.elapseTime / 1000)}</td>
        </tr>
    );
}

export default Song;
