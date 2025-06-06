import { changeGamemode } from "./ChangeGamemode.js";
import { printWords } from "./PrintWords.js";
import { hideButtons } from "../ui/HideButtons.js";
import { getWordList, setWordList } from "../utils/WordList.js";
import { setTestTime } from "../utils/TestTime.js";
import { chooseList } from "../words.js";

export function changeTestTime(time, hardmode, numberwords, langue, TimerObject, timeBox) {
    changeGamemode(TimerObject);
    setWordList(chooseList(langue, hardmode, numberwords));
    printWords(getWordList())
    setTestTime(time);
    timeBox.textContent = time;
    hideButtons('quote', langue);
    if(numberwords === undefined) {
        document.getElementById('words15GamemodeButton').textContent = '15';
        document.getElementById('words30GamemodeButton').textContent = '30';
        document.getElementById('words60GamemodeButton').textContent = '60';
        timeBox.style.visibility = 'visible'
    }
    if(numberwords !== undefined){
        document.getElementById('words15GamemodeButton').textContent = '10';
        document.getElementById('words30GamemodeButton').textContent = '25';
        document.getElementById('words60GamemodeButton').textContent = '50';
        timeBox.style.visibility= 'hidden';
    }
    document.getElementById("leaderboard").style.display = "block";
}