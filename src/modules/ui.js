export function createBoard(container) {
    container.innerHTML = "";
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            container.appendChild(cell);
        }
    }
}

export function updateBoardUI(domBoard, gameBoard, isEnemy = false) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = domBoard.querySelector(
                `[data-x="${x}"][data-y="${y}"]`,
            );
            const cellData = gameBoard.board[y][x];
            cell.classList.remove("ship", "hit", "miss");

            if (cellData === "hit") {
                cell.classList.add("hit");
            } else if (cellData === "miss") {
                cell.classList.add("miss");
            } else if (cellData !== null && !isEnemy) {
                cell.classList.add("ship");
            }
        }
    }
}

export function addLogMessage(message, type, containerLog) {
    const mess = document.createElement("p");
    mess.classList.add("system-msg", type);
    mess.textContent = message;
    containerLog.appendChild(mess);

    containerLog.scrollTop = containerLog.scrollHeight;
}

export function updateStartButton(button, board) {
    if (board.ships.length === 10) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

function getPlacedShipCount(gameBoard, size) {
    return gameBoard.ships.filter((ship) => ship.length === size).length;
}

export function updateUnitsDock(gameBoard) {
    const maxShips = { 4: 1, 3: 2, 2: 3, 1: 4 };
    const cards = document.querySelectorAll(".unit-card");

    cards.forEach((card) => {
        const countSpan = card.querySelector(".unit-count");
        const size = Number(card.dataset.size);

        const placedCount = getPlacedShipCount(gameBoard, size);

        const remaining = maxShips[size] - placedCount;

        countSpan.textContent = `x${remaining}`;
    });
}
