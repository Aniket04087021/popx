import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";

const defaultAvatar = "https://via.placeholder.com/150"; 

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [avatar, setAvatar] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Account Settings</h1>
      </div>

      <div className="profile-content">
        <div className="profile-info">
          <div className="avatar-container">
            <img
              src={avatar || defaultAvatar}
              alt="Profile"
              className="avatar"
            />
            <label htmlFor="avatar-upload" className="avatar-badge">
              <span>+</span>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className="user-details">
            <h2>{currentUser?.fullName || "Guest User"}</h2>
            <p>{currentUser?.email || "guest@example.com"}</p>
          </div>
        </div>

        <div className="profile-description">
          <p>
            Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elitr, Sed Diam
            Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
            Erat, Sed Diam
          </p>
        </div>

        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
