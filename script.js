var inputbox = document.getElementById('typeInput');
var input = inputbox.innerHTML;
var scorebox = document.getElementById('score');
var timeBox = document.getElementById('time');
var temps = timeBox.innertext;
var testTime = 15;
inputbox.value = '';


function shuffle(array) {
    //this function shuffles the array to make the words in a different order each test.
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
    //this function is run each second once the first input is detected.
    if (timeBox.textContent > 0 && testRunning === true) {
        timeBox.textContent--;
    }
    if (timeBox.textContent == '0') {
        document.getElementById('wpm').textContent = 'previous score : ' + (correctCharacters/5)*4 + ' wpm';
        testRunning = false;
        inputbox.style.display = 'none';

    }

}

function printWords(wordList) {
    //create a span for each word
    for(let i = 0; i < wordList.length;i++) {
        var newtask = document.createElement('span');
        newtask.innerHTML = wordList[i];
        newtask.id = i;
        document.body.appendChild(newtask);
        document.getElementById('words').appendChild(newtask);
    }
    
}


var wordList = shuffle(chooseList());
var i = 0;
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
    //test started when input detected
    if (testRunning == false) {
        testRunning = true;
        setInterval(timer, 1000)
    }

    if(keyCodes[nextWord.keyCode] != undefined) {
        currentWord+=keyCodes[nextWord.keyCode];
    }
    console.log(currentWord)


    //if the spacebar is pressed,
    if(nextWord.isComposing || nextWord.keyCode === 32) {
        //check if the word is correctly typed
        if (currentWord == wordList[i] + ' ') {
            correctWords++;
            correctCharacters += wordList[i].length;
        }
        currentWord = ''
        
        i++; //go to the next word
        scorebox.textContent = 'score : ' + correctWords + '/' + i  //update the score
        inputbox.value = '';                                        //clear the input 
        document.getElementById(i).className = 'highlight';         //highlight the next word and remove it from the previous
        document.getElementById(i-1).className = '';
    }
});

document.getElementById('quoteGamemodeButton').addEventListener('click', (changeGamemodeToQuote)=> {
    testRunning = false;
    document.getElementById('words').textContent = '';
    wordList = chooseQuote();
    printWords(wordList);

})

