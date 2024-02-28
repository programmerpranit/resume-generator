import Link from "next/link";
import React from "react";

const ResumePage = (): JSX.Element => {
  return (
    <>
      <Link href={"/profile"}>
        <h3>Update Profile</h3>
      </Link>
    </>
  );
};

export default ResumePage;
