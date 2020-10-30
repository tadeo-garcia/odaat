import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { updateUserProfile } from "../store/auth";

export default function EditProfile() {
  const currentUserId = useSelector((state) => state.auth.id);
  const message = useSelector((state) => state.auth.message);
  const [displayMessage, setDisplayMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [passMatch, setPassMatch] = useState(null);
  const [bio, setBio] = useState(null);
  const [sobrietyDate, setSobrietyDate] = useState(null);
  const [displaySobrietyDate, setDisplaySobrietyDate] = useState(false);
  const [displayChange, setDisplayChange] = useState(null);
  const [interests, setInterests] = useState(null);
  const [sponsor, setSponsor] = useState(false);
  const [sponsorChange, setSponsorChange] = useState(null);
  const [sponsee, setSponsee] = useState(false);
  const [sponseeChange, setSponseeChange] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDisplaySD = () => {
    setDisplayChange(true);
    if (displaySobrietyDate === false) {
      setDisplaySobrietyDate(true);
    } else {
      setDisplaySobrietyDate(false);
    }
  };

  const handleSponsor = () => {
    setSponsorChange(true);
    if (sponsor === false) {
      setSponsor(true);
    } else {
      setSponsor(false);
    }
  };

  const handleSponsee = () => {
    setSponseeChange(true);
    if (sponsee === false) {
      return setSponsee(true);
    } else {
      return setSponsee(false);
    }
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setPassMatch({ border: "1px solid red" });
      return;
    }

    if (!displayChange) {
      setDisplaySobrietyDate(false);
    }
    if (!sponsorChange) {
      setSponsor(false);
    }

    if (!sponseeChange) {
      setSponsee(false);
    }

    dispatch(
      updateUserProfile(
        currentUserId,
        username,
        password,
        confirmPassword,
        bio,
        sobrietyDate,
        displaySobrietyDate,
        interests,
        sponsor,
        sponsee
      )
    );

    setDisplayMessage(message);
  };

  return (
    <>
      <div id="edit-wrapper">
        <div id="edit-container">
          <div id="edit-container__info">
            To edit your profile fill out any of the fields, and press submit!
          </div>
          <div id="edit-container__message">{submitted ? displayMessage : null}</div>
          <div id="edit-container__form-div">
            <form id="edit-container__form">
              <div className="edit-container__input-div">
                <input
                  type="text"
                  className="edit-container__input"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={"Update your username here."}
                />
              </div>
              <div className="edit-container__input-div">
                <input
                  type="text"
                  className="edit-container__input"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder={"Update your password here."}
                />
              </div>
              <div className="edit-container__input-div">
                <input
                  type="text"
                  style={passMatch}
                  className="edit-container__input"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder={"Please confirm new password here."}
                />
              </div>
              <div className=" edit-container__input-div description-box">
                <textarea
                  className="edit-container__input"
                  onChange={(e) => setBio(e.target.value)}
                  rows={6}
                  placeholder="Edit your bio here."
                />
              </div>
              <div className=" edit-container__input-div description-box">
                <textarea
                  className="edit-container__input"
                  onChange={(e) => setInterests(e.target.value)}
                  rows={6}
                  placeholder="Edit your interests here."
                />
              </div>
              <div className="edit-container__input-div">
                <span className="edit-container__input-descript">
                  Update your sobriety date here.
                </span>
                <input
                  type="date"
                  className="edit-container__input"
                  onChange={(e) => setSobrietyDate(e.target.value)}
                />
              </div>
              <div className="edit-container__input-div-check">
                <span>If you want to keep your sobriety date private check this box.</span>
                <input
                  type="checkbox"
                  className="edit-container__input-check"
                  value="true"
                  onChange={() => {
                    handleDisplaySD();
                  }}
                />
              </div>
              <div className="edit-container__input-div-check">
                <span>If you're looking for a sponsor check this box!</span>
                <input
                  type="checkbox"
                  className="edit-container__input-check"
                  onChange={() => handleSponsee()}
                />
              </div>
              <div className="edit-container__input-div-check">
                <span>If you're willing to sponsor someone check this box!</span>
                <input
                  type="checkbox"
                  className="edit-container__input-check"
                  onChange={() => handleSponsor()}
                />
              </div>
            </form>
            <div className="edit-container__input-div">
              <button
                className="edit-container__button"
                onClick={() => {
                  handleSubmit();
                  setSubmitted(true);
                  return history.push("/Dashboard/profile");
                }}
              >
                submit update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
