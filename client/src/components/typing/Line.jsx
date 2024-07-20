import { useEffect, useState } from "react";
import util from "../../util";
import { Fragment } from "react";
import { useAPI } from "../../Api";

function Line(props) {
    const [line, setLine] = useState([]);
    const [keysPressed, setKeysPressed] = useState([]);
    const [incorrect, setIncorrect] = useState(0);
    const [completed, setCompleted] = useState({
        completedWords: 0,
        completedChars: 0,
    });
    const { api } = useAPI();

    // add the incorrect letters and words completed from this line if it is active when the time runs out
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
        async function getLine() {
            try {
                await api.get("/data").then((res) => {
                    const arr = res.data.join(" ").split("");
                    setLine(["|", ...arr]);
                });
            } catch (error) {
                console.log("Failed to get words");
            }
        }
        getLine();
    }, []);

    // go to next line when this line is done
    useEffect(() => {
        if (props.active && line[line.length - 1] === "|") {
            props.next(line.length - 1, incorrect);
        }
    }, [line, incorrect]);

    /**
     * Keypress logic
     */
    useEffect(() => {
        function action(e) {
            if (!util.valid(e.key)) {
                return;
            }

            if (e.key === "Backspace") {
                // exit if the line is done or nothing has been entered
                if (
                    keysPressed.length === 0 ||
                    keysPressed.length >= line.length
                )
                    return;

                // increment incorrect if the removed key does not match the actual key
                const toBeRemoved = keysPressed.length - 1;
                if (keysPressed[toBeRemoved] !== line[toBeRemoved]) {
                    setIncorrect((incorrect) => incorrect - 1);
                }
                // advance the bar and remove the last key pressed from previous keys
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
                // advance bar and add pressed key
                const copy = [...line];
                const index = copy.indexOf("|");

                [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
                setLine([...copy]);
                setKeysPressed((prev) => [...prev, e.key]);
            }
        }

        // keydown event listener if the line is active
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
                    // make the bar yellow and give it a pulse if this line is active
                    if (c === "|") {
                        if (props.active) {
                            classes += "text-yellow-600 animate-pulse";
                        } else {
                            return <Fragment key={i}></Fragment>; // if line is not active, do not display bar
                        }
                    }

                    if (i < keysPressed.length) {
                        if (keysPressed[i] === c) {
                            classes += "text-green-600";
                        } else if (c !== " ") {
                            classes += "text-red-600";
                        } else {
                            classes += "bg-red-600";
                        }
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
