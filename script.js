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
    if (timeBox.textContent == '0' || i===wordList.length) {
        console.log(correctCharacters)
        document.getElementById('wpm').textContent = 'previous wpm : ' + Math.floor((correctCharacters/5)*(60/(15-timeBox.textContent))) + ' wpm | raw : ' + correctWords + 'wpm';
        document.getElementById('characters').textContent = 'characters :' + correctCharacters + ' | ' + wrongCharacters
        testRunning = false;
        document.getElementById('words').style.display = 'none';
        
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
    if (testRunning == false && timeBox.textContent != 0) {
        testRunning = true;
        setInterval(timer, 1000)
    }
    //if the spacebar is pressed,
    if(nextWord.isComposing || nextWord.keyCode === 32) {
        var wordInput = inputbox.value.split(' ');                      //split the input to select only the first part of the input if a letter is pressed after the space
        
        //check if the word is correctly typed
        if (wordInput[0] == wordList[i] && testRunning ==true) {
            correctWords++;
            correctCharacters += wordList[i].length + 1;
            document.getElementById(i).style.color = 'green';
        }
        else{wrongCharacters += wordInput[0].length}
        
        if(testRunning === true) {
            i++; //go to the next word
            scorebox.textContent = 'previous score : ' + correctWords + '/' + i  //update the score
            if (wordInput[1] !== undefined && wordInput[1] !== null) {  //check if the second part of the input exist (there may be no letter after the space)
                inputbox.value = wordInput[1];                          //set the characters after the space in the inputbox (and erase the correctly typed word)
            document.getElementById(i).className = 'highlight';         //highlight the next word
            document.getElementById(i-1).className = '';
        }
        else{inputbox.value = ''}
        }
        
    }
});


document.getElementById('quoteGamemodeButton').addEventListener('click', (changeGamemodeToQuote)=> {
    testRunning = false;
    document.getElementById('words').textContent = '';
    wordList = '';
    wordList = chooseQuote();
    printWords(wordList);

});

document.getElementById('wordsGamemodeButton').addEventListener('click', (changeGamemodeToWords) => {
    testRunning = false;
    document.getElementById('words').textContent = '';
    wordList = shuffle(chooseList());
    printWords(wordList);

})