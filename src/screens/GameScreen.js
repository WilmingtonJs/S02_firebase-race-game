import React, { Component } from "react";
import Button from "../Components/Button";
import Boo from "../Components/SpookyBoo";

export default class GameScreen extends Component {
  getHeight = clicks => {
    return `${clicks}%`;
  };
  render() {
    const { reset, players, toggleGame, game } = this.props;
    return (
      <div className="fullScreen centered">
        <div className="mainGameContainer">
          {Object.keys(players)
            .map(key => players[key])
            .map(playerData => (
              <div
                key={playerData.key}
                className="playerProgress"
                style={{
                  height: this.getHeight(playerData.clicks)
                }}
              >
                <div className="booWrapper floating">
                  <Boo bgColor={playerData.color} />
                </div>
              </div>
            ))}
        </div>
        <div className="gameControls">
          <Button onClick={reset}>Reset</Button>
          <Button onClick={toggleGame}>{game.active ? "Stop" : "Start"}</Button>
        </div>
      </div>
    );
  }
}
