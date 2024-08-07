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

let gamemode = sessionStorage.getItem('gm');
let theme = localStorage.getItem('theme');
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
let wrongCharacters = 0; let totalspacePress = 0; var line = 0; let i = 0; let correctWords = 0; let correctCharacters = 0; var secondetenth = 0;
let hardmode = false; let testRunning = false; var words = false;
inputbox.value = '';
let testTime = 15;
var tfaDict = {}

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
        case '15':
            changeTestTime(15, hardmode);
            changeModeHighlight('timeGamemodeButton');
            document.getElementById('words15GamemodeButton').className = 'titleHighlight';
            break;
        case '30':
            changeTestTime(30, hardmode);
            document.getElementById('words30GamemodeButton').className = 'titleHighlight';
            break;
        case '60':
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
    wordBox.scroll(0, line*55 + 6);
}
switchGamemode();

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
        let zizi = sessionStorage.getItem('sessionWpmArray')
        clearInterval(TimerObject);
        testRunning = false;
        if(inputbox.value == wordList[i-1].slice(0, inputbox.value.length + '')) {correctCharacters = correctCharacters + inputbox.value.length}
        inputbox.style.visibility = 'hidden';
        document.getElementById('resultCard').style.visibility = 'visible';
        document.getElementById('wpm').textContent = Math.floor((correctCharacters/5)*(60/(testTime-timeBox.textContent))) + ' WPM';
        document.getElementById('characters').innerHTML = '<span style="color:var(--great-color); display:inline;">' + correctCharacters + '</span> | <span style="color:red; display:inline;">' + wrongCharacters + '</span> (' + Math.floor(correctCharacters/(correctCharacters+wrongCharacters)*100) + '%)';
        scorebox.innerHTML = '<p style="color:var(--great-color); display:inline;">' + correctWords + '</p> / ' + ++totalspacePress;  //update the score    
        document.getElementById('raw').textContent = Math.floor((correctWords)*(60/(testTime-timeBox.textContent))) + 'wpm'
        document.getElementById('timeResult').textContent = testTime - timeBox.textContent + 's'
        sessionStorage.setItem('sessionWpmArray', Math.floor((correctCharacters/5)*(60/(testTime-timeBox.textContent))) +'~' + zizi);
        document.getElementById('sessionSpeedAverage').textContent = Math.floor(avg(sessionStorage.getItem('sessionWpmArray').split('~'))) + 'wpm (' + (sessionStorage.getItem('sessionWpmArray').split('~').length-1) + ')';
        document.getElementById('wpm').style.textDecoration = '';
        if(Math.floor((correctCharacters/5)*(60/(testTime-timeBox.textContent))) > localStorage.getItem('pb')) {localStorage.setItem('pb', Math.floor((correctCharacters/5)*(60/(testTime-timeBox.textContent)))); document.getElementById('wpm').style.textDecoration = 'underline';}
        
    }
    if (testRunning == true && i===wordList.length && testTime !=500) {
        //generate new words in case there's not enough
        i = 0;
        wordBox.textContent = '';
        wordList = chooseList(langue, hardmode);
        printWords(wordList);
        line = 0;
        wordBox.scroll(0, line*55 + 6);
    }
}

function printWords(wordList) {
    //create a span for each word
    for(let i = 0; i < wordList.length;i++) {
        var newtask = document.createElement('span');
        newtask.innerHTML = wordList[i];
        newtask.id = i;
        newtask.className = '';
        //pourquoi on append au body ptdr
        document.body.appendChild(newtask);
        //append à la wordbox
        wordBox.appendChild(newtask);
        document.getElementById('0').className = 'highlight';
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
}

function changeQuoteLength(size, langue) {
    changeGamemode();
    timeBox.style.visibility = 'hidden';
    testTime = 500;
    timeBox.textContent = '500';
    wordList = chooseQuote(size, langue);
    printWords(wordList);
    hideButtons('words');
}

tfaDict = fetchFeaturedArticle(langue, gamemode).then(() => {
    printWords(selectLoadingTip(langue).split(' '));
    document.body.style.cursor = 'auto';
    return tfaDict;
});
document.body.style.cursor = 'wait';

function changeWikipediaType(mode, langue) {
    changeGamemode();
    hideButtons('wiki');
    timeBox.style.visibility = 'hidden';
    testTime = 500;
    timeBox.textContent = '500';
    wordBox.textContent = '';
    if(langue == french) {
        if(mode == 'onthisday') {let rn = Math.floor(Math.random() * tfaDict.onthisday.length)
            wordList = tfaDict.onthisday[rn].year + ' : ' + tfaDict.onthisday[rn].text;}
        else{wordList = tfaDict.mostread.articles[Math.floor(Math.random() * tfaDict.mostread.articles.length)].extract; changeModeHighlight('mostreadGamemodeButton'); changeModeHighlight('wikipediaGamemodeButton'); sessionStorage.setItem('gm', 'mostread');}
    }
    else{
        if(mode == 'mostread') {wordList = tfaDict.mostread.articles[Math.floor(Math.random() * tfaDict.mostread.articles.length)].extract}
        if(mode == 'onthisday') {let rn = Math.floor(Math.random() * tfaDict.onthisday.length)
            wordList = tfaDict.onthisday[rn].year + ' : ' + tfaDict.onthisday[rn].text;}
        if(mode == 'tfa'){wordList = tfaDict.tfa.extract}
    }
    wordList = wordList.replace('–', '-').replace('«', '"').replace('»', '"').replace(' ', ' ').split(' ');
    printWords(wordList);
    wordBox.scroll(0, line*55 + 6);
    changeModeHighlight('wikipediaGamemodeButton');
}

function changeClientTheme(theme) {
    if(theme == 'dark') {
        document.body.style.setProperty("--main-bg-color", '#fffffe');
        document.body.style.setProperty("--main-text-color", '#094067');
        document.body.style.setProperty("--secondary-bg-color", '#d1e0e0');
        document.body.style.setProperty("--secondary-text-color", '#094067');
        document.body.style.setProperty("--outline-color", '#5f6c7b');
        document.getElementById('words').style.outline = '1px transparent';
        document.body.style.setProperty("--hover-color", '#5f6c7b');
        document.body.style.setProperty("--great-color", '#5f6c7b');
    }
    else {
        document.body.style.setProperty("--main-bg-color", '#12192C');
        document.body.style.setProperty("--main-text-color", 'white');
        document.body.style.setProperty("--secondary-bg-color", '#232F4F');
        document.body.style.setProperty("--outline-color", '#727D82');
        document.getElementById('words').style.outline = '1px solid';
        document.body.style.setProperty("--secondary-text-color", 'white');
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

addEventListener('keyup', (nextWord)=> {
    //quick restart
    if(nextWord.keyCode == 9) {switchGamemode();}

    //test started when input detected
    if (testRunning == false && timeBox.textContent != 0 && i==0 && nextWord.keyCode != 9) {
        document.getElementById('wpmjsp').innerHTML = '<span>' + wordList[i] + '<span>';
        line = 0;
        wordBox.scroll(0, line*170 + 6);
        i=0;
        testRunning = true;
        TimerObject = setInterval(timer, 200)
        secondetenth = 0;
    }

    let wordInput = inputbox.value.replace(' ', ' ').split(' ');            //split the input to select only the first part of the input if a letter is pressed after the space
    if(testRunning) {
        if(Math.floor(correctCharacters/(correctCharacters+wrongCharacters)*100) < 60 && i>4) {timeBox.textContent = 0} //end the test if accuracy is too bad 
        if(wordInput != wordList[i].slice(0, wordInput[0].length + '')) {document.getElementById(i).className = 'redhighlight';}
        else{document.getElementById(i).className = 'highlight';}
        //if the spacebar is pressed,
        if(nextWord.isComposing || spacebarIsInput()) {
            //check if the word is correctly typed
            if (wordInput[0] == wordList[i] && testRunning == true) {
                correctWords++;
                correctCharacters += wordList[i].length;
                document.getElementById(i).className = 'correct';
            }
            if (wordInput[0] != wordList[i] && testRunning == true) {wrongCharacters += wordInput[0].length;}
            
            if(testRunning === true && wordInput[0] != '') {
                if(document.getElementById(i).className != 'correct') {document.getElementById(i).style.color = 'rgba(255, 69, 69, 1)'; document.getElementById(i).style.backgroundColor = 'rgba(0, 0, 0, 0.0)'}
                correctCharacters++;                                        //even if the word is incorrect, the space is typed and is count
                i++;                                                        //go to the next word
                totalspacePress++;
                if (wordInput[1] !== undefined && wordInput[1] !== null) {  //check if the second part of the input exist (there may be no letter after the space)
                    inputbox.value = wordInput[1];                          //set the characters after the space in the inputbox (and erase the correctly typed word)
                    document.getElementById(i).className = 'highlight';     //highlight the next word
                }   
            }
            else{inputbox.value = '';}

            if(textwrap()) {
                line++;
                wordBox.scroll(0, line*55 + 6);
            }
        }
    }
});

//check if the user change the gamemode
document.getElementById('quoteGamemodeButton').addEventListener('click', (changeGamemodeToQuote)=> {
    sessionStorage.setItem('gm', 'quote');
    switchGamemode();
});

document.getElementById('timeGamemodeButton').addEventListener('click', (changeGamemodeToWords) => {
    sessionStorage.setItem('gm', '15'); 
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
        sessionStorage.setItem('gm', '15')
        switchGamemode();
    }
    else{
        sessionStorage.setItem('gm', 'words10');
        switchGamemode();
    }
});

document.getElementById('words30GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        sessionStorage.setItem('gm', '30');
        switchGamemode();
    }
    else{
        sessionStorage.setItem('gm', 'words25');
        switchGamemode();
    }
});
document.getElementById('words60GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        sessionStorage.setItem('gm', '60');
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