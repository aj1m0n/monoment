import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAStWFLq9nnbXGIcaZxbNIYNXSTHLfOTbA",
  authDomain: "monoment-ada0c.firebaseapp.com",
  databaseURL: "https://monoment-ada0c.firebaseio.com",
  projectId: "monoment-ada0c",
  storageBucket: "monoment-ada0c.appspot.com",
  messagingSenderId: "804327133994",
  appId: "1:804327133994:web:aeb40d35394cdecb"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
