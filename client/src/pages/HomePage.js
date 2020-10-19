import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

export default function HomePage() {
  const currentUserId = useSelector((state) => state.auth.id);
  const wrapper = useRef(null);

  if (typeof currentUserId === "number") {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <div id="homepage__main">
        <div id="homepage__middle-left">
          <div id="homepage__middle-links">
            <CSSTransition
              key={"login"}
              in={true}
              appear={true}
              timeout={6000}
              classNames="fade5"
              ref={wrapper}
            >
              <div>
                <div id="homepage__login">
                  <span> welcome to odaat.</span>
                  <br />
                  <br />
                  <span>
                    click{" "}
                    <Link id="homepage__right-link" to="/login">
                      here
                    </Link>{" "}
                    to sign in
                  </span>
                  <br />
                  <span>
                    click{" "}
                    <Link id="homepage__right-link" to="/signup">
                      here
                    </Link>{" "}
                    to sign up
                  </span>
                  <br />
                  <span>
                    click{" "}
                    <Link id="homepage__right-link" to="/about">
                      here
                    </Link>{" "}
                    to learn more
                  </span>
                </div>
              </div>
            </CSSTransition>
          </div>
        </div>
        <div id="homepage__middle-right">
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
