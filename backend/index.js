const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Generate a 10x10 game board with a solution
const generateBoard = () => {
    const size = 10;
    const maxSum = 40;
    const board = Array.from({ length: size }, () => Array(size).fill(0));
    const solution = Array.from({ length: size }, () => Array(size).fill(false));
    const rowSums = Array(size).fill(0);
    const colSums = Array(size).fill(0);

    for (let i = 0; i < size; i++) {
        let remainingRowSum = maxSum;

        for (let j = 0; j < size; j++) {
            const maxCellValue = Math.min(9, remainingRowSum, maxSum - colSums[j]);
            const value = Math.floor(Math.random() * maxCellValue) + 1;

            board[i][j] = value;
            solution[i][j] = Math.random() > 0.5; // Randomly decide if it's part of the solution
            if (solution[i][j]) {
                rowSums[i] += value;
                colSums[j] += value;
                remainingRowSum -= value;
            }
        }
    }

    return { board, solution, rowSums, colSums };
};

app.get('/new-game', (req, res) => {
    const game = generateBoard();
    res.json(game);
});

app.listen(4000, () => {
    console.log('Game server running on http://localhost:4000');
});
