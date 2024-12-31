const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");

// Create paddles, ball, and scoreboard
const paddleLeft = document.createElement("div");
const paddleRight = document.createElement("div");
const ball = document.createElement("div");
const scoreboard = document.createElement("div");

// Add classes
paddleLeft.classList.add("paddle");
paddleRight.classList.add("paddle");
ball.classList.add("ball");
scoreboard.classList.add("scoreboard");

// Append to game area
gameArea.appendChild(paddleLeft);
gameArea.appendChild(paddleRight);
gameArea.appendChild(ball);
gameArea.appendChild(scoreboard);

// Initialize positions and variables
let paddleLeftY = 150,
    paddleRightY = 150,
    ballX = 340,
    ballY = 190,
    ballSpeedX = 3,
    ballSpeedY = 3;
let scoreLeft = 0,
    scoreRight = 0;
let isGameRunning = false;

// Place paddles, ball, and update scoreboard
function renderPositions() {
    paddleLeft.style.top = `${paddleLeftY}px`;
    paddleLeft.style.left = `10px`;

    paddleRight.style.top = `${paddleRightY}px`;
    paddleRight.style.right = `10px`;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    scoreboard.innerHTML = `${scoreLeft} - ${scoreRight}`;
}

// Move paddles
window.addEventListener("keydown", (e) => {
    if (e.key === "w" && paddleLeftY > 0) paddleLeftY -= 10;
    if (e.key === "s" && paddleLeftY < 300) paddleLeftY += 10;
    if (e.key === "ArrowUp" && paddleRightY > 0) paddleRightY -= 10;
    if (e.key === "ArrowDown" && paddleRightY < 300) paddleRightY += 10;

    renderPositions();
});

// Start game
startBtn.addEventListener("click", () => {
    if (isGameRunning) return;
    isGameRunning = true;
    gameLoop();
});

// Game loop
function gameLoop() {
    if (!isGameRunning) return;

    // Ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Collision with walls
    if (ballY <= 0 || ballY >= 380) ballSpeedY *= -1;

    // Collision with paddles
    if (
        (ballX <= 25 && ballY + 20 >= paddleLeftY && ballY <= paddleLeftY + 100) ||
        (ballX >= 660 && ballY + 20 >= paddleRightY && ballY <= paddleRightY + 100)
    ) {
        ballSpeedX *= -1;
    }

    // Scoring
    if (ballX <= 0) {
        scoreRight++;
        resetBall();
    } else if (ballX >= 680) {
        scoreLeft++;
        resetBall();
    }

    renderPositions();

    // Continue the game loop
    if (isGameRunning) requestAnimationFrame(gameLoop);
}

// Reset ball position
function resetBall() {
    ballX = 340;
    ballY = 190;
    ballSpeedX *= -1;
    isGameRunning = false;
    setTimeout(() => {
        isGameRunning = true;
        gameLoop();
    }, 1000);
}

// Initial render
renderPositions();
