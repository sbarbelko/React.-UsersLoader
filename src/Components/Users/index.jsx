import React from "react";
import classNames from "classnames";
import styles from "./Users.module.sass";

export default function Users(props) {
  const { users } = props;
  return (
    <li
      className={classNames(
        styles.userCard,
        { [styles.male]: users.gender === "male" },
        { [styles.female]: users.gender === "female" },
      )}
    >
      <img src={users.picture.large} alt="profile" />
      <h1>
        {users.name.first} {users.name.last}
      </h1>
      <span>{users.email}</span>
    </li>
  );
}
