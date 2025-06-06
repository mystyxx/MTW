import { updateTypedColors } from "../ui/UpdateTypedColors.js";
import { changeModeHighlight } from "../ui/ChangeModeHighlight.js";
import { changeQuoteLength } from "./ChangeQuoteLength.js"
import { changeWikipediaType } from "./ChangeWikipediaType.js"
import { changeTestTime } from "./ChangeTestTime.js"
import { getWordList } from "../utils/WordList.js";

export function switchGamemode(langue, hardmode=false, timerObject, timebox) {
    document.getElementById('words15GamemodeButton').className = ''; document.getElementById('words30GamemodeButton').className = ''; document.getElementById('words60GamemodeButton').className = ''; document.getElementById('shortQuoteGamemodeButton').className = ''; document.getElementById('mediumQuoteGamemodeButton').className = ''; document.getElementById('longQuoteGamemodeButton').className = ''; document.getElementById('philoQuoteGamemodeButton').className = ''; document.getElementById('wikipediaGamemodeButton').className = ''; document.getElementById('mostreadGamemodeButton').className = ''; document.getElementById('onthisdayGamemodeButton').className = ''; document.getElementById('tfaGamemodeButton').className = '';
    switch (sessionStorage.getItem('gm')) {
        case 'quote' :
            changeQuoteLength('', langue, timerObject, timebox)
            document.getElementById('shortQuoteGamemodeButton').className = 'titleHighlight'; document.getElementById('mediumQuoteGamemodeButton').className = 'titleHighlight'; document.getElementById('longQuoteGamemodeButton').className = 'titleHighlight'; changeModeHighlight('quoteGamemodeButton');
            break;
        case 'shortQuote':
            changeQuoteLength('short', langue, timerObject, timebox);
            document.getElementById('shortQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'mediumQuote':
            changeQuoteLength('medium', langue, timerObject, timebox);
            document.getElementById('mediumQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'longQuote':
            changeQuoteLength('long', langue, timerObject, timebox);
            document.getElementById('longQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'philo':
            changeQuoteLength('philo', langue, timerObject, timebox);
            document.getElementById('philoQuoteGamemodeButton').className = 'titleHighlight';
            break;
        case 'tfa':
            changeWikipediaType('tfa', langue, timerObject, timebox);
            document.getElementById('tfaGamemodeButton').className = 'titleHighlight';
            break;
        case 'mostread':
            changeWikipediaType('mostread', langue, timerObject, timebox);
            changeModeHighlight('wikipediaGamemodeButton');
            document.getElementById('mostreadGamemodeButton').className = 'titleHighlight';
            break;
        case 'onthisday':
            changeWikipediaType('onthisday', langue, timerObject, timebox);
            document.getElementById('onthisdayGamemodeButton').className = 'titleHighlight';
            break;
        case 'time15':
            changeTestTime(15, hardmode, undefined, langue, timerObject, timebox);
            changeModeHighlight('timeGamemodeButton');
            document.getElementById('words15GamemodeButton').className = 'titleHighlight';
            break;
        case 'time30':
            changeTestTime(30, hardmode, undefined, langue, timerObject, timebox);
            document.getElementById('words30GamemodeButton').className = 'titleHighlight';
            break;
        case 'time60':
            changeTestTime(60, hardmode, undefined, langue, timerObject, timebox);
            document.getElementById('words60GamemodeButton').className = 'titleHighlight';
            break;
        case 'words10':
            changeTestTime(500, hardmode, 10, langue, timerObject, timebox);
            changeModeHighlight('wordsGamemodeButton');
            document.getElementById('words15GamemodeButton').className = 'titleHighlight';
            break;
        case 'words25':
            changeTestTime(500, hardmode, 25, langue, timerObject, timebox);
            document.getElementById('words30GamemodeButton').className = 'titleHighlight';
            break;
        case 'words50':
            changeTestTime(500, hardmode, 50, langue, timerObject, timebox);
            document.getElementById('words60GamemodeButton').className = 'titleHighlight';
            break;
        default:
            sessionStorage.setItem('gm', 'time15')
            changeTestTime(15, hardmode, undefined, langue, timerObject, timebox);
            changeModeHighlight('timeGamemodeButton');
            document.getElementById('words15GamemodeButton').className = 'titleHighlight';
            break;
    }

    // Attendre que les éléments soient présents avant d'appeler updateTypedColors
    const waitForElementsAndUpdate = () => {
        const inputbox = document.getElementById("typeInput");
        const typedTextElement = document.getElementById("typedText");
        if (inputbox && typedTextElement && document.getElementById("0")) {
            updateTypedColors(inputbox, typedTextElement, getWordList());
        } else {
            // Réessaye dans 10ms
            setTimeout(waitForElementsAndUpdate, 10);
        }
    };

    waitForElementsAndUpdate();

}