/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import ModalElement from "./components/ModalElement";
import Line from "./components/Line";
import "./App.css";
import Timer from "./components/Timer";
import util from "./util";

function App() {
    const [current, setCurrent] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalTotal, setTotalTotal] = useState(0);
    const [allLines, setAllLines] = useState([0, 1, 2]);
    const [firstLine, setFirstLine] = useState(0);
    const [firstkey, setfirstkey] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [completedWords, setCompletedWords] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    console.log(totalCorrect, totalTotal, completedWords);
    function addLastLine(incorrectChars, completedChars, completeWords) {
        setCompletedWords(current * 10 + completeWords);
        setTotalTotal((total) => total + completedChars);
        setTotalCorrect(
            (totalCorrect) => totalCorrect + completedChars - incorrectChars
        );
    }

    function next(length, incorrect) {
        setTotalCorrect((prev) => {
            return prev + length - incorrect;
        });
        setTotalTotal((prev) => {
            return prev + length;
        });

        if (current >= 1) {
            setAllLines([...allLines, allLines.length]);
            setFirstLine(firstLine + 1);
        }

        setCurrent((current) => current + 1);
    }

    function keypressed(e) {
        // starts timer
        if (util.valid(e.key) && e.key !== "Backspace") {
            setfirstkey((firstkey) => !firstkey);
            document.removeEventListener("keydown", keypressed, true);
        }
    }

    useEffect(() => {
        // listen for the first key
        document.addEventListener("keydown", keypressed, true);
    }, []);

    function endTimer() {
        setTimeUp(true);
        setOpenModal(false);
    }

    return (
        <>
            {firstkey ? (
                <Timer time={10} active={true} end={endTimer} />
            ) : (
                <></>
            )}
            {allLines.map((b, i) => {
                return i >= firstLine ? (
                    <Line
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

            {timeUp ? (
                <ModalElement completed={completedWords} open={openModal} />
            ) : (
                <></>
            )}
        </>
    );
}

export default App;
