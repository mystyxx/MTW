/*
|=========================|
| __  __  _____ __      __|
||  \/  ||_   _|\ \    / /|
|| |\/| |  | |   \ \/\/ / |
||_|  |_|  |_|    \_/\_/  |
|         v. 1.0          |
|       by mystyxx        |
|check README.md for infos|
|=========================|
*/
let inputbox = document.getElementById('typeInput');
let input = inputbox.textContent;
let scorebox = document.getElementById('score');
let timeBox = document.getElementById('time');
let wordBox = document.getElementById('words');

let typedTextElement = document.getElementById("typedText");
let gamemode = sessionStorage.getItem('gm');
let theme = localStorage.getItem('theme') || "light";
let textColor = localStorage.getItem('textColor');
changeClientTheme(theme);
if (window.sessionStorage.getItem('sessionWpmArray') == undefined && sessionStorage.getItem('sessionWpmArray') == null) {
    window.sessionStorage.setItem('sessionWpmArray', '');   //initialise pb if it exists not yet
}
let personalBest = localStorage.getItem('pb');
if(window.localStorage.getItem('pb') == null) {window.localStorage.setItem('pb', 0)}

var langue = getFrenchLang();
let wrongCharacters = 0; let totalspacePress = 0; let i = 0; let correctWords = 0; let correctCharacters = 0; var secondetenth = 0;
let hardmode = false; let testRunning = false; var words = false;
inputbox.value = '';
let testTime = 15;
var tfaDict = {}
var frTfaDict;
var enTfaDict;

// imports
import { changeClientTheme } from "./ui/ChangeClientTheme.js";
import { updateTypedColors } from "./ui/UpdateTypedColors.js";
import { printWords } from "./game/PrintWords.js";
import { switchGamemode } from "./game/SwitchGamemode.js";
import { timer } from "./game/Timer.js";
import { getWordList, setWordList, wordList } from "./utils/WordList.js";
import { getEnglishLang, getFrenchLang, selectLoadingTip } from "./words.js";
import { fetchFeaturedArticle, getEnTfaDict } from "./wikipediascraper.js";
import { displayLeaderboard } from "./leaderboard/DisplayLeaderboard.js";
import { getTestRunning, setTestRunning } from "./utils/TestRunning.js";
import { setSecondTenth } from "./utils/SecondTenth.js";
import { setTimerObject } from "./utils/TimerObject.js";

// export var wordList = getWordList;

window.addEventListener('DOMContentLoaded', () => {
    inputbox.focus();
    switchGamemode(langue, hardmode, timeBox);
    displayLeaderboard();
});

// empêcher le scroll sur écran tactile et la molette de la souris
document.getElementById('words').addEventListener('wheel', e => e.preventDefault(), { passive: false });
document.getElementById('typedText').addEventListener('wheel', e => e.preventDefault(), { passive: false });
document.getElementById('words').addEventListener('touchmove', e => e.preventDefault(), { passive: false });
document.getElementById('typedText').addEventListener('touchmove', e => e.preventDefault(), { passive: false });

if (localStorage.getItem("gm") == "tfa" || localStorage.getItem("gm") == "mostread" || localStorage.getItem("gm") == "onthisday") {
    document.body.style.cursor = 'wait';
}
document.addEventListener('DOMContentLoaded', () => {
    fetchFeaturedArticle().then((data) => {
        if(sessionStorage.getItem("gm") == "tfa" || sessionStorage.getItem("gm") == "mostread" || sessionStorage.getItem("gm") == "onthisday") {
            frTfaDict = data.fr;
            enTfaDict = data.en;
            printWords(selectLoadingTip(langue).match(/\S+\s*/g));
            document.body.style.cursor = 'auto';
            switchGamemode(langue, hardmode, timeBox);
        }
    });
});


// Remplace l'ancien event listener par la superposition
inputbox.addEventListener('input', (event) => {
    // quick restart
    if (inputbox.value.includes('\n')) {
        switchGamemode(langue, hardmode, timeBox, false);
    }

    // strict mode - ne valide pas le mot s'il y a une erreur
    // const currentValue = inputbox.value;
    // if (currentValue.endsWith(' ')) {
    //     const currentWordIndex = i // déduire l'index du mot actuel
    //     const wordLetters = document.getElementById(currentWordIndex).getElementsByTagName('letter');
    //     const hasError = [...wordLetters].some(l => l.classList.contains('incorrect') || l.classList.contains('extra'));
    //     if (hasError) {timer
    //         // Retirer l'espace final
    //         inputbox.value = currentValue.slice(0, -1);
    //         return;
    //     }
    // }


    updateTypedColors(inputbox, typedTextElement, getWordList());
    const typedText = inputbox.value; // Texte tapé par l'utilisateur
    const currentWord = getWordList()[i]; // Mot actuel à écrire (index `i`)

    // test started when input detected
    if (!getTestRunning() && timeBox.textContent != 0 && i==0) {
        document.getElementById('wpmjsp').innerHTML = '<span>' + getWordList()[i] + '<span>';
        i=0;
        setTestRunning(true);
        setTimerObject(setInterval(timer, 200));
        setSecondTenth(0);
    }

    // if(testRunning) {
    //     if(Math.floor(correctCharacters/(correctCharacters+wrongCharacters)*100) < 60 && i>4) {timeBox.textContent = 0} //end the test if accuracy is too bad         
    // }
    // l'index du mot en cours correspond au nombre d'espaces dans les caractères entrés
    i = 0;
    for (let j = 0; j < typedText.length; j++) {
        if (typedText[j] === ' ' || typedText[j] === ' ') {
            i++;
        }
    }
    // dans les modes sans temps limité, couper à l'avant-dernier mot pour que le joueur n'ait pas à appuyer sur espace
    if (testTime == 500 && typedText.split(' ')[i] === getWordList()[i]) {
        i++;;
    }
});

typedTextElement.addEventListener('click', (event) => {
    inputbox.focus();
});
wordBox.addEventListener('click', (event) => {
    inputbox.focus();
});

document.getElementById('retryButton').addEventListener('click', () => {switchGamemode(langue, hardmode, timeBox)});

//check if the user change the gamemode
document.getElementById('quoteGamemodeButton').addEventListener('click', (changeGamemodeToQuote)=> {
    sessionStorage.setItem('gm', 'quote');
    switchGamemode(langue, hardmode, timeBox);
    displayLeaderboard();
});

document.getElementById('timeGamemodeButton').addEventListener('click', (changeGamemodeToWords) => {
    let gamemodeHasChanged = 'time15' != sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'time15'); 
    words = false;
    switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('wordsGamemodeButton').addEventListener('click', (changeGamemodeToWords) => {
    let gamemodeHasChanged = 'words10' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'words10'); 
    words = true;
    switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('shortQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    let gamemodeHasChanged = 'shortQuote' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'shortQuote');
    switchGamemode(langue, hardmode, timeBox);
    displayLeaderboard();
});
document.getElementById('mediumQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    sessionStorage.setItem('gm', 'mediumQuote');
    switchGamemode(langue, hardmode, timeBox);
    displayLeaderboard();
});
document.getElementById('longQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    sessionStorage.setItem('gm', 'longQuote');
    switchGamemode(langue, hardmode, timeBox);
    displayLeaderboard();
});
document.getElementById('philoQuoteGamemodeButton').addEventListener('click', (changeGamemodeToPhiloQuote)=> {
    sessionStorage.setItem('gm', 'philo');
    switchGamemode(langue, hardmode, timeBox);
    displayLeaderboard();
});

document.getElementById('wikipediaGamemodeButton').addEventListener('click', (changeGamemodeToWikipedia) => {
    let gamemodeHasChanged = 'mostread' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'mostread');
    switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('mostreadGamemodeButton').addEventListener('click', (changeGamemodeToMostRead) => {
    let gamemodeHasChanged = 'mostread' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'mostread');
    switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('onthisdayGamemodeButton').addEventListener('click', (changeGamemodeToMostRead) => {
    let gamemodeHasChanged = 'onthisday' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'onthisday');
    switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('tfaGamemodeButton').addEventListener('click', (changeGamemodeToTfa) => {
    let gamemodeHasChanged = 'tfa' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'tfa');
    switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('words15GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        let gamemodeHasChanged = 'time15' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'time15')
        switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
    else{
        let gamemodeHasChanged = 'words10' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'words10');
        switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
});

document.getElementById('words30GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        let gamemodeHasChanged = '30' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'time30');
        switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
    else{
        let gamemodeHasChanged = '25' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'words25');
        switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
});
document.getElementById('words60GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        let gamemodeHasChanged = 'time60' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'time60');
        switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
    else{
        let gamemodeHasChanged = 'words50' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'words50');
        switchGamemode(langue, hardmode, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
});
document.getElementById('EnablePonctuation').addEventListener('click', (enablePonctuation)=> {
    hardmode = !hardmode;
    if(hardmode) {document.getElementById('EnablePonctuation').className = 'titleHighlight';}
    else{document.getElementById('EnablePonctuation').className = '';}
    switchGamemode(langue, hardmode, timeBox);
});

document.getElementById('switchLanguageButton').addEventListener('click', (changeLanguage)=> {
    if(langue == getFrenchLang()) {
        langue = getEnglishLang();
        document.getElementById('wordsGamemodeButton').textContent = 'words';
        document.getElementById('timeGamemodeButton').textContent = 'time';
        document.getElementById('quoteGamemodeButton').textContent = 'quote';
        document.getElementById('shortQuoteGamemodeButton').textContent = 'short';
        document.getElementById('mediumQuoteGamemodeButton').textContent = 'medium';
        document.getElementById('longQuoteGamemodeButton').textContent = 'long';
        document.getElementById('switchThemeButton').textContent = 'switch to ' + localStorage.getItem('theme') + ' mode';
        document.getElementById('switchLanguageButton').textContent = 'switch language';
        document.getElementById('wikipediaGamemodeButton').textContent = 'wikipedia article';
        document.getElementById('tfaGamemodeButton').style.display = 'inline-block';
        document.getElementById('mostreadGamemodeButton').textContent = 'most read';
        document.getElementById('onthisdayGamemodeButton').textContent = 'on this day';
        document.getElementById('retryButton').textContent = 'Retry';
    }
    else{
        langue = getFrenchLang();
        document.getElementById('wordsGamemodeButton').textContent = 'mots';
        document.getElementById('timeGamemodeButton').textContent = 'temps';
        document.getElementById('quoteGamemodeButton').textContent = 'citation';
        document.getElementById('shortQuoteGamemodeButton').textContent = 'court';
        document.getElementById('mediumQuoteGamemodeButton').textContent = 'moyen';
        document.getElementById('longQuoteGamemodeButton').textContent = 'long';
        document.getElementById('switchThemeButton').textContent = 'changer le thème';
        document.getElementById('switchLanguageButton').textContent = 'changer la langue';
        document.getElementById('wikipediaGamemodeButton').textContent = 'article wikipedia'
        document.getElementById('tfaGamemodeButton').style.display = 'none';
        document.getElementById('mostreadGamemodeButton').textContent = 'populaire';
        document.getElementById('onthisdayGamemodeButton').textContent = 'à cette date';
        document.getElementById('retryButton').textContent = 'Recommencer';
    }
    switchGamemode(langue, hardmode, timeBox);
})

document.getElementById('switchThemeButton').addEventListener('click', (changeTheme)=> {
    if(localStorage.getItem('theme') == 'light') {
        changeClientTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
    else{
        changeClientTheme('light');
        localStorage.setItem('theme', 'light');
    }
});
