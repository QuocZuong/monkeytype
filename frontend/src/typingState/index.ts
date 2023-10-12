import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    userInput: "",
    length: 25,
    hasPunctuation: false,
    hasNumber: false,
    width: 1200,
});

export { useGlobalState, setGlobalState };
