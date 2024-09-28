const makeGrid = () => {
    const row = new Array(10);
    // row.fill('⬜');

    const grid = new Array(10);
    grid.fill(row);

    return grid;
}

const doTheSquaresThing = (N: number) => {
    const grid = makeGrid();

    if (N < 0 || N > 9) {
        return grid;
    }

    for (let i = 0; i <= N; i++) {
        const start = 0;
        const end = i + 1;
        const shallowCopy = [...grid[i]]
        shallowCopy.fill('🟦', start, end);

        const emptyStart = end;
        const emptyEnd = 10;
        shallowCopy.fill('⬜', emptyStart, emptyEnd);
        grid[i] = [...shallowCopy];
    }

    return grid.reverse();
}

console.log(doTheSquaresThing(9));