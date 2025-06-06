export function changeClientTheme(theme) {
    if(theme == 'dark') {
        document.body.style.setProperty("--main-bg-color", '#fffffe');
        document.body.style.setProperty("--main-text-color", '#094067');
        document.body.style.setProperty("--secondary-bg-color", '#d1e0e0');
        document.body.style.setProperty("--secondary-text-color", '#7f7f7f');
        document.body.style.setProperty("--outline-color", '#5f6c7b');
        document.getElementById('words').style.outline = '1px solid';
        document.body.style.setProperty("--main-bg-color-transparent", 'rgba(255, 255, 255, 0.5)')
        document.body.style.setProperty("--hover-color", '#5f6c7b');
        document.body.style.setProperty("--great-color", '#5f6c7b');
    }
    else {
        document.body.style.setProperty("--main-bg-color", '#12192C');
        document.body.style.setProperty("--main-text-color", 'white');
        document.body.style.setProperty("--secondary-bg-color", '#232F4F');
        document.body.style.setProperty("--outline-color", '#727D82');
        document.getElementById('words').style.outline = '1px solid';
        document.body.style.setProperty("--main-bg-color-transparent", 'rgba(18, 25, 44, 0.5)')
        document.body.style.setProperty("--secondary-text-color", '#7f7f7f');
        document.body.style.setProperty("--hover-color", '#7E7F91');
        document.body.style.setProperty("--great-color", '#7E7F91');
    }
    document.getElementById('switchThemeButton').textContent = 'switch to ' + theme + ' theme';
}