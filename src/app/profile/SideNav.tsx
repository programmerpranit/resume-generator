import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideNav = (): JSX.Element => {
  return (
    <>
      <div className="fixed flex h-screen w-1/5 flex-col bg-black p-4 text-white">
        <div className="flex items-center gap-3 py-4">
          <h3 className=" text-white">Resume Generator</h3>
        </div>

        <div className="flex flex-col gap-1 py-4">
          <NavLink title={"Profile"} link={"/profile"} />
          <NavLink title={"Projects"} link={"/profile/projects"} />
          <NavLink title={"Experience"} link={"/profile/experience"} />
          <NavLink title={"Skills"} link={"/profile/skills"} />
          <NavLink title={"Achivement"} link={"/profile/achivement"} />
        </div>

        <div className="flex-1"></div>
      </div>
    </>
  );
};

export default SideNav;

const NavLink = ({ title, link }: any) => {
  return (
    <>
      <Link href={link} className="rounded-md p-3 hover:bg-gray-800">
        <p className="text-lg text-white hover:font-semibold">{title}</p>
      </Link>
    </>
  );
};
