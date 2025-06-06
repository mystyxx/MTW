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

var langue = french;
var wordList;
let TimerObject;
let wrongCharacters = 0; let totalspacePress = 0; let i = 0; let correctWords = 0; let correctCharacters = 0; var secondetenth = 0;
let hardmode = false; let testRunning = false; var words = false;
inputbox.value = '';
let testTime = 15;
var tfaDict = {}

// TODO : 
// - quick restart

window.addEventListener('DOMContentLoaded', () => {
    inputbox.focus();
});

// empêcher le scroll sur écran tactile et la molette de la souris
document.getElementById('words').addEventListener('wheel', e => e.preventDefault(), { passive: false });
document.getElementById('typedText').addEventListener('wheel', e => e.preventDefault(), { passive: false });
document.getElementById('words').addEventListener('touchmove', e => e.preventDefault(), { passive: false });
document.getElementById('typedText').addEventListener('touchmove', e => e.preventDefault(), { passive: false });

function switchGamemode() {
    document.getElementById('words15GamemodeButton').className = ''; document.getElementById('words30GamemodeButton').className = ''; document.getElementById('words60GamemodeButton').className = ''; document.getElementById('shortQuoteGamemodeButton').className = ''; document.getElementById('mediumQuoteGamemodeButton').className = ''; document.getElementById('longQuoteGamemodeButton').className = ''; document.getElementById('philoQuoteGamemodeButton').className = ''; document.getElementById('wikipediaGamemodeButton').className = ''; document.getElementById('mostreadGamemodeButton').className = ''; document.getElementById('onthisdayGamemodeButton').className = ''; document.getElementById('tfaGamemodeButton').className = '';
    switch (sessionStorage.getItem('gm')) {
        case 'quote' :
            changeQuoteLength('', langue)
            document.getElementById('shortQuoteGamemodeButton').className = 'titleHighlight'; document.getElementById('mediumQuoteGamemodeButton').className = 'titleHighlight'; document.getElementById('longQuoteGamemodeButton').className = 'titleHighlight'; changeModeHighlight('quoteGamemodeButton');
            break;
        case 'shortQuote':
            changeQuoteLength('short', langue);
            document.getElementById('shortQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'mediumQuote':
            changeQuoteLength('medium', langue);
            document.getElementById('mediumQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'longQuote':
            changeQuoteLength('long', langue);
            document.getElementById('longQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'philo':
            changeQuoteLength('philo', langue);
            document.getElementById('philoQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'tfa':
            changeWikipediaType('tfa', langue);
            document.getElementById('tfaGamemodeButton').className = 'titleHighlight';
            break;
        case 'mostread':
            changeWikipediaType('mostread', langue);
            changeModeHighlight('wikipediaGamemodeButton');
            document.getElementById('mostreadGamemodeButton').className = 'titleHighlight';
            break;
        case 'onthisday':
            changeWikipediaType('onthisday', langue);
            document.getElementById('onthisdayGamemodeButton').className = 'titleHighlight';
            break;
        case 'time15':
            changeTestTime(15, hardmode);
            changeModeHighlight('timeGamemodeButton');
            document.getElementById('words15GamemodeButton').className = 'titleHighlight';
            break;
        case 'time30':
            changeTestTime(30, hardmode);
            document.getElementById('words30GamemodeButton').className = 'titleHighlight';
            break;
        case 'time60':
            changeTestTime(60, hardmode);
            document.getElementById('words60GamemodeButton').className = 'titleHighlight';
            break;
        case 'words10':
            changeTestTime(500, hardmode, 10);
            changeModeHighlight('wordsGamemodeButton');
            document.getElementById('words15GamemodeButton').className = 'titleHighlight';
            break;
        case 'words25':
            changeTestTime(500, hardmode, 25);
            document.getElementById('words30GamemodeButton').className = 'titleHighlight';
            break;
        case 'words50':
            changeTestTime(500, hardmode, 50);
            document.getElementById('words60GamemodeButton').className = 'titleHighlight';
            break;
        default:
            sessionStorage.setItem('gm', 'time15')
            changeTestTime(15, hardmode);
            changeModeHighlight('timeGamemodeButton');
            document.getElementById('words15GamemodeButton').className = 'titleHighlight';
            break;
    }

    displayLeaderboard();
    updateTypedColors();
}

function avg(array) {
    let sum = 0;
    for (let i=0; i<array.length-1; i++) {
        sum = sum + Number(array[i]);
    }
    return sum/(array.length-1);
}

function hideButtons(mode) {
    if(mode == 'quote') {
        document.getElementById('shortQuoteGamemodeButton').style.display = 'none';
        document.getElementById('mediumQuoteGamemodeButton').style.display = 'none';
        document.getElementById('longQuoteGamemodeButton').style.display = 'none';
        document.getElementById('philoQuoteGamemodeButton').style.display = 'none';
        document.getElementById('words15GamemodeButton').style.display = 'inline-block';
        document.getElementById('words30GamemodeButton').style.display = 'inline-block';
        document.getElementById('words60GamemodeButton').style.display = 'inline-block';
        document.getElementById('EnablePonctuation').style.display = 'inline-block';
        document.getElementById('tfaGamemodeButton').style.display = 'none';
        document.getElementById('mostreadGamemodeButton').style.display = 'none';
        document.getElementById('onthisdayGamemodeButton').style.display = 'none';
    }
    if(mode == 'wiki') {
        document.getElementById('shortQuoteGamemodeButton').style.display = 'none';
        document.getElementById('mediumQuoteGamemodeButton').style.display = 'none';
        document.getElementById('longQuoteGamemodeButton').style.display = 'none';
        document.getElementById('philoQuoteGamemodeButton').style.display = 'none';
        document.getElementById('words15GamemodeButton').style.display = 'none'
        document.getElementById('words30GamemodeButton').style.display = 'none';
        document.getElementById('words60GamemodeButton').style.display = 'none';
        document.getElementById('EnablePonctuation').style.display = 'none';
        if(langue == english) {document.getElementById('tfaGamemodeButton').style.display = 'inline-block';}
        document.getElementById('mostreadGamemodeButton').style.display = 'inline-block';
        document.getElementById('onthisdayGamemodeButton').style.display = 'inline-block';
    }
    if(mode == 'words') {
        document.getElementById('shortQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('mediumQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('longQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('philoQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('words15GamemodeButton').style.display = 'none'
        document.getElementById('words30GamemodeButton').style.display = 'none';
        document.getElementById('words60GamemodeButton').style.display = 'none';
        document.getElementById('EnablePonctuation').style.display = 'none';
        document.getElementById('tfaGamemodeButton').style.display = 'none';
        document.getElementById('mostreadGamemodeButton').style.display = 'none';
        document.getElementById('onthisdayGamemodeButton').style.display = 'none';
    }
}

function changeModeHighlight(mode) {
    document.getElementById('wordsGamemodeButton').className = '';
    document.getElementById('timeGamemodeButton').className = '';
    document.getElementById('quoteGamemodeButton').className = '';
    document.getElementById('wikipediaGamemodeButton').className = '';
    document.getElementById(mode).className = 'titleHighlight';
}

function timer() {
    //this function runs when a test is in progress.
    secondetenth++; //actually 1/5 of a second lmao
    if (timeBox.textContent > 0 && testRunning === true && secondetenth%5==0) {
        timeBox.textContent--;
    }
    if(i+1===wordList.length && testTime == 500 && inputbox.value.length == wordList[i].length) {
        correctWords++;
        correctCharacters += wordList[i].length;
        document.getElementById(i).className = "correct";
    }
    if ((timeBox.textContent == '0') || (i+1===wordList.length && testTime == 500 && inputbox.value.length == wordList[i].length) || (i===wordList.length && testTime == 500) ) {
        //end of the test
        let tmp = sessionStorage.getItem('sessionWpmArray')
        clearInterval(TimerObject);
        testRunning = false;
        //if(inputbox.value == wordList[i-1].slice(0, inputbox.value.length + '')) {correctCharacters = correctCharacters + inputbox.value.length}
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
            if (currentWordCorrectChars == wordList[j].length - inputWords[j].includes(' ')) {
                correctWords++;
            }
            
            if (inputWords[j].includes(' ')) { correctCharacters += currentWordCorrectChars + 1;} // + 1 pour l'espace

            // if( wordList[j] == inputWords[j]) {
            //     correctWords++;
            //     correctCharacters += wordList[j].length;
            // }
            // else {
            //     for(let k = 0; k < wordList[j].length; k++) {
            //         if(inputWords[j][k] == undefined) {}
            //         else if(inputWords[j][k] != wordList[j][k]) {
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
    if (testRunning == true && i===wordList.length && testTime !=500) {
        //generate new words in case there's not enough
        i = 0;
        wordBox.textContent = '';
        wordList = chooseList(langue, hardmode);
        printWords(wordList);
    }
}

function printWords(wordList) {
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


async function createNewUser(userRef, username) {
    // crée un nouvel utilisateur dans la base de données Firestore
    // cet utilisateur possède une array de map pour chaque catégorie de jeu
    const { setDoc } = window.firebase.firestore;
    await setDoc(userRef, {
        username: username,
        creationDate: new Date(),
        email: '',
        personalBest: {},
        scores: {
            tfa: [],
            shortQuote: [],
            mediumQuote: [],
            longQuote: [],
            philo: [],
            mostread: [],
            onthisday: [],
            time15: [],
            time30: [],
            time60: [],
            words10: [],
            words25: [],
            words50: []
        }
    });
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
});

function changeWikipediaType(mode, langue) {
    changeGamemode();
    hideButtons('wiki');
    timeBox.style.visibility = 'hidden';
    testTime = 500;
    timeBox.textContent = '500';
    wordBox.textContent = '';
    if(langue == french) {
        if(mode == 'onthisday') {let rn = Math.floor(Math.random() * frTfaDict.onthisday.length)
            wordList = frTfaDict.onthisday[rn].year + ' : ' + frTfaDict.onthisday[rn].text;}
        else{wordList = frTfaDict.mostread.articles[Math.floor(Math.random() * frTfaDict.mostread.articles.length)].extract; changeModeHighlight('mostreadGamemodeButton'); changeModeHighlight('wikipediaGamemodeButton'); sessionStorage.setItem('gm', 'mostread');}
    }
    else{
        if(mode == 'mostread') {wordList = enTfaDict.mostread.articles[Math.floor(Math.random() * enTfaDict.mostread.articles.length)].extract}
        if(mode == 'onthisday') {let rn = Math.floor(Math.random() * enTfaDict.onthisday.length)
            wordList = enTfaDict.onthisday[rn].year + ' : ' + enTfaDict.onthisday[rn].text;}
        if(mode == 'tfa'){wordList = enTfaDict.tfa.extract}
    }
    wordList = wordList.replace('–', '-').replace('«', '"').replace('»', '"').replace(' ', ' ').match(/\S+\s*/g);
    printWords(wordList);
    changeModeHighlight('wikipediaGamemodeButton');
    document.getElementById("leaderboard").style.display = "block";
}

function changeClientTheme(theme) {
    if(theme == 'dark') {
        document.body.style.setProperty("--main-bg-color", '#fffffe');
        document.body.style.setProperty("--main-text-color", '#094067');
        document.body.style.setProperty("--secondary-bg-color", '#d1e0e0');
        document.body.style.setProperty("--secondary-text-color", '#7f7f7f');
        document.body.style.setProperty("--outline-color", '#5f6c7b');
        document.getElementById('words').style.outline = '1px solid';
        document.body.style.setProperty("--hover-color", '#5f6c7b');
        document.body.style.setProperty("--great-color", '#5f6c7b');
    }
    else {
        document.body.style.setProperty("--main-bg-color", '#12192C');
        document.body.style.setProperty("--main-text-color", 'white');
        document.body.style.setProperty("--secondary-bg-color", '#232F4F');
        document.body.style.setProperty("--outline-color", '#727D82');
        document.getElementById('words').style.outline = '1px solid';
        document.body.style.setProperty("--secondary-text-color", '#7f7f7f');
        document.body.style.setProperty("--hover-color", '#7E7F91');
        document.body.style.setProperty("--great-color", '#7E7F91');
    }
    document.getElementById('switchThemeButton').textContent = 'switch to ' + theme + ' theme';
}

function spacebarIsInput() {
    for (let i = 0; i<inputbox.value.length;i++) {
        if(inputbox.value[i] == ' ' || inputbox.value[i] == ' '){
            return true;
        }
    }
}

function textwrap(){
    document.getElementById('wpmjsp').innerHTML = document.getElementById('wpmjsp').innerHTML + '<span>' + wordList[i] + '</span>';

    if(document.getElementById('wpmjsp').offsetHeight > document.getElementById('0').offsetHeight+1){
        document.getElementById('wpmjsp').innerHTML = '<span>' + wordList[i] + '<span>';
        return(true)
    }
};


function updateTypedColors() {
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
    document.getElementById(i)?.scrollIntoView({ behavior: "smooth", block: "center" });

}

function placeCursor(targetElement, beforeElement = null) {
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



// Remplace l'ancien event listener par la superposition
inputbox.addEventListener('input', (event) => {
    // quick restart
    if(event.keyCode == 9) {switchGamemode();}

    // strict mode - ne valide pas le mot s'il y a une erreur
    // const currentValue = inputbox.value;
    // if (currentValue.endsWith(' ')) {
    //     const currentWordIndex = i // déduire l'index du mot actuel
    //     const wordLetters = document.getElementById(currentWordIndex).getElementsByTagName('letter');
    //     const hasError = [...wordLetters].some(l => l.classList.contains('incorrect') || l.classList.contains('extra'));
    //     if (hasError) {
    //         // Retirer l'espace final
    //         inputbox.value = currentValue.slice(0, -1);
    //         return;
    //     }
    // }


    updateTypedColors();
    const typedText = inputbox.value; // Texte tapé par l'utilisateur
    const currentWord = wordList[i]; // Mot actuel à écrire (index `i`)

    // test started when input detected
    if (testRunning == false && timeBox.textContent != 0 && i==0 && event.keyCode != 9) {
        document.getElementById('wpmjsp').innerHTML = '<span>' + wordList[i] + '<span>';
        i=0;
        testRunning = true;
        TimerObject = setInterval(timer, 200)
        secondetenth = 0;
    }

    if(testRunning) {
        if(Math.floor(correctCharacters/(correctCharacters+wrongCharacters)*100) < 60 && i>4) {timeBox.textContent = 0} //end the test if accuracy is too bad         
    }
    // l'index du mot en cours correspond au nombre d'espaces dans les caractères entrés
    i = 0;
    for (let j = 0; j < typedText.length; j++) {
        if (typedText[j] === ' ' || typedText[j] === ' ') {
            i++;
        }
    }
    // dans les modes sans temps limité, couper à l'avant-dernier mot pour que le joueur n'ait pas à appuyer sur espace
    if (testTime == 500 && typedText.split(' ')[i] === wordList[i]) {
        i++;;
    }
});

typedTextElement.addEventListener('click', (event) => {
    inputbox.focus();
});
wordBox.addEventListener('click', (event) => {
    inputbox.focus();
});

//check if the user change the gamemode
document.getElementById('quoteGamemodeButton').addEventListener('click', (changeGamemodeToQuote)=> {
    sessionStorage.setItem('gm', 'quote');
    switchGamemode();
});

document.getElementById('timeGamemodeButton').addEventListener('click', (changeGamemodeToWords) => {
    sessionStorage.setItem('gm', 'time15'); 
    words = false;
    switchGamemode();
});

document.getElementById('wordsGamemodeButton').addEventListener('click', (changeGamemodeToWords) => {
    sessionStorage.setItem('gm', 'words10'); 
    words = true;
    switchGamemode();
});

document.getElementById('shortQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    sessionStorage.setItem('gm', 'shortQuote');
    switchGamemode();
});
document.getElementById('mediumQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    sessionStorage.setItem('gm', 'mediumQuote');
    switchGamemode();
});
document.getElementById('longQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    sessionStorage.setItem('gm', 'longQuote');
    switchGamemode();
});
document.getElementById('philoQuoteGamemodeButton').addEventListener('click', (changeGamemodeToPhiloQuote)=> {
    sessionStorage.setItem('gm', 'philo');
    switchGamemode();
});

document.getElementById('wikipediaGamemodeButton').addEventListener('click', (changeGamemodeToWikipedia) => {
    sessionStorage.setItem('gm', 'mostread');
    switchGamemode();
});

document.getElementById('mostreadGamemodeButton').addEventListener('click', (changeGamemodeToMostRead) => {
    sessionStorage.setItem('gm', 'mostread');
    switchGamemode();
});

document.getElementById('onthisdayGamemodeButton').addEventListener('click', (changeGamemodeToMostRead) => {
    sessionStorage.setItem('gm', 'onthisday');
    switchGamemode();
});

document.getElementById('tfaGamemodeButton').addEventListener('click', (changeGamemodeToTfa) => {
    sessionStorage.setItem('gm', 'tfa');
    switchGamemode();
});

document.getElementById('words15GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        sessionStorage.setItem('gm', 'time15')
        switchGamemode();
    }
    else{
        sessionStorage.setItem('gm', 'words10');
        switchGamemode();
    }
});

document.getElementById('words30GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        sessionStorage.setItem('gm', 'time30');
        switchGamemode();
    }
    else{
        sessionStorage.setItem('gm', 'words25');
        switchGamemode();
    }
});
document.getElementById('words60GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        sessionStorage.setItem('gm', 'time60');
        switchGamemode();
    }
    else{
        sessionStorage.setItem('gm', 'words50');
        switchGamemode();
    }
});
document.getElementById('EnablePonctuation').addEventListener('click', (enablePonctuation)=> {
    hardmode = !hardmode;
    if(hardmode) {document.getElementById('EnablePonctuation').className = 'titleHighlight';}
    else{document.getElementById('EnablePonctuation').className = '';}
    switchGamemode();
});

document.getElementById('switchLanguageButton').addEventListener('click', (changeLanguage)=> {
    if(langue == french) {
        langue = english;
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
        langue = french;
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
    switchGamemode();
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
