var inputbox = document.getElementById('typeInput');
var input = inputbox.innerHTML;
var scorebox = document.getElementById('score');
var timeBox = document.getElementById('time');
var temps = timeBox.innertext;

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
    
    while (currentIndex > 0) {
        
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
        document.getElementById('wpm').textContent = scorebox.textContent*4 + 'wpm';

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

var testRunning = false;

addEventListener('keyup', (nextWord)=> {
    if (testRunning == false) {
        testRunning = true;
        setInterval(timer, 1000)
    }
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

