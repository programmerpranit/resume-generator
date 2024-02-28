import mongoose, { Schema, model, type ObjectId } from "mongoose";

export interface IProject {
  name: string;
  start: string;
  end: string;
  live: string;
  github: string;
  desc1: string;
  desc2: string;
  desc3: string;
  user: ObjectId;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, default: "" },
    start: { type: String, required: true, default: "" },
    end: { type: String, required: true, default: "" },
    live: { type: String, default: "" },
    github: { type: String, default: "" },
    desc1: { type: String, required: true, default: "" },
    desc2: { type: String, required: true, default: "" },
    desc3: { type: String, required: true, default: "" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.Project ?? model<IProject>("Project", ProjectSchema);
