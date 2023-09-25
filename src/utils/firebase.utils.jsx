import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, // get the document
    getDoc, // access the data on the document
    setDoc, // update the date on the document
    collection,
    writeBatch,
    query,
    getDocs
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
export const signInWithNativeEmailAndPassword = async (email, password) => {
    if ( !email || !password ) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });

    await batch.commit();

    console.log("documents have been inserted!");
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async ( userAuth, additionalInformation={} ) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

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

    return userSnapshot;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if ( !email || !password ) return;
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return user
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth, 
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};
