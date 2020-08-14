import React from "react";
import { ButtonToggle } from "reactstrap";
import { FaDotCircle, FaStop } from "react-icons/fa";
import Timer from "./Timer";

const RecordSection = props => {
    const { mode, onStopClick, onRecordClick, seconds, setSeconds } = props;
    const renderRecordButton = () => {
        const isPlaying = mode === "PLAYING";
        return (
            <>
                {(mode === "IDLE" || isPlaying) && (
                    <ButtonToggle color="danger" onClick={onRecordClick} disabled={isPlaying}>
                        <FaDotCircle />
                        <span className="ml-2">Record</span>
                    </ButtonToggle>
                )}
                {mode === "RECORDING" && (
                    <ButtonToggle color="info" onClick={onStopClick}>
                        <FaStop />
                        <span className="ml-2">Stop</span>
                    </ButtonToggle>
                )}
            </>
        );
    };

    return (
        <>
            <p>Current Mode: {mode}</p>
            <div className="d-flex flex-row align-items-center mb-3">
                {renderRecordButton()}
                <span className="ml-2">
                    <Timer seconds={seconds} setSeconds={setSeconds} mode={mode} />
                </span>
            </div>
        </>
    );
};

export default RecordSection;
