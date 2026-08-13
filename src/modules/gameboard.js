export class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.miss = [];
        this.ships = [];
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
                return 123;
            }
            for (let index = 0; index < ship.length; index++) {
                if (this.board[y + index][x] !== null) {
                    return "Место занято";
                }
            }
            for (let index = 0; index < ship.length; index++) {
                this.board[y + index][x] = ship;
            }
            this.ships.push(ship);
        } else if (isVertical === false) {
            if (x + ship.length > 10) {
                return 123;
            }
            for (let index = 0; index < ship.length; index++) {
                if (this.board[y][x + index] !== null) {
                    return "Место занято";
                }
            }
            for (let index = 0; index < ship.length; index++) {
                this.board[y][x + index] = ship;
            }
            this.ships.push(ship);
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
