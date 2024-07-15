import React from "react";
import ChessBoard from './ChessBoard';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.title = "Smart King";
    this.startingPositionFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  }

  showFEN(startingPositionFen) {
    const fenParts = startingPositionFen.split(' ');
    const position = fenParts[0];
    const turn = fenParts[1];
    let ri = 8, fi = 1;
    const pieces = [];
    for (let i = 0; i < position.length; i++) {
      const c = position[i];
      if (c === '/') {
        ri--;
        fi = 1;
      } else if (/[1-8]/.test(c)) {
        fi += parseInt(c);
      } else {
        pieces.push({ id: c, rank: ri, file: fi });
        fi++;
      }
    }
    return {
      pieces: pieces,
      turn: turn
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">{this.title}</h1>
        <ChessBoard
          startingPositionFen={this.startingPositionFen}
          showFEN={this.showFEN}
        />
      </div>
    );
  }
}
