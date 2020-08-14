import React, { useEffect, useState } from "react";
import formatTime from "./utils/formatTime";

const Timer = props => {
    const { seconds, setSeconds, mode, setRawSeconds } = props;
    const [timeInterval, setTimeInterval] = useState(null);

    const startTimer = function() {
        let i = 0;
        setTimeInterval(
            setInterval(() => {
                i += 10;

                if (i % 1000 === 0) {
                    setSeconds(i / 1000);
                    // console.log("-----");
                    // console.log(i);
                }
                // this.time += 10;
                // if (this.time % 1000 === 0) {
                //     // Every second increment the time for the recording timer
                //     this.onTimeChange(this.time / 1000);
                // }
                // setSeconds(seconds => seconds + 1);
                setRawSeconds(i);
            }, 10)
        );
    };

    const stopTimer = function() {
        clearInterval(timeInterval);
        setSeconds(0);
    };

    useEffect(() => {
        if (mode === "RECORDING") return startTimer();

        return stopTimer();
    }, [mode]);

    return <div className="Timer">{formatTime(seconds)}</div>;
};

export default Timer;
