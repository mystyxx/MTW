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

const quote1 = 'Dans la vie, on ne fait pas ce que l\'on veut, mais on est responsable de ce que l\'on est.'.split(' ');
const quote2 = 'La vie est un mystère qu\'il faut vivre, et non un problème à résoudre.'.split(' ');
const quote3 = 'Parfois, c\'est compliqué de faire la différence entre détermination et obstination.'.split(' ');
const quote4 = 'Malgré tout, ça reste toi.'.split(' ');
const quote5 = 'Tu possèdes quelque chose qui s\'appelle la détermination. Donc du moment que tu t\'accroches, du moment que tu fais ce qui te tient à coeur, je crois que tu peux faire ce qui est juste.'.split(' ')
const quote6 = 'Be proud of you, because we can be do what we want to do.'.split(' ');
const quote7 = 'Ne voyez-vous pas que le véritable but du novlangue est de restreindre les limites de la pensée ? À la fin, nous rendrons littéralement impossible le crime par la pensée car il n’y aura plus de mots pour l’exprimer. Tous les concepts nécessaires seront exprimés chacunexactement par un seul mot dont le sens sera délimité. Toutes les significations subsidiaires seront supprimées et oubliées. Déjà, dans la onzième édition, nous ne sommes pas loin de ce résultat. Mais le processus continuera encore longtemps après que vous et moi nous serons morts.'.split(' ');
const quote8 = 'Quelle est la différence entre toi et moi ? C\'est que moi je compte encore les jours et toi je sais bien que tu les comptes pas.'.split(' ');
const quote9 = 'Y en a qui se la jouent viril, glorifiant la loi du plus fort, mais leur connerie est sidérale, ça pédale dans la semoule, dans l\'aigreur intersidérale. Y en a qui rabaissent les meufs, voudraient les voir dans la cuisine, ça rassure leur égo quand ils les voient courber l\'échine.'.split(' ');
const quote10 = 'Y en a qui disent \"j\'ai été trop gentil maintenant fini de sfaire avoir\" mais c\'est en disant ça qu\'ils rejoignent le troupeau des batards.'.split(' ')
const quote11 = 'On est le flip flip crew, terroristes bienveillants, les autres trucs c\'est chiant, va falloir vous réveiller, car nous somme l\'understup, la ligue anti réactionnaire, le stup persévère, stoppera les guerres sur la Terre.'.split(' ');
const quote12 = 'Fais confiance qu\'à ton coeur, avant d\'apprendre à rire on pleure, après la vie on meurt, lève-toi, prends les armes et bat toi pour tes valeurs.'.split(' ');

const wordlistlist = [frenchWords1, frenchWords2]
function chooseList() {
    let feur = Math.floor(Math.random() * wordlistlist.length);
    return wordlistlist[feur]
}


const quotelist = [quote1, quote2, quote3, quote4, quote5, quote6, quote7, quote8, quote9, quote10, quote11, quote12];
const shortQuoteList = []; const mediumQuoteList = []; const longQuoteList = [];

for(let i=0; i<quotelist.length; i++) {
    if(quotelist[i].length < 13) {
        shortQuoteList.push(quotelist[i]);
    }
    if(quotelist[i].length < 35) {
        mediumQuoteList.push(quotelist[i]);
    }
    else{longQuoteList.push(quotelist[i]);}
}


function chooseQuote(size) {
    if(size == 'short') {return shortQuoteList[Math.floor(Math.random() * shortQuoteList.length)]}
    if(size == 'medium') {return mediumQuoteList[Math.floor(Math.random() * mediumQuoteList.length)]}
    if(size == 'long') {return longQuoteList[Math.floor(Math.random() * longQuoteList.length)]}
    else{return quotelist[Math.floor(Math.random() * quotelist.length)]}
}