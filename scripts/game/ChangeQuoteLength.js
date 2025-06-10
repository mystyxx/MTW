import { changeGamemode } from "./ChangeGamemode.js";
import { printWords } from "./PrintWords.js";
import { hideButtons } from "../ui/HideButtons.js";
import { getWordList, setWordList } from "../utils/WordList.js";
import { setTestTime } from "../utils/TestTime.js";
import { chooseQuote } from "../words.js";

export function changeQuoteLength(size, langue, timeBox) {
    changeGamemode();
    timeBox.style.display = 'none';
    setTestTime(500);
    timeBox.textContent = '500';
    setWordList(chooseQuote(size, langue));
    printWords(getWordList());
    hideButtons('words', langue);
    document.getElementById("leaderboard").style.display = "none";
}