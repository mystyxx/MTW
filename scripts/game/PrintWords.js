export function printWords(wordList, wordBox=document.getElementById("words")) {
    let lineWidth = 0;
    const maxWidth = wordBox.offsetWidth;
    //create a span for each word
    for(let i = 0; i < wordList.length;i++) {
        var newtask = document.createElement('span');
        // créer une <letter> pour chaque lettre
        let lettersHTML = "";
        for (let j = 0; j < wordList[i].length; j ++) {
            lettersHTML += `<letter>${wordList[i][j]}</letter>`
        }
        newtask.innerHTML = lettersHTML;
        newtask.id = i;
        newtask.className = '';
        //append à la wordbox
        wordBox.appendChild(newtask);

        const wordWidth = newtask.offsetWidth;

        if (lineWidth + wordWidth > maxWidth && lineWidth > 0) {
            wordBox.removeChild(newtask);
            wordBox.appendChild(document.createElement('br'));
            wordBox.appendChild(newtask);
            lineWidth = wordWidth;
        }
        else {
            lineWidth += wordWidth;
        }
    }
}