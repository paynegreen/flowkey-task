import React, { useState, useEffect } from "react";
import "./App.css";
import Piano from "./Piano";
import RecordButton from "./RecordButton";
import SongList from "./SongList";
import _ from "lodash";
import StopButton from "./StopButton";

const DEFAULT_NOTE_DURATION = 0.2;

function App() {
    const [mode, setMode] = useState("IDLE");
    const [currentTime, setCurrentTime] = useState(0);
    const [events, setEvents] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [songs, setSongs] = useState([]);
    const [recordedNote, setRecordedNote] = useState(false);
    const [noteDuration, setNoteDuration] = useState(DEFAULT_NOTE_DURATION);

    const resetEvents = () => {
        setEvents([]);
        setCurrentTime(0);
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
                time: currentTime,
                duration: duration,
            };
        });

        setEvents(_.concat(events, newEvents));
        setCurrentTime(currentTime + duration);
    };

    const sum = (a, b) => a + b;

    const getPlayEndTime = () => {
        if (events.length < 1) return 0;

        return Math.max(...events.map(e => sum(e.time, e.duration))) * 1000;
    };

    const replaySong = song => {
        //clear out any playing track before playing new one
        if (mode !== "IDLE")
            return alert("Please complete the recording before proceeding with replays");

        setMode("PLAYING");

        const playtime = _.uniq(_.flatMap(events, e => [e.time, sum(e.time, e.duration)]));

        _.each(playtime, t => {
            setTimeout(() => {
                const newEvents = song.keyStrokes.filter(e => {
                    return e.time <= t && e.time + e.duration > t;
                });
                setCurrentEvents(newEvents);
            }, t * 1000);
        });

        setTimeout(() => {
            stopReplay();
        }, getPlayEndTime());
    };

    const stopReplay = () => {
        console.log(events);
        console.log(events.length);
        console.log(mode === "RECORDING" && events.length);
        if (mode === "RECORDING" && events.length) {
            saveSong();
        }
        setCurrentEvents([]);
        setMode("IDLE");
    };

    const activeNotes = mode === "PLAYING" ? currentEvents.map(event => event.midiNumber) : null;

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

    const saveSong = () => {
        const response = prompt("What's the title of your song:");

        const newSong = {
            title: _.upperFirst(response),
            keyStrokes: events,
        };

        setSongs(_.concat(songs, newSong));
    };

    return (
        <div className="App">
            <h1>React Piano Task</h1>
            <Piano
                onPlayNoteInput={onPlayNoteInput}
                onStopNoteInput={onStopNoteInput}
                activeNotes={activeNotes}
                mode={mode}
            />
            <hr />
            <div>
                <p>Current Mode: {mode}</p>
                {mode === "IDLE" ? (
                    <RecordButton onPress={beginRecording} />
                ) : (
                    <StopButton onPress={stopReplay} />
                )}
            </div>
            <SongList songs={songs} replaySong={replaySong} />
        </div>
    );
}

export default App;
