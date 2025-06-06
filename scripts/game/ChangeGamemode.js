export function changeGamemode(TimerObject, wordBox=document.getElementById("words"), inputbox=document.getElementById("typeInput")) {
    //operations to do each time the gamemode is changed
    clearInterval(TimerObject);
    inputbox.style.visibility = 'visible';
    // testRunning = false;
    wordBox.textContent = '';
    inputbox.value = '';
    // totalspacePress = 0; correctCharacters = 0; correctWords = 0; wrongCharacters = 0; line=0;
    document.getElementById('wpmjsp').innerHTML = '';
    inputbox.focus();
    document.getElementById("leaderboard").innerHTML = "<h3>Chargement du leaderboard...</h3>"
}