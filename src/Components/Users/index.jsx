import React from "react";
import classNames from "classnames";
import styles from "./Users.module.sass";

export default function Users(props) {
  const { users } = props;
  const country = users.nat;

  console.log("users", users);
  const { phone } = users;

  return (
    <li
      className={classNames(
        styles.userCard,
        { [styles.male]: users.gender === "male" },
        { [styles.female]: users.gender === "female" },
      )}
    >
      <img className={styles.profile} src={users.picture.large} alt="profile" />
      <img
        src={`https://flagcdn.com/16x12/${country.toLowerCase()}.png`}
        alt="users country"
      />
      <h1>
        {users.name.first} {users.name.last}
      </h1>
      {phone && <span>Phone: {phone}</span>}
      <span>{users.email}</span>
    </li>
  );
}
