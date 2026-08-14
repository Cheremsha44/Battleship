import { Ship } from "./ship.js";

export class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.miss = [];
        this.ships = [];
    }
    placeShipsRandomly() {
        this.ships = [];
        this.miss = [];
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

        for (const size of shipSizes) {
            let placed = false;

            while (!placed) {
                const randomX = Math.floor(Math.random() * 10);
                const randomY = Math.floor(Math.random() * 10);
                const isVertical = Math.random() < 0.5;

                placed = this.placeShip(
                    new Ship(size),
                    randomX,
                    randomY,
                    isVertical,
                );
            }
        }
    }
    renderBoard() {
        console.table(
            this.board.map((row) =>
                row.map((cell) => {
                    if (cell === "miss") return "M";
                    if (cell === "hit") return "X";
                    if (cell) return "S";
                    return "~";
                }),
            ),
        );
    }
    receiveAttack(x, y) {
        if (
            this.board[y][x] !== null &&
            this.board[y][x] !== "miss" &&
            this.board[y][x] !== "hit"
        ) {
            this.board[y][x].hit();
            this.board[y][x] = "hit";
            return "hit";
        } else if (this.board[y][x] === null) {
            this.miss.push([x, y]);
            this.board[y][x] = "miss";
            return "miss";
        } else if (this.board[y][x] === "miss") {
            return false;
        } else if (this.board[y][x] === "hit") {
            return false;
        }
    }
    placeShip(ship, x, y, isVertical) {
        if (isVertical === true) {
            if (y + ship.length > 10) {
                return false;
            }
            for (let index = 0; index < ship.length; index++) {
                if (
                    this.board[y + index]?.[x] ||
                    this.board[y + index - 1]?.[x] ||
                    this.board[y + index + 1]?.[x] ||
                    this.board[y + index]?.[x - 1] ||
                    this.board[y + index]?.[x + 1] ||
                    this.board[y + index - 1]?.[x - 1] ||
                    this.board[y + index - 1]?.[x + 1] ||
                    this.board[y + index + 1]?.[x - 1] ||
                    this.board[y + index + 1]?.[x + 1]
                ) {
                    return false;
                }
            }
            for (let index = 0; index < ship.length; index++) {
                this.board[y + index][x] = ship;
            }
            this.ships.push(ship);
            return true;
        } else if (isVertical === false) {
            if (x + ship.length > 10) {
                return false;
            }
            for (let index = 0; index < ship.length; index++) {
                if (
                    this.board[y]?.[x + index] ||
                    this.board[y]?.[x + index - 1] ||
                    this.board[y]?.[x + index + 1] ||
                    this.board[y - 1]?.[x + index] ||
                    this.board[y + 1]?.[x + index] ||
                    this.board[y - 1]?.[x + index - 1] ||
                    this.board[y + 1]?.[x + index - 1] ||
                    this.board[y - 1]?.[x + index + 1] ||
                    this.board[y + 1]?.[x + index + 1]
                ) {
                    return false;
                }
            }
            for (let index = 0; index < ship.length; index++) {
                this.board[y][x + index] = ship;
            }
            this.ships.push(ship);
            return true;
        }
    }
    allSunk() {
        if (this.ships.length > 0) {
            return this.ships.every((ship) => {
                return ship.isSunk() === true;
            });
        } else {
            return false;
        }
    }
}
