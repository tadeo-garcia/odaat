import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

export default function AboutPage() {
  return (
    <>
      <div id="aboutme__main">
        <div id="aboutme__middle-left">
          <div id="aboutme__info">
            <span>
              One Day At A Time serves as social media platform for members of the Alocholics
              Anonymous community.
              <br />
              <br />
              We know how hard it is to find new sober activities and adapt to a completely new
              lifestyle when you become sober, so here you can communicate with others and find
              various kinds of meetings and activities.
              <br />
              <br />
              You can create or join official and unofficial meetings, online and in person.
              <br />
              <br />
              In addition you have the option to list whether you are looking for a sponsor, or are
              willing to sponsor someone. You can reach out to other members through a private
              message.
              <br />
              <br />
              Most importantly, we value your anonymity so your profile is completetly private - you
              have the choice to make available what information you share with others.
              <br />
              <br />
            </span>{" "}
            <span>
              click{" "}
              <Link id="homepage__right-link" to="/signup">
                here
              </Link>{" "}
              to sign up
            </span>
          </div>
        </div>
        <div id="aboutme__middle-right">
          <CSSTransition in={true} appear={true} timeout={2000} classNames="fade">
            <div key={"one"}>one</div>
          </CSSTransition>
          <CSSTransition in={true} appear={true} timeout={3000} classNames="fade2">
            <div key={"two"}>day</div>
          </CSSTransition>{" "}
          <CSSTransition in={true} appear={true} timeout={3000} classNames="fade3">
            <div key={"three"}>at</div>
          </CSSTransition>{" "}
          <CSSTransition in={true} appear={true} timeout={4000} classNames="fade4">
            <div key={"four"}>a</div>
          </CSSTransition>{" "}
          <CSSTransition in={true} appear={true} timeout={4000} classNames="fade5">
            <div key={"five"}>time</div>
          </CSSTransition>
        </div>
      </div>
    </>
  );
}
