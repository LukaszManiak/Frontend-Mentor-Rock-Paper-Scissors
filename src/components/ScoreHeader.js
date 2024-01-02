import logoSvg from "../images/logo.svg";

export default function ScoreHeader({ score }) {
  return (
    <div className="score-header">
      <div className="header-left">
        <img src={logoSvg} alt="logo" />
      </div>

      <div className="header-right">
        <p>SCORE</p>
        <p>{score}</p>
      </div>
    </div>
  );
}
