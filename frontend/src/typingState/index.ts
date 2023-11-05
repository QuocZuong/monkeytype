import { createGlobalState } from "react-hooks-global-state";

import Mode from "../Models/TypingModes";
import TypingStates from "@/Models/TypingStates";

const { setGlobalState, useGlobalState } = createGlobalState({
    userInput: "",
    length: 25,
    hasPunctuation: false,
    hasNumber: false,
    mode: Mode.words,
    width: 1200,
    typingState: TypingStates.pending,
});

export { useGlobalState, setGlobalState };
