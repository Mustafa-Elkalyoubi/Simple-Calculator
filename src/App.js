import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { ClearButton } from "./components/clearButton";
import * as math from "mathjs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      history: [],
    };
  }

  addToInput = (val) => {
    this.setState({
      input: this.state.input.toString() + val,
    });
  };

  handleEqual = (eq) => {
    let ou = math.evaluate(eq);
    const history = this.state.history.slice();
    const input = this.state.input.slice();
    this.setState({
      input: ou,
      history: history.concat([{ equation: eq, output: ou }]),
    });
  };

  render() {
    // Calculator
    let calcSquares = [];
    let symbols = ["+", "/", "*"];
    let buttonKey;

    for (let row = 0; row < 3; row++) {
      let calcRow = [];
      for (let col = 0; col < 3; col++) {
        buttonKey = row * 3 + col;
        calcRow.push(
          <Button handleClick={this.addToInput} key={buttonKey}>
            {buttonKey + 1}
          </Button>
        );
      }
      calcRow.push(
        <Button handleClick={this.addToInput} key={buttonKey * 15}>
          {symbols[row]}
        </Button>
      );
      calcSquares.push(
        <div className="row" key={row}>
          {calcRow}
        </div>
      );
    }
    calcSquares.reverse();

    // History
    let fullHistory = [];
    for (var i in this.state.history) {
      let input = this.state.history[i];
      fullHistory.push(
        <li key={i}>
          {input.equation} = {input.output}
        </li>
      );
    }

    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input}></Input>
          {calcSquares}
          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.handleEqual(this.state.input)}>
              =
            </Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={() => this.setState({ input: "" })}>
              Clear
            </ClearButton>
          </div>
        </div>
        <div className="history">
          <ul className="history-list">
            <h1>History</h1>
            {fullHistory}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
