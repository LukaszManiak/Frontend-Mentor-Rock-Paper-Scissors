import SelectedOption from "./SelectedOption";
import ResultButtonContainer from "./ResultButtonContainer";

export default function GameResult({
  playerPick,
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
          <ResultButtonContainer result={result} onPlayAgain={onPlayAgain} />
        )}
        <div>
          <p>THE HOUSE PICKED</p>
          <SelectedOption pick={housePick} />
        </div>
      </div>

      {!mobileView && (
        <ResultButtonContainer
          result={result}
          onPlayAgain={onPlayAgain}
          className={"reuslt-button-container"}
        />
      )}
    </>
  );
}
