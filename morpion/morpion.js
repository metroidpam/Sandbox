import { Matrix } from "../matrix.js";

// Config
const ROW_COUNT = 3;
const COL_COUNT = 3;
const PLAYER_1 = "✕";
const PLAYER_2 = "○";

const container = document.querySelector("#app");

// Initialise
let currentPlayer, isGameOver, winner, board, boardControler, dialog;

const newGame = () => {
    currentPlayer = PLAYER_1;
    isGameOver = false;
    winner = null;
    container.innerHTML = "";
    board = new Matrix(ROW_COUNT, COL_COUNT, null);
    render();
};

const checkGameOver = () => {
    // Check rows
    for (let i = 0; i < ROW_COUNT; i++) {
        if (board.isRowComplete(i)) {
            console.log(i, "row complete");
            isGameOver = true;
            winner = board.data[i][0];
            return;
        }
    }
    // Check cols
    for (let i = 0; i < COL_COUNT; i++) {
        if (board.isColComplete(i)) {
            console.log(i, "col complete");
            isGameOver = true;
            winner = board.data[0][i];
            return;
        }
    }
    // Check diagonals
    if (board.isDiagonalComplete()) {
        console.log("diagonal complete");
        isGameOver = true;
        winner = board.data[0][0];
        return;
    }
    if (board.isAntiDiagonalComplete()) {
        console.log("anti-diagonal complete");
        isGameOver = true;
        winner = board.data[0][COL_COUNT - 1];
        return;
    }
};

const render = () => {
    container.innerHTML = "";
    boardControler = [];
    for (let i = 0; i < ROW_COUNT; i++) {
        boardControler[i] = [];
        for (let j = 0; j < COL_COUNT; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", handleClick);
            boardControler[i][j] = cell;
            container.appendChild(cell);
        }
    }

    dialog = document.createElement("dialog");
    dialog.classList.add("dialog");

    let dialogContainer = document.createElement("div");
    dialogContainer.classList.add("container");
    dialog.appendChild(dialogContainer);

    let title = document.createElement("h1");
    title.innerHTML = "Game Over";
    dialogContainer.appendChild(title);

    let message = document.createElement("p");
    message.innerHTML = "Player " + winner + " won!";
    dialogContainer.appendChild(message);

    let buttons = document.createElement("div");
    buttons.classList.add("buttons");

    let newGameBtn = document.createElement("button");
    newGameBtn.innerHTML = "New Game";
    newGameBtn.addEventListener("click", () => {
        dialog.close();
        newGame();
    });
    buttons.appendChild(newGameBtn);

    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = "Close";
    closeBtn.addEventListener("click", () => dialog.close());
    buttons.appendChild(closeBtn);

    dialogContainer.appendChild(buttons);

    container.appendChild(dialog);
}

const update = () => {
    for (let i = 0; i < ROW_COUNT; i++) {
        for (let j = 0; j < COL_COUNT; j++) {
            boardControler[i][j].innerHTML = board.data[i][j];
        }
    }
}

const handleClick = (e) => {
    if (isGameOver) {
        return;
    }
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    if (board.data[row][col] !== null) {
        return;
    }
    board.data[row][col] = currentPlayer;
    update();
    checkGameOver();
    console.log(isGameOver, winner);
    if (isGameOver) {
        dialog.querySelector('p').innerHTML = `Player ${winner} won!`;
        dialog.showModal();
        return;
    }
    currentPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
};

newGame();