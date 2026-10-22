import { useUserProfileQuery } from "@/src/redux/features/common/profileApi";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const accessToken = useSelector((state) => state.auth.token);
  console.log(accessToken)
  const { data } = useUserProfileQuery(undefined, { skip: !accessToken });
  return <div>{data?.full_name}</div>;
};

export default Profile;
