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
    };
  }

  addToInput = (val) => {
    this.setState({
      input: this.state.input + val,
    });
  };

  handleEqual = () => {
    this.setState({
      input: math.evaluate(this.state.input),
    });
  };

  render() {
    let calcSquares = [];
    let symbols = ["+", "/", "*"];
    let buttonKey;
    for (let row = 0; row < 3; row++) {
      let calcRow = [];
      buttonKey = 0;
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
    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input}></Input>
          {calcSquares}
          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.handleEqual()}>=</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={() => this.setState({ input: "" })}>
              Clear
            </ClearButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
