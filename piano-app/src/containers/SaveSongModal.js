import React, { useState } from "react";
// import TextInput from "../../components/TextInput";
// import Button from "../../Button";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input } from "reactstrap";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const SAVE_SONG = gql`
    mutation AddSong($title: String!, $keyStrokes: [NoteInput!], $elapseTime: Int!) {
        addSong(title: $title, keyStrokes: $keyStrokes, elapseTime: $elapseTime) {
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

const SaveSongModal = props => {
    const { song, modal, setModal } = props;
    const [title, setTitle] = useState("");
    const toggle = () => {
        setModal(!modal);
        setTitle("");
    };

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Save Songs</ModalHeader>
                <ModalBody>
                    <Mutation mutation={SAVE_SONG}>
                        {(addSong, { data }) => {
                            return (
                                <Form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        addSong({
                                            variables: {
                                                title,
                                                keyStrokes: song.events,
                                                elapseTime: song.seconds,
                                            },
                                        });
                                        setTitle("");
                                        setModal(false);
                                    }}
                                >
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            name="songName"
                                            id="songName"
                                            placeholder="Name of Song"
                                            onChange={e => setTitle(e.target.value)}
                                        />
                                    </FormGroup>
                                    <Button>Save</Button>
                                </Form>
                            );
                        }}
                    </Mutation>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default SaveSongModal;
