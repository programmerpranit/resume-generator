"use server";

import connectToDB from "@/middleware/connectToDB";
import { verifyUser } from "@/middleware/verifyToken";
import { User, type IUser } from "@/models/User";
import type { MongoBase } from "@/types/mongo";
import { z } from "zod";

interface ProfileType extends IUser, MongoBase {}

interface IEducation {
  college: string;
  cgpa: string;
  course: string;
  start: string;
  end: string;
}

export const getProfile = async (): Promise<ProfileType> => {
  try {
    const user = verifyUser();
    if (user === null) throw Error("UnAuthorized");
    await connectToDB();
    const data = await User.findById(user._id);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const basicProfileSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  phone: z.string().min(10),
  location: z.string().min(3),
  portfolio: z.string().min(5),
  education: z.object({
    college: z.string().min(3),
    cgpa: z.string().min(3),
    course: z.string().min(3),
    start: z.string().min(3),
    end: z.string().min(3),
  }),
});

export const updateBasicProfile = async (
  name: string,
  email: string,
  phone: string,
  location: string,
  portfolio: string,
  education: IEducation,
  id: string
): Promise<any> => {
  try {
    const user = verifyUser();
    if (user === null) throw Error("UnAuthorized");
    const data = {
      name,
      email,
      phone,
      location,
      portfolio,
      education,
    };
    basicProfileSchema.parse(data);

    const profile = await User.findByIdAndUpdate(id, data, { new: true });

    return JSON.parse(JSON.stringify(profile));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
