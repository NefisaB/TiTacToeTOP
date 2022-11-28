const buttons = document.querySelectorAll(".game-field");
const headingWinner = document.querySelector(".heading-winner");
const namesDiv = document.querySelector(".player-names");
const namesBtn = document.querySelector(".names-btn");
const restartBtn = document.querySelector(".restart-btn");

let count = 0;

const displayController = (function () {
    const isGameOver = () => {
        if (gameboard[4]) {
            if ((gameboard[2] === gameboard[4] && gameboard[2] === gameboard[6]) ||
                (gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8])) {
                return true;
            }
        }

        for (let i = 0; i <= 2; i++) {
            if (gameboard[i]) {
                if (gameboard[i] === gameboard[i + 3] && gameboard[i] === gameboard[i + 6])
                    return true;
            }
        }

        for (let i = 0; i <= 6; i += 3) {
            if (gameboard[i]) {
                if (gameboard[i] === gameboard[i + 1] && gameboard[i] === gameboard[i + 2])
                    return true;
            }
        }

        return false;
    }

    const endGame = (isTie) => {
        if (!isTie) {
            const name = player1.active ? player1.name : player2.name;
            headingWinner.textContent = `${name} has won!`;
        } else {
            headingWinner.textContent = "It' a tie!";
        }
        count = 0;
        headingWinner.classList.remove("hidden");
        buttons.forEach(btn => btn.disabled = true);
    }

    const restartGame = () => {
        buttons.forEach(function (btn) {
            btn.disabled = false;
            btn.textContent = "";
        });
        namesDiv.classList.remove("hidden");
        headingWinner.classList.add("hidden");
        gameboard = [];
        restartBtn.classList.add("hidden");
    }

    return { isGameOver, endGame, restartGame };
})();


let gameboard = [];

const PlayerFactory = (name, letter, active) => {
    return { name, letter, active };
}

const player1 = PlayerFactory("X", "X", true);
const player2 = PlayerFactory("0", "0");


function setButton() {
    count++;
    setNames();
    namesDiv.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    const id = this.getAttribute("id");
    if (player1.active) {
        gameboard[id] = player1.letter;
        this.textContent = player1.letter;
        if (displayController.isGameOver()) {
            displayController.endGame(false);
        } else if (count === 9) {
            displayController.endGame(true);
        }
        player1.active = false;

    } else {
        gameboard[id] = player2.letter;
        this.textContent = player2.letter;
        if (count === 9) {
            displayController.endGame(true);
        }
        player1.active = true;
    }

    this.setAttribute("disabled", "true");
    console.log(gameboard);

}

function setNames() {
    document.querySelector(".x-player").firstChild.textContent = player1.name;
    document.querySelector("#player1").value = "";
    document.querySelector(".o-player").firstChild.textContent = player2.name;
    document.querySelector("#player2").value = "";
}

function addNames() {
    const nameOne = document.querySelector("#player1").value;
    if (nameOne !== "") player1.name = nameOne;
    console.log(player1.name);
    console.log(player1.name);
    const nameTwo = document.querySelector("#player2").value;
    if (nameTwo !== "") player2.name = nameTwo;
    setNames();
    namesDiv.classList.add("hidden");
    console.log(player2.name);
    restartBtn.classList.remove("hidden");
}

namesBtn.addEventListener("click", addNames);

buttons.forEach(btn => btn.addEventListener("click", setButton));

restartBtn.addEventListener("click", displayController.restartGame);

