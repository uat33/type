import { useState, useEffect } from "react";
function Timer({ time, active, setTimeUp }) {
    const [seconds, setSeconds] = useState(time);
    const [isActive, setIsActive] = useState(active);

    useEffect(() => {
        let interval = null;
        if (isActive) {
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

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setSeconds(0);
        setIsActive(false);
    }

    useEffect(() => {
        if (seconds === 0) {
            setTimeUp(true);
        }
    }, [seconds]);

    const formatTime = (timeInSeconds) => {
        return `${timeInSeconds}`;
        // const minutes = Math.floor(timeInSeconds / 60);
        // const seconds = timeInSeconds % 60;
        // return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div>
            <h1>{formatTime(seconds)}</h1>
            {/* <button onClick={toggle}>{isActive ? "Pause" : "Start"}</button>
      <button onClick={reset}>Reset</button> */}
        </div>
    );
}

export default Timer;
