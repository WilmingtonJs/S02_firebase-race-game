import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyCckd7e0K2myA3ge0SPcGk3i94dYDl9Pv0",
  authDomain: "mp-clicker-test.firebaseapp.com",
  databaseURL: "https://mp-clicker-test.firebaseio.com",
  projectId: "mp-clicker-test",
  storageBucket: "mp-clicker-test.appspot.com",
  messagingSenderId: "999247458516"
};

firebase.initializeApp(config);

export const gameDB = firebase.database().ref("/game");
export const playersDb = firebase.database().ref("/players");

export default firebase;
