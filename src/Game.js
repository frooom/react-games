import React, { useState, useEffect } from 'react';
import Board from './Board';

const initialBoard = () => {
  const board = Array(4).fill(null).map(() => Array(4).fill(null));
  addNewTile(board);
  addNewTile(board);
  return board;
};

const addNewTile = (board) => {
  const emptyTiles = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === null) {
        emptyTiles.push({ row, col });
      }
    }
  }
  if (emptyTiles.length === 0) return board;

  const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  board[row][col] = Math.random() < 0.9 ? 2 : 4;
};

const Game = () => {
  const [board, setBoard] = useState(initialBoard());

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      
    } else if (event.key === 'ArrowDown') {
      
    } else if (event.key === 'ArrowLeft') {
      
    } else if (event.key === 'ArrowRight') {
      
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board]);

  return (
    <div className="game">
      <Board board={board} />
    </div>
  );
};

export default Game;
