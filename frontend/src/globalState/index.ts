import { createGlobalState } from "react-hooks-global-state";

import Mode from "../Models/TypingModes";
import TypingStates from "@/Models/TypingStates";
import { User } from "@/Models/User";

const { setGlobalState, useGlobalState } = createGlobalState({
    userInput: "",
    length: 25,
    hasPunctuation: false,
    hasNumber: false,
    mode: Mode.words,
    width: 1200,
    typingState: TypingStates.pending,
    user: null as unknown as User,
    isLoggedIn: false
});

export { useGlobalState, setGlobalState };
