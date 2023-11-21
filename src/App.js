import { useState } from "react";
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

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenCloseClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="app">
      <ScoreHeader />
      <GameBoard />
      <RulesModal isOpen={isOpen} onOpenClose={handleOpenCloseClick} />
      <RulesButton isOpen={isOpen} onOpenClose={handleOpenCloseClick} />
      {isOpen && <div className="dark-bg"></div>}
    </div>
  );
}

function ScoreHeader() {
  return (
    <div className="score-header">
      <div className="header-left">
        <img src={logoSvg} alt="logo" />
      </div>

      <div className="header-right">
        <p>SCORE</p>
        <p>12</p>
      </div>
    </div>
  );
}

function GameBoard() {
  return (
    <div className="game-board">
      <GameOption />
    </div>
  );
}

function GameStep1() {}
function GameStep2() {}
function GameStep3() {}
function GameStep4() {}

function RulesButton({ isOpen, onOpenClose }) {
  console.log(isOpen);

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

function GameOption() {
  return (
    <Button className={"game-option"}>
      <img src={iconScissors} alt="rock icon" />
    </Button>
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
