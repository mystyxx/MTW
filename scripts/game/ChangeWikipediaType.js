import { changeGamemode } from "./ChangeGamemode.js";
import { printWords } from "./PrintWords.js";
import { hideButtons } from "../ui/HideButtons.js";
import { changeModeHighlight } from "../ui/ChangeModeHighlight.js";
import { getWordList, setWordList } from "../utils/WordList.js";
import { setTestTime } from "../utils/TestTime.js";
import { getFrenchLang } from "../words.js";
import { getEnTfaDict, getFrTfaDict } from "../wikipediascraper.js";

export function changeWikipediaType(mode, langue, TimerObject, timeBox, wordBox=document.getElementById("words")) {
    changeGamemode(TimerObject);
    hideButtons('wiki');
    timeBox.style.visibility = 'hidden';
    setTestTime(500);
    timeBox.textContent = '500';
    wordBox.textContent = '';
    if(langue == getFrenchLang()) {
        if(mode == 'onthisday') {let rn = Math.floor(Math.random() * getFrTfaDict().onthisday.length)
            setWordList(getFrTfaDict().onthisday[rn].year + ' : ' + getFrTfaDict().onthisday[rn].text);}
        else{setWordList(getFrTfaDict().mostread.articles[Math.floor(Math.random() * getFrTfaDict().mostread.articles.length)].extract); changeModeHighlight('mostreadGamemodeButton'); changeModeHighlight('wikipediaGamemodeButton'); sessionStorage.setItem('gm', 'mostread');}
    }
    else{
        if(mode == 'mostread') {setWordList(getEnTfaDict().mostread.articles[Math.floor(Math.random() * getEnTfaDict().mostread.articles.length)].extract);}
        if(mode == 'onthisday') {let rn = Math.floor(Math.random() * getEnTfaDict().onthisday.length)
            setWordList(getEnTfaDict().onthisday[rn].year + ' : ' + getEnTfaDict().onthisday[rn].text);}
        if(mode == 'tfa'){setWordList(getEnTfaDict().tfa.extract)}
    }
    setWordList(getWordList().replace('–', '-').replace('«', '"').replace('»', '"').replace(' ', ' ').match(/\S+\s*/g));
    printWords(getWordList());
    changeModeHighlight('wikipediaGamemodeButton');
    document.getElementById("leaderboard").style.display = "block";
}