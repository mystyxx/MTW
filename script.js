var inputbox = document.getElementById('typeInput');
var input = inputbox.innerHTML;
var scorebox = document.getElementById('score');
var timeBox = document.getElementById('time');
var temps = timeBox.innertext;
var testTime = 15;
inputbox.value = '';

const frenchWords = [
  "bonjour",
  "merci",
  "plaisir",
  "amour",
  "chien",
  "chat",
  "livre",
  "musique",
  "soleil",
  "lune",
  "étoile",
  "fleur",
  "arbre",
  "montagne",
  "plage",
  "ville",
  "voiture",
  "train",
  "avion",
  "temps",
  "jour",
  "nuit",
  "matin",
  "soir",
  "hôtel",
  "vin",
  "pain",
  "eau",
  "café",
  "fruits",
  "légumes",
  "viande",
  "poisson",
  "dessert"
];



function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    
    while (currentIndex != testTime) {
        
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

function timer() {
    if (timeBox.textContent > 0) {
        timeBox.textContent--;
    }
    if (timeBox.textContent == '0') {
        document.getElementById('wpm').textContent = 'previous score : ' + (correctCharacters/5)*4 + ' wpm';
        testRunning = false;
        inputbox.style.display = 'none';

    }
}

var wordList = shuffle(frenchWords);
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

addEventListener('keyup', (nextWord)=> {
    if (testRunning == false) {
        testRunning = true;
        setInterval(timer, 1000)
    }
    if(nextWord.isComposing || nextWord.keyCode === 32) {
        if (inputbox.value == wordList[i] + ' ') {
            correctWords++;
            correctCharacters += wordList[i].length;
        }
        
        i++;
        scorebox.textContent = 'score : ' + correctWords + '/' + i
        inputbox.value = '';
        document.getElementById(i).className = 'highlight';
        document.getElementById(i-1).className = '';
    }
});

