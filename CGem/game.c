int score = 0;
int health = 3;
int zombieX = 600;

void moveZombie() {
    zombieX -= 5;

    if (zombieX < 100) {
        zombieX = 600;
        health--;
    }
}

void attack() {
    if (zombieX < 250) {
        score += 10;
        zombieX = 600;
    }
}
