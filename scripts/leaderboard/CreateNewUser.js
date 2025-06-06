export async function createNewUser(userRef, username) {
    // crée un nouvel utilisateur dans la base de données Firestore
    // cet utilisateur possède une array de map pour chaque catégorie de jeu
    const { setDoc } = window.firebase.firestore;
    await setDoc(userRef, {
        username: username,
        creationDate: new Date(),
        email: '',
        personalBest: {},
        scores: {
            tfa: [],
            shortQuote: [],
            mediumQuote: [],
            longQuote: [],
            philo: [],
            mostread: [],
            onthisday: [],
            time15: [],
            time30: [],
            time60: [],
            words10: [],
            words25: [],
            words50: []
        }
    });
}