/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-unused-vars */

// CURRENTLY UNDER TESTING, DOCUMENTATION WILL BE ADDED LATER

function getTextWidth(text: string, font: string): number {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    context.font = font;

    return context.measureText(text).width;
}

// function getTextWidth(text: string, font: string): number {
//     const span = document.createElement("span");
//     document.body.appendChild(span);

//     span.style.font = font;
//     span.style.height = "auto";
//     span.style.width = "auto";
//     span.style.whiteSpace = "no-wrap";
//     span.innerText = text;

//     const width = span.clientWidth;
//     document.body.removeChild(span);

//     return width;
// }

function getFontInfomation(body: HTMLElement = document.body): string {
    const fontWeight = getCssStyles(body, "font-weight");
    const fontSize = getCssStyles(body, "font-size");
    const fontFamily = getCssStyles(body, "font-family");

    return `${fontWeight} ${fontSize} ${fontFamily}`;
}

function getElementFont(selector: string): string {
    const element = document.querySelector(selector) as HTMLElement;

    const fontWeight = getCssStyles(element, "font-weight");
    const fontSize = getCssStyles(element, "font-size");
    const fontFamily = getCssStyles(element, "font-family");

    return `${fontWeight} ${fontSize} ${fontFamily}`;
}

function getCssStyles(element: HTMLElement, propName: string): string {
    return window.getComputedStyle(element).getPropertyValue(propName);
}

export default { getCssStyles, getFontInfomation, getTextWidth, getElementFont };
