import React from "react";

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.images_src = process.env.PUBLIC_URL + "/pieces_images/pieces_svg";
    this.pieces_images = {
      'P': "/white-pawn.svg",
      'N': "/white-knight.svg",
      'B': "/white-bishop.svg",
      'R': "/white-rook.svg",
      'Q': "/white-queen.svg",
      'K': "/white-king.svg",
      'p': "/black-pawn.svg",
      'n': "/black-knight.svg",
      'b': "/black-bishop.svg",
      'r': "/black-rook.svg",
      'q': "/black-queen.svg",
      'k': "/black-king.svg",
    };
    this.isWhiteTile = (this.props.rank + this.props.file) % 2 === 1;
  }

  render() {
    this.isHighlighted =
      this.props.isSelected ||
      this.props.isOpponentMoveFrom ||
      this.props.isOpponentMoveTo;
    return (
      <div className="square" onClick={() => {this.props.clickPiece(this.props.rank, this.props.file);}}>
        {this.isHighlighted && <div className="selected tile" />}
        { !this.isHighlighted && this.isWhiteTile && <div className="light tile" />}
        { !this.isHighlighted && !this.isWhiteTile && <div className="dark tile" />}
        {
          this.props.pieceId &&
          <img src={this.images_src + this.pieces_images[this.props.pieceId]}
            alt="If you read this message something went wrong this the images"
            className="piece"/>
        }
      </div>
    );
  }
}
