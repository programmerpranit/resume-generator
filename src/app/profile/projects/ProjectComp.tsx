import type { IProject } from "@/models/Project";
import type { MongoBase } from "@/types/mongo";
import { useQueryClient } from "@tanstack/react-query";
import React, { type Dispatch, type SetStateAction } from "react";
import { deleteProject } from "./actions";
import { toast } from "react-toastify";

interface ProjectType extends IProject, MongoBase {}

interface ProjectCompProps {
  project: ProjectType;
  setAction: Dispatch<SetStateAction<string>>;
}

const ProjectComp = ({ project, setAction }: ProjectCompProps): JSX.Element => {
  const queryClient = useQueryClient();

  const deleteProjectById = async (): Promise<void> => {
    await deleteProject(project._id);
    await queryClient.invalidateQueries({ queryKey: ["projects"] });
    toast.success("Project Deleted Successfully");
  };

  return (
    <>
      <div className="mt-2 max-w-4xl rounded border p-5">
        <div className="flex items-center justify-between">
          <h3>{project.name}</h3>
          <div className="">
            <p
              onClick={() => {
                queryClient.setQueryData(["toupdate"], project);
                setAction("Update");
              }}
              className="mx-2 inline cursor-pointer font-semibold hover:text-primary"
            >
              Update
            </p>
            <p
              onClick={() => {
                void deleteProjectById();
              }}
              className="mx-2 inline cursor-pointer font-semibold hover:text-red-500"
            >
              Delete
            </p>
          </div>
        </div>
        <p>
          {project.start} - {project.end}{" "}
        </p>
        {project.github !== "" && <p>Github: {project.github}</p>}
        {project.live !== "" && <p>Deployed Url: {project.live}</p>}
        <ul className="list-disc px-5">
          <li>{project.desc1}</li>
          <li>{project.desc2}</li>
          <li>{project.desc3}</li>
        </ul>
      </div>
    </>
  );
};

export default ProjectComp;
