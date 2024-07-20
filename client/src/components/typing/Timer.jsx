import { useState, useEffect } from "react";
function Timer({ time, active, end }) {
    const [seconds, setSeconds] = useState(time);
    const [isActive, setIsActive] = useState(active);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            // if time is active decrement timer by 1 every second until it is 0
            interval = setInterval(() => {
                setSeconds((seconds) => {
                    if (seconds === 0) {
                        return seconds;
                    }
                    return seconds - 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    // when the timer runs out, call the end function
    useEffect(() => {
        if (seconds === 0) {
            end();
        }
    }, [seconds]);

    // leave this here in case some formatting should be added later
    const formatTime = (timeInSeconds) => {
        return `${timeInSeconds}`;
    };

    return (
        <div>
            <h1>{formatTime(seconds)}</h1>
        </div>
    );
}

export default Timer;
