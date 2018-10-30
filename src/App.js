import React, { Component } from "react";
import { isBrowser } from "react-device-detect";

import "./App.css";
import firebase, { gameDB, playersDb } from "./firebase";
import firebaseDbModel from "./firebaseDbModel";

import Loading from "./components/Loading";
import PlayerScreen from "./screens/PlayerScreen";
import GameScreen from "./screens/GameScreen";
import WinnerScreen from "./screens/WinnerScreen";

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

  // Players Functions
  joinGame = () => {
    const { players, game } = this.state;
    if (game.activePlayers < game.maxPlayers) {
      const playersArray = Object.keys(players).map(
        playerKey => players[playerKey]
      );
      const existingPlayer = playersArray.find(
        player => player.uid === this.state.uid
      );
      const nextEmptySpot = playersArray.find(
        player => player.uid === undefined
      );
      if (existingPlayer) {
        this.setState({
          playerId: existingPlayer.key
        });
      } else if (nextEmptySpot) {
        playersDb.child(nextEmptySpot.key).update({
          uid: this.state.uid
        });
        gameDB.child("activePlayers").set(game.activePlayers + 1);
        this.setState({
          playerId: nextEmptySpot.key
        });
      }
    }
  };

  onTouch = () => {
    const clickCount =
      this.state.players[this.state.playerId] &&
      this.state.players[this.state.playerId].clicks;
    if (clickCount > 80) {
      const winner = this.state.players[this.state.playerId];
      gameDB.update({ winner });
    }
    playersDb.child(this.state.playerId).update({
      clicks: clickCount + 1.5
    });
  };

  // Game Functions
  resetGame = () => {
    playersDb.set(firebaseDbModel.players);
    gameDB.set(firebaseDbModel.game);
  };

  toggleGameStatus = () => {
    gameDB.child("active").set(!this.state.game.active);
  };

  render() {
    const { uid, game, players, playerId } = this.state;
    const loading = uid != null && game != null && players != null;
    const playerData = playerId ? players[playerId] : null;
    const winner = game && game.winner;
    const spotsAvailable = game && game.activePlayers < game.maxPlayers;
    return (
      <div className="fullScreen centered">
        {!loading ? (
          <Loading />
        ) : winner ? (
          <WinnerScreen
            winner={winner}
            playerWon={uid === winner.uid}
            reset={this.reset}
          />
        ) : isBrowser ? (
          <GameScreen
            players={players}
            reset={this.reset}
            toggleGame={this.toggleGameStatus}
            game={game}
          />
        ) : (
          <PlayerScreen
            joinGame={this.joinGame}
            onTouch={this.onTouch}
            playerData={playerData}
            gameIsActive={game.active}
            spotsAvailable={spotsAvailable}
          />
        )}
      </div>
    );
  }
}

export default App;
