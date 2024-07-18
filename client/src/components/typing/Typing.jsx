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
    const [time, setTime] = useState(3);
    const { userInfo, isLoggedIn } = useAuth();
    const [done, setDone] = useState(false);
    const { api } = useAPI();

    function addLastLine(incorrectChars, completedChars, completeWords) {
        setCompletedWords(current * 10 + completeWords);
        setTotalTotal((total) => total + completedChars);
        setTotalCorrect(
            (totalCorrect) => totalCorrect + completedChars - incorrectChars
        );
        setDone(true);
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

    useEffect(() => {
        if (!done || !isLoggedIn()) return;
        const response = api.post("results", {
            completedWords,
            totalCorrect,
            totalTotal,
            time,
            user: userInfo,
        });
    }, [done]);

    function endTimer() {
        setTimeUp(true);
        setOpenModal(true);
    }

    return (
        <>
            {!openModal ? <Navbar /> : <></>}
            {firstkey ? (
                <Timer time={time} active={true} end={endTimer} />
            ) : (
                <></>
            )}

            <div>
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
            </div>
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
