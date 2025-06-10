export async function setPersonalBest() {
    const { getFirestore, collection, query, where, getDocs, updateDoc } = window.firebase.firestore;
    const db = getFirestore();

    const username = localStorage.getItem('username');
    const personalBest = parseInt(localStorage.getItem('pb'), 10);

    if (!username || isNaN(personalBest)) {
        console.warn("Nom d'utilisateur ou score invalide");
        return;
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.warn("Utilisateur non trouvé dans Firestore");
        return;
    }

    querySnapshot.forEach(async (userDoc) => {
        const userRef = userDoc.ref;

        await updateDoc(userRef, {
            personalBest: personalBest
        });
    });
}
