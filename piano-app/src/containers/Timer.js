import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import formatTime from "../utils/formatTime";

const Timer = props => {
    const { seconds, setSeconds, mode } = props;
    const [timeInterval, setTimeInterval] = useState(null);

    const startTimer = function() {
        let i = 0;
        setTimeInterval(
            setInterval(() => {
                i += 10;

                setSeconds(i);
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

    return <div className="Timer">{formatTime(seconds / 1000)}</div>;
};

Timer.propTypes = {
    seconds: PropTypes.number.isRequired,
    setSeconds: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
};

export default Timer;
