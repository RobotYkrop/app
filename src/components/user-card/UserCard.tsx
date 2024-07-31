import { memo } from "react";
import { UserModelData } from "../../libs/models/user-models/userModelsData";
import "./UserCard.css";

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
