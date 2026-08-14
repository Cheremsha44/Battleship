import {
    createBoard,
    updateBoardUI,
    addLogMessage,
    updateStartButton,
} from "./modules/ui.js";
import { Gameboard } from "./modules/gameboard.js";
import { Player } from "./modules/player.js";
import { Ship } from "./modules/ship.js";

const playerBoard = document.querySelector("#player-board");
const enemyBoard = document.querySelector("#computer-board");
const logContainer = document.querySelector("#combat-log");
const autoDeployBtn = document.querySelector("#random-btn");
const startBtn = document.querySelector("#start-btn");
const gameContainer = document.querySelector(".game-container");
const placementControls = document.querySelector("#placement-controls");
const enemySide = document.querySelector(".enemy-side");
const logSection = document.querySelector(".log-section");

// UI on html
createBoard(playerBoard);
createBoard(enemyBoard);

// Make gameboard
const playerGameboard = new Gameboard();
const enemyGameboard = new Gameboard();

// Make players
const player = new Player(playerGameboard, "human");
const enemy = new Player(enemyGameboard, "enemy");

updateStartButton(startBtn, playerGameboard);

autoDeployBtn.addEventListener("click", (e) => {
    playerGameboard.placeShipsRandomly();
    updateBoardUI(playerBoard, playerGameboard);
    updateStartButton(startBtn, playerGameboard);
});

startBtn.addEventListener("click", (e) => {
    enemyGameboard.placeShipsRandomly();
    gameContainer.classList.remove("placement-mode");
    placementControls.classList.add("hidden");
    enemySide.classList.remove("hidden");
    logSection.classList.remove("hidden");
});

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
