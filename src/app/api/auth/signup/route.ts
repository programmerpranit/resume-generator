import connectToDB from "@/middleware/connectToDB";
import { User, type IUser } from "@/models/User";
import { AES } from "crypto-js";
import { sign } from "jsonwebtoken";
import { z } from "zod";

interface SignupProp {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { name, email, password }: SignupProp = await req.json();

    const LoginCredentials = z.object({
      name: z.string(),
      email: z.string().email("Not a Valid Email"),
      password: z.string(),
    });

    const validation = LoginCredentials.safeParse({ name, email, password });
    if (!validation.success) {
      return Response.json(
        { message: "Invalid Credentials", validation },
        { status: 400 }
      );
    }

    await connectToDB();
    const admin: IUser | null = await User.findOne({ email });

    if (admin !== null) {
      return Response.json(
        { message: "Email Already Exists" },
        { status: 400 }
      );
    }

    const passwordSec = process.env.PASS_SEC ?? "";

    const pass = AES.encrypt(password, passwordSec).toString();

    const user = await User.create({ name, email, password: pass });

    const jwtSec = process.env.JWT_SEC ?? "";

    const token = sign({ user }, jwtSec, {
      expiresIn: "1d",
    });

    return Response.json(
      { message: " User Created Successfully.", token },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
