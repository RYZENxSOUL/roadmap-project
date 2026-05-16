import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/app/models/User";

export async function POST(req: Request) {

    try {

        await connectDB();

        const body = await req.json();

        const {
            userId,
            score,
        } = body;

        const user =
            await User.findById(
                userId
            );

        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        let snakeGame =
            user.wow_games.find(
                (game: any) =>
                    game.name ===
                    "snake_eater"
            );

        if (!snakeGame) {

            snakeGame = {
                name: "snake_eater",
                attempts: 0,
                total_attempts: 0,
                last_attempt:
                    new Date(),
            };

            user.wow_games.push(
                snakeGame
            );
        }

        const now =
            new Date();

        const lastAttempt =
            new Date(
                snakeGame.last_attempt
            );

        const diffHours =
            (
                now.getTime() -
                lastAttempt.getTime()
            ) /
            (1000 *
                60 *
                60);

        // RESET AFTER 24 HOURS
        if (
            diffHours >= 24
        ) {

            snakeGame.attempts = 0;
        }

        // BLOCK AFTER 3 ATTEMPTS
        if (
            snakeGame.attempts >= 3
        ) {

            return NextResponse.json({
                success: false,

                message:
                    "No attempts left",

                nextPlayTime:
                    new Date(
                        lastAttempt.getTime() +
                            24 *
                                60 *
                                60 *
                                1000
                    ),
            });
        }

        // UPDATE ATTEMPTS
        snakeGame.attempts += 1;

        snakeGame.total_attempts += 1;

        snakeGame.last_attempt =
            new Date();

        // ADD COINS
        user.edcoins += score;

        await user.save();

        return NextResponse.json({
            success: true,

            edcoins:
                user.edcoins,

            attemptsLeft:
                3 -
                snakeGame.attempts,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Server Error",
            },
            {
                status: 500,
            }
        );
    }
}