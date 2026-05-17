import { getEnglishLang } from "../words.js";

const allButtons = ['time15GamemodeButton', 'time30GamemodeButton', 'time60GamemodeButton', 'words10GamemodeButton', 'words25GamemodeButton', 'words50GamemodeButton', 'shortQuoteGamemodeButton', 'mediumQuoteGamemodeButton', 'longQuoteGamemodeButton', 'philoQuoteGamemodeButton', 'EnablePonctuation', 'tfaGamemodeButton', 'mostreadGamemodeButton', 'onthisdayGamemodeButton'];

const buttonVisibility = {
    quote: ['words10GamemodeButton', 'words25GamemodeButton', 'words50GamemodeButton', 'EnablePonctuation'],
    wiki: ['mostreadGamemodeButton', 'onthisdayGamemodeButton'],
    words: ['shortQuoteGamemodeButton', 'mediumQuoteGamemodeButton', 'longQuoteGamemodeButton', 'philoQuoteGamemodeButton'],
    time: ['time15GamemodeButton', 'time30GamemodeButton', 'time60GamemodeButton'],
};

export function hideButtons(mode, langue) {
    allButtons.forEach(btnId => {
        document.getElementById(btnId).style.display = 'none';
    });
    
    buttonVisibility[mode].forEach(btnId => {
        if (btnId === 'tfaGamemodeButton' && langue !== getEnglishLang()) {
            document.getElementById(btnId).style.display = 'none';
        } else {
            document.getElementById(btnId).style.display = 'inline-block';
        }
    });
}
