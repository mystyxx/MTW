export function textwrap(){
    document.getElementById('wpmjsp').innerHTML = document.getElementById('wpmjsp').innerHTML + '<span>' + wordList[i] + '</span>';

    if(document.getElementById('wpmjsp').offsetHeight > document.getElementById('0').offsetHeight+1){
        document.getElementById('wpmjsp').innerHTML = '<span>' + wordList[i] + '<span>';
        return(true)
    }
};