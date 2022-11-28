const buttons = document.querySelectorAll(".game-field");
const headingWinner = document.querySelector(".heading-winner");
const namesDiv = document.querySelector(".player-names");
const namesBtn = document.querySelector(".names-btn");

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

    const endGame = () => {
        const name = player1.active ? player1.name : player2.name;
        headingWinner.textContent = `${name} has won!`;
        headingWinner.classList.remove("hidden");
        buttons.forEach(btn => btn.setAttribute("disabled", "true"));
    }

    return { isGameOver, endGame };
})();


const gameboard = [];

const PlayerFactory = (name, letter, active) => {
    const setName = (newName) => {
        if (newName !== "") {
            this.name = newName;
        }
    }
    return { name, letter, active, setName };
}

const player1 = PlayerFactory("X", "X", true);
const player2 = PlayerFactory("0", "0");

function setButton() {
    const id = this.getAttribute("id");
    if (player1.active) {
        gameboard[id] = player1.letter;
        this.textContent = player1.letter;
        if (displayController.isGameOver()) {
            displayController.endGame();
        }
        player1.active = false;

    } else {
        gameboard[id] = player2.letter;
        this.textContent = player2.letter;
        if (displayController.isGameOver()) {
            displayController.endGame();
        }
        player1.active = true;
    }

    this.setAttribute("disabled", "true");
    console.log(gameboard);

}

function addNames() {
    player1.setName = document.querySelector("#player1").value;
    document.querySelector(".x-player").firstChild.textContent = player1.name;
    document.querySelector("#player1").value = "";
    player2.setName = document.querySelector("#player2").value;
    document.querySelector(".o-player").firstChild.textContent = player2.name;
    document.querySelector("#player2").value = "";
    namesDiv.classList.add("hidden");
}

namesBtn.addEventListener("click", addNames);

buttons.forEach(btn => btn.addEventListener("click", setButton));

