import Button from "./Button";

export default function ResetPointsButton({ onResetPoints }) {
  return (
    <Button className={"reset-score-button"} onClick={onResetPoints}>
      RESET POINTS
    </Button>
  );
}
