import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDCO2FMbOhSLF9RVxPpysDWhqmPKDwEhAQ",
  authDomain: "crwn-clothing-8717c.firebaseapp.com",
  databaseURL: "https://crwn-clothing-8717c.firebaseio.com",
  projectId: "crwn-clothing-8717c",
  storageBucket: "crwn-clothing-8717c.appspot.com",
  messagingSenderId: "957272869972",
  appId: "1:957272869972:web:19dc8307c6e83501"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;