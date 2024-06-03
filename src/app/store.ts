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
        this.field[i][j] = this.currentPlayer
        return "OK"
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