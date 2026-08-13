import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";

describe("Player factory / class", () => {
    test("Тест на создание", () => {
        const board = new Gameboard();
        const enemyBoard = new Gameboard();

        const player = new Player(board, "human");
        const enemy = new Player(enemyBoard, "computer");

        const myShip1 = new Ship(1);
        const myShip2 = new Ship(2);

        board.placeShip(myShip1, 0, 0, false);
        board.placeShip(myShip2, 3, 3, true);

        console.log("Print my board");
        board.renderBoard();

        const enemyShip1 = new Ship(1);
        const enemyShip2 = new Ship(2);

        enemyBoard.placeShip(enemyShip1, 0, 0, false);
        enemyBoard.placeShip(enemyShip2, 3, 3, true);

        console.log("Print enemy board");
        enemyBoard.renderBoard();

        player.attack(0, 0, enemyBoard);
        console.log("Print enemy board after attack");
        enemyBoard.renderBoard();

        enemy.randomAttack(board);
        console.log("Print my board after attack");
        board.renderBoard();

        expect(enemyShip1.numberHit).toBe(1);
        expect(enemy.availableMoves.length).toBe(99);
    });
});
