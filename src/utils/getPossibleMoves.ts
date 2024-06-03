export const getPossibleMoves = (field: number[][]) => {
    const possibleMoves: number[][] = []
    for (let i = 0; i < 7; i++) {
        if (field[i][5] === 0) {
            possibleMoves.push([i, 5])
        }
    }
    return possibleMoves
}