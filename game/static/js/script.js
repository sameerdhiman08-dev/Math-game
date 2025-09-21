    document.addEventListener("DOMContentLoaded", function () {
        let targetNumber, movesLeft, maxNumber;
        let gameActive = false;

        const levelButtons = document.querySelectorAll(".level-btn");
        const gameBox = document.querySelector(".game-box");
        const userInput = document.getElementById("user-input");
        const enterBtn = document.getElementById("enter-btn");
        const cancelBtn = document.getElementById("cancel-btn");
        const replayBtn = document.getElementById("replay-btn");
        const message = document.querySelector(".message");
        const attemptCount = document.getElementById("attempt-count");
        const blurredNumber = document.getElementById("blurred-number");

        // Start game based on difficulty
        levelButtons.forEach(btn => {
            btn.addEventListener("click", function () {
                startGame(this.dataset.level);
            });
        });

        function startGame(difficulty) {
            if (difficulty === 'easy') maxNumber = 50;
            else if (difficulty === 'medium') maxNumber = 100;
            else maxNumber = 200;

            targetNumber = Math.floor(Math.random() * maxNumber) + 1;
            movesLeft = 10;
            gameActive = true;

            gameBox.style.display = "block";
            userInput.value = "";
            userInput.disabled = false;
            enterBtn.disabled = false;
            replayBtn.style.display = "none";

            message.textContent = "Make your guess!";
            attemptCount.textContent = movesLeft;
            blurredNumber.textContent = blurNumber(targetNumber);
            blurredNumber.classList.add("blurred");
            blurredNumber.classList.remove("reveal");
        }

        // Enter button
        enterBtn.addEventListener("click", function () {
            if (!gameActive) return;

            let guess = parseInt(userInput.value);
            if (isNaN(guess) || guess < 1 || guess > maxNumber) {
                message.textContent = `⚠️ Enter a number between 1 and ${maxNumber}`;
                return;
            }

            movesLeft--;
            attemptCount.textContent = movesLeft;

            if (guess === targetNumber) {
                message.innerHTML = `🎉 You Win! The number was <span class="reveal">${targetNumber}</span>`;
                revealNumber();
                endGame();
            } else if (movesLeft === 0) {
                message.innerHTML = `❌ Game Over! The number was <span class="reveal">${targetNumber}</span>`;
                revealNumber();
                endGame();
            } else if (guess < targetNumber) {
                message.textContent = "📈 Too Low! Try a higher number.";
            } else {
                message.textContent = "📉 Too High! Try a lower number.";
            }
        });

        // Cancel button clears input
        cancelBtn.addEventListener("click", () => userInput.value = "");

        // Replay button
        replayBtn.addEventListener("click", () => gameBox.style.display = "none");

        function blurNumber(num) {
            return num.toString().charAt(0) + '*'.repeat(num.toString().length - 1);
        }

        function revealNumber() {
            blurredNumber.textContent = targetNumber;
            blurredNumber.classList.remove("blurred");
            blurredNumber.classList.add("reveal");
        }

        function endGame() {
            gameActive = false;
            userInput.disabled = true;
            enterBtn.disabled = true;
            replayBtn.style.display = "block";
        }
    });
