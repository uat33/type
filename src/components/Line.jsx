import { useEffect, useState } from "react";
import axios from "axios";
import util from "../util";
import { Fragment } from "react";
function Line(props) {
    const URL = "https://random-word-api.vercel.app/api?words=10";

    const [line, setLine] = useState([]);
    const [keysPressed, setKeysPressed] = useState([]);
    const [incorrect, setIncorrect] = useState(0);
    const [completed, setCompleted] = useState({
        completedWords: 0,
        completedChars: 0,
    });

    // add the incorrect letters and words completed from this line
    useEffect(() => {
        if (props.timeUp && props.active) {
            props.addLastLine(
                incorrect,
                completed.completedChars,
                completed.completedWords
            );
        }
    }, [props.timeUp]);

    useEffect(() => {
        axios.get(URL).then((res) => {
            const data = res.data;

            const arr = data.join(" ").split("");
            setLine(["|", ...arr]);
        });
    }, []);

    useEffect(() => {
        if (props.active && line[line.length - 1] === "|") {
            props.next(line.length - 1, incorrect);
        }
    }, [line, incorrect]);

    useEffect(() => {
        function action(e) {
            e.preventDefault();
            if (!util.valid(e.key)) {
                return;
            }

            if (e.key === "Backspace") {
                if (
                    keysPressed.length === 0 ||
                    keysPressed.length >= line.length
                )
                    return;
                const toBeRemoved = keysPressed.length - 1;
                if (keysPressed[toBeRemoved] !== line[toBeRemoved]) {
                    setIncorrect((incorrect) => incorrect - 1);
                }

                const copy = [...line];
                const index = copy.indexOf("|");
                [copy[index], copy[index - 1]] = [copy[index - 1], copy[index]];
                setLine([...copy]);
                setKeysPressed((prevKeysPressed) =>
                    prevKeysPressed.slice(0, -1)
                );

                // update the completed chars and completed words
                // toBeRemoved + 2 because + 1 is the bar
                setCompleted((completed) => {
                    return {
                        ...completed,
                        completedChars: completed.completedChars - 1,
                        completedWords:
                            line[toBeRemoved + 2] === " "
                                ? completed.completedWords - 1
                                : completed.completedWords,
                    };
                });
            } else {
                const toBeAdded = keysPressed.length + 1;
                // if key is wrong
                if (e.key !== line[toBeAdded]) {
                    setIncorrect((incorrect) => {
                        return incorrect + 1;
                    });
                }
                // updated completedchars by 1
                // if next char is a space or undefined (end of line), update completed words by 1
                setCompleted((completed) => {
                    return {
                        ...completed,
                        completedChars: completed.completedChars + 1,
                        completedWords:
                            line[toBeAdded + 1] === undefined ||
                            line[toBeAdded + 1] === " "
                                ? completed.completedWords + 1
                                : completed.completedWords,
                    };
                });

                const copy = [...line];
                const index = copy.indexOf("|");

                [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
                setLine([...copy]);
                setKeysPressed((prev) => [...prev, e.key]);
            }
        }

        if (props.active) {
            document.addEventListener("keydown", action, true);
        }

        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener("keydown", action, true);
        };
    }, [keysPressed, line, props.active]);

    return (
        <>
            <div className="inline-flex">
                {line.map((c, i) => {
                    let classes = "whitespace-break-spaces text-xl ";

                    if (c === "|") {
                        if (props.active) {
                            classes += "text-yellow-600 animate-pulse";
                        } else {
                            return <Fragment key={i}></Fragment>;
                        }
                    }

                    if (i < keysPressed.length) {
                        classes +=
                            keysPressed[i] === c
                                ? "text-green-600"
                                : c !== " "
                                ? "text-red-600"
                                : "bg-red-600";
                    }

                    return (
                        <p key={i} className={classes}>
                            {c}
                        </p>
                    );
                })}
            </div>
        </>
    );
}

export default Line;
