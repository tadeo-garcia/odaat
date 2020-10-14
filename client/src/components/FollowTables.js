import React from "react";
import { Link } from "react-router-dom";

export function FollowerTable({ followers }) {
  if (!followers) return null;
  return (
    <div>
      {followers.map((user, idx) => {
        let followClass = "follow_table-row";
        if (idx % 2 === 0) {
          followClass = "follow_table-row2";
        }
        return (
          <div key={user.id} id={followClass}>
            <div>{user.username}</div>
            <div>
              <Link to={`/Dashboard/profile/${user.id}`} id="follow_table-link">
                {" "}
                go to profile
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FollowingTable({ following }) {
  if (!following) return null;
  return (
    <div>
      {following.map((user, idx) => {
        let followClass = "follow_table-row";
        if (idx % 2 === 0) {
          followClass = "follow_table-row2";
        }
        return (
          <div key={user.id} id={followClass}>
            <div>{user.username}</div>
            <div>
              <Link to={`/Dashboard/profile/${user.id}`} id="follow_table-link">
                {" "}
                go to profile
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
