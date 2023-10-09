const frenchWords = ["bonjour", "merci", "plaisir", "amour", "chien", "chat", "livre", "musique", "soleil", "lune", "étoile", "fleur", "arbre", "montagne", "plage", "ville", "voiture", "train", "avion", "temps", "jour", "sécurité", "matin", "soir", "hôtel", "vin", "pain", "eau", "café", "fruits", "légumes", "viande", "poisson", "dessert", "il", "que", "voix", "ciel", "petit", "entre", "comme", "maison", "répondre", "ici", "terre", "ça", "moins", "tant", "chambre", "depuis", "mais", "ne", "âme", "dieu", "mot", "chez", "coup", "autre", "heure", "tout", "chez", "commentaire", "philosophie", "pourquoi", "élégant", "abandonner", "nuit", "question", "j'ai", "obtenu", "ça", "mais", "pourquoi", "sentir", "obtenu", "géré", "cube", "stylo", "comment", "réseau", "dans", "passant", "chanter", "angoisse", "relatif", "mépris", "encore", "clavier", "rat", "écran", "même", "si", "à", "où", "commentaire", "vrai", "novembre", "utile", "urgent", "retrouver", "plage", "chien", "chat", "livre", "musique", "soleil", "lune", "étoile", "fleur", "arbre", "montagne", "opposition", "odeur", "annoncer", "choisir", "pays", "vent", "puisque", "lutte", "propre", "durant", "ligne", "animal", "deux", "tout", "pourrait"];
const englishWords = "apple beach black chair cloud dance drink earth faith flame fruit grass happy heart light music ocean paper peach river smile snake space stone sugar sweet table tiger water world write young olive lemon mango grape cherry peach plum apple kiwi banana orange lemon lime grapefruit pomegranate pineapple coconut strawberry raspberry blueberry blackberry cranberry watermelon lettuce carrot potato onion mushroom corn peas dash controller lamp low cube pen void skepticism computer desktop dress avoid remain stay run jump swim eat sleep dance ring talk walk play study cook drive think laugh smile climb fly cheat happy sad beautiful smart cowardly brave friendly tall dark bright quiet dirty dry delicious comfortable".split(' ');

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
const quote27 = 'Moi, je n\'étais rien et voilà qu\'aujourd\'hui, je suis le gardien du sommeil de ses nuits, je l\'aime à mourir... Vous pouvez détruire tout ce qu\'il vous plaira, elle n\'a qu\'à ouvrir l\'espace de ses bras, pour tout reconstruire... Pour tout reconstruire...'.split(' ');
const quote28 = 'La première étape du Tour de France 1952 s\'est déroulée le 25 juin 1952 entre les villes de Brest, qui accueille pour la première fois le départ d\'un Tour, et de Rennes, qui est une ville-étape du Tour pour la sixième fois de son histoire. Le parcours franchit les reliefs bretons à travers les départements du Finistère, des Côtes-du-Nord et de l\'Ille-et-Vilaine, sur une route accidentée longue de 246 km. Il passe notamment les villes de Morlaix, Guingamp et Saint-Brieuc. Cette première étape des vingt-trois prévues lance la 39e édition du Tour de France, dont Fausto Coppi prend le départ dans le rôle de l\'immense favori en l\'absence d\'Hugo Koblet, vainqueur de l\'édition précédente, et de Louison Bobet, alors champion de France. La course est remportée par le Belge Rik Van Steenbergen devant son compatriote et coéquipier Maurice Blomme, tous les deux membres de l\'équipe de Belgique.'.split(' ');
const quote29 = 'La bataille de Drépane (ou Drepanum) est une bataille navale qui a lieu en 249 avant Jésus-Christ, lors de la première guerre punique, au large de Drépane (aujourd\'hui Trapani) à l\'ouest de la Sicile, entre une flotte carthaginoise commandée par Adherbal et une flotte romaine dirigée par Publius Claudius Puicher. Le consul romain tente de bloquer la forteresse carthaginoise de Lilybée (aujourd\'hui Marsala), mais sans réel succès, celle-ci étant toujours ravitaillée par voie maritime grâce aux connaissances locales d\'Hannibal le Rhodien sur les hauts-fonds du secteur. Pour arrêter ce ravitaillement, Publius Claudius Pulcher décide d\'attaquer la flotte punique qui se trouve dans le port de la ville voisine de Drépane.'.split(' ');
const quote30 = 'La pluie de tes sarcasmes glisse sur la toile de mon indifférence.'.split(' ');
const quote31 = 'Malgré tout cela, je crois encore à la bonté innée de l\'Homme'.split(' ');
const quote32 = 'Essayez de quitter la Terre un peu meilleure que vous l\'avez trouvée.'.split(' ');
const quote33 = 'On ne voit bien qu\'avec le coeur. L\essentiel est invisible pour les yeux.'.split(' ');
const quote34 = 'Toutes les grandes personnes ont d\'abord été des enfants. Mais peu d\'entre elles s\'en souviennent.'.split(' ');
const quote35 = 'Mais si tu m\'apprivoise, nous aurons besoin l\'un de l\'autre. Tu seras pour moi unique au monde. Et je serai pour toi unique au monde.'.split(' ');
const quote36 = 'Que la lumière soit. Dixit euh... Dieu. Je citais Dieu.'.search(' ');
const quote37 = 'Vous êtes vous déjà dit qu\'il y a toujours un moment où l\'on entend son nom pour la dernière fois ? Et bien, ce moment est arrivé : je vais vous tuer, Chell.'.split(' ');
const philoquote1 = 'La simplicité véritable allie la bonté à la beauté.'.split(' ');
const philoquote2 = 'La justice de l\'intelligence est la sagesse. Le sage n\'est pas celui qui sait beaucoup de choses, mais celui qui voit leur juste mesure.'.split(' ');
const philoquote3 = 'La victoire sur soi est la plus grande des victoire.'.split(' ');
const philoquote4 = 'Celui qui progresse ne blâme personne, ne loue personne, ne critique personne, n\'incrimine personne. Il ne dit rien, ni de son importance, ni de son savoir.'.split(' ');
const philoquote5 = 'Lorsque donc quelqu\'un te met en colère, sache que c\'est ton jugement qui te met en colère.'.split(' ');
const philoquote6 = 'Il ne dépend pas de toi d\'être riche, mais il dépend de toi d\'être heureux.'.split(' ');
const philoquote7 = 'La colère est nécessaire ; On ne triomphe de rien sans elle, si elle ne remplit l\'âme, si elle n\'échauffe le coeur ; Elle doit donc nous servir, non comme chef, mais comme soldat.'.split(' ');
const philoquote8 = 'J\'entends par raison non pas la faculté de raisonner, qui peut être bien et mal employée, mais l\'enchaînement de vérités qui ne peut produire que des vérités, et une vérité ne saurait être contraire à une autre.'.split(' ');
const philoquote9 = 'Je ne suis ni Athénien, ni Grec, mais citoyen du monde.'.split(' ');
const philoquote10 = 'Je crois qu\'on ne peut mieux vivre qu\'en cherchant à devenir meilleur, ni plus agréablement qu\'en ayant la pleine conscience de son amélioration.'.split(' ');
const philoquote11 = 'Les gens qu\'on interroge, pourvu qu\'on les interroge bien, trouvent d\'eux-mêmes les bonnes réponses.'.split(' ');
const philoquote12 = 'Tu dois devenir l\'homme que tu es. Fais ce que toi seul peut faire. Deviens sans cesse celui que tu es, sois le maître et le sculpteur de toi-même.'.split(' ');
const philoquote13 = 'Je peux douter de tout, sauf d\'une chose, et c\'est le fait même que je doute. Autrement dit - Je pense, donc je suis.'.split(' ');
const philoquote14 = 'Pour atteindre la vérité, il faut une fois dans la vie se défaire de toutes les opinions qu\'on a reçues, et reconstruire de nouveau tout le sytème de ses connaissances.'.split(' ');
const philoquote15 = 'La lecture de tous les bons livres est comme une conversation avec les plus honnêtes gens des siècles passés.'.split(' ');

const enquote1 = 'Be proud of you, because you can be do what we want to do.'.split(' ');
const enquote2 = 'Two things are infinite : the universe and human stupidity ; And i\'m not sure about the universe.'.split(' ');
const enquote3 = 'How wonderful it is that nobody need wait a single moment before starting to improve the world.'.split(' ');
const enquote4 = 'Never doubt that a small group of thoughtful, committed, citizens can change the world. Indeed, it is the only thing that ever has.'.split(' ');
const enquote5 = 'One, remember to look up at the stars and not down at your feet. Two, never give up work. Work gives you meaning and purpose and life is empty without it. Three, if you are lucky enough to find love, remember it is there and don\'t throw it away.'.split(' ');
const enquote6 = 'Mount Celeste is the unofficial name for a moutain located on Vancouver Island, British Columbia. It shares the name Celeste with two peaks in the Cariboo region of the BC Interior. Within the boundaries of Starhcona Provincial Park, this peak lies at the north end of Rees Ridge. Iceberg Peak lies at the south end of this ridge. The first ascent of this peak is cretited to Jack Horbury and Jock Sutherland on August 18, 1934. A ficitonal version of Mount Celeste is featured as the primary setting in the 2016 platforming game Celeste Classic and the 2018 platforming game Celeste. The game is about the personal struggles the main character Madeline faces as she attemps to climb to mountain. The moutain is also shown on the Instagram page of in-game character Theo.'.split(' ');
const enquote7 = 'The 2003 London blackout was a serios power outage that affected parts of south London and north-west Kent in the evening of 28 August 2003. It was caused by a series of faults at National GRid transmission substations, which supplied the distribution network operateor in the area, EDF Energy (now UK Power Networks). It was the largest blackout in South East England since the Great Storm of 1986, affecting 476,000 customers. Power was lost at 18:20 BST and restored to EDF Energy 37 minutes later at 18:57, although it reportedly took longer for all customers to be reconnected.'.split(' ');
const enquote8 = 'On 3 October 2023, a bus fell from an overpass in Mestre-Carpenedo, Venice, Veneto, Italy, and crashed, killing 21 people and injuring 18. The incident happened at 19:45 CEST as the bus was transporting tourists from Piazzale Roma in the historic centre of Venice to a campsite in the Maghera district.'.split(' ');
const enquote9 = 'Despite everything, it\'s still you.'.split(' ');
const enquote10 = 'I guess I should stop looking out for you, like I always do. When will you start lookin\' for me too, instead of leaving starin\' at my shoes ? Just the way, you\'re glancing at me, something about you just makes me feel guilty for liking you. When you\'re with him, when you\'re with him.'.split(' ');
const enquote11 = 'Breaking Bad is an American crime drama television series created and produced by Vince Gilligan for AMC. Set and filed in Albuquerque, New Mexico, the series follows Walter White (Bryan Cranston), and underpaid, overqualified, and dispirited high-school chemistry teacher who is struggling with a recent disgnosis of stage-three lung cancer. White turns to a life of crime and partners with a former student, jesse Pinkman (Aaron Paul), to produce methamphetamine to secure his family\'s financial future before he dies, while navigating the dangers of the criminal underworld. Breaking Bad premiered on AMC on Janurary 20, 2008 and concuded on September 29, 2013, after five seasons consisting of 62 Episodes.'.split(' ');
const enquote12 = 'And I guess, I\'ll just miss her, even if she isn\'t really gone, things are just different, ever since she cut her blue hair off.'.split(' ');
const enquote13 = 'YOU! You\'re standing in the way of everybody\'s hopes and dreams!'.split(' ');
const enquote14 = 'You never gained any LOVE, but you gained love.'.split(' ');
const enquote15 = 'I gently open the door...'.split(' ');
const enquote16 = 'It\'s dangerous to go alone ! Take this.'.split(' ');
const enquote17 = 'The cake is a lie.'.split(' ');
const enquote18 = 'For a moment, nothing happened. Then, after a second or so, nothing continued to happen.'.split(' ');
const enquote19 = 'Space is big. You just won\'t believe how vastly, hugely, mind-bogglingly big it is. I mean, you may think it\'s a long way down the road to the chemist\'s, but that\'s just peanuts to space.'.split(' ');
const enphiloquote1 = 'I think; therefore I am.'.split(' ');
const enphiloquote2 = 'Conquer yourself rather than the world.'.split(' ');
const enphiloquote3 = 'We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.'.split(' ');
const enphiloquote4 = 'I am the wisest man alive, for I know one thing, and that is that I know nothing.'.split(' ');
const enphiloquote5 = 'Love is a serious mental disease.'.split(' ');
const enphiloquote6 = 'If women are expected to do the same work as men, we must teach them the same things.'.split(' ');
const enphiloquote7 = 'Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution; it represents the wise choice of many alternatives - choice, not chance, determines your destiny.'.split(' ');


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function chooseList(language, hardmode, words = 50) {
    let wordArray = []
    for(let i =0; i<words; i++) {
        let feur = Math.floor(Math.random() * language.words.length);
        if(hardmode && i%2 == 1){let ponctuation = Math.floor(Math.random() * 25); let apagnan = '';
            switch(ponctuation){
                case 1:
                case 2:
                    apagnan = language.words[feur]+ ',';
                    break;
                case 2:
                case 3:
                case 4:
                case 12:
                case 13:
                    wordArray[wordArray.length] = language.words[feur] + '.';
                    apagnan = capitalizeFirstLetter(language.words[Math.floor(Math.random() * language.words.length)])
                    break;
                case 5:
                    wordArray[wordArray.length] = '!';
                    apagnan = capitalizeFirstLetter(language.words[Math.floor(Math.random() * language.words.length)])
                    break;
                case 6:
                case 7:
                    wordArray[wordArray.length] = '?';
                    apagnan = capitalizeFirstLetter(language.words[Math.floor(Math.random() * language.words.length)])
                    break;
                case 8:
                    wordArray[wordArray.length] = ';';
                    apagnan = capitalizeFirstLetter(language.words[Math.floor(Math.random() * language.words.length)])
                    break;
                case 9:
                    apagnan = '\"' + language.words[feur] + '\"';
                    break;
                case 10:
                    apagnan = ':';
                    break;
                case 11:
                    apagnan = '('+language.words[feur]+')';
                    break;
                default:
                    apagnan = language.words[feur];
                    break
            }
            wordArray.push(apagnan);
        }
        else{wordArray.push(language.words[feur])}
    }
    return wordArray;
}

const philoquotelist = [philoquote1, philoquote2, philoquote3, philoquote4, philoquote5, philoquote6, philoquote7, philoquote8, philoquote9, philoquote10, philoquote11, philoquote12, philoquote13, philoquote14, philoquote15];
const quotelist = [quote1, quote2, quote3, quote4, quote5, quote6, quote7, quote8, quote9, quote10, quote11, quote12, quote13, quote14, quote15, quote16, quote17, quote18, quote19, quote20, quote21, quote22, quote23, quote24, quote25, quote26, quote27, quote28, quote29, quote30, quote31, quote32, quote33, quote34, quote35, quote36, quote37, philoquote1, philoquote2, philoquote3, philoquote4, philoquote5, philoquote6, philoquote7, philoquote8, philoquote9, philoquote10, philoquote11, philoquote12, philoquote13, philoquote14, philoquote15];
const enphiloquotelist = [enphiloquote1, enphiloquote2, enphiloquote3, enphiloquote4, enphiloquote5, enphiloquote6, enphiloquote7, enquote8, enquote9, enquote10, enquote11, enquote12, enquote13, enquote14, enquote15, enquote16, enquote17, enquote18, enquote19]
const enquotelist = [enquote1, enquote2, enquote3, enquote4, enquote5, enquote6, enquote7, enquote8, enquote9, enquote10, enquote11, enquote12, enquote13, enquote14, enquote15, enquote16, enquote17, enquote18, enquote19, enphiloquote1, enphiloquote2, enphiloquote3, enphiloquote4, enphiloquote5, enphiloquote6, enphiloquote7];

class langage {
    constructor(words, quotes, philoquotes) {
        this.words = words;
        this.quotes = quotes;
        this.philoquotes = philoquotes;
        this.shortQuoteList = []; this.mediumQuoteList = []; this.longQuoteList = [];
        for(let i=0; i<this.quotes.length; i++) {
            if(this.quotes[i].length < 20) {
                this.shortQuoteList.push(this.quotes[i]);
            }
            else if(this.quotes[i].length < 50 && this.quotes[i].length > 20) {
                this.mediumQuoteList.push(this.quotes[i]);
            }
            else if (this.quotes[i].length > 50) {this.longQuoteList.push(this.quotes[i]);}
        }
    }
}

const french = new langage(frenchWords, quotelist, philoquotelist);
const english = new langage(englishWords, enquotelist, enphiloquotelist);

let lastquote; let lastshortquote; let lastmediumquote; let lastlongquote; let lastphiloquote;
let lastquoteIndex;

function valIsInLang(arr) {
    for(let i = 0 ; i<arr.length ; i++) {
        if(langue.quotes[i] == arr) {return(true)}
    }
}

function chooseQuote(size, language) {
    if(size == 'short') {
        lastquoteIndex = Math.floor(Math.random() * language.shortQuoteList.length)
        if (lastshortquote !== undefined && valIsInLang(lastshortquote)) {
            language.shortQuoteList.push(lastshortquote)
        }
        lastshortquote = language.shortQuoteList[lastquoteIndex]
        language.shortQuoteList.splice(lastquoteIndex, 1);
        return lastshortquote}
    if(size == 'medium') {
        lastquoteIndex = Math.floor(Math.random() * language.mediumQuoteList.length)
        if (lastmediumquote !== undefined && valIsInLang(lastmediumquote)) {
            language.mediumQuoteList.push(lastmediumquote)
        }
        lastmediumquote = language.mediumQuoteList[lastquoteIndex]
        language.mediumQuoteList.splice(lastquoteIndex, 1); 
        return lastmediumquote
    }
    if(size == 'long') {
        lastquoteIndex = Math.floor(Math.random() * language.longQuoteList.length)
        if (lastlongquote !== undefined && valIsInLang(lastlongquote)) {
            language.longQuoteList.push(lastlongquote)
        }
        lastlongquote = language.longQuoteList[lastquoteIndex]
        language.longQuoteList.splice(lastquoteIndex, 1); 
        return lastlongquote
    }
    if(size == 'philo') {
        lastquoteIndex = Math.floor(Math.random() * language.philoquotes.length)
        if(lastphiloquote !== undefined && valIsInLang(lastphiloquote)) {
            language.philoquotes.push(lastphiloquote)
        }
        lastphiloquote = language.philoquotes[lastquoteIndex]
        language.philoquotes.splice(lastquoteIndex, 1);
        return lastphiloquote;
    }
    if(size == 'wiki') {return 'tip : press tab to restart quickly !'.split(' ');}
    else{
        lastquoteIndex = Math.floor(Math.random() * language.quotes.length)
        if (lastquote !== undefined) {
            language.quotes.push(lastquote)
        }
        lastquote = language.quotes[lastquoteIndex]
        language.quotes.splice(lastquoteIndex, 1); 
        return lastquote}
}
