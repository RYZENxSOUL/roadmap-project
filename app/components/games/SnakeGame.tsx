"use client";

import {
    useEffect,
    useState,
} from "react";

const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;

const PLAYER_SIZE = 32;
const COIN_SIZE = 26;

export default function SnakeGame() {

    const speed = 20;

    const [score, setScore] =
        useState(0);

    const [coins, setCoins] =
        useState(0);

    const [attemptsLeft, setAttemptsLeft] =
        useState(3);

    const [cooldownText, setCooldownText] =
        useState("");

    const [timeLeft, setTimeLeft] =
        useState(30);

    const [gameStarted, setGameStarted] =
        useState(false);

    const [gameOver, setGameOver] =
        useState(false);

    const [direction, setDirection] =
        useState("RIGHT");

    const [playerX, setPlayerX] =
        useState(100);

    const [playerY, setPlayerY] =
        useState(250);

    const [coinX, setCoinX] =
        useState(700);

    const [coinY, setCoinY] =
        useState(220);

    // FETCH USER
    const refreshUser =
        async () => {

            try {

                const response =
                    await fetch(
                        "/api/user"
                    );

                const data =
                    await response.json();

                setCoins(
                    data.edcoins
                );

                const snakeGame =
                    data.wow_games?.find(
                        (
                            game: any
                        ) =>
                            game.name ===
                            "snake_eater"
                    );

                const usedAttempts =
                    snakeGame?.attempts ||
                    0;

                setAttemptsLeft(
                    Math.max(
                        3 -
                        usedAttempts,
                        0
                    )
                );

                // COOLDOWN TIMER
                const lastAttempt =
                    snakeGame?.last_attempt;

                if (
                    usedAttempts >=
                    3 &&
                    lastAttempt
                ) {

                    const nextPlay =
                        new Date(
                            lastAttempt
                        ).getTime() +
                        24 *
                        60 *
                        60 *
                        1000;

                    const remaining =
                        nextPlay -
                        Date.now();

                    if (
                        remaining > 0
                    ) {

                        const hours =
                            Math.floor(
                                remaining /
                                (1000 *
                                    60 *
                                    60)
                            );

                        const minutes =
                            Math.floor(
                                (
                                    remaining %
                                    (1000 *
                                        60 *
                                        60)
                                ) /
                                (1000 *
                                    60)
                            );

                        const seconds =
                            Math.floor(
                                (
                                    remaining %
                                    (1000 * 60)
                                ) / 1000
                            );

                        setCooldownText(
                            `${hours
                                .toString()
                                .padStart(2, "0")}:${minutes
                                    .toString()
                                    .padStart(2, "0")}:${seconds
                                        .toString()
                                        .padStart(2, "0")}`
                        );
                    }
                }

            } catch (error) {

                console.log(
                    error
                );
            }
        };

    // INITIAL LOAD
    useEffect(() => {

        refreshUser();

        const interval =
            setInterval(() => {

                refreshUser();

            }, 1000);

        return () =>
            clearInterval(interval);

    }, []);

    // START GAME
    const startGame = () => {

        if (
            attemptsLeft <= 0
        )
            return;

        setGameStarted(true);

        setGameOver(false);

        setScore(0);

        setTimeLeft(30);

        setPlayerX(100);

        setPlayerY(250);

        setDirection("RIGHT");
    };

    // TIMER
    useEffect(() => {

        if (!gameStarted)
            return;

        if (gameOver)
            return;

        const timer =
            setInterval(() => {

                setTimeLeft(
                    (prev) => {

                        if (
                            prev <= 1
                        ) {

                            clearInterval(
                                timer
                            );

                            setGameOver(
                                true
                            );

                            return 0;
                        }

                        return (
                            prev - 1
                        );
                    }
                );

            }, 1000);

        return () =>
            clearInterval(
                timer
            );

    }, [
        gameStarted,
        gameOver,
    ]);

    // KEYBOARD
    useEffect(() => {

        const handleKeyDown =
            (
                e: KeyboardEvent
            ) => {

                if (
                    [
                        "ArrowUp",
                        "ArrowDown",
                        "ArrowLeft",
                        "ArrowRight",
                    ].includes(
                        e.key
                    )
                ) {
                    e.preventDefault();
                }

                if (!gameStarted)
                    return;

                if (gameOver)
                    return;

                if (
                    e.key ===
                    "ArrowLeft"
                ) {
                    setDirection(
                        "LEFT"
                    );
                }

                if (
                    e.key ===
                    "ArrowRight"
                ) {
                    setDirection(
                        "RIGHT"
                    );
                }

                if (
                    e.key ===
                    "ArrowUp"
                ) {
                    setDirection(
                        "UP"
                    );
                }

                if (
                    e.key ===
                    "ArrowDown"
                ) {
                    setDirection(
                        "DOWN"
                    );
                }
            };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };

    }, [
        gameStarted,
        gameOver,
    ]);

    // GAME LOOP
    useEffect(() => {

        if (!gameStarted)
            return;

        if (gameOver)
            return;

        const gameLoop =
            setInterval(() => {

                setPlayerX(
                    (
                        prevX
                    ) => {

                        if (
                            direction ===
                            "LEFT"
                        ) {
                            return Math.max(
                                prevX -
                                speed,
                                PLAYER_SIZE
                            );
                        }

                        if (
                            direction ===
                            "RIGHT"
                        ) {
                            return Math.min(
                                prevX +
                                speed,
                                BOARD_WIDTH -
                                PLAYER_SIZE
                            );
                        }

                        return prevX;
                    }
                );

                setPlayerY(
                    (
                        prevY
                    ) => {

                        if (
                            direction ===
                            "UP"
                        ) {
                            return Math.max(
                                prevY -
                                speed,
                                PLAYER_SIZE
                            );
                        }

                        if (
                            direction ===
                            "DOWN"
                        ) {
                            return Math.min(
                                prevY +
                                speed,
                                BOARD_HEIGHT -
                                PLAYER_SIZE
                            );
                        }

                        return prevY;
                    }
                );

            }, 40);

        return () =>
            clearInterval(
                gameLoop
            );

    }, [
        direction,
        gameStarted,
        gameOver,
    ]);

    // COIN COLLISION
    useEffect(() => {

        if (!gameStarted)
            return;

        if (gameOver)
            return;

        const hitCoin =
            Math.abs(
                playerX -
                coinX
            ) < 35 &&
            Math.abs(
                playerY -
                coinY
            ) < 35;

        if (!hitCoin)
            return;

        setScore(
            (prev) =>
                prev + 20
        );

        setCoinX(
            Math.floor(
                Math.random() *
                900
            ) + 40
        );

        setCoinY(
            Math.floor(
                Math.random() *
                420
            ) + 40
        );

    }, [
        playerX,
        playerY,
        coinX,
        coinY,
        gameStarted,
        gameOver,
    ]);

    // COLLECT
    const collectCoins =
        async () => {

            try {

                const response =
                    await fetch(
                        "/api/games/snake",
                        {
                            method:
                                "POST",

                            headers:
                            {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify(
                                {
                                    userId:
                                        "6a0842de8baa4247b5b40153",

                                    score,
                                }
                            ),
                        }
                    );

                const data =
                    await response.json();

                if (
                    data.success
                ) {

                    await refreshUser();

                    setGameStarted(
                        false
                    );

                    setGameOver(
                        false
                    );

                    setScore(0);

                    setTimeLeft(
                        30
                    );
                }

            } catch (error) {

                console.log(
                    error
                );
            }
        };

    return (
        <section className="mt-16 rounded-[40px] bg-[#F8C85B] p-10">

            <h2 className="text-center text-5xl font-black text-[#1E2230]">
                Play Games earn edCoins
            </h2>

            <div className="relative mx-auto mt-10 max-w-6xl rounded-[40px] bg-[#1D2D7B] p-10">

                {/* TOP BAR */}
                <div className="absolute right-8 top-8 z-50 flex items-center gap-4">

                    {!gameStarted && (
                        <div className="rounded-full bg-black px-5 py-3 text-xl font-black text-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                            {attemptsLeft}/3 left
                        </div>
                    )}

                    {gameStarted && (
                        <div className="rounded-full bg-white px-8 py-4 text-3xl font-black shadow-lg">
                            {timeLeft}s
                        </div>
                    )}

                    <div className="rounded-full border-2 border-black bg-white px-6 py-3 text-2xl font-black shadow-lg">
                        🪙 {coins}
                    </div>
                </div>

                {/* SCORE */}
                <div className="mb-6">

                    <div className="inline-block rounded-full bg-black px-6 py-4 text-2xl font-black text-yellow-400">
                        Score: {score}
                    </div>
                </div>

                {/* START SCREEN */}
                {!gameStarted ? (

                    <div className="flex h-[500px] items-center justify-center rounded-[40px] border-[5px] border-black bg-[#02102F]">

                        <div className="rounded-[40px] bg-gradient-to-br from-[#F4F1E6] to-[#D9D5C9] px-16 py-14 text-center shadow-2xl">

                            <h2 className="text-5xl font-black text-[#151B3B]">
                                Snake Eater
                            </h2>

                            <ul className="mt-8 space-y-4 text-left text-xl text-zinc-600">

                                <li>
                                    • Collect coins
                                </li>

                                <li>
                                    • 30 seconds gameplay
                                </li>

                                <li>
                                    • Arrow keys movement
                                </li>

                                <li>
                                    • Earn edCoins
                                </li>

                            </ul>

                            <button
                                onClick={
                                    startGame
                                }
                                disabled={
                                    attemptsLeft <=
                                    0
                                }
                                className="mt-10 rounded-full bg-[#111827] px-10 py-4 text-2xl font-black text-yellow-400 transition hover:scale-105 disabled:opacity-40"
                            >
                                {attemptsLeft >
                                    0
                                    ? `Play X ${attemptsLeft}`
                                    : cooldownText
                                        ? cooldownText
                                        : "No Attempts"}
                            </button>
                        </div>
                    </div>

                ) : (

                    <div
                        className="relative overflow-hidden rounded-[40px] border-[5px] border-black bg-[#02102F]"
                        style={{
                            width:
                                BOARD_WIDTH,
                            height:
                                BOARD_HEIGHT,
                        }}
                    >

                        {/* STARS */}
                        <div className="absolute left-[200px] top-[80px] h-2 w-2 rounded-full bg-white" />

                        <div className="absolute left-[500px] top-[140px] h-2 w-2 rounded-full bg-white" />

                        <div className="absolute left-[700px] top-[280px] h-2 w-2 rounded-full bg-white" />

                        <div className="absolute left-[900px] top-[100px] h-2 w-2 rounded-full bg-white" />

                        {/* COIN */}
                        <div
                            className="absolute rounded-full bg-yellow-400 shadow-[0_0_30px_#FFD700]"
                            style={{
                                width:
                                    COIN_SIZE,
                                height:
                                    COIN_SIZE,
                                left: coinX,
                                top: coinY,
                                transform:
                                    "translate(-50%, -50%)",
                            }}
                        />

                        {/* PLAYER */}
                        <div
                            className="absolute rounded-lg bg-[#00D95F] shadow-[0_0_20px_#00FF88]"
                            style={{
                                width:
                                    PLAYER_SIZE,
                                height:
                                    PLAYER_SIZE,
                                left: playerX,
                                top: playerY,
                                transform:
                                    "translate(-50%, -50%)",
                            }}
                        />

                        {/* GAME OVER */}
                        {gameOver && (

                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">

                                <div className="rounded-[40px] bg-gradient-to-b from-black to-[#111827] px-16 py-12 text-center shadow-2xl">

                                    <h2 className="text-6xl font-black text-yellow-400">
                                        Game Over
                                    </h2>

                                    <p className="mt-6 text-4xl text-white">
                                        You earned{" "}
                                        {
                                            score
                                        }{" "}
                                        edCoins
                                    </p>

                                    <button
                                        onClick={
                                            collectCoins
                                        }
                                        className="mt-10 rounded-full bg-yellow-400 px-10 py-4 text-3xl font-black text-black transition hover:scale-105"
                                    >
                                        Collect
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}