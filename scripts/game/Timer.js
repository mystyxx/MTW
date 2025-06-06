import { getSecondTenth, setSecondTenth } from "../utils/SecondTenth.js";
import { getTestRunning, setTestRunning } from "../utils/TestRunning.js";
import { getWordList, setWordList } from "../utils/WordList.js";
import { printWords } from "./PrintWords.js";

let timeBox = document.getElementById("time");
let input = document.getElementById("typeInput").value;
let i = (input.match(/ /g) || []).length;


export function timer() {
    //this function runs when a test is in progress.
    setSecondTenth(getSecondTenth()+1); //actually 1/5 of a second lmao
    if (timeBox.textContent > 0 && getTestRunning() === true && (getSecondTenth()%5)==0) {
        timeBox.textContent--;
    }
    if(i+1===getWordList().length && testTime == 500 && inputbox.value.length == getWordList()[i].length) {
        correctWords++;
        correctCharacters += getWordList()[i].length;
        document.getElementById(i).className = "correct";
    }
    if ((timeBox.textContent == '0') || (i+1===getWordList().length && testTime == 500 && inputbox.value.length == getWordList()[i].length) || (i===getWordList().length && testTime == 500) ) {
        //end of the test
        let tmp = sessionStorage.getItem('sessionWpmArray')
        clearInterval(TimerObject);
        setTestRunning(false);
        //if(inputbox.value == getWordList()[i-1].slice(0, inputbox.value.length + '')) {correctCharacters = correctCharacters + inputbox.value.length}
        inputbox.style.visibility = 'hidden';

        // calculate the result
        let inputWords = inputbox.value.match(/\S+\s*/g);
        for(let j = 0; j < inputWords.length; j++) {
            // mot correct si aucune lettre incorrecte
            currentWordCorrectChars = 0
            document.getElementById(j).querySelectorAll('letter').forEach((letter) => {
                if (letter.classList.contains('correct')) {
                    currentWordCorrectChars++;
                }
                if (letter.classList.contains('incorrect')) {
                    wrongCharacters++;
                }
            });
            if (currentWordCorrectChars == getWordList()[j].length - inputWords[j].includes(' ')) {
                correctWords++;
            }
            
            if (inputWords[j].includes(' ')) { correctCharacters += currentWordCorrectChars + 1;} // + 1 pour l'espace

            // if( getWordList()[j] == inputWords[j]) {
            //     correctWords++;
            //     correctCharacters += getWordList()[j].length;
            // }
            // else {
            //     for(let k = 0; k < getWordList()[j].length; k++) {
            //         if(inputWords[j][k] == undefined) {}
            //         else if(inputWords[j][k] != getWordList()[j][k]) {
            //             wrongCharacters++;
            //         }
            //         else {
            //             correctCharacters++;
            //         }
            //     }
            // }
        }
        correctCharacters--; // - 1 car jamais d'espace final

        let timeUsed = (60/(testTime-timeBox.textContent));
        let result = Math.floor((correctCharacters/5)*timeUsed);
        let accuracy = Math.floor(correctCharacters/(correctCharacters+wrongCharacters)*100);

        document.getElementById('resultCard').style.display = 'grid';
        document.getElementById('wpm').textContent = result + ' WPM';
        document.getElementById('characters').innerHTML = '<span style="color:var(--great-color); display:inline;">' + correctCharacters + '</span> | <span style="color:red; display:inline;">' + wrongCharacters + '</span> (' + accuracy + '%)';
        scorebox.innerHTML = '<p style="color:var(--great-color); display:inline;">' + correctWords + '</p> / ' + inputWords.length;  //update the score    
        document.getElementById('raw').textContent = Math.floor((correctWords)*timeUsed) + 'wpm'
        document.getElementById('timeResult').textContent = testTime - timeBox.textContent + 's'
        sessionStorage.setItem('sessionWpmArray', result +'~' + tmp);
        document.getElementById('sessionSpeedAverage').textContent = Math.floor(avg(sessionStorage.getItem('sessionWpmArray').split('~'))) + 'wpm (' + (sessionStorage.getItem('sessionWpmArray').split('~').length-1) + ')';
        document.getElementById('wpm').style.textDecoration = '';
        if(result > localStorage.getItem('pb')) {localStorage.setItem('pb', Math.floor((correctCharacters/5)*timeUsed)); document.getElementById('wpm').style.textDecoration = 'underline';}

        addTimeToLeaderboard(result, accuracy);
        displayLeaderboard();
        
    }
    if (getTestRunning() == true && i===getWordList().length && testTime !=500) {
        //generate new words in case there's not enough
        i = 0;
        wordBox.textContent = '';
        setWordList(chooseList(langue, hardmode));
        printWords(getWordList);
    }
}