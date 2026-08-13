import { createBoard, updateBoardUI, addLogMessage } from "./modules/ui.js";
import { Gameboard } from "./modules/gameboard.js";
import { Player } from "./modules/player.js";
import { Ship } from "./modules/ship.js";

const playerBoard = document.querySelector("#player-board");
const enemyBoard = document.querySelector("#computer-board");
const logContainer = document.querySelector("#combat-log");

// UI on html
createBoard(playerBoard);
createBoard(enemyBoard);

// Make gameboard
const playerGameboard = new Gameboard();
const enemyGameboard = new Gameboard();

// Make players
const player = new Player(playerGameboard, "human");
const enemy = new Player(enemyGameboard, "enemy");

// Make ships
const enemyShip1 = new Ship(1);
const enemyShip2 = new Ship(2);
const enemyShip3 = new Ship(3);
const myShip1 = new Ship(1);
const myShip2 = new Ship(2);
const myShip3 = new Ship(3);

enemyGameboard.placeShip(enemyShip1, 0, 0, true);
enemyGameboard.placeShip(enemyShip2, 3, 3, false);
enemyGameboard.placeShip(enemyShip3, 6, 6, true);

playerGameboard.placeShip(myShip1, 0, 0, true);
playerGameboard.placeShip(myShip2, 3, 3, false);
playerGameboard.placeShip(myShip3, 6, 6, true);

updateBoardUI(playerBoard, playerGameboard);

// Add listener cell - x,y
enemyBoard.addEventListener("click", (e) => {
    if (e.target.dataset.x === undefined) return;
    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    const playerAttack = enemyGameboard.receiveAttack(x, y);
    if (!playerAttack) return;

    updateBoardUI(enemyBoard, enemyGameboard, true);

    if (playerAttack === "hit") {
        addLogMessage(
            "Holy fire consumes the dark forces!",
            "hit",
            logContainer,
        );
    } else if (playerAttack === "miss") {
        addLogMessage(
            "Your strike echoes through empty stone...",
            "miss",
            logContainer,
        );
    }

    if (enemyGameboard.allSunk()) {
        addLogMessage(
            "VICTORY! The Crypt is purged, Light pre    vails!",
            "win",
            logContainer,
        );
        return;
    }

    const botAttack = enemy.randomAttack(playerGameboard);
    updateBoardUI(playerBoard, playerGameboard);

    if (botAttack === "hit") {
        addLogMessage(
            "Dark magic strikes the Paladin camp!",
            "enemy-hit",
            logContainer,
        );
    } else if (botAttack === "miss") {
        addLogMessage(
            "The enemy dark bolt fizzles in the dirt.",
            "enemy-miss",
            logContainer,
        );
    }

    if (playerGameboard.allSunk()) {
        addLogMessage(
            "DEFEAT! Darkness creeps in... The camp has fallen.",
            "loss",
            logContainer,
        );
        return;
    }
});
