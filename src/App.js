import { useEffect, useState } from "react";
import "./App.css";
// images import
import logoSvg from "./images/logo.svg";
import rulesImage from "./images/image-rules.svg";
import closeIcon from "./images/icon-close.svg";
import bgTriangle from "./images/bg-triangle.svg";

// option icons
import iconRock from "./images/icon-rock.svg";
import iconScissors from "./images/icon-scissors.svg";
import iconPaper from "./images/icon-paper.svg";

const houseOptions = ["rock", "paper", "scissors"];

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [playerScore, setPlayerScore] = useState(0);
  const [playerPick, setPlayerPick] = useState("");
  const [housePick, setHousePick] = useState("");
  const [result, setResult] = useState("");

  // player pick
  function handlePlayerPick(pick) {
    const selectedPick = pick;
    setPlayerPick(selectedPick);

    handleHousePick();
    handleResult();
    handleScore();
  }

  // open/close modal window
  function handleOpenCloseClick() {
    setIsOpen(!isOpen);
  }

  // house pick
  function handleHousePick() {
    const randomSlot = Math.floor(Math.random() * houseOptions.length);
    const randomPick = houseOptions[randomSlot];
    setHousePick(randomPick);
  }

  console.log(playerPick, housePick, result);

  function handlePlayAgain() {
    setPlayerPick("");
    setHousePick("");
    setResult("");
  }

  // ????
  // setting result
  function handleResult() {
    const player = playerPick;
    const house = housePick;

    player === house && setResult("draw");
    player === "rock" && house === "paper" && setResult("lose");
    player === "rock" && house === "scissors" && setResult("win");

    player === "paper" && house === "scissors" && setResult("lose");
    player === "paper" && house === "rock" && setResult("win");

    player === "scissors" && house === "paper" && setResult("win");
    player === "scissors" && house === "rock" && setResult("lose");
  }
  // setting score
  function handleScore() {
    result === "win" && setPlayerScore((s) => s + 1);
    result === "lose" && setPlayerScore((s) => s - 1);
    result === "draw" && setPlayerScore((s) => s + 0);
  }

  return (
    <div className="app">
      <ScoreHeader score={playerScore} />
      <GameBoard
        playerPick={playerPick}
        onPlayerPick={handlePlayerPick}
        housePick={housePick}
        result={result}
        onPlayAgain={handlePlayAgain}
      />

      {/* modal */}
      <RulesModal isOpen={isOpen} onOpenClose={handleOpenCloseClick} />
      <RulesButton isOpen={isOpen} onOpenClose={handleOpenCloseClick} />
      {isOpen && <div className="dark-bg"></div>}
    </div>
  );
}

function ScoreHeader({ score }) {
  return (
    <div className="score-header">
      <div className="header-left">
        <img src={logoSvg} alt="logo" />
      </div>

      <div className="header-right">
        <p>SCORE</p>
        <p>{score}</p>
      </div>
    </div>
  );
}

function GameBoard({
  playerPick,
  onPlayerPick,
  housePick,
  result,
  onPlayAgain,
}) {
  return (
    <div className="game-board">
      <GamePickStep playerPick={playerPick} onPlayerPick={onPlayerPick} />
      <GameResult
        onPlayAgain={onPlayAgain}
        playerPick={playerPick}
        housePick={housePick}
        result={result}
      />
    </div>
  );
}

function GamePickStep({ playerPick, onPlayerPick }) {
  return (
    <>
      <GameOption
        pick={"rock"}
        className={playerPick === "rock" ? "rock selected" : "rock"}
        onClick={onPlayerPick}
        icon={iconRock}
        alt={"rock option"}
      />
      <GameOption
        pick={"paper"}
        className={playerPick === "paper" ? "paper selected" : "paper"}
        onClick={onPlayerPick}
        icon={iconPaper}
        alt={"paper option"}
      />
      <GameOption
        pick={"scissors"}
        className={playerPick === "scissors" ? "scissors selected" : "scissors"}
        onClick={onPlayerPick}
        icon={iconScissors}
        alt={"scissors option"}
      />
    </>
  );
}
function GameResult({
  playerPick,
  onPlayerPick,
  housePick,
  result,
  onPlayAgain,
}) {
  return (
    <>
      <div>
        <p>YOU PICKED</p>
        <SelectedOption pick={playerPick} />
      </div>
      <div>
        {result === "win" && <p>YOU WON</p>}
        {result === "draw" && <p>DRAW</p>}
        {result === "lose" && <p>YOU LOSE</p>}
        <Button onClick={onPlayAgain}>PLAY AGAIN</Button>
      </div>
      <div>
        <p>THE HOUSE PICKED</p>
        {/* <div className="empty-slot"></div> */}
        <SelectedOption pick={housePick} />
      </div>
    </>
  );
}

function RulesButton({ isOpen, onOpenClose }) {
  return (
    <Button className={"rules-button"} onClick={onOpenClose}>
      RULES
    </Button>
  );
}

function RulesModal({ isOpen, onOpenClose }) {
  return (
    isOpen && (
      <div className="rules-modal">
        <div className="rules-modal-header">
          <p>RULES</p>

          <Button className={"close-button"} onClick={onOpenClose}>
            <img src={closeIcon} alt="close" />
          </Button>
        </div>

        <img src={rulesImage} alt="rules" />
      </div>
    )
  );
}

function GameOption({ icon, alt, onClick, pick, className }) {
  return (
    <Button
      pick={pick}
      onClick={() => onClick(pick)}
      className={`game-option ${className}`}
    >
      <img src={icon} alt={alt} />
    </Button>
  );
}

function SelectedOption({ pick }) {
  return (
    <>
      {pick === "scissors" && (
        <Button className={`scissors selected`}>
          <img src={iconScissors} alt={"scissors icon"} />
        </Button>
      )}

      {pick === "paper" && (
        <Button className={`paper selected`}>
          <img src={iconPaper} alt={"paper icon"} />
        </Button>
      )}

      {pick === "rock" && (
        <Button className={`rock selected`}>
          <img src={iconRock} alt={"rock icon"} />
        </Button>
      )}
    </>
  );
}

function Button({ children, className, onClick }) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default App;
