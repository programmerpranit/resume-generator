import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  location: string;
  phone: string;
  portfolio: string;
  education: {
    college: string;
    cgpa: string;
    course: string;
    start: string;
    end: string;
  };
  skills: [string];
  achievements: [string];
  experience: {
    role: string;
    company: string;
    start: string;
    end: string;
    projects: [string];
  };
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    location: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    skills: [String],
    achievements: [String],
    education: {
      college: { type: String, default: "" },
      cgpa: { type: String, default: "" },
      course: { type: String, default: "" },
      start: { type: String, default: "" },
      end: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User ?? model<IUser>("User", UserSchema);
