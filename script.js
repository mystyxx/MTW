let inputbox = document.getElementById('typeInput');
let input = inputbox.textContent;
let scorebox = document.getElementById('score');
let timeBox = document.getElementById('time');
let wordBox = document.getElementById('words');
let temps = timeBox.textContent;
let wrongCharacters = 0;
let testTime = 15;
inputbox.value = '';
let totalspacePress = 0;
var gamemode = localStorage.getItem('gm');
var theme = localStorage.getItem('theme');
var textColor = localStorage.getItem('textColor');
changeClientTheme(theme);

var wordList = shuffle(chooseList());
let i = 0;
printWords(wordList);
var correctWords = 0;
var correctCharacters = 0;
var testRunning = false;
var TimerObject; 


//loads the previous gamemode
switch (gamemode) {
    case 'quote' :
        wordList = '';
        wordList = chooseQuote('quotelist');
        timeBox.style.display = 'none';
        testTime = 120;
        timeBox.textContent = '120';
        temps = '120';
    printWords(wordList);
    inputbox.focus();
    case 'shortQuote':
        changeQuoteLength('short');
        break;
    case 'mediumQuote':
        changeQuoteLength('medium');
        break;
    case 'longQuote':
        changeQuoteLength('long');
        break;
    case 'words15':
        changeTestTime(15);
        break;
    case 'words30':
        changeTestTime(30);
        break;
    case 'words60':
        changeTestTime(60);
        break;
    default:
        changeTestTime(15);
        break;

}



function shuffle(array) {
    //this function shuffles the array to make the words in a different order each test.
    let currentIndex = array.length,  randomIndex;
    
    while (currentIndex != 0) {
        
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [array[0], array[randomIndex]] = [array[randomIndex], array[0]];
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

function timer() {
    //this function is run each second once the first input is detected.
    if (timeBox.textContent > 0 && testRunning === true) {
        timeBox.textContent--;
    }
    if ((timeBox.textContent == '0') || (i===wordList.length && testTime == 120)) {
        clearInterval(TimerObject);
        document.getElementById('resultCard').style.visibility = 'visible';
        document.getElementById('wpm').textContent = Math.floor((correctCharacters/5)*(60/(testTime-timeBox.textContent))) + ' WPM';
        document.getElementById('characters').textContent = correctCharacters + ' | ' + wrongCharacters + ' (' + Math.floor(correctCharacters/(correctCharacters+wrongCharacters)*100) + '%)';
        scorebox.textContent = correctWords + '/' + totalspacePress;  //update the score
        document.getElementById('raw').textContent = Math.floor((correctWords)*(60/(testTime-timeBox.textContent))) + 'wpm'
        document.getElementById('timeResult').textContent = testTime - timeBox.textContent + 's'
        testRunning = false;
        inputbox.style.visibility = 'hidden';
        
    }
    if (timeBox.textContent > 0 && i===wordList.length && testTime !=120) {
        i = 0;
        wordBox.textContent = '';
        wordList = shuffle(chooseList());
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

function changeTestTime(time) {
    clearInterval(TimerObject);
    inputbox.style.visibility = 'visible';
    inputbox.value = '';
    totalspacePress = 0;
    correctCharacters = 0;
    correctWords = 0;
    wrongCharacters = 0;
    testRunning = false;
    wordBox.textContent = '';
    wordList = '';
    wordList = shuffle(chooseList()) 
    printWords(wordList)
    testTime = time;
    timeBox.textContent = time;
    temps = time;
    timeBox.style.display = 'inline';
    inputbox.focus();
}

function changeQuoteLength(size) {
    clearInterval(TimerObject);
    inputbox.style.display = 'inline';
    timeBox.style.display = 'none';
    inputbox.value = '';
    totalspacePress = 0;
    correctCharacters = 0;
    correctWords = 0;
    wrongCharacters = 0;
    testRunning = false;
    wordBox.textContent = '';
    timeBox.style.display = 'none';
    testTime = 120;
    timeBox.textContent = '120';
    temps = '120';
    wordList = '';
    wordList = chooseQuote(size);
    printWords(wordList)
    inputbox.focus();
}

function changeClientTheme(theme) {
    if(theme == 'dark') {
        document.getElementById('switchThemeButton').textContent = 'switch to dark mode';
        document.body.style.backgroundColor = 'rgb(183, 229, 255)';
        document.body.style.color = 'black';
        wordBox.style.backgroundColor = 'white';
        document.getElementById('resultCard').style.backgroundColor = 'white';
        document.getElementById('wpm').style.color = 'green';
        localStorage.setItem('textColor', 'green');
    }
    else {
        document.getElementById('switchThemeButton').textContent = 'switch to light mode';
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        wordBox.style.backgroundColor= 'black';
        document.getElementById('resultCard').style.backgroundColor = 'black';
        document.getElementById('wpm').style.color = 'lightgreen';
        localStorage.setItem('textColor', 'lightgreen');
    }
}


function spacebarIsInput() {
    for (let i = 0; i<inputbox.value.length;i++) {
        if(inputbox.value[i] == ' '){
            return true;
        }
    }
}


addEventListener('keyup', (nextWord)=> {
    //test started when input detected
    if (testRunning == false && timeBox.textContent != 0) {
        i=0;
        testRunning = true;
        TimerObject = setInterval(timer, 1000)

    }
    //if the spacebar is pressed,
    if(nextWord.isComposing || spacebarIsInput()) {
        var wordInput = inputbox.value.split(' ');                      //split the input to select only the first part of the input if a letter is pressed after the space
        
        //check if the word is correctly typed
        if (wordInput[0] == wordList[i] && testRunning == true) {
            correctWords++;
            correctCharacters += wordList[i].length;
            document.getElementById(i).style.color = localStorage.getItem('textColor');
        }
        correctCharacters++;
        if (wordInput[0] != wordList[i] && testRunning == true) {wrongCharacters += wordInput[0].length}
        
        if(testRunning === true) {
            i++; //go to the next word
            totalspacePress++;
            if (wordInput[1] !== undefined && wordInput[1] !== null) {  //check if the second part of the input exist (there may be no letter after the space)
                inputbox.value = wordInput[1];                          //set the characters after the space in the inputbox (and erase the correctly typed word)
            document.getElementById(i-1).className = '';
            document.getElementById(i).className = 'highlight';         //highlight the next word
        }
        else{inputbox.value = ''}
        }
        
    }
});


document.getElementById('quoteGamemodeButton').addEventListener('click', (changeGamemodeToQuote)=> {
    clearInterval(TimerObject);
    localStorage.setItem('gm', 'quote')
    inputbox.style.display = 'inline';
    inputbox.value = '';
    testRunning = false;
    wordBox.textContent = '';
    wordList = '';
    totalspacePress = 0;
    correctCharacters = 0;
    correctWords = 0;
    wrongCharacters = 0;
    wordList = chooseQuote(quotelist);
    timeBox.style.display = 'none';
    testTime = 120;
    timeBox.textContent = '120';
    temps = '120';
    printWords(wordList);
    inputbox.focus();
});

document.getElementById('shortQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    localStorage.setItem('gm', 'shortQuote');
    changeQuoteLength('short');
})
document.getElementById('mediumQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    localStorage.setItem('gm', 'mediumQuote');
    changeQuoteLength('medium');
})
document.getElementById('longQuoteGamemodeButton').addEventListener('click', (changeGamemodeToShortQuote)=> {
    localStorage.setItem('gm', 'longQuote')
    changeQuoteLength('long');
})


document.getElementById('wordsGamemodeButton').addEventListener('click', (changeGamemodeToWords) => {
    clearInterval(TimerObject);
    localStorage.setItem('gm', 'words15')
    inputbox.style.display = 'reative';
    testRunning = false;
    wordBox.textContent = '';
    wordList = shuffle(chooseList());
    timeBox.style.display = 'inline';
    changeTestTime(15);
    inputbox.value = ''
    totalspacePress = 0;
    correctCharacters = 0;
    correctWords = 0;
    wrongCharacters = 0;
    inputbox.focus();
});

document.getElementById('words15GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    localStorage.setItem('gm', 'words15')
    changeTestTime(15);
})
document.getElementById('words30GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    localStorage.setItem('gm', 'words30');
    changeTestTime(30);
})
document.getElementById('words60GamemodeButton').addEventListener('click', (changeGamemodeToWords15) => {
    localStorage.setItem('gm', 'words60');
    changeTestTime(60);
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
