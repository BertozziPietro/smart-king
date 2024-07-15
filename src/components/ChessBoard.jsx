import React from "react";
import Square from './Square';

export default class ChessBoard extends React.Component {
  constructor(props) {
    super(props);
    this.clickPiece = this.clickPiece.bind(this);
    this.state = this.inizializeChessBoard(this.props.startingPositionFen);
  }

  inizializeChessBoard(startingPositionFen) {
    const fenResults = this.props.showFEN(startingPositionFen);
    return {
      pieces: fenResults.pieces,
      selectedPiece: null,
      opponentMoveFrom: {rank: 0, file: 0},
      opponentMoveTo: {rank: 0, file: 0},
      turn: fenResults.turn === 'w'
    }
  }

  isBlackPiece(id) {
    return (id >= 'a' && id <= 'z');
  }

  clickPiece(ri, fi) {
    const selectedPiece = this.state.selectedPiece;
    if (selectedPiece) {
      this.movingPiece(ri, fi, selectedPiece);
    } else {
      this.selectingPiece(ri, fi);
    }
  }

  selectingPiece(ri, fi) {
    const isTherePiece =
      this.state.pieces.find(p =>
        this.isBlackPiece(p.id) ^ this.state.turn
        && p.rank === ri
        && p.file === fi);
    if (isTherePiece) {
      this.setState({
        selectedPiece: { id: isTherePiece.id, rank: ri, file: fi },
      });
    }
  }

  movingPiece(ri, fi, selectedPiece) {
    const selectedId = selectedPiece.id;
    const selectedRank = selectedPiece.rank;
    const selectedFile = selectedPiece.file;
    const newPieces = this.state.pieces.filter(p =>
      (p.rank !== selectedRank || p.file !== selectedFile) &&
      (p.rank !== ri || p.file !== fi));
    const newPiece = { id: selectedId, rank: ri, file: fi };
    newPieces.push(newPiece);
    this.setState({
      pieces: newPieces,
      selectedPiece: null,
      opponentMoveFrom: {rank: selectedRank, file: selectedFile},
      opponentMoveTo: {rank: ri, file: fi},
      turn: !this.state.turn
    });
  }

  isThere(piece, ri, fi) {
    return (piece &&
      piece.rank === ri &&
      piece.file === fi );
  }

  render() {
    return (
      <div className="chessboard">
        {Array.from({ length: 8 }, (_, f) => (
          <div key={`file-${f}`}>
            {Array.from({ length: 8 }, (_, r) => {
              const piece = this.state.pieces.find(p => p.rank === 8 - r && p.file === f + 1);
              return (
                <Square
                  key={`f${8 - r}-r${f + 1}`}
                  rank={8 - r}
                  file={f + 1}
                  pieceId={piece ? piece.id : null}
                  isSelected={this.isThere(this.state.selectedPiece, 8 - r, f + 1)}
                  isOpponentMoveFrom={this.isThere(this.state.opponentMoveFrom, 8 - r, f + 1)}
                  isOpponentMoveTo={this.isThere(this.state.opponentMoveTo, 8 - r, f + 1)}
                  clickPiece={this.clickPiece}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}
