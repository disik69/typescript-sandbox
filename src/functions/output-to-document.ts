export function outputToDocument(divName: string, output: string): void {
    const element = document.getElementById(divName);
    element.innerText = output;
}