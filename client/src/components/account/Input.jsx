import React from "react";

function InputTemplate(props) {
    const inputClasses =
        "appearance-none rounded-none relative block w-full my-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-white-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm";

    return (
        <>
            <div>
                <input
                    id={props.name}
                    name={props.name}
                    type={props.type}
                    autoComplete={props.name}
                    required
                    value={props.value}
                    onChange={(e) => props.setValue(e.target.value)}
                    className={inputClasses}
                    placeholder={props.placeholder}
                />
            </div>
        </>
    );
}

export default InputTemplate;
