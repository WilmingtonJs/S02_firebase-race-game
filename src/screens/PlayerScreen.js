import React, { Component } from "react";
import Button from "../components/Button";
import Boo from "../components/SpookyBoo";

export default class PlayerScreen extends Component {
  render() {
    const {
      joinGame,
      playerData,
      gameIsActive,
      onTouch,
      spotsAvailable
    } = this.props;
    return (
      <div className="fullScreen centered">
        {playerData && playerData.uid ? (
          <div
            className="centered"
            style={{ height: "80%", justifyContent: "space-between" }}
            onClick={() => {
              console.log("touched");
              if (gameIsActive) {
                onTouch();
              }
            }}
          >
            <h1>{playerData.name}</h1>
            <Boo bgColor={playerData.color} />
            <div className="centered">
              {gameIsActive ? <div>Go!</div> : <div>Get Ready!</div>}
            </div>
          </div>
        ) : (
          <div>
            {spotsAvailable ? (
              <Button onClick={joinGame}>Join The game</Button>
            ) : (
              <div>Sorry the Room is full </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
