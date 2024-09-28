const makeGrid = () => {
    const row = new Array(10);
    const grid = new Array(10);
    grid.fill(row);
    return grid;
}

const doTheSquaresThing = (N: number) => {
    const grid = makeGrid();

    // Ensure number is between 0 and 9
    if (N < 0 || N > 9) {
        return grid;
    }

    const generateRow = (
        currentRow: number,
    ) => {
        const pattern = ['🟦', '🟥', '🟥'];
        const longAssPattern = new Array(7).fill(pattern).flat();

        const startingPoint = currentRow - 1;
        const endingPoint = (currentRow * 2) - 1;
        const finalRow = longAssPattern.slice(startingPoint, endingPoint);

        while (finalRow.length < 10) {
            finalRow.push("⬜");
        }

        return finalRow;
    }

    for (let rowIndex = 0; rowIndex <= N; rowIndex++) {
        const rowNumber = rowIndex + 1;
        grid[rowIndex] = generateRow(rowNumber);
    }

    return grid.reverse();
}

console.log(doTheSquaresThing(9));