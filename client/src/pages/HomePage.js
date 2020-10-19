import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

export default function HomePage() {
  const currentUserId = useSelector((state) => state.auth.id);

  if (typeof currentUserId === "number") {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <div id="homepage__main">
        <div id="homepage__middle-left"></div>
        <div id="homepage__middle-right">
          <div id="homepage__middle-links">
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
        </div>
      </div>
    </>
  );
}
