
#include "raylib.h"
#include <stdlib.h>

#define SCREEN_W 800
#define SCREEN_H 450

int main(void)
{
    InitWindow(SCREEN_W, SCREEN_H, "run for yur life");
    SetTargetFPS(60);

    float zombieX = 850;
    float zombieSpeed = 180;
    float bgX = 0;
    float groundX = 0;
    float attackTimer = 0;

    int score = 0;
    int health = 3;

    bool attacking = false;
    bool gameOver = false;

    while (!WindowShouldClose())
    {
        float dt = GetFrameTime();

        if (!gameOver)
        {
            // Scroll the background and ground
            bgX -= 30 * dt;
            groundX -= 220 * dt;

            if (bgX <= -200)
                bgX = 0;
            if (groundX <= -40)
                groundX = 0;

            // Move zombie toward the fixed player
            zombieX -= zombieSpeed * dt;

            // Zombie reaches player
            if (zombieX < 110)
            {
                health--;
                zombieX = 850;

                if (health <= 0)
                    gameOver = true;
            }

            // Slash attack
            if (IsKeyPressed(KEY_SPACE) && !attacking)
            {
                attacking = true;
                attackTimer = 0.2f;

                if (zombieX < 180 && zombieX > 100) // first is lest distance btw, sec wer u die
                {
                    score += 10;
                    zombieX = 850;

                    zombieSpeed += 8;
                }
            }

            if (attacking)
            {
                attackTimer -= dt;

                if (attackTimer <= 0)
                    attacking = false;
            }
        }

        BeginDrawing();

        // Sky
        ClearBackground((Color){20, 25, 45, 255});

        // Moon
        DrawCircle(680, 70, 30, LIGHTGRAY);

        // Moving background buildings
        for (int i = 0; i < 6; i++)
        {
            float x = i * 180 + bgX;

            DrawRectangle((int)x, 180, 90, 300,
                          (Color){35, 10, 155, 55});
        }

        // Ground
        DrawRectangle(0, 380, SCREEN_W, 70,
                      (Color){65, 65, 65, 255});

        // Moving road markings
        for (int i = 0; i < 22; i++)
        {
            DrawRectangle((int)(i * 40 + groundX),
                          410, 20, 5, RAYWHITE);
        }

        // Fixed player
        DrawRectangle(75, 305, 35, 85, BLUE);
        DrawCircle(92, 290, 17, BEIGE);
        // Sword slash
        if (attacking)
        {
            DrawLineEx((Vector2){105, 315},
                       (Vector2){175, 275}, 5, YELLOW);
            DrawCircleLines(145, 300, 35, ORANGE);
        }

        // Zombie
        DrawRectangle((int)zombieX, 310, 40, 85, GREEN);
        DrawCircle((int)zombieX + 20, 292, 18, LIME);
        DrawCircle((int)zombieX + 13, 288, 3, RED);
        DrawCircle((int)zombieX + 27, 288, 3, RED);

        // UI
        DrawText("ZOMBIE RUNNER", 20, 20, 25, RAYWHITE);
        DrawText(TextFormat("Score: %d", score),
                 20, 55, 20, GOLD);
        DrawText(TextFormat("Health: %d", health),
                 650, 20, 20, RED);
        DrawText("SPACE = SLASH", 280, 20, 20, RAYWHITE);

        if (gameOver)
        {
            DrawRectangle(0, 0, SCREEN_W, SCREEN_H,
                          (Color){0, 0, 0, 180});

            DrawText("GAME OVER", 280, 170, 40, RED);
            DrawText(TextFormat("Final Score: %d", score),
                     300, 225, 25, RAYWHITE);
            DrawText("Press ENTER to restart",
                     260, 275, 20, YELLOW);

            if (IsKeyPressed(KEY_ENTER))
            {
                zombieX = 850;
                zombieSpeed = 180;
                bgX = 0;
                groundX = 0;
                score = 0;
                health = 3;
                attacking = false;
                gameOver = false;
            }
        }

        EndDrawing();
    }

    CloseWindow();
    return 0;
}
