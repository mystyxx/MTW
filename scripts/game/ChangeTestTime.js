import { changeGamemode } from "./ChangeGamemode.js";
import { printWords } from "./PrintWords.js";
import { hideButtons } from "../ui/HideButtons.js";
import { getWordList, setWordList } from "../utils/WordList.js";
import { setTestTime } from "../utils/TestTime.js";
import { chooseList } from "../words.js";

export function changeTestTime(time, hardmode, numberwords, langue, timeBox) {
    changeGamemode();
    setWordList(chooseList(langue, hardmode, numberwords));
    printWords(getWordList())
    setTestTime(time);
    timeBox.textContent = time;
    
    if(numberwords === undefined) {
        // Time mode
        hideButtons('time', langue);
        document.getElementById('time15GamemodeButton').textContent = '15';
        document.getElementById('time30GamemodeButton').textContent = '30';
        document.getElementById('time60GamemodeButton').textContent = '60';
        timeBox.style.display = 'block';
    }
    if(numberwords !== undefined){
        // Words mode
        hideButtons('quote', langue);
        document.getElementById('words10GamemodeButton').textContent = '10';
        document.getElementById('words25GamemodeButton').textContent = '25';
        document.getElementById('words50GamemodeButton').textContent = '50';
        timeBox.style.display= 'none';
    }
    document.getElementById("leaderboard").style.display = "block";
}