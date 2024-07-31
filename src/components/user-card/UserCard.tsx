import React, { memo } from "react";
import { UserModelData } from "../../libs/models/user-models/userModelsData";
import "./UserCard.css";
/**
 * UserCard component displays information about a single user.
 *
 * @component
 * @example
 * // Example usage
 * <UserCard user={{ email: 'example@example.com', name: 'John Doe' }} />
 *
 * @param {Object} props - The properties passed to the component.
 * @param {UserModelData} props.user - The user data to display.
 * @returns {React.Element} The rendered UserCard component.
 */

interface UserProps {
  user: UserModelData;
}

const UserCard = ({ user }: UserProps) => {
  return (
    <div className="user-card">
      <img
        src={user.picture.medium}
        alt={`${user.name.first} ${user.name.last}`}
        className="user-card-image"
      />
      <div className="user-card-details">
        <h3 className="user-card-name">{`${user.name.first} ${user.name.last}`}</h3>
        <p className="user-card-email">{user.email}</p>
      </div>
    </div>
  );
};

UserCard.displayName = "UserCard";

export default memo(UserCard);
