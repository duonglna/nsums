// api/new-game.js
export default function handler(req, res) {
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
                solution[i][j] = Math.random() > 0.5;
                if (solution[i][j]) {
                    rowSums[i] += value;
                    colSums[j] += value;
                    remainingRowSum -= value;
                }
            }
        }

        return { board, solution, rowSums, colSums };
    };

    const game = generateBoard();
    res.status(200).json(game);
}
