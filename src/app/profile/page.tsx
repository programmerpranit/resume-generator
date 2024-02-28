import React from "react";
import ProfilePage from "./ProfilePage";
import { getProfile } from "./actions";

const Profile = async (): Promise<JSX.Element> => {
  const profile = await getProfile();

  return <ProfilePage profile={profile} />;
};

export default Profile;
