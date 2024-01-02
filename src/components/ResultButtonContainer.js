import Button from "./Button";
export default function ResultButtonContainer({
  result,
  onPlayAgain,
  className,
}) {
  return (
    <div className={className ? className : ""}>
      {result === "win" && <p>YOU WON</p>}
      {result === "draw" && <p>DRAW</p>}
      {result === "lose" && <p>YOU LOSE</p>}

      <Button className={"play-again-btn"} onClick={onPlayAgain}>
        PLAY AGAIN
      </Button>
    </div>
  );
}
