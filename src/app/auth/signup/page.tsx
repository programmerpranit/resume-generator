"use client";

import { BASE_URL } from "@/utils/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const SignUp = (): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const router = useRouter();

  const handleSignUp = async (e: any): Promise<void> => {
    e.preventDefault();

    if (email.length === 0) return;
    if (password.length === 0) return;

    try {
      const url = `${BASE_URL}/api/auth/signup`;
      const data = {
        name,
        email,
        password,
      };
      const res = await axios.post(url, data);

      localStorage.setItem("token", res.data.token as string);
      cookies.set("authorization", res.data.token, { path: "/" });
      toast.success(res.data.message as string);
      router.push("/profile");
    } catch (error: any) {
      if (error?.response?.data?.message !== undefined) {
        toast.error(error.response.data.message as string);
      } else {
        toast.error("Unknown Error Occured");
      }
    }
  };

  return (
    <>
      <div className="m-auto my-10 max-w-lg rounded border p-5 shadow">
        <h2>Sign Up</h2>
        <form
          onSubmit={(e) => {
            void handleSignUp(e);
          }}
        >
          <p className="mt-5 font-semibold">Name</p>
          <input
            type="name"
            placeholder="Pranit Patil"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full rounded border px-2 py-1 outline-none"
          />
          <p className="mt-5 font-semibold">Email</p>
          <input
            type="email"
            placeholder="psp@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full rounded border px-2 py-1 outline-none"
          />
          <p className="mt-5 font-semibold">Password</p>
          <input
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full rounded border px-2 py-1 outline-none"
          />

          <button type="submit" className="my-5 w-full rounded bg-primary">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
