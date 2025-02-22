import React from "react";
import PropTypes from "prop-types";
import { Piano as ReactPiano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import SoundfontProvider from "./SoundfontProvider";
import "react-piano/dist/styles.css";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
    first: MidiNumbers.fromNote("c3"),
    last: MidiNumbers.fromNote("f4"),
};
const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

function Piano(props) {
    const { activeNotes, onPlayNoteInput, onStopNoteInput, typing } = props;

    return (
        <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote }) => (
                <div>
                    <ReactPiano
                        disabled={isLoading || typing}
                        noteRange={noteRange}
                        playNote={playNote}
                        stopNote={stopNote}
                        width={1000}
                        keyboardShortcuts={keyboardShortcuts}
                        activeNotes={activeNotes}
                        onPlayNoteInput={onPlayNoteInput}
                        onStopNoteInput={onStopNoteInput}
                    />
                </div>
            )}
        />
    );
}

Piano.propTypes = {
    activeNotes: PropTypes.array,
    onPlayNoteInput: PropTypes.func.isRequired,
    onStopNoteInput: PropTypes.func.isRequired,
    typing: PropTypes.bool.isRequired,
};

export default Piano;
