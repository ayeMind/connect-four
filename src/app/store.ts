import { makeAutoObservable } from "mobx";

export type Cell = 0 | "red" | "yellow"

class Store {
    constructor() {
        makeAutoObservable(this);
    }

    field: Cell[][] = new Array(7).fill(0).map(() => new Array(6).fill(0))
    clearField() {
        this.field = new Array(7).fill(0).map(() => new Array(6).fill(0))
    }
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
    currentPlayer: "red" | "yellow" = "red"
    togglePlayer() {
        this.currentPlayer = this.currentPlayer === "red" ? "yellow" : "red"
    }
}

const store = new Store();
export default store