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

addEventListener('keyup', (nextWord)=> {
    //test started when input detected
    if (testRunning == false) {
        testRunning = true;
        setInterval(timer, 1000)
    }
    //if the spacebar is pressed,
    if(nextWord.isComposing || nextWord.keyCode === 32) {
        //check if the word is correctly typed
        if (inputbox.value == wordList[i] + ' ') {
            correctWords++;
            correctCharacters += wordList[i].length;
        }
        
        i++; //go to the next word
        scorebox.textContent = 'score : ' + correctWords + '/' + i  //update the score
        inputbox.value = '';                                        //clear the input 
        document.getElementById(i).className = 'highlight';         //highlight the next word and remove it from the previous
        document.getElementById(i-1).className = '';
    }
});

