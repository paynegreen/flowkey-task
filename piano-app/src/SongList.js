import React from "react";
import Song from "./Song";

//TODO: replace key with _id from obj
function SongList(props) {
    const { songs, replaySong } = props;
    return (
        <div>
            <p>My Songs</p>
            {songs.length > 0 && songs.map((v, i) => <Song song={v} key={i} play={replaySong} />)}
        </div>
    );
}

export default SongList;
