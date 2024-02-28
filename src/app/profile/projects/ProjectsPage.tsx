"use client";
import type { IProject } from "@/models/Project";
import type { MongoBase } from "@/types/mongo";
import React, { useState } from "react";
import { getUserProjects } from "./actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AddUpdateProject from "./AddUpdateProject";
import ProjectComp from "./ProjectComp";

interface ProjectType extends IProject, MongoBase {}

const ProjectsPage = ({
  projects,
}: {
  projects: ProjectType[];
}): JSX.Element => {
  const [action, setAction] = useState<string>("");

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await getUserProjects(),
    initialData: projects,
  });

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-between">
        <h2>My Projects </h2>
        <button
          onClick={() => {
            queryClient.setQueryData(["toupdate"], null);
            setAction("Add");
          }}
          className="bg-black"
        >
          Add Project
        </button>
      </div>
      {data?.map((project) => (
        <ProjectComp
          key={project._id}
          project={project}
          setAction={setAction}
        />
      ))}
      <AddUpdateProject key={action} setAction={setAction} action={action} />
    </div>
  );
};

export default ProjectsPage;
