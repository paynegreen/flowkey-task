import React, { useState } from "react";
import "./App.css";
import Piano from "./Piano";
import _ from "lodash";
import SaveSongModal from "./containers/SaveSongModal";
import { Container } from "reactstrap";
import RecordSection from "./containers/RecordSection";
import SongList from "./containers/SongList";

const DURATION_UNIT = 200;
const DEFAULT_NOTE_DURATION = DURATION_UNIT;

function App() {
    const [mode, setMode] = useState("IDLE");
    const [events, setEvents] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [song, setSong] = useState(null);
    const [recordedNote, setRecordedNote] = useState(false);
    const [noteDuration, setNoteDuration] = useState(DEFAULT_NOTE_DURATION);
    const [seconds, setSeconds] = useState(0);
    const [modal, setModal] = useState(false);

    let scheduleEvents = [];

    const resetEvents = () => {
        setEvents([]);
    };

    const beginRecording = () => {
        setMode("RECORDING");
        resetEvents();
    };

    const recordNotes = (midiNumbers, duration) => {
        if (mode !== "RECORDING") return;

        const newEvents = midiNumbers.map(midiNumber => {
            return {
                midiNumber,
                time: seconds,
                duration: duration,
            };
        });

        setEvents(_.concat(events, newEvents));
    };

    const replaySong = song => {
        setMode("PLAYING");

        const playtime = _.uniq(_.flatMap(song.keyStrokes, e => [e.time, e.time + e.duration]));

        scheduleEvents = _.each(playtime, t => {
            setTimeout(() => {
                const newEvents = song.keyStrokes.filter(e => {
                    return e.time <= t && e.time + e.duration > t;
                });

                setCurrentEvents(newEvents);
            }, t);
        });

        setTimeout(() => {
            stopReplay();
        }, song.elapseTime);
    };

    const stopReplay = () => {
        if (mode === "RECORDING" && events.length > 0) {
            saveSong();
        }
        setCurrentEvents([]);
        setMode("IDLE");

        _.each(scheduleEvents, v => clearInterval(v));
        scheduleEvents = [];
    };

    const stopRecording = () => {
        if (mode === "RECORDING" && events.length > 0) {
            saveSong();
        }
        setCurrentEvents([]);
        setMode("IDLE");

        _.each(scheduleEvents, v => clearInterval(v));
        scheduleEvents = [];
    };

    const activeNotes = mode === "PLAYING" ? currentEvents.map(event => event.midiNumber) : null;

    const onPlayNoteInput = _ => {
        setRecordedNote(false);
    };

    const onStopNoteInput = (_, { prevActiveNotes }) => {
        if (!recordedNote) {
            recordNotes(prevActiveNotes, noteDuration);
            setRecordedNote(true);
            setNoteDuration(DEFAULT_NOTE_DURATION);
        }
    };

    const saveSong = () => {
        setSong({
            events,
            seconds,
        });
        setModal(modal => !modal);
    };

    return (
        <div className="App">
            <h1>React Piano Task</h1>
            <Piano
                onPlayNoteInput={onPlayNoteInput}
                onStopNoteInput={onStopNoteInput}
                activeNotes={activeNotes}
                typing={modal}
            />
            <Container className="d-flex flex-column align-items-center my-5">
                <RecordSection
                    mode={mode}
                    setMode={setMode}
                    onRecordClick={beginRecording}
                    onStopClick={stopRecording}
                    seconds={seconds}
                    setSeconds={setSeconds}
                />
                <SongList replaySong={replaySong} mode={mode} />
                <SaveSongModal modal={modal} setModal={setModal} song={song} />
            </Container>
        </div>
    );
}

export default App;
