import { getSecondTenth, setSecondTenth } from "../utils/SecondTenth.js";
import { getTestRunning, setTestRunning } from "../utils/TestRunning.js";
import { getTestTime } from "../utils/TestTime.js";
import { getCorrectWords, setCorrectWords, getCurrentWordCorrectChars, setCurrentWordCorrectChars, getWrongCharacters, setWrongCharacters, getCorrectCharacters, setCorrectCharacters,  } from "../utils/Chars.js";
import { getWordList, setWordList } from "../utils/WordList.js";
import { printWords } from "./PrintWords.js";
import { avg } from "../utils/Avg.js";
import { addTimeToLeaderboard } from "../leaderboard/AddTimeToLeaderboard.js"
import { displayLeaderboard } from "../leaderboard/DisplayLeaderboard.js";
import { getTimerObject } from "../utils/TimerObject.js";

let timeBox = document.getElementById("time");
let inputbox = document.getElementById("typeInput");
let scorebox = document.getElementById('score');

export function timer() {
    let i = (inputbox.value.match(/ /g) || []).length;
    //this function runs when a test is in progress.
    setSecondTenth(getSecondTenth()+1); //actually 1/5 of a second lmao
    if (timeBox.textContent > 0 && getTestRunning() === true && (getSecondTenth()%5)==0) {
        timeBox.textContent--;
    }
    // if(i+1===getWordList().length && getTestTime() == 500 && inputbox.value.length == getWordList()[i].length) {
    //     setCorrectWords(getCorrectWords() + 1);
    //     setCorrectCharacters(getCorrectCharacters() + getWordList()[i].length);
    //     document.getElementById(i).className = "correct";
    // }
    if ((timeBox.textContent == '0') || (i+1===getWordList().length && getTestTime() == 500 && inputbox.value.match(/\S+\s*/g)[i].length == getWordList()[i].length) || (i===getWordList().length && getTestTime() == 500) ) {
        // end of the test
        displayResult();        
    }
    if (getTestRunning() == true && i===getWordList().length && getTestTime() !=500) {
        //generate new words in case there's not enough
        i = 0;
        wordBox.textContent = '';
        setWordList(chooseList(langue, hardmode));
        printWords(getWordList);
    }
}

export function displayResult() {
    setCorrectCharacters(0); setCorrectWords(0); setWrongCharacters(0);
    let tmp = sessionStorage.getItem('sessionWpmArray');
    if (!tmp) {
        tmp = ''
    }
    clearInterval(getTimerObject());
    setTestRunning(false);
    //if(inputbox.value == getWordList()[i-1].slice(0, inputbox.value.length + '')) {correctCharacters = correctCharacters + inputbox.value.length}
    inputbox.className = 'hidden';

    // calculate the result
    let inputWords = inputbox.value.match(/\S+\s*/g);
    for(let j = 0; j < inputWords.length; j++) {
        // mot correct si aucune lettre incorrecte
        setCurrentWordCorrectChars(0);
        document.getElementById(j).querySelectorAll('letter').forEach((letter) => {
            if (letter.classList.contains('correct')) {
                setCurrentWordCorrectChars(getCurrentWordCorrectChars() + 1);
            }
            if (letter.classList.contains('incorrect')) {
                setWrongCharacters(getWrongCharacters() + 1);
            }
        });
        if (getCurrentWordCorrectChars() == getWordList()[j].length - inputWords[j].includes(' ')) {
            setCorrectWords(getCorrectWords() + 1);
        }
        
        if (inputWords[j].includes(' ')) { setCorrectCharacters(getCorrectCharacters() + getCurrentWordCorrectChars() + 1);} // + 1 pour l'espace
    }
    setCorrectCharacters(getCorrectCharacters() - 1); // - 1 car jamais d'espace final

    let timeUsed = (60/(getTestTime()-timeBox.textContent));
    let result = Math.floor((getCorrectCharacters()/5)*timeUsed);
    let accuracy = Math.floor(getCorrectCharacters()/(getCorrectCharacters()+getWrongCharacters())*100);

    document.getElementById('resultCard').style.display = 'grid';
    document.getElementById('wpm').textContent = result + ' WPM';
    document.getElementById('characters').innerHTML = '<span style="color:var(--great-color); display:inline;">' + getCorrectCharacters() + '</span> | <span style="color:red; display:inline;">' + getWrongCharacters() + '</span> (' + accuracy + '%)';
    scorebox.innerHTML = '<p style="color:var(--great-color); display:inline;">' + getCorrectWords() + '</p> / ' + inputWords.length;  //update the score    
    document.getElementById('raw').textContent = Math.floor((getCorrectWords())*timeUsed) + 'wpm'
    document.getElementById('timeResult').textContent = getTestTime() - timeBox.textContent + 's'
    sessionStorage.setItem('sessionWpmArray', result +'~' + tmp);
    document.getElementById('sessionSpeedAverage').textContent = Math.floor(avg(sessionStorage.getItem('sessionWpmArray').split('~'))) + 'wpm (' + (sessionStorage.getItem('sessionWpmArray').split('~').length-1) + ')';
    document.getElementById('wpm').style.textDecoration = '';
    
    addTimeToLeaderboard(result, accuracy);
    displayLeaderboard();
    if(result > localStorage.getItem('pb')) {localStorage.setItem('pb', Math.floor((getCorrectCharacters()/5)*timeUsed)); document.getElementById('wpm').style.textDecoration = 'underline';}
}