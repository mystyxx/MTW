var inputbox = document.getElementById('typeInput');
var input = inputbox.innerHTML;
var scorebox = document.getElementById('score');
var timeBox = document.getElementById('time');
var temps = timeBox.value;

const frenchWords = [
    "Bonjour",
    "Merci",
    "Oui",
    "Non",
    "Manger",
    "Boire",
    "Maison",
    "Amour",
  "Chien",
  "Chat",
  "Livre",
  "École",
  "Musique",
  "Soleil",
  "Lune",
  "Étoile",
  "Fleur",
  "Arbre",
  "Montagne",
  "Plage",
  "Rivière",
  "Ville",
  "Pays",
  "Voiture",
  "Train",
  "Avion",
  "Vélo",
  "Temps",
  "Heure",
  "Jour",
  "Nuit",
  "Matin",
  "Soir",
  "Hôtel",
  "Restaurant",
  "Vin",
  "Bière",
  "Fromage",
  "Pain",
  "Eau",
  "Café",
  "Thé",
  "Fruits",
  "Légumes",
  "Viande",
  "Poisson",
  "Dessert"
];



function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

function merge(array) {
    let merged = '';
    
    for(i = 0; i < array.length; i++) {
        merged += array[i] + ' '
    }
    return merged;
}

function timer() {
    timeBox.innertext = temps;
    temps--;
    if (timeBox.innertext == 0) {
        testRunning = false;
    }
}

var wordList = shuffle(frenchWords);
var i = 0;

//créer un span par mot
for(i = 0; i < wordList.length;i++) {
    var newtask = document.createElement('span');
    newtask.innerHTML = wordList[i];
    newtask.id = i;
    document.body.appendChild(newtask);
    document.getElementById('words').appendChild(newtask);

}

var i = 0;
document.getElementById(0).className = 'highlight';

addEventListener('keyup', (nextWord)=> {
    if(nextWord.isComposing || nextWord.keyCode === 32) {
        if (inputbox.value == wordList[i] + ' ') {
           scorebox.innerHTML++;

        }
        inputbox.value = '';
        i++
        document.getElementById(i).className = 'highlight';
        document.getElementById(i-1).className = '';
    }
});

var testRunning = true;
setInterval(timer, 1000)


if(testRunning == false) {
    document.getElementById('wpm').innerText = scorebox.value/timeBox.value
}