import firebase from 'firebase';
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyCfEScmy98u-5nH4_3hufEzw2AEgRBSIXs",
  authDomain: "fundooapp-ab5c7.firebaseapp.com",
  databaseURL: "https://fundooapp-ab5c7.firebaseio.com",
  projectId: "fundooapp-ab5c7",
  storageBucket: "fundooapp-ab5c7.appspot.com",
  messagingSenderId: "160989969670"
};
// firebase.initializeApp(config);
// if (!firebase.apps.length) {
  // firebase.initializeApp(config);
// }

// export const provider = new firebase.auth.GoogleAuthProvider();
// export const auth = firebase.auth();

const app  = firebase.initializeApp(config);
const storage = firebase.storage();
// const provider = firebase.auth.FacebookAuthProvider();

export {app, storage, firebase as default};

 