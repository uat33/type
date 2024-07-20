import { Fragment, useEffect, useState } from "react";
import ModalElement from "./ModalElement";
import Line from "./Line";
import "../../App.css";
import Timer from "./Timer";
import util from "../../util";
import Navbar from "../Navbar";
import { useAPI } from "../../Api";
import { useAuth } from "../../auth/Auth";

function Typing() {
    const [current, setCurrent] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalTotal, setTotalTotal] = useState(0);
    const [allLines, setAllLines] = useState([0, 1, 2]);
    const [firstLine, setFirstLine] = useState(0);
    const [firstkey, setfirstkey] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [completedWords, setCompletedWords] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [time, setTime] = useState(30);
    const { userInfo, isLoggedIn } = useAuth();
    const [done, setDone] = useState(false);
    const { api } = useAPI();

    // called from the active line when the timer runs out
    function addLastLine(incorrectChars, completedChars, completeWords) {
        setCompletedWords(current * 10 + completeWords);
        setTotalTotal((total) => total + completedChars);
        setTotalCorrect(
            (totalCorrect) => totalCorrect + completedChars - incorrectChars
        );
        setDone(true);
    }

    // called when a line has been completed, and the next line should be made the current line
    function next(length, incorrect) {
        // update correct chars and total chars
        setTotalCorrect((prev) => {
            return prev + length - incorrect;
        });
        setTotalTotal((prev) => {
            return prev + length;
        });

        // if this is the second line or after the second line,
        if (current >= 1) {
            // add another line
            setAllLines([...allLines, allLines.length]);

            // "scroll" the lines by making the next line the first line to be shown
            setFirstLine(firstLine + 1);
        }
        // set the next line as the current one
        setCurrent((current) => current + 1);
    }

    function keypressed(e) {
        // starts timer if the key is valid and not a backspace
        if (util.valid(e.key) && e.key !== "Backspace") {
            setfirstkey(true);
            document.removeEventListener("keydown", keypressed, true);
        }
    }

    // timer should be started when the first valid key is pressed
    useEffect(() => {
        // listen for the first key
        document.addEventListener("keydown", keypressed, true);
    }, []);

    // post the results when finished
    useEffect(() => {
        if (!done || !isLoggedIn()) return;

        async function createResult() {
            try {
                const response = await api.post("results", {
                    completedWords,
                    totalCorrect,
                    totalTotal,
                    time,
                    user: userInfo,
                });
            } catch (error) {
                console.log("Failed to create result.");
            }
        }
        createResult();
    }, [done]);

    function endTimer() {
        setTimeUp(true);
        setOpenModal(true);
    }

    return (
        <>
            {/* having the navbar and the modal at the same causes some issues */}
            {/* since the navbar can't be used when the modal is open anyway, just don't show it  */}
            {!openModal ? <Navbar /> : <></>}
            {firstkey ? (
                <Timer time={time} active={true} end={endTimer} />
            ) : (
                <></>
            )}

            <div>
                {allLines.map((b, i) => {
                    // only display the lines including and after first line
                    return i >= firstLine ? (
                        <Line
                            // the active line is the one where the index matches the current value
                            active={i === current}
                            key={i}
                            val={i}
                            next={next}
                            timeUp={timeUp}
                            addLastLine={addLastLine}
                        />
                    ) : (
                        <Fragment key={i} />
                    );
                })}
            </div>
            {/* when the time is up, show the modal and add a restart button */}
            {timeUp ? (
                <>
                    <ModalElement
                        completedWords={completedWords}
                        completedChars={totalTotal}
                        correctChars={totalCorrect}
                        open={openModal}
                        time={time}
                        setOpen={setOpenModal}
                    />

                    <button onClick={() => window.location.reload()}>
                        &#8635;
                    </button>
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default Typing;
