export class Player {
    constructor(gameboard, type) {
        this.gameboard = gameboard;
        this.type = type;
        this.availableMoves = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.availableMoves.push([x, y]);
            }
        }
    }
    attack(x, y, enemyBoard) {
        enemyBoard.receiveAttack(x, y);
    }
    randomAttack(enemyBoard) {
        const randomValue = Math.floor(
            Math.random() * this.availableMoves.length,
        );
        const [coords] = this.availableMoves.splice(randomValue, 1);
        const [x, y] = coords;
        enemyBoard.receiveAttack(x, y);
    }
}
