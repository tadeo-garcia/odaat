import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMeetings } from "../store/meetings";

export default function Meetings() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeetings());
  }, [dispatch]);

  return (
    <>
      <div id="meetings-container"></div>
    </>
  );
}
