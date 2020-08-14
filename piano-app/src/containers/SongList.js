import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Table } from "reactstrap";
import Song from "../components/Song";

export const GET_SONGS = gql`
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
    return (
        <>
            <h3>My Songs</h3>
            <Query query={GET_SONGS} pollInterval={500}>
                {({ loading, error, data }) => {
                    if (loading) return <p>loading ...</p>;
                    if (error) return <p>An error occurred: {error}</p>;
                    if (data.songs.length === 0)
                        return <p>No songs played yet. Save your first song</p>;

                    return (
                        <div className="SongContainer">
                            {data.songs.map(v => (
                                <Song song={v} key={v._id} {...props} />
                            ))}
                        </div>
                    );
                }}
            </Query>
        </>
    );
};

export default SongList;
