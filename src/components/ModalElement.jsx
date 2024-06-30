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
        backgroundColor: "#020202",
    },
};
function ModalElement(props) {
    const [open, setOpen] = useState(false);
    let subtitle;

    function openModal() {
        // blur background
        document.getElementById("root").style.filter = "blur(5px)";
        setOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#fff";
    }

    function closeModal() {
        // unblur background
        document.getElementById("root").style.filter = "";
        setOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={open}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                transparent={true}
            >
                <div className="flex justify-between items-center">
                    <h2
                        className=""
                        ref={(_subtitle) => (subtitle = _subtitle)}
                    >
                        Results
                    </h2>
                    <button onClick={closeModal} className="rounded-full">
                        &#x2715;
                    </button>
                </div>

                <h1>Blah</h1>
                <div className="flex justify-center m-auto">
                    <h3>Completed Words: {props.completed}</h3>
                </div>
            </Modal>
        </div>
    );
}

export default ModalElement;
