export function avg(array) {
    let sum = 0;
    for (let i=0; i<array.length-1; i++) {
        sum = sum + Number(array[i]);
    }
    return sum/(array.length-1);
}