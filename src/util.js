function valid(char) {
    if (char === "Backspace" || char === " ") {
        return true;
    }
    // Check if character is a number
    if (/^[0-9]$/.test(char)) {
        return true;
    }
    // Check if character is a letter (uppercase or lowercase)
    else if (/^[a-zA-Z]$/.test(char)) {
        return true;
    }
    // Check if character is a symbol (anything else that's not control characters)
    else if (/^[^\w\d\s]$/.test(char)) {
        return true;
    }
    return false;
}

export default { valid };
