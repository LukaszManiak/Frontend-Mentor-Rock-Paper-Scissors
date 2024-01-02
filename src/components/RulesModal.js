import Button from "./Button";
import rulesImage from "../images/image-rules.svg";
import closeIcon from "../images/icon-close.svg";

export default function RulesModal({ isOpen, onOpenClose }) {
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
