import React, { Component } from "react";
import Button from "../components/Button";
import Boo from "../components/SpookyBoo";
import { isBrowser, isMobile } from "react-device-detect";

export default class WinnerScreen extends Component {
  render() {
    const { winner, reset, playerWon } = this.props;
    return (
      <div className={`fullScreen centered ${isBrowser && "winner"}`}>
        <h1
          style={{ color: `${isBrowser ? "white" : "black"}` }}
        >{`The Winner is ${winner.name}`}</h1>
        <div style={{ width: "40%", margin: "20px" }} className="spin">
          <Boo bgColor={winner.color} />
        </div>
        {isBrowser && <Button onClick={reset}>Play Again?</Button>}
        {isMobile && (playerWon ? "Winner!" : "You lose :(")}
      </div>
    );
  }
}
