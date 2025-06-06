import { setTestRunning } from "../utils/TestRunning.js";

export function changeGamemode(TimerObject, wordBox=document.getElementById("words"), inputbox=document.getElementById("typeInput")) {
    //operations to do each time the gamemode is changed
    clearInterval(TimerObject);
    inputbox.style.visibility = 'visible';
    setTestRunning(false);
    wordBox.textContent = '';
    inputbox.value = '';
    // totalspacePress = 0; correctCharacters = 0; correctWords = 0; wrongCharacters = 0; line=0;
    document.getElementById('wpmjsp').innerHTML = '';
    inputbox.focus();
}