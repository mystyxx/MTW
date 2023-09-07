var inputbox = document.getElementById('typeInput');
var input = inputbox.value;
var scorebox = document.getElementById('score');

const frenchWords = [
    "Bonjour",
    "Merci",
    "Oui",
    "Non",
    "Excusez-moi",
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
  "Après-midi",
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

var wordList = shuffle(frenchWords);
document.getElementById('words').innerHTML = merge(wordList);
var i = 0;

addEventListener('keydown', (nextWord)=> {
    if(nextWord.isComposing || nextWord.keyCode === 32) {
        if (input == ' ' + wordList[i]) {
           scorebox.innerText++;

        }
        inputbox.value = '';
        i++

    }
});