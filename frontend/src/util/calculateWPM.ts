/**
 *
 * @param {number} charactersTyped number of typed characters
 * @param {number } timeInSeconds time (seconds) to complete
 * @param {string} words random words generated to calculate
 * @returns {number} - words per minute
 */
function calculateWPM(charactersTyped: number, timeInSeconds: number, words: string) {
    // Calculate the average word length (in characters)

    const averageWordLength = words.split(" ").reduce((acc, cur) => acc + cur.length, 0) / words.split(" ").length;

    // Calculate the number of words typed
    const numberOfWords = charactersTyped / averageWordLength;

    // Calculate the time taken in minutes
    const timeInMinutes = timeInSeconds / 60;

    // Calculate the WPM
    const wpm = numberOfWords / timeInMinutes;

    return wpm;
}

export default calculateWPM;
