export function spacebarIsInput() {
    for (let i = 0; i<inputbox.value.length;i++) {
        if(inputbox.value[i] == ' ' || inputbox.value[i] == ' '){
            return true;
        }
    }
}