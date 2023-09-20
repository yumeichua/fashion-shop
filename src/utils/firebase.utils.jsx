import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword 
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, // get the document
    getDoc, // access the data on the document
    setDoc // update the date on the document
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYwEZjf_lDLyEBSTwEjMmwB57kmU1uqh4",
    authDomain: "crown-clothing-db-22656.firebaseapp.com",
    projectId: "crown-clothing-db-22656",
    storageBucket: "crown-clothing-db-22656.appspot.com",
    messagingSenderId: "344067419080",
    appId: "1:344067419080:web:dd27088fa38513ae836efd"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async ( userAuth, additionalInformation={} ) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if ( !email || !password ) return;
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return user
};
