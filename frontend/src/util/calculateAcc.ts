/**
 *
 * @param {string} userInput string of user input
 * @param {string} words  string of words generated from FakerJS
 * @returns {number} return the accuracy of user typing
 */
export default function calculateAcc(userInput: string, words: string) {
    let accuracy = 0;
    let count = 0;
    const userInputArray = userInput.split("");
    const wordsArray = words.split("");
    const length = userInputArray.length;

    for (let i = 0; i < length; i++) {
        if (userInputArray[i] === wordsArray[i]) {
            count++;
        }
    }
    accuracy = (count / length) * 100;
    return Math.round(accuracy);
}
