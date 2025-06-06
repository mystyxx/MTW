export async function displayLeaderboard() {
    let gm = sessionStorage.getItem('gm');
    const { getFirestore, collection, query, where, orderBy, limit, getDocs } = window.firebase.firestore;
    const db = getFirestore();
    let scoresList = []

    if (gm == "shortQuote" || gm == "mediumQuote" || gm == "longQuote" || gm == "quote") {
        /* pas de leaderboard pour les quotes
        const leaderboardRef = collection(db, "leaderboard", gm, "scores");
        const querySnapshot = await getDocs(query(leaderboardRef, where("quoteIndex", "==", lastquoteIndex), orderBy("score", "desc"), limit(10)));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            scoresList.push({
                name: getDoc(data.user).data().username,
                score: data.score,
                date: data.date
            });
        });
        */
    }
    else {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);

        if (gm == "tfa") {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Récupère le tableau de scores pour le mode courant
                const userScores = data.scores && data.scores[gm] ? data.scores[gm] : [];
                let todayScores = userScores.filter(score => isSameDay(new Date(score.date.seconds * 1000), new Date()));
                if (Array.isArray(todayScores) && todayScores.length > 0) {
                    // Cherche le meilleur score de l'utilisateur pour ce mode
                    let best = todayScores.reduce((max, curr) => curr.score > max.score ? curr : max, todayScores[0]);
                    scoresList.push({
                        name: data.username || '???',
                        score: best.score,
                        accuracy: best.accuracy || '?',
                        date: best.date
                    });
                }
            });
        }
        else {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Récupère le tableau de scores pour le mode courant
                const userScores = data.scores && data.scores[gm] ? data.scores[gm] : [];
                if (Array.isArray(userScores) && userScores.length > 0) {
                    // Cherche le meilleur score de l'utilisateur pour ce mode
                    let best = userScores.reduce((max, curr) => curr.score > max.score ? curr : max, userScores[0]);
                    scoresList.push({
                        name: data.username,
                        score: best.score,
                        accuracy: best.accuracy,
                        date: best.date
                    });
                }
            });
        }
    }
    // affichage des scores
    scoresList.sort((a, b) => b.score - a.score);
    let text = `
    <h3>Leaderboard ${gm}</h3>
    <ol>
        <li>
            <span class="leaderboardHeader leaderboardHeaderUsername">username</span>
            <span class="leaderboardHeader leaderboardHeaderScore">score (wpm)</span>
            <span class="leaderboardHeader leaderboardHeaderAccuracy">accuracy (%)</span>
            <span class="leaderboardHeader leaderboardHeaderTimestamp">date</span>
        </li>
    `
    for (let i = 0; i < Math.min(10, scoresList.length); i++) {
        text += `<li><span class="leaderboardUsername">${scoresList[i].name}</span>  <span class="leaderboardScore">${scoresList[i].score}</span> <span class="leaderboardAccuracy">${scoresList[i].accuracy}%</span> <span class="leaderboardTimestamp">${new Date(scoresList[i].date.seconds * 1000).toLocaleDateString()}</span></li>`;
    }
    text += "</ol>"
    document.getElementById('leaderboard').innerHTML = text;

}

export function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}