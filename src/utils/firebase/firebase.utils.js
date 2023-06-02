import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAjkErfId9JG8l4_d9tRSIYe8X7Kbz1WG0",
    authDomain: "crown-clothing-db-ce583.firebaseapp.com",
    projectId: "crown-clothing-db-ce583",
    storageBucket: "crown-clothing-db-ce583.appspot.com",
    messagingSenderId: "919570028361",
    appId: "1:919570028361:web:5688b2238af06e2ef96c98"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, { displayName, email, createdAt })
        } catch (error) {
            console.error('error creating the user', error.message)
        }
    }

    return userDocRef
}