import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import formatTime from "../utils/formatTime";
import { FaPlay } from "react-icons/fa";

function Song(props) {
    const { replaySong, song, mode } = props;
    return (
        <>
            <div>
                <Button
                    size="sm"
                    disabled={mode !== "IDLE"}
                    onClick={() => replaySong(song)}
                    className="mr-4"
                >
                    <FaPlay size={15} />
                </Button>
                {song.title}
            </div>
            <div>{formatTime(song.elapseTime / 1000)}</div>
        </>
    );
}

Song.propTypes = {
    replaySong: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
};

export default Song;
