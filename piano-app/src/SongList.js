import React from "react";
import Song from "./Song";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const GET_SONGS = gql`
    {
        songs {
            _id
            title
            keyStrokes {
                midiNumber
                time
                duration
            }
            elapseTime
        }
    }
`;

const SongList = props => {
    const { replaySong } = props;

    return (
        <>
            <p>My Songs</p>
            <Query query={GET_SONGS} pollInterval={500}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    return data.songs.map(v => <Song song={v} key={v._id} play={replaySong} />);
                }}
            </Query>
        </>
    );
};

export default SongList;
