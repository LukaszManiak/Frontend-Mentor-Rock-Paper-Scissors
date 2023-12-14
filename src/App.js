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
  const [playerScore, setPlayerScore] = useState(() => {
    // getting score from local storage
    const storedScore = localStorage.getItem("score");
    return JSON.parse(storedScore);
  });
  const [playerPick, setPlayerPick] = useState("");
  const [housePick, setHousePick] = useState("");
  const [result, setResult] = useState("");
  const [mobileView, setMobileView] = useState(false);

  // open/close modal window
  function handleOpenCloseClick() {
    setIsOpen(!isOpen);
  }
  // player pick
  function handlePlayerPick(pick) {
    const selectedPick = pick;
    setPlayerPick((s) => selectedPick);

    handleHousePick();
  }

  console.log(playerScore);

  // house pick
  function handleHousePick() {
    const randomSlot = Math.floor(Math.random() * houseOptions.length);
    const randomPick = houseOptions[randomSlot];
    setHousePick(randomPick);
  }

  function handlePlayAgain() {
    setPlayerPick("");
    setHousePick("");
    setResult("");
  }

  function handleResetPoints() {
    setPlayerScore(0);
  }

  // handling screen size change
  useEffect(function () {
    function handleMobileView() {
      if (window.innerWidth >= 606) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    }

    handleMobileView();

    window.addEventListener("resize", handleMobileView);

    return () => {
      window.removeEventListener("resize", handleMobileView);
    };
  }, []);

  // handling score and result
  useEffect(
    function () {
      function handleResultAndScore() {
        // handling result

        if (playerPick === housePick) {
          setResult("draw");
        } else if (
          // win options
          (playerPick === "rock" && housePick === "scissors") ||
          (playerPick === "paper" && housePick === "rock") ||
          (playerPick === "scissors" && housePick === "paper")
        ) {
          setResult("win");
          // setting score
          setPlayerScore((s) => s + 1);
        } else {
          setResult("lose");
          // setting score
          setPlayerScore((s) => s - 1);
        }
      }

      handleResultAndScore();
    },
    [housePick, playerPick]
  );

  console.log(result);

  // setting localStorage score points
  useEffect(
    function () {
      localStorage.setItem("score", JSON.stringify(playerScore));
    },
    [playerScore]
  );

  return (
    <div className="app">
      <ScoreHeader score={playerScore} />
      <GameBoard
        mobileView={mobileView}
        playerPick={playerPick}
        onPlayerPick={handlePlayerPick}
        housePick={housePick}
        result={result}
        onPlayAgain={handlePlayAgain}
      />

      {/* modal */}
      <RulesModal isOpen={isOpen} onOpenClose={handleOpenCloseClick} />
      <RulesButton isOpen={isOpen} onOpenClose={handleOpenCloseClick} />
      <ResetPointsButton onResetPoints={handleResetPoints} />
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
  mobileView,
}) {
  return (
    <div className="game-board">
      {!playerPick && (
        <GamePickStep playerPick={playerPick} onPlayerPick={onPlayerPick} />
      )}

      {playerPick && (
        <GameResult
          mobileView={mobileView}
          onPlayAgain={onPlayAgain}
          playerPick={playerPick}
          housePick={housePick}
          result={result}
        />
      )}
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
  mobileView,
}) {
  return (
    <>
      <div className="result-container">
        <div>
          <p>YOU PICKED</p>
          <SelectedOption pick={playerPick} />
        </div>
        {mobileView && (
          <div>
            {result === "win" && <p>YOU WON</p>}
            {result === "draw" && <p>DRAW</p>}
            {result === "lose" && <p>YOU LOSE</p>}

            <Button className={"play-again-btn"} onClick={onPlayAgain}>
              PLAY AGAIN
            </Button>
          </div>
        )}
        <div>
          <p>THE HOUSE PICKED</p>
          {/* <div className="empty-slot"></div> */}
          <SelectedOption pick={housePick} />
        </div>
      </div>

      {!mobileView && (
        <div className="reuslt-button-container">
          {result === "win" && <p>YOU WON</p>}
          {result === "draw" && <p>DRAW</p>}
          {result === "lose" && <p>YOU LOSE</p>}

          <Button className={"play-again-btn"} onClick={onPlayAgain}>
            PLAY AGAIN
          </Button>
        </div>
      )}
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

function ResetPointsButton({ onResetPoints }) {
  return (
    <Button className={"reset-score-button"} onClick={onResetPoints}>
      RESET POINTS
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
    <button onClick={() => onClick()} className={className}>
      {children}
    </button>
  );
}

export default App;
