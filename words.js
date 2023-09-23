const frenchWords = ["bonjour", "merci", "plaisir", "amour", "chien", "chat", "livre", "musique", "soleil", "lune", "étoile", "fleur", "arbre", "montagne", "plage", "ville", "voiture", "train", "avion", "temps", "jour", "sécurité", "matin", "soir", "hôtel", "vin", "pain", "eau", "café", "fruits", "légumes", "viande", "poisson", "dessert", "il", "que", "voix", "ciel", "petit", "entre", "comme", "maison", "répondre", "ici", "terre", "ça", "moins", "tant", "chambre", "depuis", "mais", "ne", "âme", "dieu", "mot", "chez", "coup", "autre", "heure", "tout", "chez", "commentaire", "philosophie", "pourquoi", "élégant", "abandonner", "nuit", "question", "j'ai", "obtenu", "ça", "mais", "pourquoi", "sentir", "obtenu", "géré", "cube", "stylo", "comment", "réseau", "dans", "passant", "chanter", "angoisse", "relatif", "mépris", "encore", "clavier", "rat", "écran", "même", "si", "à", "où", "commentaire", "vrai", "novembre", "utile", "urgent", "retrouver", "plage", "chien", "chat", "livre", "musique", "soleil", "lune", "étoile", "fleur", "arbre", "montagne", "opposition", "odeur", "annoncer", "choisir", "pays", "vent", "puisque", "lutte", "propre", "durant", "ligne", "animal", "deux", "tout", "pourrait"];

const quote1 = 'Dans la vie, on ne fait pas ce que l\'on veut, mais on est responsable de ce que l\'on est.'.split(' ');
const quote2 = 'La vie est un mystère qu\'il faut vivre, et non un problème à résoudre.'.split(' ');
const quote3 = 'Parfois, c\'est compliqué de faire la différence entre détermination et obstination.'.split(' ');
const quote4 = 'Malgré tout, ça reste toi.'.split(' ');
const quote5 = 'Tu possèdes quelque chose qui s\'appelle la détermination. Donc du moment que tu t\'accroches, du moment que tu fais ce qui te tient à coeur, je crois que tu peux faire ce qui est juste.'.split(' ')
const quote6 = 'Be proud of you, because we can be do what we want to do.'.split(' ');
const quote7 = 'Ne voyez-vous pas que le véritable but du novlangue est de restreindre les limites de la pensée ? À la fin, nous rendrons littéralement impossible le crime par la pensée car il n\'y aura plus de mots pour l\'exprimer. Tous les concepts nécessaires seront exprimés chacunexactement par un seul mot dont le sens sera délimité. Toutes les significations subsidiaires seront supprimées et oubliées. Déjà, dans la onzième édition, nous ne sommes pas loin de ce résultat. Mais le processus continuera encore longtemps après que vous et moi nous serons morts.'.split(' ');
const quote8 = 'Quelle est la différence entre toi et moi ? C\'est que moi je compte encore les jours et toi je sais bien que tu les comptes pas.'.split(' ');
const quote9 = 'Y en a qui se la jouent viril, glorifiant la loi du plus fort, mais leur connerie est sidérale, ça pédale dans la semoule, dans l\'aigreur intersidérale. Y en a qui rabaissent les meufs, voudraient les voir dans la cuisine, ça rassure leur égo quand ils les voient courber l\'échine.'.split(' ');
const quote10 = 'Y en a qui disent \"j\'ai été trop gentil maintenant fini de sfaire avoir\" mais c\'est en disant ça qu\'ils rejoignent le troupeau des batards.'.split(' ')
const quote11 = 'On est le flip flip crew, terroristes bienveillants, les autres trucs c\'est chiant, va falloir vous réveiller, car nous sommes l\'understup, la ligue anti-réactionnaire, le stup persévère, stoppera les guerres sur la Terre.'.split(' ');
const quote12 = 'Fais confiance qu\'à ton coeur, avant d\'apprendre à rire on pleure, après la vie on meurt, lève-toi, prends les armes et bat toi pour tes valeurs.'.split(' ');
const quote13 = 'Linus Benedict Torvalds, né le 28 décembre 1969 à Helsinki en Finlande, est un informaticien américano-finlandais connu notamment pour avoir créé le noyau Linux en 1991 (à 21 ans). Il continue d\'en diriger le développement, étant considéré comme le "dictateur bienveillant à vie" (Benevolent Dictator for Life) de celui-ci. Il a également créé le logiciel de gestion de versions décentralisé Git et le logiciel d\'enregistrement et de planification des plongées Subsurface.'.split(' ');
const quote14 = 'Le cinéma est un art du spectacle. En français, il est désigné commme le "septième art", d\'après l\'expression du critique Ricciotto Canudo dans les années 1920. L\'art cinématographique se caractérise par le spectacle proposé au public sous la forme d\'un film, c\'est à dire d\'un récit (fictionnel ou documentaire, véhiculé par un support (pellicule souple, bande magnétique, contenant numérique), qui est enregistré puis lu par un mécanisme continu ou intermittent qui crée l\'illusion d\'images en mouvements, ou par l\'enregistrement et la lecture continue de données informatiques.'.split(' ');
const quote15 = 'Quoi que je fasse, quelle que soit ma détermination, ceux que j\'aime finiront toujours par payer.'.split(' ');
const quote16 = 'Tu sais, si tu as l\'intention de voler des voitures, ne te déguise pas en voleur de voiture.'.split(' ');
const quote17 = 'Nombreux sont les vivants qui mériteraient la mort, et les morts qui mériteraient la vie, pouvez-vous la leur rendre Frodon ? Alors ne soyez pas trop prompt à dispenser morts et jugements. Même les grands sages ne peuvent connaître toutes les fins.'.split(' ');
const quote18 = 'C\'était assurément une puissante citadelle, imprenable pour peu qu\'elle fût tenue par des gens en état de porter les armes, à moins que quelque ennemi ne pût venir par derrière, escalader les pentes inférieures du Mindolluin et parvenir ainsi sur l\'étroit épaulement qui joignait la Colline de la Garde à la masse de la montagne. Mais cet épaulement, qui s\'élevait à la hauteur du cinquième mur, était entouré de grands remparts jusqu\'au bord même du précipice qui surplombait son extrémité occidentale, et dans cet espace s\'élevaient les demeures et les tombeaux à dôme des rois et seigneurs du temps passé, à jamais silencieux entre la montagne et la tour.'.split(' ');
const quote19 = 'Le quenya fut conçu par Tolkien comme dérivant d\'une langue originelle commune à toutes les langues elfiques qu\'il imagina. C\'est une langue à morphologie complexe, qui présente à la fois des traits flexionnels et agglutinants ; elle repose en grande partie sur l\'emploi d\'affixes, mais recourt aussi à l\'alternance vocalique. Le quenya est pourvu d\'une riche déclinaison et d\'une conjugaison de type synthétique. Le nombre de cas et la conjugaison ont varié avec les années au cours du développement de la langue par leur auteur. Le vocabulaire est essentiellement a priori, c\'est-à-dire créé indépendamment de celui des langues naturelles, mais il est en revanche apparenté à celui des autres langues elfiques imaginées par Tolkien.'.split(' ');
const quote20 = 'Xavier, Burno, Hervé Niel, né le 15 août 1967 à Maisons-Alfort (France), est un homme d\'affaires miliardaire français. Sa ofrtune est estimée à 8,6 miliards de dollars par le magazine américain Forbes au premier mars 2023. Il est le fondateur et actionnaire principal d\'Iliard, groupe de télécommunications français, maison mère du fournisseur d\'accès à internet Free et de l\'opérateur de téléphonie mobile FRee mobile. Il est à ce titre, au début des années 2000, le pionnier en France des offres du triple play et du concept de box. Xavier Niel est également, à titre personnel, copropriétaire du groupe Le monde (propriétaire du journal homonyme) et investisseur dans plusieurs secteurs d\'activité. Membre du Conseil national du numérique de 2011 à 2012, instigateur des établissements d\'autoformation en informatique 42, il est aussi à l\'origine du projet Station F à Paris.'.split(' ');
const quote21 = 'L\'existence du kipferi, ancêtre du croissant, serait attestée dans les pays de l\'Europe de l\'Est depuis le XIIIe siècle, mais sans que l\'on en connaisse la recette (salée ou sucrée) et fait dans une pâte à brioche. On daterait son origine à 1683 où, pendant que les Turcs assiègent Vienne, un boulanger prénommé Adam Spiel donne l\'alerte au moment d\'une attaque ottomane à l\'aube qui permet de repousser l\'envahisseur. Pour commémorer cette victoire, de petits croissants appelés Hörnchen furent confectionnés par les boulangers de la ville, rappelant ainsi la forme du symbole ottoman.'.split(' ');
const quote22 = 'Le Guide du voyageur galactique (titre original : The Hitchhiker\'s Guide to the Galaxy, abrégé notamment en H2G2) est une oeuvre de science-fiction humoristique mulidisciplinaire imaginée par l\'écrivain britannique Douglas Adams. Son nom provient de l\'object symbolique de la série : un livre électronnique intitulé Le Guide du vogateur galactique. Née en 1978 sous forme de feuilleton radiophonique, l\'oeuvre a depuis été déclinée dans de nombreux médias au cours de différentes adaptations : romans, pièces de théâtre, série télévisée, jeux vidéo, bande dessinée, long métrage pour le cinéma.'.split(' ');
const quote23 = 'Il est écrit "Seul Link peut vaincre Ganon" !'.split(' ');
const quote24 = 'Dieu a-t-il fait l\'Homme à son image ou L\'Homme a-t-il fait Dieu à la sienne ? J\'ai mon avis. La religion traduit les aspirations profondes de la race humaine. Nulles qu\'elles n\'ont davantage façonné l\'histoire. Ce cycle nous tente à en tirer des leçons. Devenir de meilleurs croyants ou de meilleurs athées, ça signifie avant tout "regarder au plus profond de nous pour ne pas reproduire les erreurs du passé."'.split(' ');
const quote25 = 'Si la jeunesse n\'a pas toujours raison, la société qui la méconnaît et qui la frappe a toujours tort.'.split(' ');
const quote26 = 'Vous avez tout à fait raison, Monsieur le Premier Ministre...'.split(' ');
const quote27 = ''

function chooseList() {
    let wordArray = []
    for(let i =0; i<40; i++) {
        let feur = Math.floor(Math.random() * frenchWords.length);
        wordArray.push(frenchWords[feur]);
    }
    return wordArray;
}


const quotelist = [quote1, quote2, quote3, quote4, quote5, quote6, quote7, quote8, quote9, quote10, quote11, quote12, quote13, quote14, quote15, quote16, quote17, quote18, quote19, quote20, quote21, quote22, quote23, quote24, quote25, quote26, ];
const shortQuoteList = []; const mediumQuoteList = []; const longQuoteList = [];

for(let i=0; i<quotelist.length; i++) {
    if(quotelist[i].length < 20) {
        shortQuoteList.push(quotelist[i]);
    }
    else if(quotelist[i].length < 50 && quotelist[i].length > 20) {
        mediumQuoteList.push(quotelist[i]);
    }
    else if (quotelist[i].length > 50) {longQuoteList.push(quotelist[i]);}
}

let lastquote;
let lastquoteIndex;
function chooseQuote(size) {
    if(size == 'short') {
        lastquoteIndex = Math.floor(Math.random() * shortQuoteList.length)
        if (lastquote !== undefined) {
            shortQuoteList.push(lastquote)
        }
        lastquote = shortQuoteList[lastquoteIndex]
        let index = shortQuoteList.indexOf(shortQuoteList[lastquoteIndex]);
        if (index > -1) { // only splice array when item is found
            shortQuoteList.splice(index, 1); // 2nd parameter means remove one item only
        }
        return lastquote}
    if(size == 'medium') {
        lastquoteIndex = Math.floor(Math.random() * mediumQuoteList.length)
        if (lastquote !== undefined) {
            mediumQuoteList.push(lastquote)
        }
        lastquote = mediumQuoteList[lastquoteIndex]
        let index = mediumQuoteList.indexOf(mediumQuoteList[lastquoteIndex]);
        if (index > -1) { // only splice array when item is found
            mediumQuoteList.splice(index, 1); // 2nd parameter means remove one item only
        }
        return lastquote
    }
    if(size == 'long') {
        lastquoteIndex = Math.floor(Math.random() * longQuoteList.length)
        if (lastquote !== undefined) {
            longQuoteList.push(lastquote)
        }
        lastquote = longQuoteList[lastquoteIndex]
        let index = longQuoteList.indexOf(longQuoteList[lastquoteIndex]);
        if (index > -1) { // only splice array when item is found
            longQuoteList.splice(index, 1); // 2nd parameter means remove one item only
        }
        return lastquote
    }
    else{
        lastquoteIndex = Math.floor(Math.random() * quotelist.length)
        if (lastquote !== undefined) {
            quotelist.push(lastquote)
        }
        lastquote = quotelist[lastquoteIndex]
        let index = quotelist.indexOf(quotelist[lastquoteIndex]);
        if (index > -1) { // only splice array when item is found
            quotelist.splice(index, 1); // 2nd parameter means remove one item only
        }
        return lastquote}
}
