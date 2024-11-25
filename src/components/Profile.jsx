import React, { useState } from "react";
import { useUser } from "../context/UserContext"; // Імпортуємо useUser
import styled from "styled-components";

const ProfileWrapper = styled.div`
  padding: 20px;
`;

const Profile = () => {
  const { user, logoutUser } = useUser();
  const [newUsername, setNewUsername] = useState(user ? user.username : "");

  const handleSave = () => {
    logoutUser();
    localStorage.setItem("user", JSON.stringify({ username: newUsername }));
  };

  return (
    <ProfileWrapper>
      {user ? (
        <>
          <h2>Welcome, {user.username}</h2>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Change your username"
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <p>You need to be logged in to view your profile</p>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
