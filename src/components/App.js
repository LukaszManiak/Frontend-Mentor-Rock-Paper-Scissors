import { useEffect, useState } from "react";
import "../App.css";

// components
import ResetPointsButton from "./ResetPointsButton";
import RulesButton from "./RulesButton";
import GameBoard from "./GameBoard";
import ScoreHeader from "./ScoreHeader";
import RulesModal from "./RulesModal";
import GamePickStep from "./GamePickStep";
import GameResult from "./GameResult";

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

  // house pick
  function handleHousePick() {
    const randomSlot = Math.floor(Math.random() * houseOptions.length);
    const randomPick = houseOptions[randomSlot];
    setHousePick(randomPick);
  }

  // play again
  function handlePlayAgain() {
    setPlayerPick("");
    setHousePick("");
    setResult("");
  }

  // reset handler
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
      {/* overlay intro */}
      <div className="overlay"></div>
      {/* score header */}
      <ScoreHeader score={playerScore} />
      {/* game board */}
      <GameBoard>
        {/* pick screen */}
        {!playerPick && (
          <GamePickStep
            playerPick={playerPick}
            onPlayerPick={handlePlayerPick}
          />
        )}

        {/* result screen */}
        {playerPick && (
          <GameResult
            mobileView={mobileView}
            onPlayAgain={handlePlayAgain}
            playerPick={playerPick}
            housePick={housePick}
            result={result}
          />
        )}
      </GameBoard>

      {/* modal */}
      <RulesModal isOpen={isOpen} onOpenClose={handleOpenCloseClick} />
      {/* close modal button */}
      <RulesButton isOpen={isOpen} onOpenClose={handleOpenCloseClick} />
      {/* reset button */}
      <ResetPointsButton onResetPoints={handleResetPoints} />
      {/* dark bg */}
      {isOpen && <div className="dark-bg"></div>}
    </div>
  );
}

export default App;
