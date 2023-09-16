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
const quote3 = 'Parfois, c\'est commpliqué de faire la différence entre détermination et obstination.'.split(' ');
const quote4 = 'Malgré tout, ça reste toi.'.split(' ');
const quote5 = 'Tu possèdes quelque chose qui s\'appelle la détermination. Donc du moment que tu t\'accroches, du moment que tu fais ce qui te tient à coeur, je crois que tu peux faire ce qui est juste.'.split(' ')


const wordlistlist = [frenchWords1, frenchWords2]
function chooseList() {
    let feur = Math.floor(Math.random() * wordlistlist.length);
    return wordlistlist[feur]
}


const quotelist = [quote1, quote2, quote3, quote4, quote5];
function chooseQuote() {
    let feur = Math.floor(Math.random() * quotelist.length);
    return quotelist[feur];
}