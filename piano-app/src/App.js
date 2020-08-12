import React, { useState, useEffect } from "react";
import "./App.css";
import Piano from "./Piano";
import RecordButton from "./RecordButton";
import SongList from "./SongList";
import _ from "lodash";

const DEFAULT_NOTE_DURATION = 0.2;

function App() {
    const [mode, setMode] = useState("IDLE");
    const [currentTime, setCurrentTime] = useState(0);
    const [events, setEvents] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [songs, setSongs] = useState([
        {
            _id: "somdsm454",
            title: "Beautiful Song",
        },
        {
            _id: "somdsmfsd",
            title: "Beautiful Song",
        },
    ]);
    const [song, setSong] = useState({});
    const [recordedNote, setRecordedNote] = useState(false);
    const [noteDuration, setNoteDuration] = useState(DEFAULT_NOTE_DURATION);

    const beginRecording = () => {
        setMode("RECORDING");
    };

    const recordNotes = (midiNumbers, duration) => {
        if (mode !== "RECORDING") return;

        const newEvents = midiNumbers.map(midiNumber => {
            return {
                midiNumber,
                time: currentTime,
                duration: duration,
            };
        });

        setEvents(_.concat(events, newEvents));
        setCurrentTime(currentTime + duration);
    };

    useEffect(() => {
        console.log(events);
    }, [events]);

    const onPlayNoteInput = midiNumber => {
        setRecordedNote(false);
    };

    const onStopNoteInput = (midiNumber, { prevActiveNotes }) => {
        if (!recordedNote) {
            recordNotes(prevActiveNotes, noteDuration);
            setRecordedNote(true);
            setNoteDuration(DEFAULT_NOTE_DURATION);
        }
    };

    return (
        <div className="App">
            <h1>React Piano Task</h1>
            <Piano onPlayNoteInput={onPlayNoteInput} onStopNoteInput={onStopNoteInput} />
            <hr />
            <RecordButton onPress={beginRecording} />
            <SongList songs={songs} />
        </div>
    );
}

export default App;
