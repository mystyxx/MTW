export function changeModeHighlight(mode) {
    document.getElementById('wordsGamemodeButton').className = '';
    document.getElementById('timeGamemodeButton').className = '';
    document.getElementById('quoteGamemodeButton').className = '';
    document.getElementById('wikipediaGamemodeButton').className = '';
    document.getElementById(mode).className = 'titleHighlight';
}