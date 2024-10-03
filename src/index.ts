const generateGrid = (gridSize: number = 10) => {
    const row = new Array(gridSize).fill("⬜");
    const grid = new Array(gridSize).fill(row);
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

    return finalRow.toString().replaceAll(",", "");
}

const generatePattern = (N: number) => {
    const gridSize = N + 1;
    const grid = generateGrid(gridSize);

    for (let rowIndex = 0; rowIndex <= N; rowIndex++) {
        const rowNumber = rowIndex + 1;
        grid[rowIndex] = generateRow(rowNumber);
    }

    const result = grid.reverse();
    console.log(result);
    return result;
}

generatePattern(9);