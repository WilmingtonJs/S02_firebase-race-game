import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase, { gameDB, playersDb } from "./firebase";
import firebaseDbModel from "./firebaseDbModel";
class App extends Component {
  state = {
    uid: null,
    game: null,
    players: null,
    playerData: null,
    playerId: null
  };
  // | ----------------
  // | DATABASE METHODS
  // | ----------------

  // Watch Authentication
  setUpAuthListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User Exists!
        const { uid, isAnonymous } = user;
        this.setState({ uid });
        console.log("User exists!", isAnonymous, uid);
      } else {
        // Non existing user, proceed to login anonymously.
        firebase
          .auth()
          .signInAnonymously()
          .then(({ user }) => {
            console.log("Logged In!", user);
          })
          .catch(function({ code, message }) {
            console.log("Error", code, message);
          });
      }
    });
  };

  setUpGameDBListener = () => {
    gameDB.on("value", snapshot => {
      this.setState({ game: snapshot.val() });
    });
    console.log("setUpGameDBListener Ready");
  };

  setupPlayersDBListener = () => {
    playersDb.on("value", snapshot => {
      this.setState({ players: { ...snapshot.val() } });
    });
    console.log("setupPlayersDBListener Ready");
  };

  componentWillMount() {
    // Initial Setup
    this.setUpAuthListener();
    this.setUpGameDBListener();
    this.setupPlayersDBListener();
    console.log("Firebase DB Model: ");
    console.log(JSON.stringify(firebaseDbModel, null, 2));
  }

  // ---------------- |
  // DATABASE METHODS |
  // ----

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
