import React from 'react';
import Tile from './Tile';

const Board = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((tile, colIndex) => (
            <Tile key={colIndex} value={tile} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
