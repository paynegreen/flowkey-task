import React, { useState, useEffect } from "react";
import "./App.css";
import Piano from "./Piano";
import RecordButton from "./RecordButton";
import SongList from "./SongList";
import _ from "lodash";
import StopButton from "./StopButton";
import Timer from "./Timer";

const DURATION_UNIT = 200;
const DEFAULT_NOTE_DURATION = DURATION_UNIT;

function App() {
    const [mode, setMode] = useState("IDLE");
    const [currentTime, setCurrentTime] = useState(0);
    const [events, setEvents] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [songs, setSongs] = useState([]);
    const [recordedNote, setRecordedNote] = useState(false);
    const [noteDuration, setNoteDuration] = useState(DEFAULT_NOTE_DURATION);
    const [seconds, setSeconds] = useState(0);
    const [rawSeconds, setRawSeconds] = useState(0);

    let scheduleEvents;

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
                time: rawSeconds,
                duration: duration,
            };
        });

        setEvents(_.concat(events, newEvents));
        setCurrentTime(currentTime + duration);
    };

    const getPlayEndTime = () => {
        if (events.length < 1) return 0;

        // return Math.max(...events.map(e => e.time + e.duration)) * 1000;
        return Math.max(...events.map(e => e.time + e.duration));
    };

    const replaySong = song => {
        if (mode !== "IDLE")
            return alert("Please complete the recording before proceeding with replays");

        setMode("PLAYING");

        const playtime = _.uniq(_.flatMap(events, e => [e.time, e.time + e.duration]));
        console.log("-----playtime");
        console.log(playtime);

        scheduleEvents = _.map(playtime, t => {
            return setTimeout(() => {
                const newEvents = song.keyStrokes.filter(e => {
                    return e.time <= t && e.time + e.duration > t;
                });
                console.log("------");
                console.log(newEvents);
                console.log("------");
                setCurrentEvents(newEvents);
            }, t);
        });

        setTimeout(() => {
            stopReplay();
        }, getPlayEndTime());
    };

    const stopReplay = () => {
        if (mode === "RECORDING" && events.length > 0) {
            saveSong();
        }
        setCurrentEvents([]);
        setMode("IDLE");

        _.each(scheduleEvents, v => clearInterval(v));
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
            elapseTime: seconds,
            rawElapseTime: rawSeconds,
        };

        console.log("**********");
        console.log(newSong);
        console.log("**********");

        setSongs(songs => [...songs, newSong]);
    };

    // useEffect(() => {}, [timer]);

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
                <Timer
                    seconds={seconds}
                    setSeconds={setSeconds}
                    mode={mode}
                    setRawSeconds={setRawSeconds}
                />
            </div>
            <SongList songs={songs} replaySong={replaySong} />
        </div>
    );
}

export default App;
