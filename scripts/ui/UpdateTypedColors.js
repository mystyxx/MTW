export function updateTypedColors(inputbox, typedTextElement, wordList) {
    const typedText = inputbox.value.replace(' ', ' ').match(/\S+\s*/g) || '';
    let cursorSet = false;
    typedTextElement.innerHTML = ''; // Réinitialise le texte tapé affiché
    let cursor = document.createElement('span');
    cursor.classList.add('cursor');
    
    for (let i = 0; i < Math.min(wordList.length, typedText.length + 1); i++) {
        const letterElements = document.getElementById(i).getElementsByTagName('letter');
        let existingCursor = document.getElementById(i).querySelector('.cursor');
        if (existingCursor) existingCursor.remove();
        // Supprimer les lettres "extra" précédemment ajoutées
        const extraLetters = document.getElementById(i).querySelectorAll('letter.extra');
        extraLetters.forEach(letter => letter.remove());

        if (typedText[i] != undefined) {
            // Cas où un espace a été tapé alors que le mot est incomplet
            if (typedText[i].endsWith(' ') && typedText[i].trim().length < wordList[i].length) {
                if (!cursorSet && document.getElementById(i + 1) && typedText[i + 1] == undefined) {
                    const nextWord = document.getElementById(i + 1);
                    placeCursor(nextWord, nextWord.firstChild)
                    cursorSet = true;
                }
                continue; // Ne pas modifier les lettres restantes
            }
        }
        else {
            // tout nettoyer si mot pas commencé
            for (let j = 0; j < letterElements.length; j++) {
                letterElements[j].classList.remove('correct', 'incorrect', 'extra', 'incorrect-underline');
                letterElements[j].textContent = wordList[i][j]; // met la première lettre du mot
            }
            if (!cursorSet && letterElements.length > 0) {
                placeCursor(document.getElementById(i), letterElements[0])
                cursorSet = true;
            }
            continue; // passe au mot suivant
        }

        for (let j = 0; j < wordList[i].length; j++) {
            letterElements[j].classList.remove('correct', 'incorrect', 'extra', 'incorrect-underline');

            if (typedText[i][j] == undefined) {
                if (!cursorSet) {
                    placeCursor(document.getElementById(i), letterElements[j])
                    cursorSet = true;
                }
                letterElements[j].textContent = wordList[i][j]; // met la bonne lettre (sert en cas de suppression de lettre)
                continue; // passe à la lettre suivante
            }
            else if (typedText[i][j] === wordList[i][j]) {
                letterElements[j].textContent = wordList[i][j];
                letterElements[j].classList.add('correct');
            }
            else {
                if (letterElements[j].textContent === ' ') {
                    // letterElements[j].classList.add('incorrect-underline');
                }
                else {
                    letterElements[j].textContent = typedText[i][j]; // Mettre à jour le texte de la lettre
                    letterElements[j].classList.add('incorrect');
                }
            }
        }
// positionner le curseur avant le premier caractère sans classe
            if(!cursorSet) {
                for(let k = 0; k < letterElements.length; k++) {
                    if (typedText[i][k] == undefined) {
                        placeCursor(document.getElementById(i), letterElements[0])
                        cursorSet = true;
                    }
                }
            }

        // ajouter les lettres supplémentaires si le mot tapé est plus long que le mot à écrire
        if (typedText[i].length >= wordList[i].length && typedText[i] != wordList[i]) {
            const spaceIndex = wordList[i].indexOf(' ');
            const spaceLetter = document.getElementById(i).getElementsByTagName('letter')[spaceIndex];

            for (let k = wordList[i].length-1; k < typedText[i].length; k++) {
                if (typedText[i][k] === ' ') {
                    // valider l'espace comme correct
                    document.getElementById(i).getElementsByTagName('letter')[k].classList.add('correct');
                    // set le curseur au mot suivant
                    if (!cursorSet && typedText[i][k+1] == undefined && typedText[i+1] == undefined) {
                        // append de la façon normale
                    placeCursor(document.getElementById(i+1), document.getElementById(i+1).firstChild)
                    cursorSet = true;
                    }
                    continue;
                }
                else if(!cursorSet && typedText[i+1] == undefined && !typedText[i].includes(' ')) {
                    // il ne faut pas insérer le curseur avant l'espace si l'espace est tapé
                    if(typedText[i][k+1] == ' ') {
                        // ajouter le curseur au prochain mot
                        const nextWord = document.getElementById(i + 1);
                        if (nextWord) {
                            placeCursor(nextWord, nextWord.firstChild)
                            cursorSet = true;
                        }
                    }
                    else {
                        placeCursor(document.getElementById(i), spaceLetter)
                        cursorSet = true;
                    }
                }

                const extraLetter = document.createElement('letter');
                extraLetter.classList.add('incorrect', 'extra');
                extraLetter.textContent = typedText[i][k];

                if(spaceLetter) {
                    document.getElementById(i).insertBefore(extraLetter, spaceLetter);
                }
                else { document.getElementById(i).appendChild(extraLetter);}
            }
        }
        if (cursorSet && i >= typedText.length - 1) break;
    }
    var spaceCount = (inputbox.value.match(/ /g) || []).length;
    document.getElementById(spaceCount)?.scrollIntoView({ behavior: "smooth", block: "center" });

}

export function placeCursor(targetElement, beforeElement = null) {
    document.querySelectorAll('.cursor').forEach(c => c.remove());
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    window.requestAnimationFrame(() => {
        if (beforeElement) {
            targetElement.insertBefore(cursor, beforeElement);
        } else {
            targetElement.appendChild(cursor);
        }
    });
}