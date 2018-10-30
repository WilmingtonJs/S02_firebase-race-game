import React, { PureComponent } from "react";

export default class Button extends PureComponent {
  render() {
    return (
      <button className="baseButton" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}
