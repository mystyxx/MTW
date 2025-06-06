import { createNewUser } from "./CreateNewUser.js";

export async function addTimeToLeaderboard(score, accuracy) {
    let gm = sessionStorage.getItem('gm');
    const { getFirestore, doc, updateDoc, getDoc } = window.firebase.firestore;
    const db = getFirestore();
    

    if (gm == "shortQuote" || gm == "mediumQuote" || gm == "longQuote" || gm == "quote") {}
    else {
        if (localStorage.getItem('username') == null || localStorage.getItem('username') == '' || localStorage.getItem('username') == undefined) {
            localStorage.setItem('username', prompt('Entrez votre nom d\'utilisateur pour enregistrer votre score :'));
        }
        const userRef = doc(db, "users", localStorage.getItem('username'));
        let userDoc = await getDoc(userRef);
        
        if (!userDoc.exists() || userDoc.data === undefined || userDoc.data === null ) {
            createNewUser(userRef, localStorage.getItem('username'));
            userDoc = await getDoc(userRef);
        }
        const userData = userDoc.data();

        if (userData.username == null || userData.username == 'null' || userData.username == undefined || userData.username == '') {
            return;
        }

        let newScore = {score: score, accuracy: accuracy, date: new Date()};
        userData.scores[gm].push(newScore);

        // gérer le pb
        if (parseInt(score) < parseInt(localStorage.getItem('pb'))) {
            localStorage.setItem('pb', score);
            userData.personalBest = newScore;
            await updateDoc(userRef, {personalBest: userData.personalBest})
        }
        
        await updateDoc(userRef, {scores : userData.scores });
    }
}