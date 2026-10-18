
#include "raylib.h"
#include <stdlib.h>

#define SCREEN_W 800
#define SCREEN_H 450

int main(void)
{
    InitWindow(SCREEN_W, SCREEN_H, "run for yur life");//title on top win
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
            //moving stuff towrds player basic motion
            bgX -= 30 * dt;
            groundX -= 220 * dt;

            if (bgX <= -200)
                bgX = 0;
            if (groundX <= -40)
                groundX = 0;

            //like formula for like speed y it should com towards player
            zombieX -= zombieSpeed * dt;

            //like on touch zomb, what should happen
            if (zombieX < 110)
            {
                health--;
                zombieX = 850;

                if (health <= 0)
                    gameOver = true;
            }

            //basic input key  thing
            if (IsKeyPressed(KEY_SPACE) && !attacking)
            {
                attacking = true;
                attackTimer = 0.2f;

                if (zombieX < 180 && zombieX > 100) // first is lest distance btw, sec wer u die
                {
                    score += 1;
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

        //bg
        ClearBackground((Color){20, 25, 45, 255});



        //structures moving
        for (int i = 0; i < 6; i++)
        {
            float x = i * 180 + bgX;

            DrawRectangle((int)x, 180, 90, 300,
                          (Color){35, 10, 155, 55});
        }

        //road
        DrawRectangle(0, 380, SCREEN_W, 70,
                      (Color){65, 65, 65, 255});

        //road marking lines
        for (int i = 0; i < 22; i++)
        {
            DrawRectangle((int)(i * 40 + groundX),
                          410, 20, 5, RAYWHITE);
        }

        //yur body player
        DrawRectangle(75, 305, 35, 85, BLUE);
        DrawCircle(92, 290, 17, BEIGE);
        //pressing enter key attack
        if (attacking)
        {
            DrawLineEx((Vector2){105, 315},
                       (Vector2){175, 275}, 5, YELLOW);
            DrawCircleLines(145, 300, 35, ORANGE);
        }

        //attacker so greeen guy
        DrawRectangle((int)zombieX, 310, 40, 85, GREEN);
        DrawCircle((int)zombieX + 20, 292, 18, LIME);
        DrawCircle((int)zombieX + 13, 288, 3, RED);
        DrawCircle((int)zombieX + 27, 288, 3, RED);

        //on screen wats thr
        DrawText("ZOMBIE RUNNER", 20, 20, 25, RAYWHITE);
        DrawText(TextFormat("kilss: %d", score),
                 20, 55, 20, GOLD);
        DrawText(TextFormat("tryes: %d", health),
                 650, 20, 20, RED);
        DrawText("SPACE = SLASH", 280, 20, 20, RAYWHITE);

        if (gameOver)//after game end to restart game
        {
            DrawRectangle(0, 0, SCREEN_W, SCREEN_H,
                          (Color){0, 0, 0, 180});

            DrawText("GAME OVER", 280, 170, 40, RED);
            DrawText(TextFormat("kills x10 : %d", score),
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
