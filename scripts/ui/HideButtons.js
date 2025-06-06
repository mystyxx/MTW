import { getEnglishLang } from "../words.js";

export function hideButtons(mode, langue) {
    if(mode == 'quote') {
        document.getElementById('shortQuoteGamemodeButton').style.display = 'none';
        document.getElementById('mediumQuoteGamemodeButton').style.display = 'none';
        document.getElementById('longQuoteGamemodeButton').style.display = 'none';
        document.getElementById('philoQuoteGamemodeButton').style.display = 'none';
        document.getElementById('words15GamemodeButton').style.display = 'inline-block';
        document.getElementById('words30GamemodeButton').style.display = 'inline-block';
        document.getElementById('words60GamemodeButton').style.display = 'inline-block';
        document.getElementById('EnablePonctuation').style.display = 'inline-block';
        document.getElementById('tfaGamemodeButton').style.display = 'none';
        document.getElementById('mostreadGamemodeButton').style.display = 'none';
        document.getElementById('onthisdayGamemodeButton').style.display = 'none';
    }
    if(mode == 'wiki') {
        document.getElementById('shortQuoteGamemodeButton').style.display = 'none';
        document.getElementById('mediumQuoteGamemodeButton').style.display = 'none';
        document.getElementById('longQuoteGamemodeButton').style.display = 'none';
        document.getElementById('philoQuoteGamemodeButton').style.display = 'none';
        document.getElementById('words15GamemodeButton').style.display = 'none'
        document.getElementById('words30GamemodeButton').style.display = 'none';
        document.getElementById('words60GamemodeButton').style.display = 'none';
        document.getElementById('EnablePonctuation').style.display = 'none';
        if(langue == getEnglishLang()) {document.getElementById('tfaGamemodeButton').style.display = 'inline-block';}
        document.getElementById('mostreadGamemodeButton').style.display = 'inline-block';
        document.getElementById('onthisdayGamemodeButton').style.display = 'inline-block';
    }
    if(mode == 'words') {
        document.getElementById('shortQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('mediumQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('longQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('philoQuoteGamemodeButton').style.display = 'inline-block';
        document.getElementById('words15GamemodeButton').style.display = 'none'
        document.getElementById('words30GamemodeButton').style.display = 'none';
        document.getElementById('words60GamemodeButton').style.display = 'none';
        document.getElementById('EnablePonctuation').style.display = 'none';
        document.getElementById('tfaGamemodeButton').style.display = 'none';
        document.getElementById('mostreadGamemodeButton').style.display = 'none';
        document.getElementById('onthisdayGamemodeButton').style.display = 'none';
    }
}