"use client";

import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import { getProfile, updateBasicProfile } from "./actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { IUser } from "@/models/User";
import type { MongoBase } from "@/types/mongo";

interface ProfileType extends IUser, MongoBase {}

const ProfilePage = ({ profile }: { profile: ProfileType }): JSX.Element => {
  const queryClient = useQueryClient();

  const { data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => await getProfile(),
    initialData: profile,
  });

  const [name, setName] = useState<string>(data?.name ?? "");
  const [email, setEmail] = useState<string>(data?.email ?? "");
  const [phone, setPhone] = useState<string>(data?.phone ?? "");
  const [location, setLocation] = useState<string>(data?.location ?? "");
  const [portfolio, setPortfolio] = useState<string>(data?.portfolio ?? "");
  const [education, setEducation] = useState(data.education);

  const { mutate: updateProfile } = useMutation({
    mutationKey: ["profile", data._id],
    mutationFn: async () =>
      await updateBasicProfile(
        name,
        email,
        phone,
        location,
        portfolio,
        education,
        data?._id ?? ""
      ),

    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["profile"], () => data);
      toast.success("Profile Updated Successfully");
    },
    onError: () => {
      toast.error("Failed to update Profile");
    },
  });

  useEffect(() => {
    if (error !== null) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div>
      <h2>My Profile </h2>
      <Input
        className="my-5"
        label="Name"
        value={name}
        setValue={setName}
        type="text"
      />
      <Input
        className="my-5"
        label="Email"
        value={email}
        setValue={setEmail}
        type="text"
      />
      <Input
        className="my-5"
        label="Phone Number"
        value={phone}
        setValue={setPhone}
        type="text"
      />
      <Input
        className="my-5"
        label="Location (City)"
        value={location}
        setValue={setLocation}
        type="text"
      />
      <Input
        className="my-5"
        label="Portfoilo Website Link"
        value={portfolio}
        setValue={setPortfolio}
        type="text"
      />
      <h3>Education</h3>
      <Input
        className="my-5"
        label="College Name"
        value={education.college}
        setValue={(val) => {
          setEducation((prev) => ({ ...prev, college: val }));
        }}
        type="text"
      />
      <Input
        className="my-5"
        label="CGPA"
        value={education.cgpa}
        setValue={(val) => {
          setEducation((prev) => ({ ...prev, cgpa: val }));
        }}
        type="text"
      />
      <Input
        className="my-5"
        label="Course Name"
        value={education.course}
        setValue={(val) => {
          setEducation((prev) => ({ ...prev, course: val }));
        }}
        type="text"
      />
      <Input
        className="my-5"
        label="Start (Month Year)"
        value={education.start}
        setValue={(val) => {
          setEducation((prev) => ({ ...prev, start: val }));
        }}
        type="text"
      />
      <Input
        className="my-5"
        label="End (Month Year)"
        value={education.end}
        setValue={(val) => {
          setEducation((prev) => ({ ...prev, end: val }));
        }}
        type="text"
      />

      <button
        onClick={() => {
          updateProfile();
        }}
        className="bg-black"
      >
        Save
      </button>
    </div>
  );
};

export default ProfilePage;
