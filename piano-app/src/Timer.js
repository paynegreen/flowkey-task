import React, { useEffect, useState } from "react";
import formatTime from "./utils/formatTime";

const Timer = props => {
    const { seconds, setSeconds, mode } = props;
    const [timeInterval, setTimeInterval] = useState(null);

    const startTimer = function() {
        setTimeInterval(
            setInterval(() => {
                return setSeconds(seconds => seconds + 1);
            }, 1000)
        );
    };

    useEffect(() => {
        if (mode === "RECORDING") return startTimer();

        return stopTimer();
    }, [mode]);

    const stopTimer = function() {
        clearInterval(timeInterval);
    };

    React.useEffect(() => {}, [seconds]);

    return <div className="Timer">{formatTime(seconds)}</div>;
};

export default Timer;
