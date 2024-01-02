import Button from "./Button";
export default function RulesButton({ onOpenClose }) {
  return (
    <Button className={"rules-button"} onClick={onOpenClose}>
      RULES
    </Button>
  );
}
