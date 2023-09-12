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

function chooseList() {
    let feur = Math.floor(Math.random() * 2);
    if(feur==1){
        return frenchWords2;
    }
    else {
        return frenchWords1;
    }
}