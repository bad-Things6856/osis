int score = 0;
int health = 3;
int zombieX = 700;

void update() {
    zombieX -= 5;

    if (zombieX < 100) {
        health--;
        zombieX = 700;
    }
}

void attack() {
    if (zombieX < 250) {
        score += 10;
        zombieX = 700;
    }
}
