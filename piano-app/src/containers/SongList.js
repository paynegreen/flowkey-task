import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Table } from "reactstrap";
import Song from "../components/Song";

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
    return (
        <>
            <h3>My Songs</h3>
            <Table borderless>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Length</th>
                    </tr>
                </thead>
                <tbody>
                    <Query query={GET_SONGS} pollInterval={500}>
                        {({ loading, error, data }) => {
                            if (loading) return null;
                            if (error) return null;

                            return data.songs.map(v => <Song song={v} key={v._id} {...props} />);
                        }}
                    </Query>
                </tbody>
            </Table>
        </>
    );
};

export default SongList;
