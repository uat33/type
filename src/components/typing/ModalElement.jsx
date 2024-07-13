import { useState } from "react";
import Modal from "react-modal";
import ReactModal from "react-modal";

// make background still visible
ReactModal.defaultStyles.overlay.backgroundColor = "transparent";
Modal.setAppElement("body");
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        transparent: true,
        backgroundColor: "#333333",
    },
};
function ModalElement(props) {
    let subtitle;

    function openModal() {
        // blur background
        document.getElementById("root").style.filter = "blur(5px)";
        props.setOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        openModal();
        subtitle.style.color = "#fff";
    }

    function closeModal() {
        // unblur background
        document.getElementById("root").style.filter = "";
        props.setOpen(false);
    }

    return (
        <div>
            {/* <button onClick={openModal}>Open Modal</button> */}
            <Modal
                isOpen={props.open}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                transparent={true}
            >
                <div className="flex justify-between items-center">
                    <h1
                        className="m-4"
                        ref={(_subtitle) => (subtitle = _subtitle)}
                    >
                        Results
                    </h1>
                    <button onClick={closeModal} className="rounded-full">
                        &#x2715;
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center mx-auto">
                    <h3 className="my-2">
                        Completed Words: {props.completedWords}
                    </h3>

                    <h3 className="my-2">
                        Accuracy:{" "}
                        {(
                            (props.correctChars / props.completedChars) *
                            100
                        ).toFixed(1)}
                        %
                    </h3>
                    <h3 className="my-2">
                        WPM:{" "}
                        {((60 / props.time) * props.completedWords).toFixed(0)}
                    </h3>
                </div>
            </Modal>
        </div>
    );
}

export default ModalElement;
