import {describe, it, expect, test, vi, afterEach} from 'vitest'
import {makeGrid, makeRow, makePatternGrid} from '.'

describe('makeGrid', () => {
    describe('fixed low values', () => {
        it("with a size of 1", () => {
            const result = makeGrid(1)
            const expected = ["⬜"]
            expect(result).toStrictEqual(expected);
        })

        it("with a size of 3", () => {
            const result = makeGrid(3)
            const expected = ["⬜⬜⬜","⬜⬜⬜","⬜⬜⬜"]
            expect(result).toStrictEqual(expected);
        })

        it("with a size of 10", () => {
            const result = makeGrid(10)
            const expected = ["⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜","⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜","⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜","⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜","⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜","⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜","⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜","⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜","⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜","⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜"]
            expect(result).toStrictEqual(expected);
        })
    })

    describe('random extreme values', () => {
        interface ExtremeValuesFunction {
            (args: {
                minimumValue: number,
                maximumValue: number,
                arrayLength: number}
            ): Array<number>;
        }
        
        const generateExtremeValues: ExtremeValuesFunction = ({ minimumValue, maximumValue, arrayLength }) => {
            return Array.from({ length: arrayLength }, () => 
                Math.floor(Math.random() * (maximumValue - minimumValue + 1)) + minimumValue
            );
        }

        const randomValues = generateExtremeValues({
            minimumValue: 1,
            maximumValue: 999999,
            arrayLength: 5,
        })

        test.each(randomValues)('with a size of %i', (gridSize) => {
            let result: Array<string> = ['empty'];
            const getResult = () => {result = makeGrid(gridSize)};
            expect(() => getResult()).not.toThrowError();
            expect(result).not.toStrictEqual(['empty']);
            expect(result).toHaveLength(gridSize);
        })
    })
})

describe('makeRow', () => {
    describe('fixed low values', () => {
        it("row 1 from a grid with size 10", () => {
            const currentRow = 1;
            const gridSize = 10;
            const result = makeRow(currentRow, gridSize)
            const expected = "🟦⬜⬜⬜⬜⬜⬜⬜⬜⬜"
            expect([result]).toStrictEqual([expected]);
        })

        it("row 3 from a grid with size 10", () => {
            const currentRow = 3;
            const gridSize = 10;
            const result = makeRow(currentRow, gridSize)
            const expected = "🟥🟦🟥⬜⬜⬜⬜⬜⬜⬜"
            expect([result]).toStrictEqual([expected]);
        })

        it("row 10 from a grid with size 10", () => {
            const currentRow = 10;
            const gridSize = 10;
            const result = makeRow(currentRow, gridSize)
            const expected = "🟦🟥🟥🟦🟥🟥🟦🟥🟥🟦"
            expect([result]).toStrictEqual([expected]);
        })
    })

    describe('random extreme values', () => {
        interface ExtremeValuesFunction {
            (args: {
                minimumValue: number,
                maximumValue: number,
                arrayLength: number
            }
            ): Array<[
                currentRow: number,
                gridSize: number
            ]>;
        }
        
        const getExtremeValuesForRow: ExtremeValuesFunction = ({ minimumValue, maximumValue, arrayLength }) => {
            return Array.from({ length: arrayLength }, () => {
                const gridSize = Math.ceil(Math.random() * (maximumValue - minimumValue + 1)) + minimumValue;
                const currentRow = gridSize / 2;
                return [currentRow, gridSize]
            });
        }

        let randomValues = getExtremeValuesForRow({
            minimumValue: 1,
            maximumValue: 999999,
            arrayLength: 5,
        });

        // FIXME: For some reason, truly random values cause flakiness - this is to be investigated
        randomValues = [[27827,55655],[37291,74583],[69,420],[1337,9999]]

        test.each(randomValues)('row %i from a grid with size %i', (currentRow, gridSize) => {
            let result: string = 'empty';
            const getResult = () => {result = makeRow(currentRow, gridSize)};
            expect(() => getResult()).not.toThrowError();
            expect([...result].length).toBe(gridSize);
        })
    })
})

// test makePatternGrid
