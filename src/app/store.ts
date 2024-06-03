import { makeAutoObservable } from "mobx";

export type Cell = 0 | "red" | "yellow"

const initialField:Cell[][] = new Array(6).fill(0).map(() => new Array(7).fill(0))

class Store {
    constructor() {
        makeAutoObservable(this);
    }

    field: Cell[][] = initialField
    move(id: string) {
        const [i, j] = id.split("-").map(Number)
        for (let row = this.field.length - 1; row >= i; row--) {
            if (this.field[row][j] === 0) {
                this.field[row][j] = this.currentPlayer
                return row
            }
        }
        return false
    }
    getPossibleMoves = () => {
        const possibleMoves: string[] = []
    
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if (this.field[i][j] === 0) {
                    possibleMoves.push(`${i}-${j}`)
                }
            }
        }
        return possibleMoves
    }

    async checkDiagonals(row: number, col: number) {
        // first diagonal
        let count = 1
        for (let i = row + 1, j = col + 1; i < this.field.length && j < this.field[i].length; i++, j++) {
            if (this.field[i][j] === this.currentPlayer) {
                count++
            } else {
                break
            }
        }
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (this.field[i][j] === this.currentPlayer) {
                count++
            } else {
                break
            }
        }
        if (count >= 4) {
            return true
        }

        // second diagonal
        count = 1
        for (let i = row + 1, j = col - 1; i < this.field.length && j >= 0; i++, j--) {
            if (this.field[i][j] === this.currentPlayer) {
                count++
            } else {
                break
            }
        }
        for (let i = row - 1, j = col + 1; i >= 0 && j < this.field[i].length; i--, j++) {
            if (this.field[i][j] === this.currentPlayer) {
                count++
            } else {
                break
            }
        }
        if (count >= 4) {
            return true
        }

        return false
    }

    async checkHorizontal(row: number, col: number) {
        let count = 1
        for (let i = col + 1; i < this.field[row].length; i++) {
            if (this.field[row][i] === this.currentPlayer) {
                count++
            } else {
                break
            }
        }
        for (let i = col - 1; i >= 0; i--) {
            if (this.field[row][i] === this.currentPlayer) {
                count++
            } else {
                break
            }
        }
        if (count >= 4) {
            return true
        }
        return false
    }

    async checkVertical(row: number, col: number) {
        let count = 1
        for (let i = row + 1; i < this.field.length; i++) {
            if (this.field[i][col] === this.currentPlayer) {
                count++
            } else {
                break
            }
        }

        for (let i = row - 1; i >= 0; i--) {
            if (this.field[i][col] === this.currentPlayer) {
                count++
            } else {
                break
            }
        }
        if (count >= 4) {
            return true
        }
        return false
    }

    async checkWin(id:string) {
        const [i, j] = id.split("-").map(Number)
        if (await this.checkDiagonals(i, j) || await this.checkHorizontal(i, j) || await this.checkVertical(i, j)) {
            return true
        }
        return false
        
    }

    currentPlayer: "red" | "yellow" = "red"
    togglePlayer() {
        this.currentPlayer = this.currentPlayer === "red" ? "yellow" : "red"
    }

    gameIsOver = false
    winner: "red" | "yellow" | "draw" | null = null
    
    gameOver(who: "draw" | "red" | "yellow") {
        this.winner = who
        this.gameIsOver = true
    }

    reset() {
        this.currentPlayer = "red"
        this.gameIsOver = false
        this.field = initialField  
        this.winner = null
    }
}

const store = new Store();
export default store