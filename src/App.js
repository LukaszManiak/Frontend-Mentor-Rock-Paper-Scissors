import "./App.css";

function App() {
  return (
    <div className="app">
      <ScoreHeader />
    </div>
  );
}

function ScoreHeader() {
  return (
    <div className="score-header">
      <div className="header-left">
        <p>ROCK</p>
        <p>PAPER</p>
        <p>SCISSORS</p>
      </div>

      <div className="header-right">
        <p>SCORE</p>
        <p>12</p>
      </div>
    </div>
  );
}

function GameBoard() {
  return <div></div>;
}

function GameStep1() {}
function GameStep2() {}
function GameStep3() {}
function GameStep4() {}

export default App;
