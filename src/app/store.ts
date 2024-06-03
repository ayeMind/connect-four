import { makeAutoObservable } from "mobx";

class Store {
    constructor() {
        makeAutoObservable(this);
    }

    field: number[][] = new Array(7).fill(0).map(() => new Array(6).fill(0))
    clearField() {
        this.field = new Array(7).fill(0).map(() => new Array(6).fill(0))
    }
    setField(field: number[][]) {
        this.field = field
    }

    currentPlayer = "red"
    togglePlayer() {
        this.currentPlayer = this.currentPlayer === "red" ? "yellow" : "red"
    }
}

const store = new Store();
export default store