var inputbox = document.getElementById('typeInput');
var input = inputbox.innerHTML;
var scorebox = document.getElementById('score');
var timeBox = document.getElementById('time');
var temps = timeBox.innertext;
var testTime = 15;
inputbox.value = '';


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    
    while (currentIndex != testTime) {
        
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [array[0], array[randomIndex]] = [array[randomIndex], array[0]];
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

function timer() {
    if (timeBox.textContent > 0 && testRunning === true) {
        timeBox.textContent--;
    }
    if (timeBox.textContent == '0') {
        document.getElementById('wpm').textContent = 'previous score : ' + (correctCharacters/5)*4 + ' wpm';
        testRunning = false;
        inputbox.style.display = 'none';

    }

}

var wordList = shuffle(chooseList());
let i = 0;

function printWords(wordList) {
    //créer un span par mot
    for(let i = 0; i < wordList.length;i++) {
        var newtask = document.createElement('span');
        newtask.innerHTML = wordList[i];
        newtask.id = i;
        document.body.appendChild(newtask);
        document.getElementById('words').appendChild(newtask);
    }

}

printWords(wordList);
var correctWords = 0;
var correctCharacters = 0;
document.getElementById(0).className = 'highlight';

var testRunning = false;

const keyCodes = {
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90:'z',
  32: ' ',
};



var currentWord = '';

addEventListener('keyup', (nextWord)=> {

    currentWord += keyCodes[nextWord.keyCode];
    console.log(currentWord)

    if (testRunning == false) {
        testRunning = true;
        setInterval(timer, 1000)
    }
    if(nextWord.isComposing || nextWord.keyCode === 32) {
        if (currentWord == wordList[i] + ' ') {
            correctWords++;
            correctCharacters += wordList[i].length;
        }
        currentWord = ''
        
        i++;
        scorebox.textContent = 'score : ' + correctWords + '/' + i
        inputbox.value = '';
        document.getElementById(i).className = 'highlight';
        document.getElementById(i-1).className = '';
    }
});

document.getElementById('quoteGamemodeButton').addEventListener('click', (changeGamemodeToQuote)=> {
    testRunning = false;
    document.getElementById('words').textContent = '';
    wordList = chooseQuote();
    printWords(wordList);

})

