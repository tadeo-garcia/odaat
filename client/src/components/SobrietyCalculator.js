import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function SobrietyCalculator() {
  const sobrietyDate = useSelector((state) => state.auth.sobriety_date);
  const [showDays, setShowDays] = useState(null);
  let today = new Date();
  let soberdate = new Date(sobrietyDate);
  let rough = soberdate.getTime() - today.getTime();
  let days = Math.floor((rough / (1000 * 3600 * 24)) * -1);
  console.log(days);

  const handleDisplay = () => {
    setShowDays(true);
  };

  return (
    <div id="calculator__wrapper">
      <div id="calculator__container">
        <h2>Sobriety Calculator</h2>
        <h3>Everyone who has found sobriety is a living miracle!</h3>
        <h4>
          To find out just how long you have enjoyed this new found freedom, use the calculator
          below!
        </h4>
        <div id="calculator__sobriety-date">
          {sobrietyDate ? (
            <div>
              <button onClick={handleDisplay}> Click Here </button>
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
