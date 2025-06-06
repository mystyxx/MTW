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
    <div id="leaderboardHeader">
        <h3>Leaderboard ${gm}</h3>
        <svg id="refreshLeaderboard" src="res/refresh_logo.png" alt="refresh" title="refresh the leaderboard" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
    </div>
    <ol>
        <li>
            <span class="leaderboardColumnHeader leaderboardHeaderUsername">username</span>
            <span class="leaderboardColumnHeader leaderboardHeaderScore">score (wpm)</span>
            <span class="leaderboardColumnHeader leaderboardHeaderAccuracy">accuracy (%)</span>
            <span class="leaderboardColumnHeader leaderboardHeaderTimestamp">date</span>
        </li>
    `
    for (let i = 0; i < Math.min(10, scoresList.length); i++) {
        text += `<li><span class="leaderboardUsername">${scoresList[i].name}</span>  <span class="leaderboardScore">${scoresList[i].score}</span> <span class="leaderboardAccuracy">${scoresList[i].accuracy}%</span> <span class="leaderboardTimestamp">${new Date(scoresList[i].date.seconds * 1000).toLocaleDateString()}</span></li>`;
    }
    text += "</ol>"
    document.getElementById('leaderboard').innerHTML = text;
    console.log("leaderboard refreshed")
    document.getElementById("refreshLeaderboard").addEventListener("click", () => {
        displayLeaderboard();
    });
}

export function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}