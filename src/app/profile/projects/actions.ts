"use server";

import connectToDB from "@/middleware/connectToDB";
import { verifyUser } from "@/middleware/verifyToken";
import { Project, type IProject } from "@/models/Project";
import type { MongoBase } from "@/types/mongo";
import { z } from "zod";

interface ProjectType extends IProject, MongoBase {}

export const getUserProjects = async (): Promise<ProjectType[]> => {
  try {
    const user = verifyUser();
    if (user === null) throw Error("UnAuthorized");
    await connectToDB();
    const projects: ProjectType[] = await Project.find({ user: user._id });
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const projectSchema = z.object({
  name: z.string().min(5),
  start: z.string().min(5),
  end: z.string().min(5),
  live: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  desc1: z.string().min(5),
  desc2: z.string().min(5),
  desc3: z.string(),
});

export const addProject = async (
  name: string,
  start: string,
  end: string,
  live: string,
  github: string,
  desc1: string,
  desc2: string,
  desc3: string
): Promise<ProjectType> => {
  try {
    const user = verifyUser();
    if (user === null) throw Error("UnAuthorized");
    const data = {
      name,
      start,
      end,
      live,
      github,
      desc1,
      desc2,
      desc3,
      user: user._id,
    };
    projectSchema.parse(data);
    console.log(data);

    const project = await Project.create(data);
    console.log("returned Project", project);
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateProject = async (
  name: string,
  start: string,
  end: string,
  live: string,
  github: string,
  desc1: string,
  desc2: string,
  desc3: string,
  id: string
): Promise<ProjectType> => {
  try {
    const user = verifyUser();
    if (user === null) throw Error("UnAuthorized");
    const data = {
      name,
      start,
      end,
      live,
      github,
      desc1,
      desc2,
      desc3,
    };
    projectSchema.parse(data);

    const project = await Project.findByIdAndUpdate(id, data);

    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await Project.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
