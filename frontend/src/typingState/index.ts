import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    userInput: "",
    length: 25,
    hasPunctuation: false,
    hasNumber: false,
});

export { useGlobalState, setGlobalState };
