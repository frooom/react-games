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

const moveLeft = (board) => {
  const newBoard = board.map(row => {
    const newRow = row.filter(tile => tile !== null);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        newRow[i + 1] = null;
      }
    }
    return [...newRow.filter(tile => tile !== null), ...Array(4 - newRow.filter(tile => tile !== null).length).fill(null)];
  });
  return newBoard;
};

const moveRight = (board) => {
  const newBoard = board.map(row => {
    const newRow = row.filter(tile => tile !== null);
    for (let i = newRow.length - 1; i > 0; i--) {
      if (newRow[i] === newRow[i - 1]) {
        newRow[i] *= 2;
        newRow[i - 1] = null;
      }
    }
    return [...Array(4 - newRow.filter(tile => tile !== null).length).fill(null), ...newRow.filter(tile => tile !== null)];
  });
  return newBoard;
};

const rotateClockwise = (matrix) => {
  const size = matrix.length;
  const newMatrix = matrix[0].map((_, i) => matrix.map(row => row[i]));
  newMatrix.forEach(row => row.reverse());
  return newMatrix;
};

const rotateCounterClockwise = (matrix) => {
  const size = matrix.length;
  const newMatrix = matrix[0].map((_, i) => matrix.map(row => row[i]));
  return newMatrix.reverse();
};

const moveUp = (board) => {
  let rotatedBoard = rotateCounterClockwise(board);
  rotatedBoard = moveLeft(rotatedBoard);
  return rotateClockwise(rotatedBoard);
};

const moveDown = (board) => {
  let rotatedBoard = rotateClockwise(board);
  rotatedBoard = moveLeft(rotatedBoard);
  return rotateCounterClockwise(rotatedBoard);
};

const Game = () => {
  const [board, setBoard] = useState(initialBoard());

  const handleKeyDown = (event) => {
    let newBoard;
    if (event.key === 'ArrowUp') {
      newBoard = moveUp(board);
    } else if (event.key === 'ArrowDown') {
      newBoard = moveDown(board);
    } else if (event.key === 'ArrowLeft') {
      newBoard = moveLeft(board);
    } else if (event.key === 'ArrowRight') {
      newBoard = moveRight(board);
    }

    if (newBoard) {
      addNewTile(newBoard);
      setBoard(newBoard);
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
