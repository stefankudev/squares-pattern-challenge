export const makeGrid = (size: number = 10) => {
    const row = "⬜".repeat(size);
    const grid = new Array(size).fill(row);
    return grid;
};

export const pattern = ['🟦', '🟥', '🟥'];

export const makeRow = (
    currentRow: number,
    gridSize: number,
) => {
    const start = currentRow - 1;
    const end = (currentRow * 2) - 1;

    const row: Array<string> = [];

    for (let position = start; position < end; position++) {
        const squareIndex = position % pattern.length;
        row.push(pattern[squareIndex]);
    }

    while (row.length < gridSize) {
        row.push("⬜");
    }

    return row.join('');
};

export const makePatternGrid = (N: number) => {
    const gridSize = N < 10 ? 10 : N + 1;
    const grid = makeGrid(gridSize);

    for (let rowIndex = 0; rowIndex <= N; rowIndex++) {
        const rowNumber = rowIndex + 1;
        grid[rowIndex] = makeRow(rowNumber, gridSize);
    }

    return grid.reverse();
};