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
let timerObject;
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

// export var wordList = getWordList;

window.addEventListener('DOMContentLoaded', () => {
    inputbox.focus();
    displayLeaderboard()
    switchGamemode(langue, hardmode, timerObject, timeBox);
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
            switchGamemode(langue, hardmode, timerObject, timeBox);
        }
    });
<<<<<<< HEAD
=======
}

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

async function displayLeaderboard() {
    let gm = sessionStorage.getItem('gm');
    const { getFirestore, collection, query, where, orderBy, limit, getDocs } = window.firebase.firestore;
    const db = getFirestore();
    let scoresList = []

    if (gm == "shortQuote" || gm == "mediumQuote" || gm == "longQuote" || gm == "quote") {
        /* pas de leaderboard pour les quotes
        const leaderboardRef = collection(db, "leaderboard", gm, "scores");
        const querySnapshot = await getDocs(query(leaderboardRef, where("quoteIndex", "==", lastquoteIndex), orderBy("score", "desc"), limit(10)));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            scoresList.push({
                name: getDoc(data.user).data().username,
                score: data.score,
                date: data.date
            });
        });
        */
    }
    else {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);

        if (gm == "tfa") {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Récupère le tableau de scores pour le mode courant
                const userScores = data.scores && data.scores[gm] ? data.scores[gm] : [];
                let todayScores = userScores.filter(score => isSameDay(new Date(score.date.seconds * 1000), new Date()));
                if (Array.isArray(todayScores) && todayScores.length > 0) {
                    // Cherche le meilleur score de l'utilisateur pour ce mode
                    let best = todayScores.reduce((max, curr) => curr.score > max.score ? curr : max, todayScores[0]);
                    scoresList.push({
                        name: data.username || '???',
                        score: best.score,
                        accuracy: best.accuracy || '?',
                        date: best.date
                    });
                }
            });
        }
        else {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Récupère le tableau de scores pour le mode courant
                const userScores = data.scores && data.scores[gm] ? data.scores[gm] : [];
                if (Array.isArray(userScores) && userScores.length > 0) {
                    // Cherche le meilleur score de l'utilisateur pour ce mode
                    let best = userScores.reduce((max, curr) => curr.score > max.score ? curr : max, userScores[0]);
                    scoresList.push({
                        name: data.username,
                        score: best.score,
                        accuracy: best.accuracy,
                        date: best.date
                    });
                }
            });
        }
    }
    // affichage des scores
    scoresList.sort((a, b) => b.score - a.score);
    let text = `
    <div id="leaderboardHeader">
        <h3>Leaderboard ${gm}</h3>
        <svg id="refreshLeaderboard" src="res/refresh_logo.png" alt="refresh" title="refresh the leaderboard" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
    </div>
    <ol>
        <li>
            <span class="leaderboardColumnHeader leaderboardHeaderUsername">username</span>
            <span class="leaderboardColumnHeader leaderboardHeaderScore">score (wpm)</span>
            <span class="leaderboardColumnHeader leaderboardHeaderAccuracy">accuracy (%)</span>
            <span class="leaderboardColumnHeader leaderboardHeaderTimestamp">date</span>
        </li>
    `
    for (let i = 0; i < Math.min(10, scoresList.length); i++) {
        text += `<li><span class="leaderboardUsername">${scoresList[i].name}</span>  <span class="leaderboardScore">${scoresList[i].score}</span> <span class="leaderboardAccuracy">${scoresList[i].accuracy}%</span> <span class="leaderboardTimestamp">${new Date(scoresList[i].date.seconds * 1000).toLocaleDateString()}</span></li>`;
    }
    text += "</ol>"
    document.getElementById('leaderboard').innerHTML = text;
    document.getElementById("refreshLeaderboard").addEventListener('click', () => {
        displayLeaderboard();
    })
    console.log("coucou")
}

async function addTimeToLeaderboard(score, accuracy) {
    let gm = sessionStorage.getItem('gm');
    const { getFirestore, doc, updateDoc, getDoc } = window.firebase.firestore;
    const db = getFirestore();
    

    if (gm == "shortQuote" || gm == "mediumQuote" || gm == "longQuote" || gm == "quote") {}
    else {
        if (localStorage.getItem('username') == null || localStorage.getItem('username') == '' || localStorage.getItem('username') == undefined) {
            localStorage.setItem('username', prompt('Entrez votre nom d\'utilisateur pour enregistrer votre score :'));
        }
        const userRef = doc(db, "users", localStorage.getItem('username'));
        let userDoc = await getDoc(userRef);
        
        if (!userDoc.exists() || userDoc.data === undefined || userDoc.data === null ) {
            createNewUser(userRef, localStorage.getItem('username'));
            userDoc = await getDoc(userRef);
        }
        const userData = userDoc.data();

        if (userData.username == null || userData.username == 'null' || userData.username == undefined || userData.username == '') {
            return;
        }

        let newScore = {score: score, accuracy: accuracy, date: new Date()};
        userData.scores[gm].push(newScore);

        // gérer le pb
        if (parseInt(score) < parseInt(localStorage.getItem('pb'))) {
            localStorage.setItem('pb', score);
            userData.personalBest = newScore;
            await updateDoc(userRef, {personalBest: userData.personalBest})
        }
        
        await updateDoc(userRef, {scores : userData.scores });
    }
}
function changeGamemode() {
    //operations to do each time the gamemode is changed
    i=0;
    clearInterval(TimerObject);
    inputbox.style.visibility = 'visible';
    testRunning = false;
    wordBox.textContent = '';
    inputbox.value = '';
    totalspacePress = 0; correctCharacters = 0; correctWords = 0; wrongCharacters = 0; line=0;
    document.getElementById('wpmjsp').innerHTML = '';
    inputbox.focus();
    typedTextElement.textContent = '';
    document.getElementById("leaderboard").innerHTML = "<h3>Chargement du leaderboard...</h3>"
}
function changeTestTime(time, hardmode, numberwords) {
    changeGamemode();
    wordList = chooseList(langue, hardmode, numberwords)
    printWords(wordList)
    testTime = time;
    timeBox.textContent = time;
    hideButtons('quote');
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

function changeQuoteLength(size, langue) {
    changeGamemode();
    timeBox.style.visibility = 'hidden';
    testTime = 500;
    timeBox.textContent = '500';
    wordList = chooseQuote(size, langue);
    printWords(wordList);
    hideButtons('words');
    document.getElementById("leaderboard").style.display = "none";
}

var frTfaDict;
var enTfaDict;

document.body.style.cursor = 'wait';
fetchFeaturedArticle().then((data) => {
    frTfaDict = data.fr;
    enTfaDict = data.en;
    printWords(selectLoadingTip(langue).match(/\S+\s*/g));
    document.body.style.cursor = 'auto';
    switchGamemode();
>>>>>>> f72d83a93ccf6774945a60d05f4e8332296c85da
});


// Remplace l'ancien event listener par la superposition
inputbox.addEventListener('input', (event) => {
    // quick restart
    if (inputbox.value.includes('\n')) {
        switchGamemode(langue, hardmode, timerObject, timeBox, false);
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
    console.log(typedText, timeBox.textContent, i)
    if (!getTestRunning() && timeBox.textContent != 0 && i==0) {
        document.getElementById('wpmjsp').innerHTML = '<span>' + getWordList()[i] + '<span>';
        i=0;
        setTestRunning(true);
        timerObject = setInterval(timer, 200)
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

document.getElementById('retryButton').addEventListener('click', () => {switchGamemode(langue, hardmode, timerObject, timeBox)});

//check if the user change the gamemode
document.getElementById('quoteGamemodeButton').addEventListener('click', (changeGamemodeToQuote)=> {
    sessionStorage.setItem('gm', 'quote');
    switchGamemode(langue, hardmode, timerObject, timeBox);
    displayLeaderboard();
});

document.getElementById('timeGamemodeButton').addEventListener('click', (changeGamemodeToWords) => {
    let gamemodeHasChanged = 'time15' != sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'time15'); 
    words = false;
    switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('wordsGamemodeButton').addEventListener('click', (changeGamemodeToWords) => {
    let gamemodeHasChanged = 'words10' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'words10'); 
    words = true;
    switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('shortQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    let gamemodeHasChanged = 'shortQuote' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'shortQuote');
    switchGamemode(langue, hardmode, timerObject, timeBox);
    displayLeaderboard();
});
document.getElementById('mediumQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    sessionStorage.setItem('gm', 'mediumQuote');
    switchGamemode(langue, hardmode, timerObject, timeBox);
    displayLeaderboard();
});
document.getElementById('longQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    sessionStorage.setItem('gm', 'longQuote');
    switchGamemode(langue, hardmode, timerObject, timeBox);
    displayLeaderboard();
});
document.getElementById('philoQuoteGamemodeButton').addEventListener('click', (changeGamemodeToPhiloQuote)=> {
    sessionStorage.setItem('gm', 'philo');
    switchGamemode(langue, hardmode, timerObject, timeBox);
    displayLeaderboard();
});

document.getElementById('wikipediaGamemodeButton').addEventListener('click', (changeGamemodeToWikipedia) => {
    let gamemodeHasChanged = 'mostread' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'mostread');
    switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('mostreadGamemodeButton').addEventListener('click', (changeGamemodeToMostRead) => {
    let gamemodeHasChanged = 'mostread' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'mostread');
    switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('onthisdayGamemodeButton').addEventListener('click', (changeGamemodeToMostRead) => {
    let gamemodeHasChanged = 'onthisday' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'onthisday');
    switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('tfaGamemodeButton').addEventListener('click', (changeGamemodeToTfa) => {
    let gamemodeHasChanged = 'tfa' == sessionStorage.getItem('gm');
    sessionStorage.setItem('gm', 'tfa');
    switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
    displayLeaderboard();
});

document.getElementById('words15GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        let gamemodeHasChanged = 'time15' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'time15')
        switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
    else{
        let gamemodeHasChanged = 'words10' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'words10');
        switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
});

document.getElementById('words30GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        let gamemodeHasChanged = '30' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'time30');
        switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
    else{
        let gamemodeHasChanged = '25' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'words25');
        switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
});
document.getElementById('words60GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        let gamemodeHasChanged = 'time60' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'time60');
        switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
    else{
        let gamemodeHasChanged = 'words50' == sessionStorage.getItem('gm');
        sessionStorage.setItem('gm', 'words50');
        switchGamemode(langue, hardmode, timerObject, timeBox, gamemodeHasChanged);
        displayLeaderboard();
    }
});
document.getElementById('EnablePonctuation').addEventListener('click', (enablePonctuation)=> {
    hardmode = !hardmode;
    if(hardmode) {document.getElementById('EnablePonctuation').className = 'titleHighlight';}
    else{document.getElementById('EnablePonctuation').className = '';}
    switchGamemode(langue, hardmode, timerObject, timeBox);
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
    switchGamemode(langue, hardmode, timerObject, timeBox);
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
