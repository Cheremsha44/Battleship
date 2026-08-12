export class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.miss = [];
        this.ships = [];
    }
    renderBoard() {
        console.table(
            this.board.map((row) => row.map((cell) => (cell ? "S" : "~"))),
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
        } else if (this.board[y][x] === null) {
            this.miss.push([x, y]);
            this.board[y][x] = "miss";
        } else if (this.board[y][x] === "miss") {
            return "Ты уже сюда стрелял и не попал";
        } else if (this.board[y][x] === "hit") {
            return "Ты уже сюда стрелял и попал";
        }
    }
    placeShip(ship, x, y, isVertical) {
        if (isVertical === true) {
            if (y + ship.length > 10) {
                return 123;
            }
            for (let index = 0; index < ship.length; index++) {
                this.board[x][y + index] = ship;
            }
            this.ships.push(ship);
        } else if (isVertical === false) {
            if (x + ship.length > 10) {
                return 123;
            }
            for (let index = 0; index < ship.length; index++) {
                this.board[x + index][y] = ship;
            }
            this.ships.push(ship);
        }
    }
}
