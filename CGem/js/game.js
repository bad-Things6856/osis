const game = document.getElementById("game");
const player = document.getElementById("player");
const zombiesContainer = document.getElementById("zombies");
const slash = document.getElementById("slash");
const scoreDisplay = document.getElementById("score");
const healthDisplay = document.getElementById("health");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const attackBtn = document.getElementById("attackBtn");

let score = 0;
let health = 3;
let running = false;
let attacking = false;
let zombies = [];
let lastSpawn = 0;
let lastAttack = 0;
let animationId;
let lastTime = 0;

function startGame() {
    cancelAnimationFrame(animationId);

    zombies.forEach(z => z.element.remove());
    zombies = [];

    score = 0;
    health = 3;
    running = true;
    attacking = false;
    lastSpawn = 0;
    lastAttack = 0;
    lastTime = 0;

    scoreDisplay.textContent = score;
    healthDisplay.textContent = health;
    message.style.display = "none";

    animationId = requestAnimationFrame(gameLoop);
}

function spawnZombie() {
    const zombie = document.createElement("img");

    zombie.src = "zombie.gif";
    zombie.alt = "Zombie";
    zombie.className = "zombie";

    zombiesContainer.appendChild(zombie);

    zombies.push({
        element: zombie,
        x: game.clientWidth + 10,
        speed: 100 + Math.random() * 35,
        alive: true
    });
}

function attack() {
    if (!running || attacking) return;

    attacking = true;
    lastAttack = 0;

    slash.classList.remove("active");
    void slash.offsetWidth;
    slash.classList.add("active");

    // Defeat zombies close to the player.
    zombies.forEach(zombie => {
        if (
            zombie.alive &&
            zombie.x < player.offsetLeft + player.offsetWidth + 100 &&
            zombie.x + zombie.element.offsetWidth > player.offsetLeft
        ) {
            zombie.alive = false;
            zombie.element.remove();

            score += 10;
            scoreDisplay.textContent = score;
        }
    });
}

function gameLoop(timestamp) {
    if (!running) return;

    const delta = lastTime
        ? Math.min((timestamp - lastTime) / 1000, 0.05)
        : 0;

    lastTime = timestamp;

    // Spawn zombies at regular intervals.
    lastSpawn += delta;

    if (lastSpawn >= 1.6) {
        spawnZombie();
        lastSpawn = 0;
    }

    // Move zombies toward the player.
    zombies.forEach(zombie => {
        if (!zombie.alive) return;

        zombie.x -= zombie.speed * delta;
        zombie.element.style.left = zombie.x + "px";

        // Zombie reaches the player.
        if (
            zombie.x <= player.offsetLeft + player.offsetWidth - 15
        ) {
            zombie.alive = false;
            zombie.element.remove();

            health--;
            healthDisplay.textContent = health;

            if (health <= 0) {
                endGame();
            }
        }
    });

    zombies = zombies.filter(z => z.alive);

    // Increase difficulty as the score rises.
    zombies.forEach(z => {
        z.speed = 100 + Math.min(score * 0.5, 100);
    });

    // Reset the attack after a short animation.
    if (attacking) {
        lastAttack += delta;

        if (lastAttack >= 0.25) {
            attacking = false;
            slash.classList.remove("active");
        }
    }

    if (running) {
        animationId = requestAnimationFrame(gameLoop);
    }
}

function endGame() {
    running = false;
    cancelAnimationFrame(animationId);

    message.style.display = "flex";
    message.innerHTML = `
        <h2>GAME OVER!</h2>
        <p>Your score: ${score}</p>
        <button id="restartBtn">PLAY AGAIN</button>
    `;

    document.getElementById("restartBtn")
        .addEventListener("click", startGame);
}

startBtn.addEventListener("click", startGame);
attackBtn.addEventListener("click", attack);

document.addEventListener("keydown", event => {
    if (event.code === "Space") {
        event.preventDefault();
        attack();
    }
});
