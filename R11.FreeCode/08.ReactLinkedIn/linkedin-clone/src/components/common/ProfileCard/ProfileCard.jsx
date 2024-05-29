import "./ProfileCard.scss";

const ProfileCard = ({ currentUser, onEdit }) => {
  console.log(currentUser);
  return (
    <div className="profile-card">
      <div className="edit-btn">
        <button onClick={onEdit}>Edit</button>
      </div>

      <h3 className="username">{currentUser.name}</h3>
      <p className="userEmail"> {currentUser.email} </p>
    </div>
  );
};

export default ProfileCard;
