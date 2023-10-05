let inputbox = document.getElementById('typeInput');
let input = inputbox.textContent;
let scorebox = document.getElementById('score');
let timeBox = document.getElementById('time');
let wordBox = document.getElementById('words');

let gamemode = sessionStorage.getItem('gm');
let theme = localStorage.getItem('theme');
let textColor = localStorage.getItem('textColor');
changeClientTheme(theme);
if (window.sessionStorage.getItem('sesionWpmArray') == undefined && sessionStorage.getItem('sessionWpmArray') == null) {
    window.sessionStorage.setItem('sessionWpmArray', '');
}

var langue = french;
var wordList;
let wrongCharacters = 0;
inputbox.value = '';
let totalspacePress = 0;
let testTime = 15;
let i = 0;
let correctWords = 0;
let correctCharacters = 0;
let testRunning = false;
let TimerObject;
let hardmode = false;
var secondetenth = 0;
var words = false;

function switchGamemode() {
    document.getElementById('words15GamemodeButton').className = ''; document.getElementById('words30GamemodeButton').className = ''; document.getElementById('words60GamemodeButton').className = ''; document.getElementById('shortQuoteGamemodeButton').className = ''; document.getElementById('mediumQuoteGamemodeButton').className = ''; document.getElementById('longQuoteGamemodeButton').className = ''; document.getElementById('philoQuoteGamemodeButton').className = ''; document.getElementById('wikipediaGamemodeButton').className = '';
    switch (sessionStorage.getItem('gm')) {
        case 'quote' :
            changeQuoteLength('', langue)
            printWords(wordList);
            inputbox.focus();
            document.getElementById('shortQuoteGamemodeButton').className = 'titleHighlight'; document.getElementById('mediumQuoteGamemodeButton').className = 'titleHighlight'; document.getElementById('longQuoteGamemodeButton').className = 'titleHighlight';
        case 'shortQuote':
            changeQuoteLength('short', langue);
            changeModeHighlight('quoteGamemodeButton');
            document.getElementById('shortQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'mediumQuote':
            changeQuoteLength('medium', langue);
            changeModeHighlight('quoteGamemodeButton');
            document.getElementById('mediumQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'longQuote':
            changeQuoteLength('long', langue);
            changeModeHighlight('quoteGamemodeButton');
            document.getElementById('longQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'philo':
            changeQuoteLength('philo', langue);
            changeModeHighlight('quoteGamemodeButton');
            document.getElementById('philoQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'wiki':
            changeQuoteLength('wiki', langue);
            fetchFeaturedArticle().then(() => {
                changeGamemode();
                wordBox.textContent = ''
                wordList = tfa.split(' ')
                printWords(wordList);
            });
            document.getElementById('wikipediaGamemodeButton').className = 'titleHighlight';
            break;
        case '15':
            changeTestTime(15, hardmode);
            changeModeHighlight('timeGamemodeButton');
            document.getElementById('words15GamemodeButton').className = 'titleHighlight';
            break;
        case '30':
            changeTestTime(30, hardmode);
            changeModeHighlight('timeGamemodeButton');
            document.getElementById('words30GamemodeButton').className = 'titleHighlight';
            break;
        case '60':
            changeTestTime(60, hardmode);
            changeModeHighlight('timeGamemodeButton');
            document.getElementById('words60GamemodeButton').className = 'titleHighlight';
            break;
        case 'words10':
            changeTestTime(500, hardmode, 10);
            changeModeHighlight('wordsGamemodeButton');
            document.getElementById('words15GamemodeButton').className = 'titleHighlight';
            break;
        case 'words25':
            changeTestTime(500, hardmode, 25);
            changeModeHighlight('wordsGamemodeButton');
            document.getElementById('words30GamemodeButton').className = 'titleHighlight';
            break;
        case 'words50':
            changeTestTime(500, hardmode, 50);
            changeModeHighlight('wordsGamemodeButton');
            document.getElementById('words60GamemodeButton').className = 'titleHighlight';
            break;
        default:
            changeTestTime(15, hardmode);
            changeModeHighlight('timeGamemodeButton');
            document.getElementById('words15GamemodeButton').className = 'titleHighlight';
            break;
    }
}
switchGamemode();

function avg(array) {
    let sum = 0;
    for (let i=0; i<array.length-1; i++) {
        sum = sum + Number(array[i])
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
        document.getElementById('wikipediaGamemodeButton').style.display = 'none';
    }
    else {
        document.getElementById('shortQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('mediumQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('longQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('philoQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('words15GamemodeButton').style.display = 'none'
        document.getElementById('words30GamemodeButton').style.display = 'none';
        document.getElementById('words60GamemodeButton').style.display = 'none';
        document.getElementById('EnablePonctuation').style.display = 'none';
        document.getElementById('wikipediaGamemodeButton').style.display = 'inline-block';
    }
}

function changeModeHighlight(mode) {
    document.getElementById('wordsGamemodeButton').className = '';
    document.getElementById('timeGamemodeButton').className = '';
    document.getElementById('quoteGamemodeButton').className = '';
    document.getElementById(mode).className = 'titleHighlight';
}

function timer() {
    //this function runs when a test is in progress.
    secondetenth++;
    if (timeBox.textContent > 0 && testRunning === true && secondetenth%5==0) {
        timeBox.textContent--;
    }
    if(i+1===wordList.length && testTime == 500 && inputbox.value.length == wordList[i].length) {
        correctWords++;
        correctCharacters += wordList[i].length;
        document.getElementById(i).style.color = localStorage.getItem('textColor');}
    if ((timeBox.textContent == '0') || (i+1===wordList.length && testTime == 500 && inputbox.value.length == wordList[i].length) || (i===wordList.length && testTime == 500) ) {
        let zizi = sessionStorage.getItem('sessionWpmArray')
        clearInterval(TimerObject);
        testRunning = false;
        inputbox.style.visibility = 'hidden';
        document.getElementById('resultCard').style.visibility = 'visible';
        document.getElementById('wpm').textContent = Math.floor((correctCharacters/5)*(60/(testTime-timeBox.textContent))) + ' WPM';
        document.getElementById('characters').innerHTML = '<span style="color:green; display:inline;">' + correctCharacters + '</span> | <span style="color:red; display:inline;">' + wrongCharacters + '</span> (' + Math.floor(correctCharacters/(correctCharacters+wrongCharacters)*100) + '%)';
        scorebox.innerHTML = '<p style="color:green; display:inline;">' + correctWords + '</span> /' + totalspacePress;  //update the score    
        document.getElementById('raw').textContent = Math.floor((correctWords)*(60/(testTime-timeBox.textContent))) + 'wpm'
        document.getElementById('timeResult').textContent = testTime - timeBox.textContent + 's'
        sessionStorage.setItem('sessionWpmArray', Math.floor((correctCharacters/5)*(60/(testTime-timeBox.textContent))) +'~' + zizi);
        document.getElementById('sessionSpeedAverage').textContent = Math.floor(avg(sessionStorage.getItem('sessionWpmArray').split('~'))) + 'wpm (' + (sessionStorage.getItem('sessionWpmArray').split('~').length-1) + ')';
        
    }
    if (testRunning == true && i===wordList.length && testTime !=500) {
        i = 0;
        wordBox.textContent = '';
        wordList = chooseList(hardmode);
        printWords(wordList);
    }
    
}

function printWords(wordList) {
    //create a span for each word
    for(let i = 0; i < wordList.length;i++) {
        var newtask = document.createElement('span');
        newtask.innerHTML = wordList[i];
        newtask.id = i;
        newtask.className = '';
        document.body.appendChild(newtask);
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
    inputbox.value = ''
    totalspacePress = 0; correctCharacters = 0; correctWords = 0; wrongCharacters = 0;
    inputbox.focus();
}
function changeTestTime(time, hardmode, numberwords) {
    changeGamemode();
    wordList = '';
    wordList = chooseList(langue, hardmode, numberwords)
    printWords(wordList)
    testTime = time;
    timeBox.textContent = time;
    timeBox.style.display = 'inline';
    hideButtons('quote');
    if(numberwords === undefined) {
        document.getElementById('words15GamemodeButton').textContent = '15';
        document.getElementById('words30GamemodeButton').textContent = '30';
        document.getElementById('words60GamemodeButton').textContent = '60';
        timeBox.style.display = 'inline'
    }
    if(numberwords !== undefined){
        document.getElementById('words15GamemodeButton').textContent = '10';
        document.getElementById('words30GamemodeButton').textContent = '25';
        document.getElementById('words60GamemodeButton').textContent = '50';
        timeBox.style.display = 'none';
    }
}

function changeQuoteLength(size, langue) {
    changeGamemode();
    timeBox.style.display = 'none';
    testTime = 500;
    timeBox.textContent = '500';
    wordList = chooseQuote(size, langue);
    printWords(wordList);
    hideButtons('words');
}

function changeClientTheme(theme) {
    if(theme == 'dark') {
        document.getElementById('switchThemeButton').textContent = 'switch to dark mode';
        document.body.style.setProperty("--main-bg-color", 'rgb(183, 229, 255');
        document.body.style.setProperty("--secondary-color", 'black');
        document.body.style.setProperty("--tertiary-color", 'white');
        document.body.style.setProperty("--great-color", 'green');
        if(langue==french) {document.getElementById('switchThemeButton').textContent = 'changer le thème'}
    }
    else {
        document.getElementById('switchThemeButton').textContent = 'switch to light mode';
        document.body.style.setProperty("--main-bg-color", 'black');
        document.body.style.setProperty("--secondary-color", 'white');
        document.body.style.setProperty("--tertiary-color", 'black');
        document.body.style.setProperty("--great-color", 'lightgreen');
        if(langue==french) {document.getElementById('switchThemeButton').textContent = 'changer le thème'}
    }
}

function spacebarIsInput() {
    for (let i = 0; i<inputbox.value.length;i++) {
        if(inputbox.value[i] == ' ' || inputbox.value[i] == ' '){
            return true;
        }
    }
}


addEventListener('keyup', (nextWord)=> {
    //quick restart
    if(nextWord.keyCode == 9) {switchGamemode();}

    //test started when input detected
    if (testRunning == false && timeBox.textContent != 0 && i==0 && nextWord.keyCode != 9) {
        i=0;
        testRunning = true;
        TimerObject = setInterval(timer, 200)
        secondetenth = 0;
        
    }
    let wordInput = inputbox.value.replace(' ', ' ').split(' ');            //split the input to select only the first part of the input if a letter is pressed after the space
    //if the spacebar is pressed,
    if(testRunning) {
        if(wordInput != wordList[i].slice(0, wordInput[0].length + '')) {document.getElementById(i).className = 'redhighlight'}
        else{document.getElementById(i).className = 'highlight'}
        if(nextWord.isComposing || spacebarIsInput()) {
            wordInput = inputbox.value.replace(' ', ' ').split(' ');
    
            //check if the word is correctly typed
            if (wordInput[0] == wordList[i] && testRunning == true) {
                correctWords++;
                correctCharacters += wordList[i].length;
                document.getElementById(i).className = 'correct';
            }
            if (wordInput[0] != wordList[i] && testRunning == true) {wrongCharacters += wordInput[0].length}
            
            if(testRunning === true && wordInput[0] != '') {
                if(document.getElementById(i).className != 'correct') {document.getElementById(i).style.color = 'rgba(255, 69, 69, 1)'; document.getElementById(i).style.backgroundColor = 'rgba(0, 0, 0, 0.0)'}
                correctCharacters++;                                        //even if the word is incorrect, the space is typed and is count
                i++;                                                        //go to the next word
                totalspacePress++;
                if (wordInput[1] !== undefined && wordInput[1] !== null) {  //check if the second part of the input exist (there may be no letter after the space)
                    inputbox.value = wordInput[1];                          //set the characters after the space in the inputbox (and erase the correctly typed word)
                document.getElementById(i).className = 'highlight';         //highlight the next word
            }
            else{inputbox.value = ''}
            }
            
        }
    }
});


document.getElementById('quoteGamemodeButton').addEventListener('click', (changeGamemodeToQuote)=> {
    sessionStorage.setItem('gm', 'quote');
    switchGamemode();
    hideButtons('words');
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
})
document.getElementById('mediumQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    sessionStorage.setItem('gm', 'mediumQuote');
    switchGamemode();
})
document.getElementById('longQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    sessionStorage.setItem('gm', 'longQuote');
    switchGamemode();
})
document.getElementById('philoQuoteGamemodeButton').addEventListener('click', (changeGamemodeToPhiloQuote)=> {
    sessionStorage.setItem('gm', 'philo');
    switchGamemode();
})

document.getElementById('wikipediaGamemodeButton').addEventListener('click', (changeGamemodeToWikipedia) => {
    sessionStorage.setItem('gm', 'wiki');
    switchGamemode();
})

document.getElementById('words15GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        sessionStorage.setItem('gm', '15')
        switchGamemode();
        timeBox.style.display = 'inline';
    }
    else{
        sessionStorage.setItem('gm', 'words10')
        switchGamemode();
        timeBox.style.display = 'none';
    }
})
document.getElementById('words30GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        sessionStorage.setItem('gm', '30')
        switchGamemode();
        timeBox.style.display = 'inline';
    }
    else{
        sessionStorage.setItem('gm', 'words25')
        switchGamemode();
        timeBox.style.display = 'none';
    }
})
document.getElementById('words60GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    if(!words) {
        sessionStorage.setItem('gm', '60')
        switchGamemode();
        timeBox.style.display = 'inline';
    }
    else{
        sessionStorage.setItem('gm', 'words50')
        switchGamemode();
        timeBox.style.display = 'none';
    }
})
document.getElementById('EnablePonctuation').addEventListener('click', (enablePonctuation)=> {
    hardmode = !hardmode;
    document.getElementById('EnablePonctuation').style.display = 'inline-block'
    if(hardmode) {document.getElementById('EnablePonctuation').className = 'titleHighlight'}
    else{document.getElementById('EnablePonctuation').className = ''}
    switchGamemode();
})

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
})
