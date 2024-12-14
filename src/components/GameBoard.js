import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GameBoard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameBoard = () => {
    const [board, setBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const [rowSums, setRowSums] = useState([]);
    const [colSums, setColSums] = useState([]);
    const [cellStatus, setCellStatus] = useState([]);
    const [mode, setMode] = useState('circle');
    const [errorMessage, setErrorMessage] = useState(null); // Tracks error message

    const fetchNewGame = async () => {
        try {
            const response = await axios.get('/api/new-game');
            setBoard(response.data.board || []);
            setSolution(response.data.solution || []);
            setRowSums(response.data.rowSums || []);
            setColSums(response.data.colSums || []);
            setCellStatus(
                response.data.board.map((row) => row.map(() => 'default')) // Initialize all cells as 'default'
            );
            setErrorMessage(null); // Clear error message on new game
        } catch (error) {
            console.error('Error fetching the game:', error);
        }
    };

    useEffect(() => {
        fetchNewGame();
    }, []);

    const handleCellClick = (row, col) => {
        if (!board[row] || board[row][col] === undefined) return;

        setCellStatus((prev) => {
            const newStatus = [...prev];
            if (mode === 'circle') {
                if (solution[row][col]) {
                    newStatus[row][col] = 'correct'; // Highlight correct numbers
                    setErrorMessage(null); // Clear any previous error message
                } else {
                    setErrorMessage('Wrong number! Try again.');
                }
            } else if (mode === 'eraser') {
                if (!solution[row][col]) {
                    newStatus[row][col] = 'cleared'; // Mark cleared cells
                    setErrorMessage(null); // Clear any previous error message
                } else {
                    setErrorMessage('This number is part of the solution and cannot be erased!');
                }
            }
            return newStatus;
        });
    };

    return (
        <div className="text-center">
            <div className="mb-3">
                <button
                    className={`btn btn-primary ${mode === 'circle' ? 'active' : ''}`}
                    onClick={() => setMode('circle')}
                >
                    Circle
                </button>
                <button
                    className={`btn btn-danger ${mode === 'eraser' ? 'active' : ''}`}
                    onClick={() => setMode('eraser')}
                >
                    Eraser
                </button>
                <button className="btn btn-secondary ml-2" onClick={fetchNewGame}>
                    New Game
                </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errorMessage}
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setErrorMessage(null)}
                    ></button>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th></th>
                            {colSums.map((sum, index) => (
                                <th key={index} className="bg-light">{sum}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {board.length > 0 ? (
                            board.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="bg-light">{rowSums[rowIndex]}</td>
                                    {row.map((num, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`${
                                                cellStatus[rowIndex][colIndex] === 'correct'
                                                    ? 'table-primary' // Blue for correct numbers
                                                    : cellStatus[rowIndex][colIndex] === 'cleared'
                                                    ? 'table-danger' // Red for cleared cells
                                                    : '' // Default (no color)
                                            }`}
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {num}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={board[0]?.length || 10} className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GameBoard;
