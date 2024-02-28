import type { IUser } from "@/models/User";
import type { IPayload, MongoBase } from "@/types/mongo";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

interface ProfileType extends IUser, MongoBase {}

export const verifyUser = (): ProfileType | null => {
  try {
    const token = cookies().get("authorization")?.value;

    if (token === undefined) {
      throw Error("JWT Token Not Found");
    }

    const adminSec = process.env.JWT_SEC;
    if (adminSec === undefined) {
      throw Error("Add JWT_SEC in env");
    }

    const user = verify(token, adminSec);
    const typedPayload = user as IPayload;
    if (typedPayload.user !== undefined) {
      return typedPayload.user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
