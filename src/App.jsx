import React, { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    const moveSnake = () => {
      if (gameOver) return;

      const newSnake = [...snake];
      let head = [...newSnake[newSnake.length - 1]];

      switch (direction) {
        case "UP":
          head = [head[0], head[1] - 1];
          break;
        case "DOWN":
          head = [head[0], head[1] + 1];
          break;
        case "LEFT":
          head = [head[0] - 1, head[1]];
          break;
        case "RIGHT":
          head = [head[0] + 1, head[1]];
          break;
        default:
          break;
      }

      newSnake.push(head);
      newSnake.shift();

      if (head[0] === food[0] && head[1] === food[1]) {
        newSnake.unshift([...snake[0]]);
        setFood([
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20),
        ]);
        setSpeed((speed) => speed * 0.9);
        setScore(score + 1);
      }

      // Check if snake hits the wall
      if (head[0] >= 20 || head[0] < 0 || head[1] >= 20 || head[1] < 0) {
        setGameOver(true);
      }

      // Check if snake hits itself
      for (let i = 0; i < newSnake.length - 1; i++) {
        if (newSnake[i][0] === head[0] && newSnake[i][1] === head[1]) {
          setGameOver(true);
        }
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, speed);

    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver, speed, score]);

  return (
    <div className="game-area">
      {gameOver ? (
        <div className="game-over">
          Game Over ☹
          <div className="btn">
            <button onClick={() => window.location.reload()}>Restart !!</button>
            <p>create by daim ®</p>
          </div>
        </div>
      ) : (
        <>
          <div className="score"> Score : {score}</div>
          <div className="snake">
            {snake.map((segment, index) => (
              <div
                key={index}
                className="snake-segment"
                style={{
                  left: `${segment[0] * 20}px`,
                  top: `${segment[1] * 20}px`,
                }}
              />
            ))}
          </div>
          <div
            className="food"
            style={{ left: `${food[0] * 20}px`, top: `${food[1] * 20}px` }}
          />
        </>
      )}
    </div>
  );
};

export default App;
