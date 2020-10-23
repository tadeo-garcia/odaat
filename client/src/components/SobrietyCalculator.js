import React, { useState } from "react";
import { useSelector } from "react-redux";
import ConfettiGenerator from "confetti-js";

export default function SobrietyCalculator() {
  const sobrietyDate = useSelector((state) => state.auth.sobriety_date);
  const [showDays, setShowDays] = useState(null);
  let today = new Date();
  let soberdate = new Date(sobrietyDate);
  let rough = soberdate.getTime() - today.getTime();
  let days = Math.floor((rough / (1000 * 3600 * 24)) * -1);

  const confettiSettings = {
    target: "confetti-canvas",
    clock: 35,
    max: 350,
    size: 2,
    colors: [[1, 46, 85]],
  };

  const handleDisplay = () => {
    setShowDays(true);
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    setTimeout(() => {
      confetti.clear();
    }, 3500);
  };

  return (
    <div id="calculator__wrapper">
      <canvas id="confetti-canvas"></canvas>
      <div id="calculator__container">
        <h2>Sobriety Calculator</h2>
        <h3>Everyone who has found sobriety is a living miracle!</h3>
        <h4>
          To find out just how long you have enjoyed this new found freedom, click the button below!
        </h4>
        <div id="calculator__sobriety-date">
          {sobrietyDate ? (
            <div>
              <button id="calculator__button" onClick={handleDisplay}>
                {" "}
                Click Here{" "}
              </button>
            </div>
          ) : (
            <div>
              <span>Input Your Sobriety Date below</span>
              <input type="date"></input>
            </div>
          )}
          {showDays ? <div>You've been sober {days} days! Congratulations!!</div> : null}
        </div>
      </div>
    </div>
  );
}
