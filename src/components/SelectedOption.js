import Button from "./Button";

// option icons
import iconRock from "../images/icon-rock.svg";
import iconScissors from "../images/icon-scissors.svg";
import iconPaper from "../images/icon-paper.svg";

export default function SelectedOption({ pick }) {
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
