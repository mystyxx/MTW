const frenchWords1 = [
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
  "dessert",
  "il"
];

const frenchWords2 = [
    'que',
    'voix',
    'ciel',
    'petit',
    'dans',
    'entre',
    'comme',
    'maison',
    'répondre',
    'ici',
    'terre',
    'ça',
    'moins',
    'tant',
    'chambre',
    'depuis',
    'mais',
    'ne',
    'âme',
    'sentir',
    'dieu',
    'mot',
    'chez',
    'coup',
    'autre',
    'heure',
    'tout',
    'chez',
    'commentaire',
    'philosophie',
    'pourquoi',
    'élégant',
]


const quote1 = [
    'dans',
    'la',
    'vie',
    'on',
    'ne',
    'fait',
    'pas',
    'ce',
    'que',
    'l\'on',
    'veut',
    'mais',
    'on',
    'est',
    'responsable',
    'de',
    'ce',
    'que',
    'l\'on',
    'est.'
];

const quote2 = 'La vie est un mystère qu\'il faut vivre, et non un problème à résoudre.'.split(' ');



function chooseList() {
    let feur = Math.floor(Math.random() * 2);
    if(feur==1){
        return frenchWords2;
    }
    else {
        return frenchWords1;
    }
}


const quotelist = [quote1, quote2];
function chooseQuote() {
    let feur = Math.floor(Math.random() * quotelist.length);
    return quotelist[feur-1];
}