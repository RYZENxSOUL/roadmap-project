"use client";

import {
    useEffect,
    useState,
} from "react";

const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;

const CELL_SIZE = 40;
const COIN_SIZE = 26;

const BORDER_SIZE = 5;
const SAFE_PADDING = 10;

export default function SnakeGame() {

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

    const SEGMENT_SIZE = 48;

    const [snake, setSnake] =
        useState([
            { x: 260, y: 240 },
            { x: 212, y: 240 },
            { x: 164, y: 240 },
            { x: 116, y: 240 },
        ]);

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

                        const formatCooldown = () => {

                            const nextPlay =
                                new Date(lastAttempt).getTime() +
                                24 * 60 * 60 * 1000;

                            const updateTimer = () => {

                                const remaining =
                                    nextPlay - Date.now();

                                if (remaining <= 0) {

                                    setCooldownText("");

                                    setAttemptsLeft(3);

                                    return;
                                }

                                const hours = Math.floor(
                                    remaining / (1000 * 60 * 60)
                                );

                                const minutes = Math.floor(
                                    (remaining % (1000 * 60 * 60)) /
                                    (1000 * 60)
                                );

                                const seconds = Math.floor(
                                    (remaining % (1000 * 60)) / 1000
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
                            };

                            updateTimer();

                            setInterval(updateTimer, 1000);
                        };

                        formatCooldown();
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

    }, []);

    // START GAME
    const startGame = () => {

        if (attemptsLeft <= 0 && cooldownText)
            return;

        setGameStarted(true);

        setGameOver(false);

        setScore(0);

        setTimeLeft(30);

        setSnake([
            { x: 260, y: 240 },
            { x: 212, y: 240 },
            { x: 164, y: 240 },
            { x: 116, y: 240 },
        ]);

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

        const handleKeyDown = (
            e: KeyboardEvent
        ) => {

            if (
                [
                    "ArrowUp",
                    "ArrowDown",
                    "ArrowLeft",
                    "ArrowRight",
                ].includes(e.key)
            ) {
                e.preventDefault();
            }

            if (!gameStarted || gameOver)
                return;

            setDirection((prev) => {

                if (
                    e.key === "ArrowLeft" &&
                    prev !== "RIGHT"
                ) {
                    return "LEFT";
                }

                if (
                    e.key === "ArrowRight" &&
                    prev !== "LEFT"
                ) {
                    return "RIGHT";
                }

                if (
                    e.key === "ArrowUp" &&
                    prev !== "DOWN"
                ) {
                    return "UP";
                }

                if (
                    e.key === "ArrowDown" &&
                    prev !== "UP"
                ) {
                    return "DOWN";
                }

                return prev;
            });
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

    }, [gameStarted, gameOver]);

    // GAME LOOP
    useEffect(() => {

        if (!gameStarted) return;

        if (gameOver) return;

        const gameLoop = setInterval(() => {

            setSnake((prevSnake) => {

                const newSnake = [...prevSnake];

                const head = {
                    ...newSnake[0]
                };

                // MOVEMENT
                if (direction === "RIGHT") {
                    head.x += 40;
                }

                if (direction === "LEFT") {
                    head.x -= 40;
                }

                if (direction === "UP") {
                    head.y -= 40;
                }

                if (direction === "DOWN") {
                    head.y += 40;
                }

                // WALL LIMITS
                const MIN_X = 0;
                const MAX_X = BOARD_WIDTH - SEGMENT_SIZE;

                const MIN_Y = 0;
                const MAX_Y = BOARD_HEIGHT - SEGMENT_SIZE;

                if (head.x < MIN_X) {
                    head.x = MIN_X;
                }

                if (head.x > MAX_X) {
                    head.x = MAX_X;
                }

                if (head.y < MIN_Y) {
                    head.y = MIN_Y;
                }

                if (head.y > MAX_Y) {
                    head.y = MAX_Y;
                }

                // MOVE BODY
                for (
                    let i = newSnake.length - 1;
                    i > 0;
                    i--
                ) {
                    newSnake[i] = {
                        ...newSnake[i - 1]
                    };
                }

                newSnake[0] = head;

                return newSnake;

            });

        }, 90);

        return () =>
            clearInterval(gameLoop);

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

        const head =
            snake[0];

        const hitCoin =
            Math.abs(
                head.x -
                coinX
            ) < 35 &&
            Math.abs(
                head.y -
                coinY
            ) < 35;

        if (!hitCoin)
            return;

        setScore(
            (prev) =>
                prev + 20
        );

        setSnake((prevSnake) => {

            const tail =
                prevSnake[prevSnake.length - 1];

            return [
                ...prevSnake,
                {
                    x: tail.x,
                    y: tail.y,
                },
            ];
        });

        setCoinX(
            Math.floor(
                Math.random() *
                (BOARD_WIDTH - 120)
            ) + 40
        );

        setCoinY(
            Math.floor(
                Math.random() *
                (BOARD_HEIGHT - 120)
            ) + 40
        );

    }, [
        snake,
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

            <div
                className="relative mx-auto mt-10 rounded-[40px] bg-[#1D2D7B] p-10"
                style={{
                    width: BOARD_WIDTH + 80,
                }}
            >

                {/* TOP BAR */}
                <div className="absolute right-8 top-8 z-50 flex items-center gap-4">

                    {!gameStarted && (
                        <div className="rounded-full bg-black px-5 py-3 text-xl font-black text-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                            {attemptsLeft > 0
                                ? `${attemptsLeft}/3 left`
                                : cooldownText
                                    ? "0/3 left"
                                    : "3/3 left"}
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

                    <div
                        className="relative overflow-hidden rounded-[40px] border-[5px] border-black bg-[#02102F]"
                        style={{
                            width: BOARD_WIDTH,
                            height: BOARD_HEIGHT,
                        }}
                    >
                        <div className="flex h-full items-center justify-center">

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

                                {attemptsLeft > 0 ? (
                                    <button
                                        onClick={startGame}
                                        className="mt-10 rounded-full bg-[#111827] px-10 py-4 text-2xl font-black text-yellow-400 transition hover:scale-105"
                                    >
                                        Play X {attemptsLeft}
                                    </button>
                                ) : cooldownText ? (
                                    <button
                                        disabled
                                        className="mt-10 rounded-full bg-gray-500 px-10 py-4 text-2xl font-black text-yellow-200"
                                    >
                                        {cooldownText}
                                    </button>
                                ) : (
                                    <button
                                        onClick={startGame}
                                        className="mt-10 rounded-full bg-[#111827] px-10 py-4 text-2xl font-black text-yellow-400 transition hover:scale-105"
                                    >
                                        Play X 3
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                ) : (

                    <div
                        className="relative overflow-hidden rounded-[40px] border-[5px] border-black bg-cover bg-center bg-no-repeat"
                        style={{
                            width:
                                BOARD_WIDTH,
                            height:
                                BOARD_HEIGHT,
                            backgroundImage:
                                "url('/snake/background.svg')",
                        }}
                    >

                        {/* STARS */}
                        <div className="absolute left-[200px] top-[80px] h-2 w-2 rounded-full bg-white" />

                        <div className="absolute left-[500px] top-[140px] h-2 w-2 rounded-full bg-white" />

                        <div className="absolute left-[700px] top-[280px] h-2 w-2 rounded-full bg-white" />

                        <div className="absolute left-[900px] top-[100px] h-2 w-2 rounded-full bg-white" />

                        {/* COIN */}
                        <div
                            className="absolute"
                            style={{
                                left: `${coinX}px`,
                                top: `${coinY}px`,
                            }}
                        >
                            <img
                                src="/snake/coin.svg"
                                alt="coin"
                                className="h-[48px] w-[48px] drop-shadow-[0_0_20px_gold]"
                            />

                            <div className="absolute inset-0 flex items-center justify-center text-[13px] font-black text-[#1E2230]">
                                20
                            </div>
                        </div>

                        {/* PLAYER */}
                        {!gameOver &&
                            snake.map((segment, index) => {

                                const isHead = index === 0;

                                const isTail =
                                    index === snake.length - 1;

                                let image = "/snake/body1.svg";

                                if (isHead) {
                                    image = "/snake/head.svg";
                                } else if (isTail) {
                                    image = "/snake/tail.svg";
                                } else {

                                    const bodyImages = [
                                        "/snake/body1.svg",
                                        "/snake/body2.svg",
                                        "/snake/body3.svg",
                                        "/snake/body4.svg",
                                    ];

                                    image =
                                        bodyImages[
                                        index %
                                        bodyImages.length
                                        ];
                                }

                                let rotation = 0;

                                // HEAD ROTATION
                                if (isHead) {

                                    if (direction === "RIGHT") {
                                        rotation = 0;
                                    }

                                    if (direction === "LEFT") {
                                        rotation = 180;
                                    }

                                    if (direction === "UP") {
                                        rotation = -90;
                                    }

                                    if (direction === "DOWN") {
                                        rotation = 90;
                                    }
                                }

                                // TAIL ROTATION
                                if (isTail && snake.length > 1) {

                                    const beforeTail =
                                        snake[index - 1];

                                    const dx =
                                        segment.x - beforeTail.x;

                                    const dy =
                                        segment.y - beforeTail.y;

                                    if (dx > 0) {
                                        rotation = 0;
                                    }

                                    if (dx < 0) {
                                        rotation = 180;
                                    }

                                    if (dy > 0) {
                                        rotation = 90;
                                    }

                                    if (dy < 0) {
                                        rotation = -90;
                                    }
                                }

                                return (

                                    <img
                                        key={index}
                                        src={image}
                                        alt="snake"
                                        draggable={false}
                                        className="absolute pointer-events-none select-none"
                                        style={{

                                            left: `${segment.x - 4}px`,
                                            top: `${segment.y - 4}px`,

                                            width: isHead ? "52px" : "50px",
                                            height: isHead ? "52px" : "50px",

                                            transform:
                                                `rotate(${rotation}deg)`,

                                            transformOrigin:
                                                "center center",

                                            imageRendering:
                                                "auto",

                                            zIndex:
                                                snake.length - index,
                                        }}
                                    />
                                );
                            })}

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