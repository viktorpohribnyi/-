import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";

const ProfileWrapper = styled.div`
  background: linear-gradient(45deg, #f6d02f, #ff6f91);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  color: white;
  padding: 20px;

  h1 {
    font-size: 3rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
    margin-bottom: 20px;
  }
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 800px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);

  h2 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    border-bottom: 2px solid #ffd700;
    padding-bottom: 5px;
  }

  p, label {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  input, textarea, select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ffd700;
    margin-bottom: 15px;
    outline: none;

    &:focus {
      background-color: #ff6f91;
      color: white;
    }
  }

  button {
    background: #ffd700;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff6f91;
      color: white;
    }
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #ffd700;
    margin-bottom: 10px;
  }

  input[type="file"] {
    display: none;
  }

  label {
    cursor: pointer;
    background: #ffd700;
    padding: 10px 20px;
    border-radius: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff6f91;
      color: white;
    }
  }
`;

const LogoutButton = styled.button`
  background: #ff6f91;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  color: white;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffd700;
    color: black;
  }
`;

const Profile = () => {
  const { user, updateUser, logoutUser } = useUser();

  const [newUsername, setNewUsername] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (user) {
      setNewUsername(user.username || "");
      setBio(user.bio || "");
      setGender(user.gender || "");
    }
  }, [user]);

  const handleSave = () => {
    updateUser({ username: newUsername, bio, gender });
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <ProfileWrapper>
      {user ? (
        <>
          <h1>Your Profile</h1>

          <Section>
            <h2>Personal Information</h2>
            <AvatarContainer>
              <img src={user.avatar || "https://via.placeholder.com/150"} alt="Avatar" />
            </AvatarContainer>
            <label>Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />

            <label>Bio</label>
            <textarea
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short biography"
            />

            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <button onClick={handleSave}>Save Changes</button>
          </Section>

          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </>
      ) : (
        <p>You need to be logged in to view your profile.</p>
      )}
    </ProfileWrapper>
  );
};

export default Profile;