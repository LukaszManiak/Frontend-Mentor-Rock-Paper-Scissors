// option icons
import iconRock from "../images/icon-rock.svg";
import iconScissors from "../images/icon-scissors.svg";
import iconPaper from "../images/icon-paper.svg";

import Button from "./Button";

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

export default function GamePickStep({ playerPick, onPlayerPick }) {
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
