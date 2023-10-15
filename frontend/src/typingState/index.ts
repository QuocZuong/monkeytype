import { createGlobalState } from "react-hooks-global-state";

import Mode from "../Models/TypingModes";

const { setGlobalState, useGlobalState } = createGlobalState({
    userInput: "",
    length: 25,
    hasPunctuation: false,
    hasNumber: false,
    mode: Mode.time,  
    width: 1200,
});

export { useGlobalState, setGlobalState };
