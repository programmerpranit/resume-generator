"use client";

import { BASE_URL } from "@/utils/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();

  const router = useRouter();

  const handleLogin = async (e: any): Promise<void> => {
    e.preventDefault();

    if (email.length === 0) return;
    if (password.length === 0) return;

    try {
      const url = `${BASE_URL}/api/auth/login`;
      const data = {
        email,
        password,
      };
      const res = await axios.post(url, data);

      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token as string);
        cookies.set("authorization", res.data.token, { path: "/" });
        toast.success(res.data.message as string);
        router.push("/resumes");
      } else {
        console.log(res.status);
      }
    } catch (error: any) {
      console.log(error);
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
        <h2>Sign In</h2>
        <p>Sign In to add blogs.</p>
        <form
          onSubmit={(e) => {
            void handleLogin(e);
          }}
        >
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
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
