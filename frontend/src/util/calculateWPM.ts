/**
 *
 * @param {number} charactersTyped number of typed characters
 * @param {number } timeInSeconds time (seconds) to complete
 * @returns {number} - words per minute
 */
function calculateWPM(charactersTyped: number, timeInSeconds: number) {
    // Define the average word length (in characters)
    const averageWordLength = 5; // You can adjust this value based on your content

    // Calculate the number of words typed
    const numberOfWords = charactersTyped / averageWordLength;

    // Calculate the time taken in minutes
    const timeInMinutes = timeInSeconds / 60;

    // Calculate the WPM
    const wpm = numberOfWords / timeInMinutes;

    return wpm;
}

export default calculateWPM;
