import React from "react";
import Song from "./Song";

function SongList(props) {
    const { songs } = props;
    return (
        <div>
            <p>My Songs</p>
            {songs.length > 0 && songs.map(v => <Song song={v} key={v._id} />)}
        </div>
    );
}

export default SongList;
